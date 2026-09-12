/*
 * Enforces the token contract.
 *
 * A theme in retro-bits is nothing but a complete set of `--rb-*` values, so the
 * one thing that can silently break every component is a theme that forgets one.
 * These tests check that each theme declares exactly the contract - no missing
 * tokens, no stray ones - and that its metadata agrees with the registry.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { RB_TOKENS } from '../src/lib/themes/contract.js';
import { THEMES } from '../src/lib/themes/registry.js';
import { THEME_IDS, type ThemeId } from '../src/lib/types.js';

const themeDir = fileURLToPath(new URL('../src/lib/css/themes/', import.meta.url));

/** A `--rb-*` declaration at the start of a line - prose in comments cannot match. */
const DECLARATION = /^[\t ]*(--rb-[a-z0-9-]+)[\t ]*:/gm;

/** Files starting with `_` are documentation (see `_contract.css`), not themes. */
const themeFiles = readdirSync(themeDir)
	.filter((name) => name.endsWith('.css') && !name.startsWith('_'))
	.sort();

const fileIds = themeFiles.map((name) => name.replace(/\.css$/, ''));

function source(id: ThemeId): string {
	return readFileSync(join(themeDir, `${id}.css`), 'utf8');
}

function declaredTokens(id: ThemeId): Set<string> {
	return new Set(Array.from(source(id).matchAll(DECLARATION), (match) => match[1]));
}

describe('theme files', () => {
	it('there is exactly one stylesheet per registered theme', () => {
		expect(fileIds.sort()).toEqual([...THEME_IDS].sort());
	});
});

describe.each(THEME_IDS)('%s', (id) => {
	it('declares every token in the contract', () => {
		const declared = declaredTokens(id);
		const missing = RB_TOKENS.filter((token) => !declared.has(token));
		expect(missing, `${id}.css is missing ${missing.length} token(s)`).toEqual([]);
	});

	it('declares no tokens outside the contract', () => {
		const contract = new Set<string>(RB_TOKENS);
		const extra = [...declaredTokens(id)].filter((token) => !contract.has(token));
		expect(extra, `${id}.css declares token(s) the contract does not define`).toEqual([]);
	});

	it('scopes its tokens to a matching selector, inside the tokens layer', () => {
		expect(source(id)).toContain(`[data-rb-theme='${id}']`);
		expect(source(id)).toContain('@layer rb.tokens');
	});

	it('agrees with the registry about which schemes it supports', () => {
		// The registry is what `ThemeState` clamps against; `--rb-color-scheme` is
		// what actually makes `light-dark()` resolve. They have to say the same thing.
		const declared = source(id)
			.match(/^[\t ]*--rb-color-scheme[\t ]*:[\t ]*([^;]+);/m)?.[1]
			?.trim();
		expect(declared).toBe(THEMES[id].schemes.join(' '));
	});
});
