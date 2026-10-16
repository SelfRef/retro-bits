# retro-bits

Retro operating system themes for [Bits UI](https://bits-ui.com).

Themes are plain CSS driven by `--rb-*` custom properties. There is no Tailwind, no preset, and no
build step for consumers - and no wrapper components to keep in step with `bits-ui` releases,
because the themes style Bits UI through the data attributes it already renders.

> **Status: early.** One theme, **Mono**, styles every Bits UI component, with 48 palettes. The
> retro themes are planned - see [PLAN.md](PLAN.md).

## Install

```sh
pnpm add retro-bits bits-ui
```

## Use

The whole setup is one import and one attribute. No component, no JavaScript:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import 'retro-bits/css/index.css';
</script>
```

```html
<!-- src/app.html -->
<html lang="en" data-rb-theme="mono"></html>
```

Every Bits UI component on the page is now themed, with no wrapper:

```svelte
<Button.Root>Save</Button.Root>
```

Put the attribute on `<html>`, not a wrapper: Bits UI portals dialogs, popovers and menus to
`document.body`, so anything less than the document element leaves portalled content unthemed. Light
and dark follow `prefers-color-scheme` until you say otherwise.

### Switching at runtime

For a theme, scheme or palette picker, wrap the app in `ThemeProvider`. It writes the attributes to
`<html>` and remembers the choice in `localStorage` and a cookie:

```svelte
<script>
	import { ThemeProvider } from 'retro-bits';
	let { children } = $props();
</script>

<ThemeProvider>{@render children()}</ThemeProvider>
```

```svelte
<script>
	import { useTheme, palettesFor } from 'retro-bits';

	// Needs a <ThemeProvider> above it, and throws without one.
	const theme = useTheme();
</script>

<!-- One menu, light palettes first: picking one also switches to its scheme. -->
<select
	value={theme.palette?.id}
	onchange={(e) => theme.setScheme(theme.setPalette(e.currentTarget.value).scheme)}
>
	{#each ['light', 'dark'] as scheme (scheme)}
		<optgroup label={scheme}>
			{#each palettesFor(theme.current, scheme) as palette (palette.id)}
				<option value={palette.id}>{palette.label}</option>
			{/each}
		</optgroup>
	{/each}
</select>
```

`theme.set(id)` switches theme and `setScheme('light' | 'dark' | 'auto')` the scheme. `setPalette`
only replaces the palette of its own scheme, so an app can also offer separate light and dark
pickers and let `auto` follow the OS.

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

### Palettes

A palette is a colour variant of a theme, and each one is either light or dark. An app picks one of
each independently - sepia by day, nord at night - and the scheme decides which is on screen:

```html
<html
	data-rb-theme="mono"
	data-rb-palette-light="sepia-light"
	data-rb-palette-dark="nord-dark"
></html>
```

Without the attributes you get the theme's defaults (`mono-light`, `mono-dark`). Both palettes are
applied at once and `light-dark()` picks between them, so following the OS still needs no JavaScript.
`palettesFor(theme, scheme)` lists them for a picker.

Mono's palettes besides its own are the flavours of Cameron Brooks'
[monospace-web-theme](https://github.com/CameronBrooks11/monospace-web-theme) (MIT, Copyright (c)
2025 Cameron Brooks): rose, ocean, forest, desert, sepia, twilight, glacier, clay, sandstone, coral,
mint, mauve, slate, honey, rust, dracula, solarized, monokai, gruvbox, nord, one-dark and palenight
in both schemes, and midnight and terminal in dark only. Ids are `<name>-<scheme>`.

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

A theme with palettes builds its colours from a few private inputs per scheme (Mono's are
`--mono-light-bg`, `--mono-dark-text` and so on). A palette is a block that overrides one scheme's
inputs under `[data-rb-palette-light]` or `[data-rb-palette-dark]`; the registry lists them, and the
token test checks the two agree.

### Override anything

Everything retro-bits emits is inside one cascade layer, `rb` (with `rb.reset`, `rb.tokens`,
`rb.base`, `rb.components` and `rb.overrides` inside it), and selectors are wrapped in `:where()`.
Unlayered CSS - which is what you write by default - beats all of it, so you should never need
`!important`. Bits UI's `class` prop works as usual.

With Tailwind v4, whose output is layered too, declare the order once so utilities still win:

```css
@layer rb, theme, base, components, utilities;
@import 'tailwindcss';
```

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

Checkbox and radio items in menus draw theirs too, so their children are free for the label.

NavigationMenu sizes its shared viewport from the first child of `Content`, so give `Content` one
wrapper:

```svelte
<NavigationMenu.Content>
	<ul>
		<li><NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link></li>
	</ul>
</NavigationMenu.Content>
```

### Your own markup

Three hooks give hand-written elements the same look as the Bits UI parts around them:

```svelte
<div data-rb-box>A panel</div>
<div data-rb-box="sunken">A well</div>
<a href="/docs" data-rb-button data-rb-variant="primary">Docs</a>
<input data-rb-field />
```

Anything else can read the tokens directly: `border: var(--rb-border-width) solid
var(--rb-border-color)` matches the theme in every palette.

## No flash on first paint

`retro-bits/ssr` has no Svelte import, so it is safe in a server hook:

```ts
// src/hooks.server.ts
import { themeAttributes, noFlashScript } from 'retro-bits/ssr';

export const handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace(
					'%rb.theme%',
					themeAttributes((key) => event.cookies.get(key))
				)
				.replace('%rb.noflash%', noFlashScript())
	});
```

with `<html lang="en" %rb.theme%>` and `<script>%rb.noflash%</script>` in `app.html`. The theme,
scheme and both palettes come back from the cookies `ThemeProvider` writes; unknown values fall back
rather than throwing.

With nothing stored the scheme is `auto` and follows the OS. To start on a fixed scheme instead,
pass the same defaults to all three helpers: `themeAttributes(read, { scheme: 'light' })`,
`noFlashScript({ scheme: 'light' })` and `readThemeSettings(read, { scheme: 'light' })`.

The script only applies a valid value from `localStorage`, so it never undoes what the server
stamped from the cookie. To make server-rendered text that reads the theme agree too (a switcher,
say), hand the cookie to the provider from a layout `load`:

```ts
// src/routes/+layout.server.ts
import { readThemeSettings } from 'retro-bits/ssr';

export const load = ({ cookies }) => readThemeSettings((key) => cookies.get(key));
```

```svelte
<ThemeProvider {...data}>
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

In Zed, `task: spawn` offers the playground in the default browser or in a new browser window.

Playground routes worth knowing: `/gallery` (every Bits UI component, unstyled ones badged, plus
the plain-HTML hooks), `/tokens` (the contract resolved live), `/nested` (scoped providers side by
side).

## Licence

GPL-3.0-or-later.
