# Next News

A news site built to practise advanced Next.js App Router routing. It demonstrates route groups, parallel routes, intercepting routes, dynamic segments, middleware, API route handlers, and route-level error/not-found states.

All news data (list, detail, image routes, archive filters and the latest-news panel) is read server-side from a `news` schema in a hosted Supabase Postgres database.

> **Follow-along project.** This app was built while following **Next.js 14 & React — The Complete Guide (Academind / Maximilian Schwarzüller)**. It is included in the portfolio as a learning exercise, not as a production product. The implementation is my own work based on the course material.

## Live demo

| | |
| --- | --- |
| **Live site** | https://news-nextjs-five.vercel.app |
| **Repository** | https://github.com/MarioGranada/news-nextjs |
| **Portfolio summary** | News site showcasing advanced Next.js App Router routing — route groups, parallel and intercepting routes, year/month archive filters — with articles served from Supabase Postgres. |

## Features

- Marketing and content areas separated by route groups.
- News, archive and latest-news data served from Supabase Postgres by Server Components.
- Dynamic news detail route with a shared layout.
- Intercepting route that opens the news image in a modal.
- Parallel routes for the archive filter and latest-news panel.
- Optional catch-all archive route filtered by year and month.
- Middleware scoped to `/news`.
- API route handler example.
- Custom not-found and error pages.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | JavaScript |
| Styling | Global CSS |
| Data | Supabase Postgres via `postgres` (postgres.js) |
| Hosting | Vercel (with a daily keep-alive Cron) |

## Project structure

```text
news-nextjs/
├── app/
│   ├── (marketing)/            # Home page
│   ├── (content)/
│   │   ├── news/               # List, detail, image modal, layout
│   │   └── archive/            # Parallel @archive and @latest routes
│   ├── api/route.jsx           # Route handler example
│   ├── api/keep-alive/         # Daily Cron target (keeps Supabase awake)
│   └── globals.css
├── db/migration.sql            # Idempotent schema + seed
├── scripts/db-migrate.mjs      # Applies db/migration.sql
├── src/
│   ├── components/             # Header, NewsList, ModalBackdrop
│   └── lib/
│       ├── db.js               # Shared postgres.js client
│       └── news.js             # News queries
├── middleware.js
├── next.config.mjs
└── vercel.json                 # Cron schedule
```

## Getting started

### Requirements

- Node.js 22+.
- npm (a `package-lock.json` is committed).
- A Postgres database. The deployed app uses the shared portfolio Supabase project, connected to the Vercel project through the Supabase integration.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
vercel link          # once, links the folder to the Vercel project
vercel env pull .env.local
```

| Variable | Description | Required |
| --- | --- | --- |
| `POSTGRES_URL` | Pooled Postgres connection string (set by the Supabase integration). | Yes |
| `POSTGRES_URL_NON_POOLING` | Direct connection used by `npm run db:migrate`; falls back to `POSTGRES_URL`. | No |

Any Postgres works locally, e.g. `POSTGRES_URL=postgres://postgres:postgres@localhost:5432/postgres`. See `.env.example`.

### 3. Create the schema and seed data

```bash
npm run db:migrate
```

Safe to re-run: tables use `if not exists` and seed rows `on conflict do nothing`.

### 4. Run locally

```bash
npm run dev
```

Open http://localhost:3000.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js on port 3000. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run Next.js linting. |
| `npm run db:migrate` | Apply `db/migration.sql` (schema + seed). |

## How it works

Route groups `(marketing)` and `(content)` separate the home page from the news/archive area without adding URL segments.

`app/(content)/archive/` uses parallel routes: `@archive` renders the filter and results, `@latest` renders a latest-news slot. The optional catch-all segment `[[...filter]]` supports year and year/month filtering.

`app/(content)/news/[slug]/@modal/(.)image/` is an intercepting route: navigating to the image URL from within the app opens it as a modal, while a direct visit renders the full image page.

`middleware.js` matches only `/news`, and `app/api/route.jsx` demonstrates a route handler with GET and POST exports.

`src/lib/news.js` holds every query (all news, one item, latest three, available years/months, news for a year or month) against the `news.news` table, using the shared client in `src/lib/db.js`. Pages are async Server Components, so the connection string never reaches the browser. The image modal is a Server Component with a small client `ModalBackdrop` for closing it.

## Deployment

- **Live:** https://news-nextjs-five.vercel.app (Vercel production, deployed from `master`).
- Target: Vercel, with data in the shared portfolio Supabase project (schema `news`). The Supabase ↔ Vercel integration injects `POSTGRES_URL` into every environment.
- Run `npm run db:migrate` once against the Supabase database before the first deployment.
- `vercel.json` schedules a daily Cron to `/api/keep-alive`, which runs `select 1` so the free Supabase project is not paused for inactivity. It covers every portfolio app that shares the database.

## Notes and limitations

- News is read-only; there is no admin UI for adding articles (edit the table in Supabase).
- The `news` schema is not exposed through the Supabase Data API; RLS is enabled with no policies, and the app connects server-side only.
- Pages that read the database are prerendered at build time, so `POSTGRES_URL` must be available during `next build`.
- Middleware currently only calls `NextResponse.next()`; it exists to demonstrate scoping.

---

**Author:** Mario Granada
