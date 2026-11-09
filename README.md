# Next News

A news site built to practise advanced Next.js App Router routing. It demonstrates route groups, parallel routes, intercepting routes, dynamic segments, middleware, API route handlers, and route-level error/not-found states.

News data comes from a small Express + SQLite backend on port 8080, while archive filtering and latest-news widgets use local dummy data.

> **Follow-along project.** This app was built while following **Next.js 14 & React — The Complete Guide (Academind / Maximilian Schwarzüller)**. It is included in the portfolio as a learning exercise, not as a production product. The implementation is my own work based on the course material.

## Features

- Marketing and content areas separated by route groups.
- News list fetched from the Express backend.
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
| Backend | Express + better-sqlite3 |
| Data | SQLite + local dummy data |

## Project structure

```text
news-nextjs/
├── app/
│   ├── (marketing)/            # Home page
│   ├── (content)/
│   │   ├── news/               # List, detail, image modal, layout
│   │   └── archive/            # Parallel @archive and @latest routes
│   ├── api/route.jsx           # Route handler example
│   └── globals.css
├── backend/
│   ├── app.js                  # Express API on port 8080
│   └── data.db                 # Created on first run
├── src/
│   ├── components/             # Header, NewsList
│   └── utils/newsUtils.js      # Dummy-data archive helpers
├── middleware.js
└── next.config.mjs
```

## Getting started

### Requirements

- Node.js 18+.
- npm (a `package-lock.json` is committed).
- Two terminals: one for the API and one for Next.js.

### 1. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend (from the project root)
cd .. && npm install
```

### 2. Run locally

**Start the news API**

```bash
cd backend && npm start
```

Open http://localhost:8080.

Creates `data.db` and seeds the five sample articles on first run.

**Start the Next.js app**

```bash
npm run dev
```

Open http://localhost:3000.

The `/news` page throws if the API is not running.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js on port 3000. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run Next.js linting. |
| `cd backend && npm start` | Start the Express API on port 8080. |

## How it works

Route groups `(marketing)` and `(content)` separate the home page from the news/archive area without adding URL segments.

`app/(content)/archive/` uses parallel routes: `@archive` renders the filter and results, `@latest` renders a latest-news slot. The optional catch-all segment `[[...filter]]` supports year and year/month filtering.

`app/(content)/news/[slug]/@modal/(.)image/` is an intercepting route: navigating to the image URL from within the app opens it as a modal, while a direct visit renders the full image page.

`middleware.js` matches only `/news`, and `app/api/route.jsx` demonstrates a route handler with GET and POST exports.

The Express backend creates a SQLite `news` table and returns all rows from `/news`. Archive helpers in `src/utils/newsUtils.js` read the local `DUMMY_NEWS` fixture instead.

## Deployment

- Target: Vercel for the Next.js app. The Express + SQLite backend needs its own host, or should be folded into Next.js route handlers with Supabase/Postgres for persistence.
- For the portfolio’s complex apps, the preferred direction is Vercel + Supabase. Replace the local API URL with an environment variable and move the news data to Supabase.
- SQLite files do not persist on Vercel; do not deploy the current backend there.

## Notes and limitations

- The frontend fetches `http://localhost:8080/news` directly; the URL is hardcoded.
- The news list uses the API, but the archive and latest widgets use `dummy-news.js`. Unifying the data source is a known follow-up.
- `backend/data.db` is gitignored and created on first backend start.
- Middleware currently only calls `NextResponse.next()`; it exists to demonstrate scoping.

---

**Author:** Mario Granada
