# Plan

What is not built yet. The README describes only what exists today.

## Stage 2: finish the Mono theme

Mono has to style every Bits UI component before the retro themes start, so each of them has a
complete target. The gallery marks the unstyled ones with a **stage 2** badge:

- Command
- Menubar
- Navigation menu
- Calendar, Range calendar
- Date field, Date range field, Time field, Time range field
- Date picker, Date range picker

Menubar's menus are styled through the shared menu rules; the bar itself (`data-menubar-root`,
`data-menubar-trigger`) is not.

The shared disabled rule paints `--rb-pattern-dither` on the outermost disabled element, which can
be a group container rather than a control. Mono's dither is `none`, so this only matters once a
theme sets one.

Checkbox and radio marks are an inner fill of the accent colour. Themes that want a glyph (a Win9x
tick, a DOS `[X]`) will need a hook for it, likely a `--rb-check-glyph` token rendered with
`::before`.

## Stage 3: the retro themes

Adding one: put the id in `THEME_IDS` (`src/lib/types.ts`), describe it in `themes/registry.ts`,
copy `css/themes/_contract.css` to `css/themes/<id>.css` and fill in every value, then add it to
`themes/loader.ts` and `css/index.css`. `tests/tokens.test.ts` checks the file against the contract
and the registry.

| Name          | System / style                     | Named after                                  | Notes                                    |
| ------------- | ---------------------------------- | -------------------------------------------- | ---------------------------------------- |
| **Chicago**   | Windows 9x (classic)               | Code name of Windows 95                      | Four-layer bevels, dotted focus          |
| **Platinum**  | Mac OS 9 (classic)                 | The "Platinum appearance" of Mac OS 8/9      | Pinstripes                               |
| **BigBlue**   | IBM classic DOS text mode          | IBM's nickname, "Big Blue"                   | Character-cell metrics                   |
| **Phosphor**  | Monochrome retro terminal          | The phosphor coating of CRT monitors         | No bevels, `--rb-glow`, green/cyan/amber |
| **Kickstart** | AmigaOS                            | The Amiga's boot firmware / ROM              |                                          |
| **Haiku**     | BeOS                               | The haiku error messages in BeOS NetPositive |                                          |
| **Cube**      | NeXTSTEP / OpenStep                | The black cube - the NeXT Computer           | Flat chrome, hairlines                   |
| **Monolith**  | Retro-futurism / cassette futurism | The monolith from "2001: A Space Odyssey"    |                                          |

The point of whole-value tokens shows up here: `--rb-bevel-out` should end up a four-layer
`box-shadow` in Chicago, a single hairline in Cube and `none` in Phosphor, with no change to the
component CSS. Chicago's, for example:

```css
--rb-bevel-out:
	inset -1px -1px var(--rb-bevel-darker), inset 1px 1px var(--rb-bevel-lighter),
	inset -2px -2px var(--rb-bevel-shadow), inset 2px 2px var(--rb-bevel-light);
```

Tokens in the contract but not read by any component CSS yet: the bevel ramp
(`--rb-bevel-light`, `-lighter`, `-shadow`, `-darker`), `--rb-unit`, `--rb-cell-w`, `--rb-cell-h`,
`--rb-surface-disabled`, `--rb-accent-active`, `--rb-duration-fast`, `--rb-duration-slow`. Wire them
up or drop them as the themes land.

## Later: window chrome

Bits UI has no window frame, title bar, panel, group box, status bar or desktop. An earlier draft
shipped retro-bits' own components for these (`Window`, `TitleBar`, `WindowControls`, `Panel`,
`GroupBox`, `StatusBar`, `StatusBarSegment`, `Desktop`), keyed off `data-rb-*` attributes. They were
removed to keep the focus on theming Bits UI.

If they come back, so do the tokens that went with them: `--rb-window-bg`, `--rb-window-border`,
`--rb-window-bevel`, `--rb-titlebar-*`, `--rb-pattern-titlebar` and `--rb-scanlines` (the CRT
overlay for Phosphor and BigBlue). Dialog content is the first candidate to reuse title bar styling.
