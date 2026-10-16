/**
 * The themes retro-bits knows about. The order is the order they are offered in.
 * Adding an entry here is step one of adding a theme; `themes/registry.ts` and a
 * matching `css/themes/<id>.css` are checked against this list.
 */
export const THEME_IDS = ['mono'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

/**
 * Used whenever no theme is chosen. Its stylesheet also styles a `<html>` that
 * has no `data-rb-theme`, so plain CSS works without the attribute;
 * `tests/tokens.test.ts` checks the two agree.
 */
export const DEFAULT_THEME: ThemeId = 'mono';

export type ColorScheme = 'light' | 'dark';

/** What a consumer may ask for; `auto` follows `prefers-color-scheme`. */
export type SchemePreference = ColorScheme | 'auto';

/**
 * A colour variant of a theme. Each belongs to one scheme, so an app picks its
 * light and dark palettes independently.
 */
export interface PaletteMeta {
	/** Unique within its theme; by convention `<name>-<scheme>`. */
	id: string;
	label: string;
	scheme: ColorScheme;
}

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
	/** The first palette of each scheme is the default, and needs no CSS of its own. */
	palettes: readonly PaletteMeta[];
}
