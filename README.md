# Domain placeholder (Cloudflare Pages)

One static Next.js page that shows **which hostname** someone landed on, a short **bio**, your **projects**, and a **mailto** CTA. Deploy once to **Cloudflare Pages** and attach **every domain** you own to the same project — each `git push` updates all of them.

## Local dev

```bash
npm install
npm run dev
```

## Content

Edit **[`lib/config.ts`](lib/config.ts)** for your name, bio, email, and project cards.

## Build (static export)

```bash
npm run build
```

Output is **`out/`** — that’s what Cloudflare Pages should serve.

## Deploy on Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Set:
   - **Framework preset:** Next.js (or None — both work if commands are right).
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Deploy. Every later push rebuilds and rolls out to **all** custom domains on that project.

## Add many domains

1. Open your Pages project → **Custom domains** → **Set up a custom domain**.
2. If the domain already uses Cloudflare DNS, pick it from the list (often one click).
3. If not, add the site to Cloudflare first (nameservers), then attach it. SSL is issued automatically.

## Optional: preview locally as static files

After `npm run build`, you can serve `out` with any static file server to mimic production.
