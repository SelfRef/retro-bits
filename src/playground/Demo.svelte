<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		/** What this demo is here to prove, in a sentence. */
		note?: string;
		/**
		 * Marks a component the Default theme does not style yet. These are in the
		 * gallery on purpose: they are the target list for stage 2.
		 */
		unstyled?: boolean;
		children: Snippet;
	}

	let { title, note, unstyled = false, children }: Props = $props();
</script>

<section class="demo" class:unstyled>
	<header>
		<h3>{title}</h3>
		{#if unstyled}<span class="badge" title="Not styled by the Default theme yet">stage 2</span
			>{/if}
	</header>
	{#if note}<p class="note">{note}</p>{/if}
	<div class="stage">{@render children()}</div>
</section>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--rb-space-3);
		padding: var(--rb-inset);
		border: var(--rb-border-width) solid var(--rb-border-color);
		border-radius: var(--rb-radius);
		background: var(--rb-surface);
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--rb-gap);
	}

	h3 {
		margin: 0;
		font-size: var(--rb-font-size);
		font-weight: var(--rb-font-weight-bold);
		text-transform: var(--rb-text-transform);
	}

	.badge {
		padding: 0 var(--rb-space-2);
		border: var(--rb-border-width) solid var(--rb-border-color);
		border-radius: 999px;
		color: var(--rb-text-muted);
		font-size: var(--rb-font-size-sm);
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

	.unstyled .stage {
		opacity: 0.75;
	}
</style>
