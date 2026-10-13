import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const useSsl = String(process.env.PGSSL).toLowerCase() === "true";

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.PGHOST || "localhost",
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "postgres",
      database: process.env.PGDATABASE || "britannia",
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    };

export const pool = new pg.Pool(config);

export const query = (text, params) => pool.query(text, params);
