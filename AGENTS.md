# AGENTS.md — Next News

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies. |
| `vercel env pull .env.local` | Fetch `POSTGRES_URL` from the linked Vercel project. |
| `npm run db:migrate` | Apply the idempotent schema + seed in `db/migration.sql`. |
| `npm run dev` | Start Next.js on port 3000. |
| `npm run build` | Verify the production build. |

## Requirements

- Node.js 22+.
- npm (a `package-lock.json` is committed).
- A Postgres database (production: the shared portfolio Supabase project).

## Environment

- `POSTGRES_URL` (required): pooled connection string injected by the Supabase ↔ Vercel integration.
- `POSTGRES_URL_NON_POOLING` (optional): used by `npm run db:migrate`.
- Documented in `.env.example`; never commit real values.

## Architecture

- `app/(marketing)/` — home page.
- `app/(content)/news/` — list, detail, image modal, layout.
- `app/(content)/archive/` — parallel `@archive` and `@latest` routes.
- `middleware.js` — `/news` matcher demo.
- `src/lib/db.js` — shared postgres.js client (`prepare: false` for the Supabase transaction pooler).
- `src/lib/news.js` — every news query (`news.news` table).
- `db/migration.sql` + `scripts/db-migrate.mjs` — schema and seed.
- `app/api/keep-alive/` + `vercel.json` — daily Cron that keeps the shared Supabase project awake.

## Commands and build order

- `POSTGRES_URL` must be set for `npm run build`: database-backed pages are prerendered.
- Use `npm run build` to validate route segment configuration.
- `npm run lint` is the only static check; there are no tests.

## Conventions and gotchas

- Parallel route slots must have a `default.jsx` for unmatched states.
- The intercepting route only works for client-side navigation; a hard refresh shows the full image page.
- Route groups do not affect the URL, but they do affect layouts.
- Never import `src/lib/db.js` into a client component; the modal uses the client `ModalBackdrop` for interactivity.
- The shared Supabase database hosts other apps' schemas too (`foodies`, `auth_demo`, `newsletter`); only touch `news`.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
