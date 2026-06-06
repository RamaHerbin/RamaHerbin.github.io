/**
 * Build-time content loader (server-only).
 *
 * Reads the editable content the user's studio writes into this repo:
 *   content/pages/<slug>.json   — one PageDocument per page
 *   content/site.json           — SiteConfig (nav, footer, page order)
 *
 * Everything is read from disk with node fs at prerender time; there is no
 * runtime server (the site is fully static), so these helpers only ever run
 * during `vite build`.
 */

import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { PageDocument } from "./builder/types/page.js";
import type { SiteConfig } from "./builder/types/site.js";

// These only run during `vite build` (prerender), which always runs from the
// project root, so the content dir is resolvable from cwd. We deliberately do
// NOT use import.meta.url: SvelteKit bundles this module into .svelte-kit/output,
// so a path relative to the source file would point at the wrong place.
const contentDir = resolve(process.cwd(), "content");
const pagesDir = join(contentDir, "pages");

/**
 * List slugs of PUBLISHED pages under content/pages. Drafts are excluded so that
 * simply saving an unfinished page from the studio does not publish it to the
 * live GitHub Pages site.
 */
export async function listPageSlugs(): Promise<string[]> {
	let entries: string[];
	try {
		entries = await readdir(pagesDir);
	} catch {
		return [];
	}
	const slugs = entries.filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -".json".length));

	const published: string[] = [];
	for (const slug of slugs) {
		const doc = await loadPage(slug);
		if (doc?.meta?.status === "published") published.push(slug);
	}
	return published;
}

/** Load a single PageDocument by slug, or null if it doesn't exist. */
export async function loadPage(slug: string): Promise<PageDocument | null> {
	try {
		const raw = await readFile(join(pagesDir, `${slug}.json`), "utf8");
		return JSON.parse(raw) as PageDocument;
	} catch {
		return null;
	}
}

/** Load the SiteConfig, or null if content/site.json is missing. */
export async function loadSite(): Promise<SiteConfig | null> {
	try {
		const raw = await readFile(join(contentDir, "site.json"), "utf8");
		return JSON.parse(raw) as SiteConfig;
	} catch {
		return null;
	}
}

/**
 * Resolve the home page slug among PUBLISHED pages: the first ordered page that
 * is published, otherwise "home", otherwise the first published page on disk.
 */
export async function resolveHomeSlug(): Promise<string | null> {
	const published = await listPageSlugs();
	if (published.length === 0) return null;
	const publishedSet = new Set(published);
	const site = await loadSite();
	const ordered = site?.pageOrder?.find((slug) => publishedSet.has(slug));
	if (ordered) return ordered;
	if (publishedSet.has("home")) return "home";
	return published[0];
}
