<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import TitleBar from './TitleBar.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Title bar text. Omit both this and `titlebar` for a bare frame. */
		label?: string;
		/** Dims the chrome, as a background window would be. */
		active?: boolean;
		/** Replaces the built-in title bar. */
		titlebar?: Snippet;
		/** Trailing title bar content, normally `<WindowControls />`. */
		controls?: Snippet;
		children: Snippet;
		ref?: HTMLDivElement | null;
	}

	let {
		label,
		active = true,
		titlebar,
		controls,
		children,
		ref = $bindable(null),
		...rest
	}: Props = $props();
</script>

<div bind:this={ref} data-rb-window data-state={active ? 'active' : 'inactive'} {...rest}>
	{#if titlebar}
		{@render titlebar()}
	{:else if label !== undefined}
		<TitleBar {label} {active}>
			{#if controls}{@render controls()}{/if}
		</TitleBar>
	{/if}
	<div data-rb-window-body>{@render children()}</div>
</div>
