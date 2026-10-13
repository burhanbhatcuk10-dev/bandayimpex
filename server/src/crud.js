import { Router } from "express";
import { pool } from "./db/pool.js";
import { requireAuth } from "./middleware/auth.js";
import { upload } from "./middleware/upload.js";
import { uploadBuffer, destroyImage } from "./utils/cloudinary.js";

const INT_COLUMNS = new Set(["sort_order"]);

const coerce = (col, val, jsonColumns, boolColumns) => {
  if (val === undefined) return undefined;
  if (boolColumns.has(col)) {
    if (typeof val === "boolean") return val;
    return val === "true" || val === "1" || val === "on" || val === true;
  }
  if (jsonColumns.has(col)) {
    if (Array.isArray(val)) return JSON.stringify(val);
    if (typeof val === "string") {
      try {
        return JSON.stringify(JSON.parse(val));
      } catch {
        return JSON.stringify(val.split(",").map((s) => s.trim()).filter(Boolean));
      }
    }
    return JSON.stringify(val ?? []);
  }
  if (INT_COLUMNS.has(col)) {
    const n = parseInt(val, 10);
    return Number.isNaN(n) ? 0 : n;
  }
  return val;
};

const asArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

export function buildResourceRouter(cfg) {
  const router = Router();
  const table = cfg.table || cfg.key;
  const orderBy = cfg.orderBy || "id ASC";
  const jsonColumns = new Set(cfg.jsonColumns || []);
  const boolColumns = new Set(cfg.boolColumns || []);
  const img = cfg.image;
  const sub = cfg.subImages;

  let maybeUpload = (req, res, next) => next();
  if (img || sub) {
    const fields = [];
    if (img) fields.push({ name: img.field, maxCount: 1 });
    if (sub) fields.push({ name: sub.field, maxCount: 12 });
    maybeUpload = upload.fields(fields);
  }

  const mainFileOf = (req) => (img && req.files?.[img.field]?.[0]) || null;
  const subFilesOf = (req) => (sub && req.files?.[sub.field]) || [];

  const collectData = (body) => {
    const data = {};
    for (const col of cfg.columns) {
      const v = coerce(col, body[col], jsonColumns, boolColumns);
      if (v !== undefined) data[col] = v;
    }
    return data;
  };

  const resolveSubImages = async (data, req, existing) => {
    if (!sub) return;
    const kept =
      data[sub.column] !== undefined ? asArray(data[sub.column]) : asArray(existing?.[sub.column]);

    if (existing) {
      const keptIds = new Set(kept.map((i) => i.public_id).filter(Boolean));
      for (const old of asArray(existing[sub.column])) {
        if (old.public_id && !keptIds.has(old.public_id)) await destroyImage(old.public_id);
      }
    }

    const uploaded = [];
    for (const file of subFilesOf(req)) {
      const up = await uploadBuffer(file.buffer);
      uploaded.push({ url: up.url, public_id: up.public_id });
    }

    data[sub.column] = JSON.stringify([...kept, ...uploaded]);
  };

  // GET all (public)
  router.get("/", async (req, res, next) => {
    try {
      const rawLimit = parseInt(req.query.limit, 10);
      if (!Number.isInteger(rawLimit) || rawLimit <= 0) {
        const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
        return res.json(rows);
      }

      const limit = Math.min(rawLimit, 100); // clamp to protect the DB
      const total = (await pool.query(`SELECT COUNT(*)::int AS total FROM ${table}`)).rows[0].total;
      const pages = Math.max(1, Math.ceil(total / limit));
      const page = Math.min(Math.max(1, parseInt(req.query.page, 10) || 1), pages);
      const offset = (page - 1) * limit;

      const { rows } = await pool.query(
        `SELECT * FROM ${table} ORDER BY ${orderBy} LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      res.json({ data: rows, total, page, limit, pages });
    } catch (err) {
      next(err);
    }
  });

  // GET one (public)
  router.get("/:id", async (req, res, next) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (!rows[0]) return res.status(404).json({ error: "Not found." });
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  });

  // CREATE (auth)
  router.post("/", requireAuth, maybeUpload, async (req, res, next) => {
    try {
      const data = collectData(req.body);
      const mainFile = mainFileOf(req);
      if (img && mainFile) {
        const up = await uploadBuffer(mainFile.buffer);
        data[img.urlColumn] = up.url;
        data[img.idColumn] = up.public_id;
      }
      await resolveSubImages(data, req, null);

      const cols = Object.keys(data);
      if (cols.length === 0) return res.status(400).json({ error: "No data provided." });
      const params = cols.map((_, i) => `$${i + 1}`);
      const { rows } = await pool.query(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${params.join(", ")}) RETURNING *`,
        cols.map((c) => data[c])
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      next(err);
    }
  });

  // UPDATE (auth)
  router.put("/:id", requireAuth, maybeUpload, async (req, res, next) => {
    try {
      const existing = (await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])).rows[0];
      if (!existing) return res.status(404).json({ error: "Not found." });

      const data = collectData(req.body);
      const mainFile = mainFileOf(req);

      if (img) {
        if (mainFile) {
          await destroyImage(existing[img.idColumn]);
          const up = await uploadBuffer(mainFile.buffer);
          data[img.urlColumn] = up.url;
          data[img.idColumn] = up.public_id;
        } else if (
          data[img.urlColumn] !== undefined &&
          data[img.urlColumn] !== existing[img.urlColumn]
        ) {
          await destroyImage(existing[img.idColumn]);
          data[img.idColumn] = "";
        }
      }

      await resolveSubImages(data, req, existing);

      const cols = Object.keys(data);
      if (cols.length === 0) return res.json(existing);
      const setClause = cols.map((c, i) => `${c} = $${i + 1}`);
      setClause.push("updated_at = now()");
      const { rows } = await pool.query(
        `UPDATE ${table} SET ${setClause.join(", ")} WHERE id = $${cols.length + 1} RETURNING *`,
        [...cols.map((c) => data[c]), req.params.id]
      );
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  });

  // DELETE (auth)
  router.delete("/:id", requireAuth, async (req, res, next) => {
    try {
      const existing = (await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])).rows[0];
      if (!existing) return res.status(404).json({ error: "Not found." });
      if (img) await destroyImage(existing[img.idColumn]);
      if (sub) {
        for (const i of asArray(existing[sub.column])) {
          if (i.public_id) await destroyImage(i.public_id);
        }
      }
      await pool.query(`DELETE FROM ${table} WHERE id = $1`, [req.params.id]);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
