/*
 * Server-side helpers. No Svelte runtime here, so these are safe to call from
 * `hooks.server.ts`, a middleware, or any non-Svelte renderer.
 */
import { isThemeId } from './themes/registry.js';
import {
	THEME_ATTRIBUTE,
	SCHEME_ATTRIBUTE,
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY
} from './theme/constants.js';
import type { ThemeId } from './types.js';

export { THEME_ATTRIBUTE, SCHEME_ATTRIBUTE, THEME_STORAGE_KEY, SCHEME_STORAGE_KEY };

/**
 * Render the theme attributes for the server's HTML, so the first paint is
 * already themed. Unknown values fall back rather than throwing - this runs on
 * user-supplied cookies.
 *
 * ```ts
 * // hooks.server.ts
 * const attrs = themeAttributes(cookies.get('rb-theme'), cookies.get('rb-scheme'));
 * return resolve(event, { transformPageChunk: ({ html }) => html.replace('%rb.theme%', attrs) });
 * ```
 */
export function themeAttributes(
	theme?: string | null,
	scheme?: string | null,
	fallbackTheme: ThemeId = 'default'
): string {
	const id = isThemeId(theme) ? theme : fallbackTheme;
	let attrs = `${THEME_ATTRIBUTE}="${id}"`;

	// Anything but an explicit light/dark is left off, so the CSS falls back to
	// `prefers-color-scheme` instead of guessing wrong on the server.
	if (scheme === 'light' || scheme === 'dark') {
		attrs += ` ${SCHEME_ATTRIBUTE}="${scheme}"`;
	}

	return attrs;
}

/**
 * An inline script for `<head>` that reconciles `localStorage` before first
 * paint, for apps that are not server rendered or that serve a cached shell.
 * Drop the result into a `<script>` tag in `app.html`.
 */
export function noFlashScript(fallbackTheme: ThemeId = 'default'): string {
	return `(function(){try{var e=document.documentElement,t=localStorage.getItem(${JSON.stringify(
		THEME_STORAGE_KEY
	)})||${JSON.stringify(fallbackTheme)},s=localStorage.getItem(${JSON.stringify(
		SCHEME_STORAGE_KEY
	)});e.setAttribute(${JSON.stringify(
		THEME_ATTRIBUTE
	)},t);if(s==="light"||s==="dark"){e.setAttribute(${JSON.stringify(
		SCHEME_ATTRIBUTE
	)},s)}else{e.removeAttribute(${JSON.stringify(SCHEME_ATTRIBUTE)})}}catch(_){}})()`;
}

// Re-exported so a server hook can validate a cookie against the real registry
// without importing the component entry point.
export { THEMES, themeList, isThemeId, getTheme } from './themes/registry.js';
export { THEME_IDS } from './types.js';
export type { ThemeId, ThemeMeta, ColorScheme, SchemePreference } from './types.js';
