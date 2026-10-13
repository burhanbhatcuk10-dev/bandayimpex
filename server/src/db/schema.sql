-- BIPL backend schema

CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT DEFAULT 'Administrator',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE admins ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

CREATE TABLE IF NOT EXISTS categories (
  id         SERIAL PRIMARY KEY,
  name       TEXT UNIQUE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id               SERIAL PRIMARY KEY,
  slug             TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  category         TEXT NOT NULL,
  tagline          TEXT DEFAULT '',
  description      TEXT DEFAULT '',
  color            TEXT DEFAULT '#F7EDD0',
  badges           JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url        TEXT DEFAULT '',
  image_public_id  TEXT DEFAULT '',
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id               SERIAL PRIMARY KEY,
  title            TEXT NOT NULL,
  subtitle         TEXT DEFAULT '',
  tagline          TEXT DEFAULT '',
  cta              TEXT DEFAULT '',
  link             TEXT DEFAULT '/',
  image_url        TEXT DEFAULT '',
  image_public_id  TEXT DEFAULT '',
  overlay_enabled  BOOLEAN NOT NULL DEFAULT false,
  overlay_color    TEXT DEFAULT '#e51e25',
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS overlay_enabled BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS overlay_color   TEXT DEFAULT '#e51e25';

CREATE TABLE IF NOT EXISTS news_items (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  category   TEXT DEFAULT '',
  date       TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  location   TEXT DEFAULT '',
  type       TEXT DEFAULT 'Full-time',
  dept       TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS initiatives (
  id               SERIAL PRIMARY KEY,
  title            TEXT NOT NULL,
  description      TEXT DEFAULT '',
  bg               TEXT DEFAULT '#E51E25',
  image_url        TEXT DEFAULT '',
  image_public_id  TEXT DEFAULT '',
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leadership (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  role             TEXT DEFAULT '',
  initials         TEXT DEFAULT '',
  image_url        TEXT DEFAULT '',
  image_public_id  TEXT DEFAULT '',
  sort_order       INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS milestones (
  id         SERIAL PRIMARY KEY,
  year       TEXT NOT NULL,
  event      TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  id         SERIAL PRIMARY KEY,
  value      TEXT NOT NULL,
  label      TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sustainability_pillars (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon       TEXT DEFAULT 'Sprout',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT DEFAULT '',
  message    TEXT DEFAULT '',
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id           SERIAL PRIMARY KEY,
  job_title    TEXT DEFAULT '',
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT DEFAULT '',
  experience   TEXT DEFAULT '',
  cover_letter TEXT DEFAULT '',
  resume_url        TEXT DEFAULT '',
  resume_public_id  TEXT DEFAULT '',
  is_read      BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


ALTER TABLE products ADD COLUMN IF NOT EXISTS taglines   JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_images JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity   TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight     TEXT DEFAULT '';

ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS resume_url       TEXT DEFAULT '';
ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS resume_public_id TEXT DEFAULT '';

ALTER TABLE leadership ADD COLUMN IF NOT EXISTS bio            TEXT DEFAULT '';
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS instagram      TEXT DEFAULT '';
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS twitter        TEXT DEFAULT '';
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS linkedin       TEXT DEFAULT '';
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS portfolio      TEXT DEFAULT '';
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS show_instagram BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS show_twitter   BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS show_linkedin  BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE leadership ADD COLUMN IF NOT EXISTS show_portfolio BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  date       TEXT DEFAULT '',
  size       TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS financials (
  id         SERIAL PRIMARY KEY,
  metric     TEXT NOT NULL,
  value      TEXT DEFAULT '',
  change     TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_enquiries (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT DEFAULT '',
  company    TEXT DEFAULT '',
  message    TEXT DEFAULT '',
  items      JSONB NOT NULL DEFAULT '[]'::jsonb,
  item_count INTEGER NOT NULL DEFAULT 0,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
