<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Let this segment absorb the leftover width. */
		grow?: boolean;
		children: Snippet;
		ref?: HTMLDivElement | null;
	}

	let { grow = false, children, ref = $bindable(null), ...rest }: Props = $props();
</script>

<div bind:this={ref} data-rb-statusbar-segment data-grow={grow ? '' : undefined} {...rest}>
	{@render children()}
</div>
