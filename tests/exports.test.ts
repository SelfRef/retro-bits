/*
 * The public surface. If something here disappears or is renamed, a consumer's
 * import breaks, so the list is asserted rather than left to drift.
 */
import { describe, expect, it } from 'vitest';

import * as root from '../src/lib/index.js';
import * as ssr from '../src/lib/ssr.js';
import { THEME_IDS } from '../src/lib/types.js';

describe('retro-bits', () => {
	it('exports the documented surface', () => {
		expect(Object.keys(root).sort()).toEqual(
			[
				// components
				'Desktop',
				'GroupBox',
				'Panel',
				'StatusBar',
				'StatusBarSegment',
				'ThemeProvider',
				'TitleBar',
				'Window',
				'WindowControls',
				// theme runtime
				'ThemeState',
				'createTheme',
				'useTheme',
				'THEME_ATTRIBUTE',
				'SCHEME_ATTRIBUTE',
				'THEME_STORAGE_KEY',
				'SCHEME_STORAGE_KEY',
				'themeAttributes',
				'noFlashScript',
				// registry
				'THEMES',
				'THEME_IDS',
				'themeList',
				'isThemeId',
				'getTheme',
				'loadTheme',
				'isThemeLoaded',
				'RB_TOKENS',
				'RB_TOKEN_GROUPS',
				'RB_TOKEN_GROUP_NAMES'
			].sort()
		);
	});
});

describe('retro-bits/ssr', () => {
	it('exports the server helpers without pulling in components', () => {
		expect(Object.keys(ssr).sort()).toEqual(
			[
				'themeAttributes',
				'noFlashScript',
				'THEME_ATTRIBUTE',
				'SCHEME_ATTRIBUTE',
				'THEME_STORAGE_KEY',
				'SCHEME_STORAGE_KEY',
				'THEMES',
				'THEME_IDS',
				'themeList',
				'isThemeId',
				'getTheme'
			].sort()
		);
	});

	it('stamps a valid theme and ignores a bogus cookie', () => {
		expect(ssr.themeAttributes('phosphor', 'dark')).toBe(
			'data-rb-theme="phosphor" data-rb-scheme="dark"'
		);
		expect(ssr.themeAttributes('not-a-theme', 'nonsense')).toBe('data-rb-theme="default"');
	});

	it('leaves the scheme off when it is auto, so the CSS can fall back to the OS', () => {
		expect(ssr.themeAttributes('default', 'auto')).toBe('data-rb-theme="default"');
	});

	it('recognises every registered theme', () => {
		for (const id of THEME_IDS) expect(ssr.isThemeId(id)).toBe(true);
		expect(ssr.isThemeId('chicago-2')).toBe(false);
	});
});
