# Project Constitution — Next News

This document defines the non-negotiable foundations for this repository. Read it before adding or changing features.

## Guiding Principles

- **Simplicity first** — prefer the smallest solution that solves the problem. If a change needs a long explanation, it is probably over-engineered.
- **No hardcoded secrets or endpoints** — configuration belongs in environment variables; visual design tokens belong in styles, not in `.env` files.
- **Traceability** — every value, dependency, and route should make its origin and purpose obvious.
- **Debuggability** — fail loudly and visibly; avoid silent fallbacks that hide broken data.
- **Official patterns** — use the documented API of each framework and library before inventing a workaround.
- **Portfolio clarity** — this repository is part of a public portfolio. Code should read as clean, intentional, and easy for a reviewer to follow. As a follow-along project, its purpose is to demonstrate the concepts practised in the course, not to imitate production scale.

## Technology Stack Foundations

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) | The project is an exercise in advanced App Router routing. |
| Language | JavaScript | Course project uses JSX. |
| Styling | Global CSS | Simple shared styles for the news layout. |
| Data | Supabase Postgres via `postgres` (postgres.js) | One hosted source for every news view; the Express + SQLite API was removed (2026-11-12) because SQLite cannot persist on Vercel. postgres.js is a small, dependency-free driver that works with Supabase's pooler. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A routing/rendering exercise. The goal is to demonstrate App Router features clearly, not to build a production newsroom. Keep the backend small and the route structure explicit.

### 2. Environment Isolation

- This project has no runtime secrets. Do not introduce `.env` files unless a real secret or environment-specific URL appears.
- If configuration is added, use environment variables and document them in the README.
- Never commit keys, tokens, database URLs, or credentials.

### 3. Architecture

- Keep route-specific UI inside its route segment and shared UI in `src/components/`.
- Use route groups for layout separation, not for URL changes.
- Parallel and intercepting routes are intentional; document them when adding new slots.

### 4. Data and State

- Supabase Postgres (`news` schema) is the single source for the list, detail, archive and latest-news views. All queries live in `src/lib/news.js`.
- No client cache or global store is used.
- When unifying data, pick one source and remove the duplicate fixtures.

### 5. Styling and UX

- Global CSS in `app/globals.css`; keep route layouts visually consistent.
- The intercepted image modal and the full image page should share image styling.
- Avoid adding a UI library for this routing exercise.

### 6. Quality Gates

- `npm run build` and `npm run lint` are the gates.
- Manually test direct visits and client-side navigation to the image route, archive year/month filters, invalid filters, and the not-found page.
- Confirm the app fails clearly when the API is down.

### 7. Deployment

- Deploy the Next.js app to Vercel.
- Data lives in the shared portfolio Supabase project; `POSTGRES_URL` comes from the Supabase ↔ Vercel integration.
- Keep the daily keep-alive Cron (`vercel.json`) so the free project is not paused.

## What to Avoid

- Deploying SQLite to an ephemeral filesystem.
- Adding a parallel route without a default slot.
- Assuming the intercepting modal is used on a hard refresh.
- Leaving two different data sources for the same feature.

## Checklist Before Adding Anything New

- Does this solve a real problem for this project, or am I adding scope for its own sake?
- Is every new value configuration-driven rather than hardcoded?
- Does the change follow the existing folder and naming patterns?
- Is there a clear failure path when data, the network, or the environment is unavailable?
- Have I run the available lint/build/test command and fixed what it reports?
- Did I update `README.md` and `MEMORY.md` if behaviour or setup changed?

## Philosophy Statement

This repository exists to show thoughtful front-end engineering: clear structure, readable code, and deliberate trade-offs. The goal is not to use every tool available, but to make every file explain itself. Simplicity is the feature.
