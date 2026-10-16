# retro-bits

Retro operating system themes for [Bits UI](https://bits-ui.com).

Themes are plain CSS driven by `--rb-*` custom properties. There is no Tailwind, no preset, and no
build step for consumers - and no wrapper components to keep in step with `bits-ui` releases,
because the themes style Bits UI through the data attributes it already renders.

> **Status: early.** The machinery is done - package, theme registry, runtime switching, SSR, and a
> playground. There is one theme, **Mono**, and it does not cover every Bits UI component yet.
> The retro themes are planned - see [PLAN.md](PLAN.md).

## Install

```sh
pnpm add retro-bits bits-ui
```

## Use

```svelte
<script>
	import 'retro-bits/css/index.css';
	import { ThemeProvider } from 'retro-bits';
	import { Button, Dialog } from 'bits-ui';
</script>

<ThemeProvider theme="mono">
	<Button.Root>Themed, with no wrapper</Button.Root>
</ThemeProvider>
```

`ThemeProvider` writes `data-rb-theme` to `<html>`. That matters: Bits UI portals dialogs, popovers
and menus to `document.body`, so anything less than the document element would leave portalled
content unthemed.

Switching at runtime:

```svelte
<script>
	import { useTheme, themeList } from 'retro-bits';

	// Needs a <ThemeProvider> above it, and throws without one.
	const theme = useTheme();
</script>

<select value={theme.current} onchange={(e) => theme.set(e.currentTarget.value)}>
	{#each themeList as entry (entry.id)}
		<option value={entry.id}>{entry.label}</option>
	{/each}
</select>

<button onclick={() => theme.toggleScheme()} disabled={!theme.canToggleScheme}>
	{theme.resolvedScheme}
</button>
```

## Themes

| Id     | Style                                                         |
| ------ | ------------------------------------------------------------- |
| `mono` | Monospace on a character grid, black on white, light and dark |

**Mono** is inspired by Oskar Wickström's
[The Monospace Web](https://owickstrom.github.io/the-monospace-web/) (MIT). Everything is measured in
`ch` across and line heights down, borders are 2px rules, nothing is rounded, shadowed or animated,
and a pressed button moves instead of darkening. It asks for
[JetBrains Mono](https://www.jetbrains.com/lp/mono/) but does not bundle it - load it yourself, or it
falls back to the platform's monospace face.

## How theming works

A theme is a set of `--rb-*` values under a `data-rb-theme` selector, and nothing else. Component CSS
reads only those values and never names a theme, so one stylesheet serves every era.

```css
@layer rb.tokens {
	:where([data-rb-theme='mono']) {
		--rb-text: light-dark(#000, #fff);
		--rb-control-height: calc(var(--rb-cell-h) * 2);
		--rb-bevel-out: none;
	}
}
```

Tokens hold **whole values**, not just colours: `--rb-bevel-out` is a complete `box-shadow`, so a
theme can use a soft drop shadow, a stack of bevel insets, or `none` (as Mono does) without touching
the component rules.

Because custom properties inherit, **nesting just works**: a second `data-rb-theme` inside the tree
re-declares the tokens for its subtree, which is all a live theme preview needs.

`src/lib/css/themes/_contract.css` is the annotated template - copy it to start a theme. The
machine-readable list lives in `src/lib/themes/contract.ts`, and `tests/tokens.test.ts` fails if any
theme drifts from it.

### Light and dark

`--rb-color-scheme` feeds the CSS `color-scheme` property, which is what makes `light-dark()` in the
token files resolve - so a dual-scheme theme is written once rather than twice.

Each theme declares in the registry which schemes it implements, and `ThemeState` clamps to that.
Asking a light-only theme for dark gives you light, not a half-styled page.

### Override anything

Everything retro-bits emits is inside `@layer rb.reset, rb.tokens, rb.base, rb.components,
rb.overrides`, and selectors are wrapped in `:where()`. Unlayered CSS - which is what you write by
default - beats all of it, so you should never need `!important`.

## Entry points

| Import                           | What it is                                              |
| -------------------------------- | ------------------------------------------------------- |
| `retro-bits`                     | `ThemeProvider`, theme state, registry                  |
| `retro-bits/ssr`                 | Server helpers and the registry, with no Svelte runtime |
| `retro-bits/css/index.css`       | Core plus every theme - the simple choice               |
| `retro-bits/css/core.css`        | Component rules only, no tokens                         |
| `retro-bits/css/reset.css`       | Optional minimal reset                                  |
| `retro-bits/css/themes/<id>.css` | One theme's tokens                                      |

To ship only the themes you use, import `core.css` plus those themes, and call `loadTheme(id)` to
pull another in on demand - it resolves before the attribute flips, so there is no unstyled frame.

## Variants and hooks

There are no wrapper components. Ask for a different treatment of a Bits UI part with
`data-rb-variant`:

```svelte
<Button.Root data-rb-variant="primary">Save</Button.Root>
<Button.Root data-rb-variant="ghost">Cancel</Button.Root>
```

Progress and Meter render no fill of their own, so mark the child you pass with
`data-rb-indicator`:

```svelte
<Progress.Root value={40}>
	<div data-rb-indicator style="width: 40%"></div>
</Progress.Root>
```

Checkbox and RadioGroup items draw their own mark from `data-state`, including indeterminate, so
render them without children:

```svelte
<Checkbox.Root bind:checked />
```

## No flash on first paint

`retro-bits/ssr` has no Svelte import, so it is safe in a server hook:

```ts
// src/hooks.server.ts
import {
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY,
	themeAttributes,
	noFlashScript
} from 'retro-bits/ssr';

export const handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace(
					'%rb.theme%',
					themeAttributes(
						event.cookies.get(THEME_STORAGE_KEY),
						event.cookies.get(SCHEME_STORAGE_KEY)
					)
				)
				.replace('%rb.noflash%', noFlashScript())
	});
```

with `<html lang="en" %rb.theme%>` and `<script>%rb.noflash%</script>` in `app.html`. Unknown cookie
values fall back rather than throwing.

The script only applies a valid value from `localStorage`, so it never undoes what the server
stamped from the cookie. To make server-rendered text that reads the theme agree too (a switcher,
say), hand the cookie to the provider from a layout `load`:

```ts
// src/routes/+layout.server.ts
export const load = ({ cookies }) => {
	const theme = cookies.get(THEME_STORAGE_KEY);
	return { theme: isThemeId(theme) ? theme : undefined };
};
```

```svelte
<ThemeProvider theme={data.theme}>
```

## Development

This is one SvelteKit project: `src/lib` is the package, `src/routes` is the playground. The
playground imports the library by its published specifiers (`retro-bits`, `retro-bits/css/...`)
rather than through `$lib`, so the public API stays honest.

```sh
pnpm install
pnpm dev            # playground at /
pnpm check          # svelte-check
pnpm lint           # prettier + eslint
pnpm test           # token contract, Bits UI selectors, public surface
pnpm check:tokens   # just the contract
pnpm run prepack    # build dist/ and run publint
```

Playground routes worth knowing: `/gallery` (every Bits UI component; unstyled ones are badged), `/tokens` (the contract
resolved live), `/nested` (scoped providers side by side).

## Licence

GPL-3.0-or-later.
