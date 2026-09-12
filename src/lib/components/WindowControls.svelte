<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * A button is rendered only when its handler is supplied, so a window with
		 * nothing but a close box is the default rather than a special case.
		 */
		onminimize?: () => void;
		onmaximize?: () => void;
		onclose?: () => void;
		labels?: { minimize?: string; maximize?: string; close?: string };
		ref?: HTMLDivElement | null;
	}

	let {
		onminimize,
		onmaximize,
		onclose,
		labels = {},
		ref = $bindable(null),
		...rest
	}: Props = $props();

	// Glyphs are plain text so they inherit the theme's font; a theme that wants
	// its own can replace them from CSS with `content` on the button.
	const buttons = $derived(
		[
			{ name: 'minimize', run: onminimize, glyph: '–', label: labels.minimize ?? 'Minimize' },
			{ name: 'maximize', run: onmaximize, glyph: '□', label: labels.maximize ?? 'Maximize' },
			{ name: 'close', run: onclose, glyph: '×', label: labels.close ?? 'Close' }
		].filter((b) => b.run)
	);
</script>

<div bind:this={ref} data-rb-window-controls {...rest}>
	{#each buttons as button (button.name)}
		<button
			type="button"
			data-rb-window-control={button.name}
			aria-label={button.label}
			onclick={button.run}
		>
			<span aria-hidden="true">{button.glyph}</span>
		</button>
	{/each}
</div>
