import { THEME_IDS, type ThemeId, type ThemeMeta } from '../types.js';

/**
 * Every theme retro-bits ships. `satisfies Record<ThemeId, ThemeMeta>` makes
 * adding an id to `THEME_IDS` without describing it here a type error.
 */
export const THEMES = {
	mono: {
		id: 'mono',
		label: 'Mono',
		inspiration: 'The Monospace Web',
		reference: 'Oskar Wickström\'s "The Monospace Web": monospace type on a character grid',
		schemes: ['light', 'dark']
	}
} satisfies Record<ThemeId, ThemeMeta>;

/** All themes in declaration order - what a theme picker should render. */
export const themeList: readonly ThemeMeta[] = THEME_IDS.map((id) => THEMES[id]);

export function isThemeId(value: unknown): value is ThemeId {
	return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value);
}
