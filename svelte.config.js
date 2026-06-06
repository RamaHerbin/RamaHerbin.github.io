import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		// Fully static output in `build/` — published to GitHub Pages.
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
	},
};
