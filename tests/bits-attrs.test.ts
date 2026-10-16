/*
 * Every Bits UI attribute the component CSS selects on must be one Bits UI
 * actually renders. The attribute names are the whole API retro-bits depends
 * on, and a typo or an upstream rename fails silently in the browser.
 *
 * Bits UI builds its attributes at runtime as `data-<prefix>-<part>`, from
 * `createBitsAttrs({ component, parts })` calls, so those are scraped from its
 * dist. A few components swap the prefix for a variant name, listed below.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const bitsDist = fileURLToPath(new URL('../node_modules/bits-ui/dist/', import.meta.url));
const partsDir = fileURLToPath(new URL('../src/lib/css/parts/', import.meta.url));

/** Components whose parts are prefixed with a variant instead of their own name. */
const VARIANTS: Record<string, string[]> = {
	dialog: ['dialog', 'alert-dialog'],
	menu: ['dropdown-menu', 'context-menu', 'menubar'],
	select: ['select', 'combobox'],
	calendar: ['calendar', 'range-calendar']
};

/** State attributes shared across components rather than built per part. */
const SHARED = [
	'data-state',
	'data-disabled',
	'data-invalid',
	'data-highlighted',
	'data-selected',
	'data-orientation',
	'data-placeholder',
	'data-active',
	'data-segment',
	'data-starting-style',
	'data-ending-style'
];

function files(dir: string, ext: string[]): string[] {
	return readdirSync(dir, { recursive: true, encoding: 'utf8' })
		.filter((name) => ext.some((e) => name.endsWith(e)))
		.map((name) => join(dir, name));
}

const bitsSource = files(bitsDist, ['.js', '.svelte'])
	.map((file) => readFileSync(file, 'utf8'))
	.join('\n');

function renderedAttributes(): Set<string> {
	const attrs = new Set<string>();
	for (const [, config] of bitsSource.matchAll(/createBitsAttrs\(\{([\s\S]*?)\}\)/g)) {
		const component = /component:\s*"([^"]+)"/.exec(config)?.[1];
		const parts = /parts:\s*\[([^\]]*)\]/.exec(config)?.[1];
		if (!component || !parts) continue;
		for (const prefix of VARIANTS[component] ?? [component]) {
			for (const [, part] of parts.matchAll(/"([^"]+)"/g)) attrs.add(`data-${prefix}-${part}`);
		}
	}
	// A few parts are written straight into the markup, e.g. `data-button-root`.
	for (const [attr] of bitsSource.matchAll(/\bdata-[a-z]+(?:-[a-z]+)*-root\b/g)) attrs.add(attr);
	return attrs;
}

const selected = new Set(
	files(partsDir, ['.css']).flatMap((file) =>
		Array.from(readFileSync(file, 'utf8').matchAll(/\[(data-[a-z-]+)/g), (m) => m[1])
	)
);

describe('bits-ui attributes', () => {
	it('still uses the variant prefixes this test assumes', () => {
		for (const variant of Object.values(VARIANTS).flat()) {
			expect(bitsSource, `variant "${variant}"`).toContain(`"${variant}"`);
		}
	});

	it('still renders the shared state attributes', () => {
		for (const attr of SHARED) expect(bitsSource, attr).toContain(attr.slice('data-'.length));
	});

	it('every selector in the component CSS matches something Bits UI renders', () => {
		const rendered = renderedAttributes();
		const unknown = [...selected].filter(
			(attr) => !attr.startsWith('data-rb-') && !SHARED.includes(attr) && !rendered.has(attr)
		);
		expect(unknown).toEqual([]);
	});
});
