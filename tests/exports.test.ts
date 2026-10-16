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
				// theme runtime
				'ThemeProvider',
				'ThemeState',
				'createTheme',
				'useTheme',
				'THEME_ATTRIBUTE',
				'SCHEME_ATTRIBUTE',
				'PALETTE_ATTRIBUTES',
				'THEME_STORAGE_KEY',
				'SCHEME_STORAGE_KEY',
				'PALETTE_STORAGE_KEYS',
				'readThemeSettings',
				'themeAttributes',
				'noFlashScript',
				// registry
				'THEMES',
				'THEME_IDS',
				'DEFAULT_THEME',
				'themeList',
				'isThemeId',
				'palettesFor',
				'resolvePalette',
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
				'readThemeSettings',
				'THEME_ATTRIBUTE',
				'SCHEME_ATTRIBUTE',
				'PALETTE_ATTRIBUTES',
				'THEME_STORAGE_KEY',
				'SCHEME_STORAGE_KEY',
				'PALETTE_STORAGE_KEYS',
				'THEMES',
				'THEME_IDS',
				'DEFAULT_THEME',
				'themeList',
				'isThemeId',
				'palettesFor',
				'resolvePalette'
			].sort()
		);
	});

	const cookies = (values: Record<string, string>) => (key: string) => values[key];
	const defaults = 'data-rb-palette-light="mono-light" data-rb-palette-dark="mono-dark"';

	it('stamps a valid choice and ignores bogus cookies', () => {
		expect(
			ssr.themeAttributes(
				cookies({
					'rb-theme': 'mono',
					'rb-scheme': 'dark',
					'rb-palette-light': 'rose-light',
					'rb-palette-dark': 'nord-dark'
				})
			)
		).toBe(
			'data-rb-theme="mono" data-rb-scheme="dark" data-rb-palette-light="rose-light" data-rb-palette-dark="nord-dark"'
		);
		expect(ssr.themeAttributes(cookies({ 'rb-theme': 'nope', 'rb-scheme': 'nope' }))).toBe(
			`data-rb-theme="mono" ${defaults}`
		);
	});

	it('leaves the scheme off when it is auto, so the CSS can fall back to the OS', () => {
		expect(ssr.themeAttributes(cookies({ 'rb-scheme': 'auto' }))).toBe(
			`data-rb-theme="mono" ${defaults}`
		);
	});

	it('uses the default scheme only when none is stored', () => {
		expect(ssr.readThemeSettings(cookies({}), { scheme: 'light' }).scheme).toBe('light');
		expect(
			ssr.readThemeSettings(cookies({ 'rb-scheme': 'dark' }), { scheme: 'light' }).scheme
		).toBe('dark');
	});

	it('only takes a palette in the slot of its own scheme', () => {
		const settings = ssr.readThemeSettings(
			cookies({ 'rb-palette-light': 'nord-dark', 'rb-palette-dark': 'nord-dark' })
		);
		expect(settings.palettes).toEqual({ light: 'mono-light', dark: 'nord-dark' });
	});

	it('noFlashScript only acts on valid stored values', () => {
		const run = (
			stored: Record<string, string>,
			attrs: Record<string, string> = {},
			defaults: ssr.ThemeDefaults = {}
		) => {
			const html = {
				attrs: { ...attrs },
				setAttribute(k: string, v: string) {
					this.attrs[k] = v;
				},
				removeAttribute(k: string) {
					delete this.attrs[k];
				},
				hasAttribute(k: string) {
					return k in this.attrs;
				},
				getAttribute(k: string) {
					return this.attrs[k] ?? null;
				}
			};
			const storage = { getItem: (k: string) => stored[k] ?? null };
			new Function('document', 'localStorage', ssr.noFlashScript(defaults))(
				{ documentElement: html },
				storage
			);
			return html.attrs;
		};
		const stamped = { 'data-rb-theme': 'mono', 'data-rb-scheme': 'dark' };

		// Empty or bogus storage leaves the server's cookie-based attributes alone.
		expect(run({}, stamped)).toEqual(stamped);
		expect(run({ 'rb-theme': 'nope', 'rb-scheme': 'nope' }, stamped)).toEqual(stamped);
		// Valid storage wins; `auto` hands the scheme back to the OS.
		expect(run({ 'rb-theme': 'mono', 'rb-scheme': 'auto' }, stamped)).toEqual({
			'data-rb-theme': 'mono'
		});
		// Nothing stamped and nothing stored: the fallback theme.
		expect(run({})).toEqual({ 'data-rb-theme': 'mono' });
		// A default scheme fills the gap instead of following the OS, but never wins
		// over a stored or stamped one.
		expect(run({}, {}, { scheme: 'light' })).toEqual({
			'data-rb-theme': 'mono',
			'data-rb-scheme': 'light'
		});
		expect(run({}, stamped, { scheme: 'light' })).toEqual(stamped);
		// Palettes only land in the slot of their own scheme.
		expect(
			run({ 'rb-palette-light': 'rose-light', 'rb-palette-dark': 'rose-light' }, stamped)
		).toEqual({ ...stamped, 'data-rb-palette-light': 'rose-light' });
		expect(run({ 'rb-theme': 'constructor' })).toEqual({ 'data-rb-theme': 'mono' });
	});

	it('recognises every registered theme', () => {
		for (const id of THEME_IDS) expect(ssr.isThemeId(id)).toBe(true);
		expect(ssr.isThemeId('chicago')).toBe(false);
	});
});
