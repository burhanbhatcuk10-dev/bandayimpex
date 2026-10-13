import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "./pool.js";

dotenv.config();

async function run() {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const username = (process.env.ADMIN_USERNAME || "").toLowerCase().trim() || null;
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query("SELECT id, email FROM admins ORDER BY id ASC");

  if (rows.length === 1) {
    await pool.query(
      "UPDATE admins SET email = $1, password_hash = $2, username = $3 WHERE id = $4",
      [email, hash, username, rows[0].id]
    );
    console.log(`✔ Admin updated: ${rows[0].email} -> ${email}${username ? ` (username: ${username})` : ""}`);
  } else {
    await pool.query(
      `INSERT INTO admins (email, password_hash, username) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, username = EXCLUDED.username`,
      [email, hash, username]
    );
    console.log(`✔ Admin set: ${email}${username ? ` (username: ${username})` : ""} (there were ${rows.length} admin rows)`);
  }

  await pool.end();
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
