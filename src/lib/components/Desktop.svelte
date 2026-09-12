<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Draws the theme's CRT overlay (`--rb-scanlines`) over the content. Themes
		 * that are not CRTs set that token to `none`, so this is safe to leave on.
		 */
		scanlines?: boolean;
		children: Snippet;
		ref?: HTMLDivElement | null;
	}

	let { scanlines = true, children, ref = $bindable(null), ...rest }: Props = $props();
</script>

<div bind:this={ref} data-rb-desktop data-scanlines={scanlines ? '' : undefined} {...rest}>
	{@render children()}
</div>
