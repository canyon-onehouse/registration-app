# Huntsville Hope Classic — Guest Registration

One-page registration portal for NFL alumni and association members joining the
inaugural **Huntsville Hope Classic** (Monday, June 29, 2026 · Canebrake Club,
Athens, AL) as free "fifth shot" celebrity guests. Benefits
[The One House Project](https://onehouseproject.com).

Built with Next.js (App Router) + TypeScript. Form submissions go to
[Formspree](https://formspree.io); no database or server of our own.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values (see below)
npm run dev                        # http://localhost:3000
```

`npm run build && npm start` runs the production build locally.

## One-time setup

### 1. Formspree (where registrations go)

The production form is already created — `https://formspree.io/f/mykadjwp` —
and its ID is baked into the code as the default, so no configuration is
needed for the form to work. `NEXT_PUBLIC_FORMSPREE_ID` exists as an optional
override (e.g. to point a test deployment at a separate form so trial
submissions don't mix with real registrations).

In the Formspree dashboard you can add notification recipients (e.g.
`bo@onehouseproject.com`), see all submissions, and export CSV.

Spam protection: the form already includes Formspree's `_gotcha` honeypot field
(invisible to humans; submissions that fill it are silently discarded), plus
Formspree's built-in server-side filtering. Each registration arrives with the
subject line "New guest registration — Huntsville Hope Classic".

> **Note:** `NEXT_PUBLIC_*` variables are baked in at **build time**. If you
> change the Formspree ID later, you must redeploy.

### 2. Deploy on Vercel

1. [vercel.com/new](https://vercel.com/new) → import this GitHub repository.
   Vercel auto-detects Next.js; no settings need changing.
2. **Before the first deploy**, under *Environment Variables* add:
   - `NEXT_PUBLIC_SITE_URL` — the final public URL, e.g.
     `https://classic.onehouseproject.com` (used for link-preview metadata;
     you can start with the `*.vercel.app` URL and update it once the custom
     domain is live, then redeploy)
   - `NEXT_PUBLIC_FORMSPREE_ID` — optional; only to override the baked-in
     production form (see step 1)
3. Deploy. Every push to the production branch redeploys automatically.

### 3. Custom domain (subdomain of onehouseproject.com)

1. In the Vercel project: **Settings → Domains → Add**, enter e.g.
   `classic.onehouseproject.com`.
2. In your DNS provider for `onehouseproject.com`, add a **CNAME** record:
   - Name/host: `classic`
   - Value/target: `cname.vercel-dns.com`
3. Wait for Vercel to show the domain as verified (usually minutes).
4. Update `NEXT_PUBLIC_SITE_URL` to the new URL and redeploy.

### 4. Analytics

The `<Analytics />` component is already mounted. Enable **Web Analytics** in
the Vercel dashboard (project → Analytics tab → Enable) to start collecting
page views. Cookie-free, no consent banner needed.

## Project notes

- The design comes from a Claude Design handoff ("Concept B — A Letter from
  Bo", Huntsville Hope Classic design system) and is intentionally ported
  pixel-for-pixel. The design CSS lives in `app/globals.css` (tokens/base),
  `app/portal.css` (form components), and `app/page.css` (page styles) — the
  import order in `app/layout.tsx` matters (mobile overrides win by source
  order).
- The page is deliberately **not indexed** by search engines
  (`robots: noindex`) — it's an invite page shared by link — but ships full
  Open Graph metadata so texted/emailed links show a rich preview card.
- The registration form stays open past the June 26 deadline on purpose; the
  deadline is a soft ask and late registrations are handled personally.
- Photos are pre-resized copies of the handoff originals (`assets/`) and are
  served responsively via `next/image`. Logos are small SVGs served as-is from
  `public/assets/`.
