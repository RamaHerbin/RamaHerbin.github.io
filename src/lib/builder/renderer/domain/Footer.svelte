<script lang="ts">
	import { cn } from "$lib/utils";

	interface LinkItem {
		label?: string;
		href?: string;
	}
	interface Props {
		text?: string;
		links?: LinkItem[];
		class?: string;
	}

	let { text = "", links = [], class: className = "" }: Props = $props();
	let items = $derived(Array.isArray(links) ? links : []);
</script>

<footer
	class={cn(
		"border-border text-muted-foreground border-t px-4 py-8 text-center text-sm",
		className
	)}
>
	<div class="mx-auto flex max-w-5xl flex-col items-center gap-3">
		{#if items.length}
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each items as link}
					<a
						href={link.href}
						target="_blank"
						rel="noreferrer"
						class="hover:text-foreground transition-colors">{link.label ?? link.href}</a
					>
				{/each}
			</div>
		{/if}
		{#if text}
			<p>{text}</p>
		{/if}
	</div>
</footer>
