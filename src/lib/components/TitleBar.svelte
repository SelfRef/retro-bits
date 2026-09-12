<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Text shown in the bar. Ignored if the `title` snippet is given. */
		label?: string;
		/** Inactive bars are dimmed, the way a background window's would be. */
		active?: boolean;
		/** Replaces the label entirely - an icon plus text, say. */
		heading?: Snippet;
		/** Trailing content, normally a `<WindowControls />`. */
		children?: Snippet;
		ref?: HTMLDivElement | null;
	}

	let {
		label = '',
		active = true,
		heading,
		children,
		ref = $bindable(null),
		...rest
	}: Props = $props();
</script>

<div bind:this={ref} data-rb-titlebar data-state={active ? 'active' : 'inactive'} {...rest}>
	<div data-rb-titlebar-title>
		{#if heading}{@render heading()}{:else}{label}{/if}
	</div>
	{#if children}
		<div data-rb-titlebar-actions>{@render children()}</div>
	{/if}
</div>
