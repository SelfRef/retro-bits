import {
	THEME_IDS,
	type ColorScheme,
	type PaletteMeta,
	type ThemeId,
	type ThemeMeta
} from '../types.js';

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
		schemes: ['light', 'dark'],
		// After `mono-*`: Cameron Brooks' monospace-web-theme flavours (MIT).
		palettes: [
			{ id: 'mono-light', label: 'Mono', scheme: 'light' },
			{ id: 'mono-dark', label: 'Mono', scheme: 'dark' },
			{ id: 'rose-light', label: 'Rose', scheme: 'light' },
			{ id: 'rose-dark', label: 'Rose', scheme: 'dark' },
			{ id: 'ocean-light', label: 'Ocean', scheme: 'light' },
			{ id: 'ocean-dark', label: 'Ocean', scheme: 'dark' },
			{ id: 'forest-light', label: 'Forest', scheme: 'light' },
			{ id: 'forest-dark', label: 'Forest', scheme: 'dark' },
			{ id: 'desert-light', label: 'Desert', scheme: 'light' },
			{ id: 'desert-dark', label: 'Desert', scheme: 'dark' },
			{ id: 'sepia-light', label: 'Sepia', scheme: 'light' },
			{ id: 'sepia-dark', label: 'Sepia', scheme: 'dark' },
			{ id: 'twilight-light', label: 'Twilight', scheme: 'light' },
			{ id: 'twilight-dark', label: 'Twilight', scheme: 'dark' },
			{ id: 'glacier-light', label: 'Glacier', scheme: 'light' },
			{ id: 'glacier-dark', label: 'Glacier', scheme: 'dark' },
			{ id: 'clay-light', label: 'Clay', scheme: 'light' },
			{ id: 'clay-dark', label: 'Clay', scheme: 'dark' },
			{ id: 'midnight-dark', label: 'Midnight', scheme: 'dark' },
			{ id: 'sandstone-light', label: 'Sandstone', scheme: 'light' },
			{ id: 'sandstone-dark', label: 'Sandstone', scheme: 'dark' },
			{ id: 'coral-light', label: 'Coral', scheme: 'light' },
			{ id: 'coral-dark', label: 'Coral', scheme: 'dark' },
			{ id: 'mint-light', label: 'Mint', scheme: 'light' },
			{ id: 'mint-dark', label: 'Mint', scheme: 'dark' },
			{ id: 'mauve-light', label: 'Mauve', scheme: 'light' },
			{ id: 'mauve-dark', label: 'Mauve', scheme: 'dark' },
			{ id: 'slate-light', label: 'Slate', scheme: 'light' },
			{ id: 'slate-dark', label: 'Slate', scheme: 'dark' },
			{ id: 'honey-light', label: 'Honey', scheme: 'light' },
			{ id: 'honey-dark', label: 'Honey', scheme: 'dark' },
			{ id: 'rust-light', label: 'Rust', scheme: 'light' },
			{ id: 'rust-dark', label: 'Rust', scheme: 'dark' },
			{ id: 'dracula-light', label: 'Dracula', scheme: 'light' },
			{ id: 'dracula-dark', label: 'Dracula', scheme: 'dark' },
			{ id: 'solarized-light', label: 'Solarized', scheme: 'light' },
			{ id: 'solarized-dark', label: 'Solarized', scheme: 'dark' },
			{ id: 'monokai-light', label: 'Monokai', scheme: 'light' },
			{ id: 'monokai-dark', label: 'Monokai', scheme: 'dark' },
			{ id: 'gruvbox-light', label: 'Gruvbox', scheme: 'light' },
			{ id: 'gruvbox-dark', label: 'Gruvbox', scheme: 'dark' },
			{ id: 'nord-light', label: 'Nord', scheme: 'light' },
			{ id: 'nord-dark', label: 'Nord', scheme: 'dark' },
			{ id: 'one-dark-light', label: 'One Dark', scheme: 'light' },
			{ id: 'one-dark-dark', label: 'One Dark', scheme: 'dark' },
			{ id: 'palenight-light', label: 'Palenight', scheme: 'light' },
			{ id: 'palenight-dark', label: 'Palenight', scheme: 'dark' },
			{ id: 'terminal-dark', label: 'Terminal', scheme: 'dark' }
		]
	}
} satisfies Record<ThemeId, ThemeMeta>;

/** All themes in declaration order - what a theme picker should render. */
export const themeList: readonly ThemeMeta[] = THEME_IDS.map((id) => THEMES[id]);

export function isThemeId(value: unknown): value is ThemeId {
	return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value);
}

/** A theme's palettes for one scheme, default first - what a palette picker should render. */
export function palettesFor(theme: ThemeId, scheme: ColorScheme): readonly PaletteMeta[] {
	const palettes: readonly PaletteMeta[] = THEMES[theme].palettes;
	return palettes.filter((palette) => palette.scheme === scheme);
}

/**
 * `id` if it is one of the theme's palettes for that scheme, otherwise the
 * scheme's default. Undefined only when the theme has no such scheme.
 */
export function resolvePalette(
	theme: ThemeId,
	scheme: ColorScheme,
	id?: unknown
): PaletteMeta | undefined {
	const options = palettesFor(theme, scheme);
	return options.find((palette) => palette.id === id) ?? options[0];
}
