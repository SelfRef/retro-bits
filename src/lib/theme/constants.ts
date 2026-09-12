/*
 * Plain constants, deliberately free of any Svelte import so `retro-bits/ssr`
 * can be pulled into a server hook without dragging in a component runtime.
 */

/** The attribute themes are selected with. Also the CSS selector hook. */
export const THEME_ATTRIBUTE = 'data-rb-theme';
export const SCHEME_ATTRIBUTE = 'data-rb-scheme';

/** Keys used for `localStorage` and for the SSR cookie. */
export const THEME_STORAGE_KEY = 'rb-theme';
export const SCHEME_STORAGE_KEY = 'rb-scheme';
