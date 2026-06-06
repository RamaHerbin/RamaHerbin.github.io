<script lang="ts">
	import { cn } from "$lib/utils";
	import MathsBackground from "../primitives/MathsBackground.svelte";

	interface LinkItem {
		label?: string;
		href?: string;
		icon?: string;
	}
	interface Props {
		anchorId?: string;
		name?: string;
		tagline?: string;
		avatar?: string;
		showMathsBackground?: boolean;
		links?: LinkItem[];
		class?: string;
	}

	let {
		anchorId = "",
		name = "",
		tagline = "",
		avatar = "",
		showMathsBackground = false,
		links = [],
		class: className = "",
	}: Props = $props();

	let items = $derived(Array.isArray(links) ? links : []);
	let initials = $derived(
		name
			.split(/\s+/)
			.filter(Boolean)
			.map((w) => w[0])
			.slice(0, 2)
			.join("")
			.toUpperCase()
	);
</script>

<section id={anchorId} class={cn("relative overflow-hidden px-4 py-20 text-center", className)}>
	{#if showMathsBackground}
		<MathsBackground />
	{/if}
	<div class="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4">
		{#if avatar}
			<img src={avatar} alt={name} class="size-28 rounded-full object-cover shadow-lg" />
		{:else if initials}
			<div
				class="bg-primary/10 text-primary flex size-28 items-center justify-center rounded-full text-3xl font-bold"
			>
				{initials}
			</div>
		{/if}
		{#if name}
			<h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">{name}</h1>
		{/if}
		{#if tagline}
			<p class="text-muted-foreground text-xl">{tagline}</p>
		{/if}
		{#if items.length}
			<div class="mt-2 flex flex-wrap items-center justify-center gap-3">
				{#each items as link}
					<a
						href={link.href}
						target="_blank"
						rel="noreferrer"
						class="text-primary hover:bg-primary/10 border-border inline-flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm transition-colors"
					>
						{link.label ?? link.href}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
