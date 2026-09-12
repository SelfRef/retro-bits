# retro-bits

Retro operating system themes for [Bits UI](https://bits-ui.com), plus the window chrome Bits UI has
no concept of.

Themes are plain CSS driven by `--rb-*` custom properties. There is no Tailwind, no preset, and no
build step for consumers - and no wrapper components to keep in step with `bits-ui` releases,
because the themes style Bits UI through the data attributes it already renders.

> **Status: stage 1.** The machinery is done - package, theme registry, runtime switching, SSR, and a
> playground. Only the **Default** theme has real values. The eight retro themes are declared, with
> complete token files, but they still carry Default's values.

## Install

```sh
pnpm add retro-bits bits-ui
```

`bits-ui` is an optional peer dependency: if you only want the themes or the window chrome, you do
not need it.

## Use

```svelte
<script>
	import 'retro-bits/css/index.css';
	import { ThemeProvider } from 'retro-bits';
	import { Button, Dialog } from 'bits-ui';
</script>

<ThemeProvider theme="default">
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

| Name          | System / style                     | Named after                                  | Status      |
| ------------- | ---------------------------------- | -------------------------------------------- | ----------- |
| **Default**   | Neutral modern UI                  | Baseline for testing components              | implemented |
| **Chicago**   | Windows 9x (classic)               | Code name of Windows 95                      | declared    |
| **Platinum**  | Mac OS 9 (classic)                 | The "Platinum appearance" of Mac OS 8/9      | declared    |
| **BigBlue**   | IBM classic DOS text mode          | IBM's nickname, "Big Blue"                   | declared    |
| **Phosphor**  | Monochrome retro terminal          | The phosphor coating of CRT monitors         | declared    |
| **Kickstart** | AmigaOS                            | The Amiga's boot firmware / ROM              | declared    |
| **Haiku**     | BeOS                               | The haiku error messages in BeOS NetPositive | declared    |
| **Cube**      | NeXTSTEP / OpenStep                | The black cube - the NeXT Computer           | declared    |
| **Monolith**  | Retro-futurism / cassette futurism | The monolith from "2001: A Space Odyssey"    | declared    |

## How theming works

A theme is a set of `--rb-*` values under a `data-rb-theme` selector, and nothing else. Component CSS
reads only those values and never names a theme, so one stylesheet serves every era.

```css
@layer rb.tokens {
	:where([data-rb-theme='chicago']) {
		--rb-bevel-out:
			inset -1px -1px var(--rb-bevel-darker), inset 1px 1px var(--rb-bevel-lighter),
			inset -2px -2px var(--rb-bevel-shadow), inset 2px 2px var(--rb-bevel-light);
	}
}
```

Tokens hold **whole values**, not just colours. `--rb-bevel-out` is a four-layer `box-shadow` in
Chicago, a single hairline in Cube, and `none` in Phosphor. That is what lets one set of component
rules cover both a Windows 95 button and a CRT terminal.

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
| `retro-bits`                     | Components, `ThemeProvider`, theme state, registry      |
| `retro-bits/ssr`                 | Server helpers and the registry, with no Svelte runtime |
| `retro-bits/css/index.css`       | Core plus all nine themes - the simple choice           |
| `retro-bits/css/core.css`        | Component rules only, no tokens                         |
| `retro-bits/css/reset.css`       | Optional minimal reset                                  |
| `retro-bits/css/themes/<id>.css` | One theme's tokens                                      |

To ship only the themes you use, import `core.css` plus those themes, and call `loadTheme(id)` to
pull another in on demand - it resolves before the attribute flips, so there is no unstyled frame.

## Components

Bits UI covers the interactive parts. retro-bits adds the chrome it has no concept of, where the
markup is ours and stays stable across themes:

`Window`, `TitleBar`, `WindowControls`, `Panel`, `GroupBox`, `StatusBar`, `StatusBarSegment`,
`Desktop`.

For Bits UI parts, ask for a different treatment with `data-rb-variant` instead of a wrapper:

```svelte
<Button.Root data-rb-variant="primary">Save</Button.Root>
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

## Development

This is one SvelteKit project: `src/lib` is the package, `src/routes` is the playground. The
playground imports the library by its published specifiers (`retro-bits`, `retro-bits/css/...`)
rather than through `$lib`, so the public API stays honest.

```sh
pnpm install
pnpm dev            # playground at /
pnpm check          # svelte-check
pnpm lint           # prettier + eslint
pnpm test           # token contract and public surface
pnpm check:tokens   # just the contract
pnpm run prepack    # build dist/ and run publint
```

Playground routes worth knowing: `/gallery` (every Bits UI component), `/tokens` (the contract
resolved live), `/nested` (two themes in one page).

## Licence

GPL-3.0-or-later.
