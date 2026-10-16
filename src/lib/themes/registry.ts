import { THEME_IDS, type ThemeId, type ThemeMeta } from '../types.js';

/**
 * Every theme retro-bits ships. `satisfies Record<ThemeId, ThemeMeta>` makes
 * adding an id to `THEME_IDS` without describing it here a type error.
 */
export const THEMES = {
	default: {
		id: 'default',
		label: 'Default',
		inspiration: 'Neutral modern UI',
		reference: 'Baseline for testing components, in the spirit of the Bits UI docs',
		schemes: ['light', 'dark']
	}
} satisfies Record<ThemeId, ThemeMeta>;

/** All themes in declaration order - what a theme picker should render. */
export const themeList: readonly ThemeMeta[] = THEME_IDS.map((id) => THEMES[id]);

export function isThemeId(value: unknown): value is ThemeId {
	return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value);
}
