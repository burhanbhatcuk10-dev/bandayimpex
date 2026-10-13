"# Britannia Clone — API Contracts

## Endpoints (all prefixed with `/api`)

### 1. Contact Form
- **POST /api/contact** — body: `{ name, email, subject, message }` → returns `{ id, created_at }`
- Stores in `contact_messages` collection.

### 2. Newsletter Subscribe
- **POST /api/newsletter** — body: `{ email }` → returns `{ id, email, created_at }`
- Stores in `newsletter_subscriptions` collection. Enforces unique email (idempotent).

### 3. Careers
- **GET /api/jobs** — returns list of jobs. Seeded on startup from mock jobs.
- **POST /api/careers/apply** — body: `{ job_id, name, email, phone, experience, cover_letter }` → returns `{ id, created_at }`
- Stores in `job_applications` collection.

### 4. News / Media
- **GET /api/news** — returns list of news items (seeded on startup).

## Data Currently Mocked in `mock.js` (Frontend-only)
- Brand categories & products (static — like real Britannia site)
- Milestones, leadership, stats, initiatives, sustainability pillars, hero slides
- These will REMAIN in mock.js (static content)

## Data Moving to Backend
- `newsItems` → served via `GET /api/news`
- `jobs` → served via `GET /api/jobs`

## Frontend Integration Plan
- Create `/src/lib/api.js` with axios instance using `REACT_APP_BACKEND_URL`
- `Contact.jsx` — POST to `/api/contact`
- `Careers.jsx` — GET jobs on mount + POST application on submit
- `Media.jsx` — GET news on mount
- `Footer.jsx` — POST newsletter subscribe
- Keep toast feedback; on error show error toast

## Models
```
ContactMessage: id (uuid), name, email, subject, message, created_at
NewsletterSub:  id (uuid), email (unique), created_at
Job:            id (uuid), title, location, type, dept, description, created_at
JobApplication: id (uuid), job_id, job_title, name, email, phone, experience, cover_letter, created_at
NewsItem:       id (uuid), date, title, category, summary, created_at
```
"