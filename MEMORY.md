# Next News — Working Memory

_Last updated: 2026-11-12_

## Current status

- Route groups, parallel routes, intercepting image route, middleware, API handler, and error pages are implemented.
- All news data comes from Supabase Postgres (`news` schema) via `src/lib/news.js`.
- Linked to Vercel project `news-nextjs` (GitHub connected). Live at https://news-nextjs-five.vercel.app since 2026-11-12.
- No tests yet.

## Key decisions

- 2026-11-12: removed the Express + SQLite backend and `dummy-news.js`; one Postgres source for every view.
- Shared portfolio Supabase project, one schema per app; this app owns `news`.
- postgres.js with `prepare: false` (Supabase transaction pooler).
- `/api/keep-alive` + daily Vercel Cron keep the free Supabase project awake for all portfolio apps.

## Known limitations and follow-ups

- No admin UI for news; edit rows in Supabase.
- `getAvailableNewsMonths` previously compared 0-based months; fixed by the SQL rewrite.

## Mistakes to avoid

- Building without `POSTGRES_URL` fails: database-backed pages prerender at build time.
- A hard refresh on the image URL shows the full page, not the modal (needs `@modal/default.jsx`).
- Do not remove `default.jsx` from a parallel slot.

## Next steps


---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
