<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		createTheme,
		SCHEME_ATTRIBUTE,
		THEME_ATTRIBUTE,
		type ThemeStateOptions
	} from './theme.svelte.js';
	import type { ThemeId, SchemePreference } from '../types.js';

	interface Props extends ThemeStateOptions {
		/**
		 * Where the attributes are written.
		 *
		 * `global` (the default) puts them on `<html>`. That matters: Bits UI
		 * portals dialogs, popovers and menus to `document.body`, so anything
		 * short of the document element leaves portalled content unthemed.
		 *
		 * `scoped` writes them to this component's own wrapper instead, which is
		 * what you want for a theme preview or a nested theme - but then portalled
		 * content needs `<Dialog.Portal to={element}>` pointing back inside.
		 */
		target?: 'global' | 'scoped';
		theme?: ThemeId;
		scheme?: SchemePreference;
		children: Snippet;
		/** The wrapper element, in `scoped` mode - useful as a portal target. */
		ref?: HTMLDivElement | null;
	}

	let {
		target = 'global',
		theme,
		scheme,
		persist,
		cookieMaxAge,
		children,
		ref = $bindable(null)
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	// These are initial values by design: changing them later should not rebuild
	// the state and throw away the user's current choice.
	const state = createTheme({ theme, scheme, persist, cookieMaxAge });

	$effect(() => state.watchSystemScheme());

	// In global mode the attributes belong on an element Svelte does not own, so
	// they are written imperatively. In scoped mode they are just attributes on
	// our own element, which keeps them correct during SSR too.
	$effect(() => {
		if (target !== 'global') return;

		const element = document.documentElement;
		element.setAttribute(THEME_ATTRIBUTE, state.current);
		element.setAttribute(SCHEME_ATTRIBUTE, state.resolvedScheme);
	});

	const scopedAttributes = $derived({
		[THEME_ATTRIBUTE]: state.current,
		[SCHEME_ATTRIBUTE]: state.resolvedScheme
	});
</script>

{#if target === 'global'}
	{@render children()}
{:else}
	<div bind:this={ref} {...scopedAttributes}>{@render children()}</div>
{/if}
