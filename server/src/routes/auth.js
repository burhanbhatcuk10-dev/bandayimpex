import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const identifier = String(email ?? username ?? "").toLowerCase().trim();
    if (!identifier || !password) {
      return res.status(400).json({ error: "Email/username and password are required." });
    }
    const { rows } = await pool.query(
      "SELECT * FROM admins WHERE lower(email) = $1 OR lower(username) = $1",
      [identifier]
    );
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    res.json({
      token,
      admin: { id: admin.id, email: admin.email, username: admin.username, name: admin.name },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, email, username, name, created_at FROM admins WHERE id = $1",
      [req.admin.id]
    );
    if (!rows[0]) return res.status(404).json({ error: "Not found." });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/change-password", requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters." });
    }
    const { rows } = await pool.query("SELECT * FROM admins WHERE id = $1", [req.admin.id]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(currentPassword || "", admin.password_hash))) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE admins SET password_hash = $1 WHERE id = $2", [hash, admin.id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
