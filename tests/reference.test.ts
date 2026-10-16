/*
 * docs/REFERENCE.md is the one place to look up what retro-bits styles, so it
 * must name every Bits UI component and every data-rb-* hook the CSS reads.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const reference = read('../docs/REFERENCE.md');
const headings = reference.match(/^### .+$/gm)?.join('\n') ?? '';

// `menu` is the shared base of DropdownMenu, ContextMenu and Menubar, not a component.
const components = readdirSync(new URL('../node_modules/bits-ui/dist/bits/', import.meta.url), {
	withFileTypes: true
})
	.filter((entry) => entry.isDirectory() && !['menu', 'utilities'].includes(entry.name))
	.map((entry) => entry.name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase()));

const partsDir = new URL('../src/lib/css/parts/', import.meta.url);
const hooks = new Set(
	readdirSync(partsDir).flatMap((file) =>
		[...readFileSync(new URL(file, partsDir), 'utf8').matchAll(/data-rb-[a-z-]+/g)].map((m) => m[0])
	)
);

describe('docs/REFERENCE.md', () => {
	it.each(components)('has a section for %s', (name) => {
		expect(headings).toMatch(new RegExp(`\\b${name}\\b`));
	});

	it.each([...hooks])('documents %s', (hook) => {
		expect(reference).toContain(`\`${hook}`);
	});
});
