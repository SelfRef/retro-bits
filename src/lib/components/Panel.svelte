<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Which bevel the panel wears. `sunken` is the classic content well. */
		variant?: 'raised' | 'sunken' | 'flat';
		/** Turn off the default inner padding. */
		bare?: boolean;
		children: Snippet;
		ref?: HTMLDivElement | null;
	}

	let {
		variant = 'raised',
		bare = false,
		children,
		ref = $bindable(null),
		...rest
	}: Props = $props();
</script>

<div bind:this={ref} data-rb-panel={variant} data-bare={bare ? '' : undefined} {...rest}>
	{@render children()}
</div>
