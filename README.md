# Britannia — Full Stack

A three-part system:

| Folder           | What it is                              | Dev URL                 |
| ---------------- | --------------------------------------- | ----------------------- |
| `britannia-app/` | Public marketing site (React + Vite)    | http://localhost:5173   |
| `admin/`         | Admin dashboard (React + Vite)          | http://localhost:5174   |
| `server/`        | REST API (Express + PostgreSQL + Cloudinary) | http://localhost:4000 |

The admin edits content in Postgres; the public site reads it live from the API and
**falls back to bundled mock data** if the API is unreachable, so it never breaks.

---

## 1. Prerequisites

- **Node.js 18+**
- **PostgreSQL** running locally (or a cloud connection string)
- A **Cloudinary** account (free tier is fine) for image uploads

## 2. Backend setup (`server/`)

```bash
cd server
npm install
cp .env.example .env      # then edit .env (see below)
```

Edit `server/.env`:

- **Database** — set `DATABASE_URL` (or the `PG*` vars) to your Postgres.
  First create the database once:
  ```sql
  CREATE DATABASE britannia;
  ```
- **Auth** — set `JWT_SECRET` to a long random string, and choose
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` (this becomes your admin login).
- **Cloudinary** — set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
  `CLOUDINARY_API_SECRET` from your Cloudinary dashboard.

Create the tables and seed the initial content + admin user:

```bash
npm run setup          # = migrate + seed
npm run dev            # starts the API on http://localhost:4000
```

`npm run setup` prints the admin login it created. Re-running `seed` re-imports the
demo content (it wipes and reseeds content tables but never deletes the admin or
submissions).

## 3. Admin dashboard (`admin/`)

```bash
cd admin
npm install
npm run dev            # http://localhost:5174
```

`admin/.env` points at the API (`VITE_API_URL`). Log in with the admin credentials
from your `server/.env`. From here you can manage every resource — Products,
Categories, Hero Slides, News, Jobs, Initiatives, Leadership, Milestones, Stats,
Sustainability — with drag-free image uploads to Cloudinary, and read/triage
Contact messages, Job applications and Newsletter signups.

## 4. Public site (`britannia-app/`)

```bash
cd britannia-app
npm install
npm run dev            # http://localhost:5173
```

`britannia-app/.env` sets `VITE_API_URL`. With the API running and seeded, the site
serves live content and its Contact / Careers / Newsletter forms post real
submissions into the database.

---

## API overview

- `POST /api/auth/login` → `{ token, admin }`
- `GET  /api/auth/me` (Bearer token)
- `POST /api/auth/change-password`
- For each resource `categories, products, hero-slides, news, jobs, initiatives,
  leadership, milestones, stats, sustainability`:
  - `GET /api/<resource>` and `GET /api/<resource>/:id` — public
  - `POST /api/<resource>`, `PUT /api/<resource>/:id`, `DELETE /api/<resource>/:id` — admin (Bearer token)
  - Image-bearing resources accept `multipart/form-data` with an `image` file
    (uploaded to Cloudinary) or a plain `image_url` string.
- Submissions:
  - `POST /api/submissions/{contact|applications|newsletter}` — public
  - `GET /api/submissions/{type}` — admin
  - `PATCH /api/submissions/{type}/:id/read`, `DELETE /api/submissions/{type}/:id` — admin
- `GET /api/health` — status + registered resources + Cloudinary status

## Notes

- CORS origins are controlled by `CLIENT_ORIGINS` in `server/.env`.
- Images are stored in Cloudinary under the `CLOUDINARY_FOLDER` prefix; deleting or
  replacing an item cleans up its old Cloudinary asset.
- Until Cloudinary is configured, file uploads return an error — but you can still
  paste image URLs in the admin (the “Use a URL” option on every image field).
