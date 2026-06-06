import { error } from "@sveltejs/kit";
import { loadPage, loadSite, resolveHomeSlug } from "$lib/content.server.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async () => {
	const slug = await resolveHomeSlug();
	if (!slug) {
		throw error(404, "No pages found in content/pages. Publish a page from the studio first.");
	}
	const page = await loadPage(slug);
	if (!page) {
		throw error(404, `Home page "${slug}" not found.`);
	}
	const site = await loadSite();
	return { page, site };
};
