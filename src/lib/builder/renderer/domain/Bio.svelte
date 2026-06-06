<script lang="ts">
	import { cn } from "$lib/utils";
	import { marked } from "marked";

	interface Props {
		anchorId?: string;
		heading?: string;
		body?: string;
		image?: string;
		imagePosition?: "left" | "right";
		class?: string;
	}

	let {
		anchorId = "",
		heading = "",
		body = "",
		image = "",
		imagePosition = "left",
		class: className = "",
	}: Props = $props();

	let html = $derived(marked.parse(body ?? "", { async: false, gfm: true }) as string);
</script>

<section id={anchorId} class={cn("px-4 py-16", className)}>
	<div class="mx-auto max-w-5xl">
		{#if heading}
			<h2 class="text-foreground mb-8 text-3xl font-bold">{heading}</h2>
		{/if}
		<div
			class={cn(
				"flex flex-col gap-8 md:flex-row",
				imagePosition === "right" && "md:flex-row-reverse"
			)}
		>
			{#if image}
				<img src={image} alt={heading} class="h-48 w-48 shrink-0 rounded-lg object-cover" />
			{/if}
			<div class="prose dark:prose-invert max-w-none">
				{@html html}
			</div>
		</div>
	</div>
</section>
