<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid">{@render children()}</div>

<style>
	.grid {
		display: grid;
		gap: var(--rb-space-5);
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		align-items: start;
	}
</style>
