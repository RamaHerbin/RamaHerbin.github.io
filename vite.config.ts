import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		// Mirror studio: fancy-ui-svelte resolves its browser entry under SSR/prerender.
		conditions: ["browser"],
	},
});
