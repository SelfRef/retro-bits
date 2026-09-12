import { THEME_IDS, type ThemeId, type ThemeMeta } from '../types.js';

/**
 * Every theme retro-bits ships. `satisfies Record<ThemeId, ThemeMeta>` makes
 * adding an id to `THEME_IDS` without describing it here a type error.
 *
 * Only `default` is `status: 'ready'`. The rest are declared so the registry,
 * loader and switcher can be built and tested against the real set of ids; their
 * stylesheets satisfy the token contract but do not yet carry any retro styling.
 */
export const THEMES = {
	default: {
		id: 'default',
		label: 'Default',
		inspiration: 'Neutral modern UI',
		reference: 'Baseline for testing custom components, in the spirit of the Bits UI docs',
		schemes: ['light', 'dark'],
		status: 'ready'
	},
	chicago: {
		id: 'chicago',
		label: 'Chicago',
		inspiration: 'Windows 9x (classic)',
		reference: 'Code name of Windows 95',
		schemes: ['light'],
		status: 'planned'
	},
	platinum: {
		id: 'platinum',
		label: 'Platinum',
		inspiration: 'Mac OS 9 (classic)',
		reference: 'The "Platinum appearance" of Mac OS 8/9',
		schemes: ['light'],
		status: 'planned'
	},
	bigblue: {
		id: 'bigblue',
		label: 'BigBlue',
		inspiration: 'IBM classic DOS text mode',
		reference: 'IBM\'s nickname, "Big Blue"',
		schemes: ['dark'],
		status: 'planned'
	},
	phosphor: {
		id: 'phosphor',
		label: 'Phosphor',
		inspiration: 'Monochrome retro terminal (green / cyan / amber)',
		reference: 'The phosphor coating of CRT monitors',
		schemes: ['dark'],
		status: 'planned'
	},
	kickstart: {
		id: 'kickstart',
		label: 'Kickstart',
		inspiration: 'AmigaOS',
		reference: "The Amiga's boot firmware / ROM",
		schemes: ['light'],
		status: 'planned'
	},
	haiku: {
		id: 'haiku',
		label: 'Haiku',
		inspiration: 'BeOS',
		reference: 'The haiku error messages in BeOS NetPositive',
		schemes: ['light'],
		status: 'planned'
	},
	cube: {
		id: 'cube',
		label: 'Cube',
		inspiration: 'NeXTSTEP / OpenStep',
		reference: 'The black cube - the NeXT Computer',
		schemes: ['light'],
		status: 'planned'
	},
	monolith: {
		id: 'monolith',
		label: 'Monolith',
		inspiration: 'Retro-futurism / cassette futurism',
		reference: 'The black monolith from "2001: A Space Odyssey"',
		schemes: ['dark'],
		status: 'planned'
	}
} satisfies Record<ThemeId, ThemeMeta>;

/** All themes in declaration order - what a theme picker should render. */
export const themeList: readonly ThemeMeta[] = THEME_IDS.map((id) => THEMES[id]);

export function isThemeId(value: unknown): value is ThemeId {
	return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value);
}

export function getTheme(id: ThemeId): ThemeMeta {
	return THEMES[id];
}
