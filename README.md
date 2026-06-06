# @fancy/site-template

The static shell that turns your edited page JSON into a website on **your own
GitHub Pages**. Fancy Studio materializes this template into your repo, writes
your `content/pages/*.json` + `content/site.json`, and the bundled GitHub Actions
workflow rebuilds and publishes on every push.

## How it works

- SvelteKit + `@sveltejs/adapter-static` → fully prerendered `build/` directory.
- `src/routes/+page.server.ts` renders the home page; `src/routes/[slug]` renders
  every other page. Both read `content/` from disk at build time
  (`src/lib/content.server.ts`).
- `src/lib/builder/{renderer,registry,types}` plus `src/lib/utils.ts` and
  `src/lib/components/ui/{card,badge}` are a **vendored copy** of the Fancy Studio
  renderer (see "Renderer is vendored" below).
- `static/.nojekyll` is mandatory — without it GitHub Pages 404s the `_app/`
  hashed assets.

## Local build

```bash
npm install
npm run build      # writes ./build
npm run preview    # serve ./build locally
```

`build/` contains `index.html` (home), one `<slug>.html` per page, `_app/`, and
`.nojekyll`.

## Renderer is vendored (drift warning)

This repo must `npm install && npm run build` with **no** access to the
fancy-studio monorepo, so it cannot depend on an `@fancy/*` workspace package.
The renderer is therefore **copied in** by `scripts/sync-renderer.mjs`, which runs
on `prepare`/`prebuild` inside the monorepo and is a no-op (skips) in the
published standalone repo where the files are already committed.

If the studio renderer changes, re-run `npm run sync-renderer` from inside the
monorepo and re-publish this template. The vendored copy can otherwise drift
silently from studio.

## Editing content

Don't hand-edit `content/` — Fancy Studio writes it. Each page is a
`PageDocument` (`{ version, meta, body }`); `site.json` is the `SiteConfig`
(title, page order, navigation, footer).
