<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		ref?: HTMLDivElement | null;
	}

	let { children, ref = $bindable(null), ...rest }: Props = $props();
</script>

<div bind:this={ref} data-rb-statusbar {...rest}>{@render children()}</div>
