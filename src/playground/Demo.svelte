<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		/** What this demo is here to prove, in a sentence. */
		note?: string;
		children: Snippet;
	}

	let { title, note, children }: Props = $props();
</script>

<section class="demo" data-rb-box>
	<h3>{title}</h3>
	{#if note}<p class="note">{note}</p>{/if}
	<div class="stage">{@render children()}</div>
</section>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--rb-space-3);
	}

	h3 {
		margin: 0;
		font-size: var(--rb-font-size);
		font-weight: var(--rb-font-weight-bold);
		text-transform: var(--rb-text-transform);
	}

	.note {
		margin: 0;
		color: var(--rb-text-muted);
		font-size: var(--rb-font-size-sm);
	}

	.stage {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--rb-gap);
	}
</style>
