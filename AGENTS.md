# AGENTS.md — Next News

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `cd backend && npm install && npm start` | Start the API on port 8080. |
| `npm install && npm run dev` | Start Next.js on port 3000. |
| `npm run build` | Verify the production build. |

## Requirements

- Node.js 18+.
- npm (a `package-lock.json` is committed).
- Two terminals: one for the API and one for Next.js.

## Environment

- No environment variables are used; the API URL is hardcoded.
- If the API is moved, introduce an environment variable rather than editing multiple files.

## Architecture

- `app/(marketing)/` — home page.
- `app/(content)/news/` — list, detail, image modal, layout.
- `app/(content)/archive/` — parallel `@archive` and `@latest` routes.
- `middleware.js` — `/news` matcher demo.
- `backend/app.js` — Express + SQLite API.
- `src/utils/newsUtils.js` — dummy-data archive helpers.

## Commands and build order

- Run both servers; the news page depends on port 8080.
- Use `npm run build` to validate route segment configuration.
- `npm run lint` is the only static check; there are no tests.

## Conventions and gotchas

- Parallel route slots must have a `default.jsx` for unmatched states.
- The intercepting route only works for client-side navigation; a hard refresh shows the full image page.
- Route groups do not affect the URL, but they do affect layouts.
- The API and the archive helpers use different data sources.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
