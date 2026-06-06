import { error } from "@sveltejs/kit";
import { listPageSlugs, loadPage, loadSite } from "$lib/content.server.js";
import type { EntryGenerator, PageServerLoad } from "./$types.js";

/**
 * Enumerate every page to prerender. The home page is also served at `/`; we
 * still emit `/<home-slug>` so links by slug resolve and so this route always
 * has at least one entry (an empty entries() makes adapter-static error that
 * the prerenderable route was never crawled).
 */
export const entries: EntryGenerator = async () => {
	const slugs = await listPageSlugs();
	return slugs.map((slug) => ({ slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const page = await loadPage(params.slug);
	if (!page || page.meta?.status !== "published") {
		throw error(404, `Page "${params.slug}" not found.`);
	}
	const site = await loadSite();
	return { page, site };
};
