import { Router } from "express";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";
import { uploadDoc } from "../middleware/upload.js";
import { uploadBuffer } from "../utils/cloudinary.js";

const router = Router();


router.post("/contact", async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });
    const { rows } = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, subject || "", message || ""]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/applications", uploadDoc.single("resume"), async (req, res, next) => {
  try {
    const { job_title, name, email, phone, experience, cover_letter } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });

    let resumeUrl = "";
    let resumePublicId = "";
    if (req.file) {
      const up = await uploadBuffer(req.file.buffer, undefined, "raw");
      resumeUrl = up.url;
      resumePublicId = up.public_id;
    }

    const { rows } = await pool.query(
      `INSERT INTO job_applications
         (job_title, name, email, phone, experience, cover_letter, resume_url, resume_public_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [job_title || "", name, email, phone || "", experience || "", cover_letter || "", resumeUrl, resumePublicId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

const MAX_ITEMS = 100;

const cleanItems = (raw) =>
  (Array.isArray(raw) ? raw : [])
    .slice(0, MAX_ITEMS)
    .filter((i) => i && (i.name || i.slug))
    .map((i) => ({
      id: i.id ?? null,
      slug: String(i.slug ?? ""),
      name: String(i.name ?? ""),
      category: String(i.category ?? ""),
      weight: String(i.weight ?? ""),
      quantity: String(i.quantity ?? ""),
      qty: Math.min(99, Math.max(1, Math.round(Number(i.qty) || 1))),
    }));

router.post("/enquiries", async (req, res, next) => {
  try {
    const { name, email, phone, company, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required." });

    const items = cleanItems(req.body.items);
    if (items.length === 0) return res.status(400).json({ error: "Your enquiry has no products." });

    const { rows } = await pool.query(
      `INSERT INTO product_enquiries (name, email, phone, company, message, items, item_count)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7) RETURNING *`,
      [
        name,
        email,
        phone || "",
        company || "",
        message || "",
        JSON.stringify(items),
        items.reduce((n, i) => n + i.qty, 0),
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/newsletter", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });
    const { rows } = await pool.query(
      `INSERT INTO newsletter_subscribers (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email RETURNING *`,
      [String(email).toLowerCase().trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});


const TABLES = {
  contact: "contact_messages",
  applications: "job_applications",
  newsletter: "newsletter_subscribers",
  enquiries: "product_enquiries",
};

router.get("/:type", requireAuth, async (req, res, next) => {
  try {
    const table = TABLES[req.params.type];
    if (!table) return res.status(404).json({ error: "Unknown submission type." });
    const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.patch("/:type/:id/read", requireAuth, async (req, res, next) => {
  try {
    const table = TABLES[req.params.type];
    if (!table || table === "newsletter_subscribers") {
      return res.status(400).json({ error: "Cannot mark this type as read." });
    }
    const { rows } = await pool.query(
      `UPDATE ${table} SET is_read = true WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Not found." });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete("/:type/:id", requireAuth, async (req, res, next) => {
  try {
    const table = TABLES[req.params.type];
    if (!table) return res.status(404).json({ error: "Unknown submission type." });
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
