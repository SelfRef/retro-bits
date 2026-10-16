/*
 * Reading a stored theme choice. No Svelte import, so the server helpers can
 * share it with the runtime.
 */
import { isThemeId, resolvePalette } from '../themes/registry.js';
import { PALETTE_STORAGE_KEYS, SCHEME_STORAGE_KEY, THEME_STORAGE_KEY } from './constants.js';
import type { ColorScheme, SchemePreference, ThemeId } from '../types.js';

export interface ThemeSettings {
	theme: ThemeId;
	scheme: SchemePreference;
	/** Palette id per scheme, already checked against `theme`. */
	palettes: Partial<Record<ColorScheme, string>>;
}

export function isSchemePreference(value: unknown): value is SchemePreference {
	return value === 'auto' || value === 'light' || value === 'dark';
}

/**
 * Validate a stored choice, read one key at a time - from cookies on the
 * server, `localStorage` in the browser. Anything unknown falls back rather
 * than throwing, because this runs on user-supplied values.
 *
 * ```ts
 * readThemeSettings((key) => cookies.get(key));
 * ```
 */
export function readThemeSettings(
	read: (key: string) => string | null | undefined,
	fallbackTheme: ThemeId = 'mono'
): ThemeSettings {
	const stored = read(THEME_STORAGE_KEY);
	const theme = isThemeId(stored) ? stored : fallbackTheme;
	const scheme = read(SCHEME_STORAGE_KEY);

	return {
		theme,
		scheme: isSchemePreference(scheme) ? scheme : 'auto',
		palettes: {
			light: resolvePalette(theme, 'light', read(PALETTE_STORAGE_KEYS.light))?.id,
			dark: resolvePalette(theme, 'dark', read(PALETTE_STORAGE_KEYS.dark))?.id
		}
	};
}
