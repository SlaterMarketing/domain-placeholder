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

This app is a **static export** (`next build` → folder `out/`). It is **not** the OpenNext / `wrangler deploy` Workers flow.

1. Push this repo to GitHub (or GitLab).
2. In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Under **Build** / **Build configuration**:
   - **Framework preset:** **None** (do **not** choose “Next.js” — that adds `npx wrangler deploy` and OpenNext, which expects a standalone server build and will fail with errors like `pages-manifest.json` missing).
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Deploy command:** leave **empty** (remove `npx wrangler deploy` if Cloudflare added it). Pages only needs the build; it uploads `out/` automatically.
4. Save and deploy. Every push rebuilds and updates **all** custom domains on that project.

### If a deploy already ran Wrangler / OpenNext on your machine

Delete any generated files you do not want in git (for example `wrangler.jsonc`, `open-next.config.ts`, `.dev.vars`, `public/_headers` from the migrate step), restore `next.config.ts` to use `output: "export"`, and commit — then fix the Cloudflare **Framework preset** and **Deploy command** as above.

## Add many domains

1. Open your Pages project → **Custom domains** → **Set up a custom domain**.
2. If the domain already uses Cloudflare DNS, pick it from the list (often one click).
3. If not, add the site to Cloudflare first (nameservers), then attach it. SSL is issued automatically.

## Optional: preview locally as static files

After `npm run build`, you can serve `out` with any static file server to mimic production.
