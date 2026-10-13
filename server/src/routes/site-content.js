import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT key, value FROM site_content");
    const map = {};
    for (const row of rows) map[row.key] = row.value;
    res.json(map);
  } catch (err) {
    next(err);
  }
});

router.put("/", requireAuth, async (req, res, next) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const entries = Object.entries(body).filter(([k]) => typeof k === "string" && k.length);
  if (entries.length === 0) return res.status(400).json({ error: "No content provided." });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const [key, value] of entries) {
      await client.query(
        `INSERT INTO site_content (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, value == null ? "" : String(value)]
      );
    }
    await client.query("COMMIT");
    const { rows } = await client.query("SELECT key, value FROM site_content");
    const map = {};
    for (const row of rows) map[row.key] = row.value;
    res.json(map);
  } catch (err) {
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
});

export default router;
