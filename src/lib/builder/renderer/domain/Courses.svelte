<script lang="ts">
	import { cn } from "$lib/utils";

	interface Course {
		title?: string;
		level?: string;
		term?: string;
		year?: string;
		description?: string;
		url?: string;
	}
	interface Props {
		anchorId?: string;
		heading?: string;
		courses?: Course[];
		class?: string;
	}

	let { anchorId = "", heading = "", courses = [], class: className = "" }: Props = $props();
	let items = $derived(Array.isArray(courses) ? courses : []);
</script>

<section id={anchorId} class={cn("px-4 py-16", className)}>
	<div class="mx-auto max-w-6xl">
		{#if heading}
			<h2 class="text-foreground mb-8 text-3xl font-bold">{heading}</h2>
		{/if}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each items as c}
				<div class="border-border bg-card flex flex-col gap-2 rounded-lg border p-5">
					<div class="flex items-center gap-2">
						{#if c.level}
							<span class="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs font-medium"
								>{c.level}</span
							>
						{/if}
						{#if c.year}
							<span class="text-muted-foreground text-xs">{c.year}</span>
						{/if}
					</div>
					{#if c.title}
						<h3 class="text-foreground font-semibold">{c.title}</h3>
					{/if}
					{#if c.term}
						<p class="text-muted-foreground text-sm">{c.term}</p>
					{/if}
					{#if c.description}
						<p class="text-foreground/80 text-sm">{c.description}</p>
					{/if}
					{#if c.url}
						<a
							href={c.url}
							target="_blank"
							rel="noreferrer"
							class="text-primary mt-auto text-sm hover:underline">View →</a
						>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
