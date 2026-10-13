import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "./pool.js";
import * as data from "./data.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const client = await pool.connect();
  try {
    // Ensure schema exists.
    const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await client.query(sql);

    await client.query("BEGIN");

    const email = (process.env.ADMIN_EMAIL || "admin@britannia.local").toLowerCase().trim();
    const username = (process.env.ADMIN_USERNAME || "").toLowerCase().trim() || null;
    const password = process.env.ADMIN_PASSWORD || "changeme123";
    const hash = await bcrypt.hash(password, 10);
    await client.query(
      `INSERT INTO admins (email, password_hash, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, username = EXCLUDED.username`,
      [email, hash, username]
    );

    await client.query(`
      TRUNCATE categories, products, hero_slides, news_items, jobs, initiatives,
        leadership, milestones, stats, sustainability_pillars, reports, financials
        RESTART IDENTITY CASCADE
    `);

    await insertRows(client, "categories", data.categories.map((name, i) => ({ name, sort_order: i })));

    const productRows = [];
    Object.entries(data.products).forEach(([category, items]) => {
      items.forEach((p, i) =>
        productRows.push({
          slug: p.slug,
          name: p.name,
          category,
          tagline: p.tagline,
          taglines: JSON.stringify(p.taglines || (p.tagline ? [p.tagline] : [])),
          description: p.description,
          quantity: p.quantity || "",
          weight: p.weight || "",
          color: p.color,
          badges: JSON.stringify(p.badges),
          image_url: p.image_url,
          sub_images: JSON.stringify(
            (p.sub_images || []).map((u) =>
              typeof u === "string" ? { url: u, public_id: "" } : u
            )
          ),
          sort_order: i,
        })
      );
    });
    await insertRows(client, "products", productRows);

    await insertRows(client, "hero_slides", withOrder(data.heroSlides));
    await insertRows(client, "news_items", withOrder(data.newsItems));
    await insertRows(client, "jobs", withOrder(data.jobs));
    await insertRows(client, "initiatives", withOrder(data.initiatives));
    await insertRows(client, "leadership", withOrder(data.leadership));
    await insertRows(client, "milestones", withOrder(data.milestones));
    await insertRows(client, "stats", withOrder(data.stats));
    await insertRows(client, "sustainability_pillars", withOrder(data.sustainabilityPillars));
    await insertRows(client, "reports", withOrder(data.reports));
    await insertRows(client, "financials", withOrder(data.financials));

    for (const [key, value] of Object.entries(data.siteContent)) {
      await client.query(
        `INSERT INTO site_content (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO NOTHING`,
        [key, value]
      );
    }

    await client.query("COMMIT");
    console.log("✔ Database seeded.");
    console.log(`  Admin login: ${email} / ${password}`);
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

const withOrder = (arr) => arr.map((row, i) => ({ ...row, sort_order: i }));

async function insertRows(client, table, rows) {
  for (const row of rows) {
    const cols = Object.keys(row);
    const params = cols.map((_, i) => `$${i + 1}`);
    await client.query(
      `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${params.join(", ")})`,
      cols.map((c) => row[c])
    );
  }
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
