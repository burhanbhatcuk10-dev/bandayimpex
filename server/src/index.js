import dotenv from "dotenv";
import { createApp } from "./app.js";
import { pool } from "./db/pool.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = createApp();

app.listen(PORT, async () => {
  console.log(`\n  BIPL API listening on http://localhost:${PORT}`);
  try {
    await pool.query("SELECT 1");
    console.log("  ✔ Connected to PostgreSQL\n");
  } catch (err) {
    console.warn("  ⚠ Could not reach PostgreSQL yet:", err.message);
    console.warn("    Check your .env and run `npm run setup`.\n");
  }
});
