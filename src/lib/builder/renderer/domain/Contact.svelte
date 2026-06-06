<script lang="ts">
	import { cn } from "$lib/utils";

	interface LinkItem {
		label?: string;
		href?: string;
		icon?: string;
	}
	interface Props {
		anchorId?: string;
		heading?: string;
		email?: string;
		address?: string;
		links?: LinkItem[];
		class?: string;
	}

	let {
		anchorId = "",
		heading = "",
		email = "",
		address = "",
		links = [],
		class: className = "",
	}: Props = $props();
	let items = $derived(Array.isArray(links) ? links : []);
</script>

<section id={anchorId} class={cn("px-4 py-16", className)}>
	<div class="mx-auto max-w-3xl text-center">
		{#if heading}
			<h2 class="text-foreground mb-6 text-3xl font-bold">{heading}</h2>
		{/if}
		{#if email}
			<p class="mb-2">
				<a href={`mailto:${email}`} class="text-primary text-lg hover:underline">{email}</a>
			</p>
		{/if}
		{#if address}
			<p class="text-muted-foreground mb-6 whitespace-pre-line">{address}</p>
		{/if}
		{#if items.length}
			<div class="flex flex-wrap items-center justify-center gap-3">
				{#each items as link}
					<a
						href={link.href}
						target="_blank"
						rel="noreferrer"
						class="text-primary hover:bg-primary/10 border-border rounded-full border px-4 py-1.5 text-sm transition-colors"
					>
						{link.label ?? link.href}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
