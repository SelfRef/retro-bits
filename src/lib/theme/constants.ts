/*
 * Plain constants, deliberately free of any Svelte import so `retro-bits/ssr`
 * can be pulled into a server hook without dragging in a component runtime.
 */

/** The attribute themes are selected with. Also the CSS selector hook. */
export const THEME_ATTRIBUTE = 'data-rb-theme';
export const SCHEME_ATTRIBUTE = 'data-rb-scheme';

/** One attribute per scheme, so light and dark palettes are chosen independently. */
export const PALETTE_ATTRIBUTES = {
	light: 'data-rb-palette-light',
	dark: 'data-rb-palette-dark'
} as const;

/** Keys used for `localStorage` and for the SSR cookie. */
export const THEME_STORAGE_KEY = 'rb-theme';
export const SCHEME_STORAGE_KEY = 'rb-scheme';
export const PALETTE_STORAGE_KEYS = {
	light: 'rb-palette-light',
	dark: 'rb-palette-dark'
} as const;
