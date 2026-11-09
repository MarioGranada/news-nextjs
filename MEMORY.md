# Next News — Working Memory

_Last updated: 2026-11-02_

## Current status

- Route groups, parallel routes, intercepting image route, middleware, API handler, and error pages are implemented.
- The Express + SQLite backend serves the news list on port 8080.
- No tests or deployment workflow yet.

## Key decisions

- Kept a separate Express backend to practise client/server separation, as in the course.
- Used local fixtures for archive filtering to focus the exercise on routing.

## Known limitations and follow-ups

- News list and archive widgets use different data sources.
- API URL is hardcoded.
- No production persistence story yet.

## Mistakes to avoid

- Starting only Next.js leaves `/news` throwing on the failed fetch.
- A hard refresh on the image URL shows the full page, not the modal.
- Do not remove `default.jsx` from a parallel slot.

## Next steps

- Unify the data source behind one API.
- Move the API URL to an environment variable.
- Migrate persistence to Supabase for a Vercel deployment.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
