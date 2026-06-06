<script lang="ts">
	import { cn } from "$lib/utils";

	interface Pub {
		title?: string;
		authors?: string;
		venue?: string;
		year?: string;
		doi?: string;
		url?: string;
	}
	interface Props {
		anchorId?: string;
		heading?: string;
		groupByYear?: boolean;
		publications?: Pub[];
		class?: string;
	}

	let {
		anchorId = "",
		heading = "",
		groupByYear = false,
		publications = [],
		class: className = "",
	}: Props = $props();

	let items = $derived(Array.isArray(publications) ? publications : []);

	let groups = $derived.by(() => {
		if (!groupByYear) return [{ year: "", pubs: items }];
		const map = new Map<string, Pub[]>();
		for (const p of items) {
			const y = p.year ?? "";
			if (!map.has(y)) map.set(y, []);
			map.get(y)!.push(p);
		}
		return [...map.entries()]
			.sort((a, b) => b[0].localeCompare(a[0]))
			.map(([year, pubs]) => ({ year, pubs }));
	});
</script>

<section id={anchorId} class={cn("px-4 py-16", className)}>
	<div class="mx-auto max-w-4xl">
		{#if heading}
			<h2 class="text-foreground mb-8 text-3xl font-bold">{heading}</h2>
		{/if}
		<div class="flex flex-col gap-8">
			{#each groups as g}
				<div class="flex flex-col gap-4">
					{#if g.year}
						<h3 class="text-muted-foreground border-border border-b pb-1 text-lg font-semibold">
							{g.year}
						</h3>
					{/if}
					<ul class="flex flex-col gap-4">
						{#each g.pubs as p}
							<li class="flex flex-col gap-0.5">
								{#if p.title}
									<span class="text-foreground font-medium">
										{#if p.url}
											<a href={p.url} target="_blank" rel="noreferrer" class="hover:underline"
												>{p.title}</a
											>
										{:else}
											{p.title}
										{/if}
									</span>
								{/if}
								{#if p.authors}
									<span class="text-muted-foreground text-sm">{p.authors}</span>
								{/if}
								{#if p.venue}
									<span class="text-foreground/70 text-sm italic">{p.venue}</span>
								{/if}
								{#if p.doi}
									<a
										href={`https://doi.org/${p.doi}`}
										target="_blank"
										rel="noreferrer"
										class="text-primary text-xs hover:underline">doi:{p.doi}</a
									>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>
