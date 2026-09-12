/**
 * The themes retro-bits knows about. The order is the order they are offered in.
 * Adding an entry here is step one of adding a theme; `themes/registry.ts` and a
 * matching `css/themes/<id>.css` are checked against this list.
 */
export const THEME_IDS = [
	'default',
	'chicago',
	'platinum',
	'bigblue',
	'phosphor',
	'kickstart',
	'haiku',
	'cube',
	'monolith'
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export type ColorScheme = 'light' | 'dark';

/** What a consumer may ask for; `auto` follows `prefers-color-scheme`. */
export type SchemePreference = ColorScheme | 'auto';

/** How far along a theme's visual implementation is. */
export type ThemeStatus = 'ready' | 'planned';

export interface ThemeMeta {
	id: ThemeId;
	/** Human readable name, e.g. "Chicago". */
	label: string;
	/** The system or style the theme evokes. */
	inspiration: string;
	/** Where the code name comes from. */
	reference: string;
	/**
	 * Colour schemes the theme actually implements. `ThemeState` clamps to this,
	 * so asking for `dark` on a light-only theme resolves to `light`.
	 */
	schemes: readonly ColorScheme[];
	status: ThemeStatus;
}
