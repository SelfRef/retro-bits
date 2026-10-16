/*
 * Server-side helpers. No Svelte runtime here, so these are safe to call from
 * `hooks.server.ts`, a middleware, or any non-Svelte renderer.
 */
import { palettesFor } from './themes/registry.js';
import {
	THEME_ATTRIBUTE,
	SCHEME_ATTRIBUTE,
	PALETTE_ATTRIBUTES,
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY,
	PALETTE_STORAGE_KEYS
} from './theme/constants.js';
import { readThemeSettings, type ThemeDefaults } from './theme/settings.js';
import { DEFAULT_THEME, THEME_IDS } from './types.js';

export {
	THEME_ATTRIBUTE,
	SCHEME_ATTRIBUTE,
	PALETTE_ATTRIBUTES,
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY,
	PALETTE_STORAGE_KEYS
};
export { readThemeSettings, type ThemeSettings, type ThemeDefaults } from './theme/settings.js';

/**
 * Render the theme attributes for the server's HTML, so the first paint is
 * already themed. Reads the stored choice through `read`, usually the cookies.
 *
 * ```ts
 * // hooks.server.ts
 * const attrs = themeAttributes((key) => event.cookies.get(key));
 * return resolve(event, { transformPageChunk: ({ html }) => html.replace('%rb.theme%', attrs) });
 * ```
 */
export function themeAttributes(
	read: (key: string) => string | null | undefined,
	defaults: ThemeDefaults = {}
): string {
	const { theme, scheme, palettes } = readThemeSettings(read, defaults);
	let attrs = `${THEME_ATTRIBUTE}="${theme}"`;

	// `auto` is left off, so the CSS falls back to `prefers-color-scheme`
	// instead of guessing wrong on the server.
	if (scheme !== 'auto') attrs += ` ${SCHEME_ATTRIBUTE}="${scheme}"`;
	if (palettes.light) attrs += ` ${PALETTE_ATTRIBUTES.light}="${palettes.light}"`;
	if (palettes.dark) attrs += ` ${PALETTE_ATTRIBUTES.dark}="${palettes.dark}"`;

	return attrs;
}

/**
 * An inline script for `<head>` that reconciles `localStorage` before first
 * paint, for apps that are not server rendered or that serve a cached shell.
 * Drop the result into a `<script>` tag in `app.html`.
 *
 * It only acts on a valid stored value, so it never overwrites what the server
 * stamped from the cookie. `defaults` apply only where nothing set a value.
 */
export function noFlashScript(defaults: ThemeDefaults = {}): string {
	const fallbackTheme = defaults.theme ?? DEFAULT_THEME;
	const fallbackScheme =
		defaults.scheme === 'light' || defaults.scheme === 'dark' ? defaults.scheme : '';
	const q = JSON.stringify;
	// theme -> scheme -> palette ids, to validate stored palettes in the browser
	const palettes = Object.fromEntries(
		THEME_IDS.map((id) => [
			id,
			{
				light: palettesFor(id, 'light').map((p) => p.id),
				dark: palettesFor(id, 'dark').map((p) => p.id)
			}
		])
	);
	return `(function(){try{var e=document.documentElement,m=${q(palettes)},g=function(k){return localStorage.getItem(k)},t=g(${q(THEME_STORAGE_KEY)}),s=g(${q(SCHEME_STORAGE_KEY)}),a=${q(PALETTE_ATTRIBUTES)},k=${q(PALETTE_STORAGE_KEYS)};var h=function(x){return Object.prototype.hasOwnProperty.call(m,x)};if(h(t))e.setAttribute(${q(THEME_ATTRIBUTE)},t);else if(!e.hasAttribute(${q(THEME_ATTRIBUTE)}))e.setAttribute(${q(THEME_ATTRIBUTE)},${q(fallbackTheme)});t=e.getAttribute(${q(THEME_ATTRIBUTE)});if(s==="light"||s==="dark")e.setAttribute(${q(SCHEME_ATTRIBUTE)},s);else if(s==="auto")e.removeAttribute(${q(SCHEME_ATTRIBUTE)});else if(${q(fallbackScheme)}&&!e.hasAttribute(${q(SCHEME_ATTRIBUTE)}))e.setAttribute(${q(SCHEME_ATTRIBUTE)},${q(fallbackScheme)});["light","dark"].forEach(function(c){var p=g(k[c]);if(h(t)&&m[t][c].indexOf(p)>-1)e.setAttribute(a[c],p)})}catch(_){}})()`;
}

// Re-exported so a server hook can validate a cookie against the real registry
// without importing the Svelte entry point.
export { THEMES, themeList, isThemeId, palettesFor, resolvePalette } from './themes/registry.js';
export { THEME_IDS, DEFAULT_THEME };
export type { ThemeId, ThemeMeta, PaletteMeta, ColorScheme, SchemePreference } from './types.js';
