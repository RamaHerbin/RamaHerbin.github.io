<script lang="ts">
	import { cn } from "$lib/utils";

	interface Book {
		title?: string;
		publisher?: string;
		year?: string;
		coverImage?: string;
		url?: string;
		isbn?: string;
	}
	interface Props {
		anchorId?: string;
		heading?: string;
		books?: Book[];
		class?: string;
	}

	let { anchorId = "", heading = "", books = [], class: className = "" }: Props = $props();
	let items = $derived(Array.isArray(books) ? books : []);
</script>

<section id={anchorId} class={cn("px-4 py-16", className)}>
	<div class="mx-auto max-w-6xl">
		{#if heading}
			<h2 class="text-foreground mb-8 text-3xl font-bold">{heading}</h2>
		{/if}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each items as b}
				<div class="border-border bg-card flex gap-4 rounded-lg border p-5">
					{#if b.coverImage}
						<img src={b.coverImage} alt={b.title} class="h-28 w-20 shrink-0 rounded object-cover" />
					{/if}
					<div class="flex flex-col gap-1">
						{#if b.title}
							<h3 class="text-foreground leading-tight font-semibold">{b.title}</h3>
						{/if}
						{#if b.publisher || b.year}
							<p class="text-muted-foreground text-sm">
								{[b.publisher, b.year].filter(Boolean).join(" · ")}
							</p>
						{/if}
						{#if b.isbn}
							<p class="text-muted-foreground text-xs">ISBN {b.isbn}</p>
						{/if}
						{#if b.url}
							<a
								href={b.url}
								target="_blank"
								rel="noreferrer"
								class="text-primary mt-auto text-sm hover:underline">View →</a
							>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
