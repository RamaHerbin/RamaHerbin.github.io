<script lang="ts">
	import { PageRenderer } from "$lib/builder/renderer/index.js";
	import SiteProvider from "$lib/builder/renderer/SiteProvider.svelte";
	import type { PageData } from "./$types.js";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.page.meta.title}</title>
	{#if data.page.meta.description}
		<meta name="description" content={data.page.meta.description} />
	{/if}
</svelte:head>

<SiteProvider config={data.site}>
	<PageRenderer page={data.page} />
</SiteProvider>
