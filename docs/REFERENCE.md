# Component reference

What retro-bits styles and how to use each piece. This is the place to check what's available, what
a control does on its own, and what markup it expects. Setup, SSR and the theme API are covered in
the [README](../README.md).

Covers bits-ui 2.19 and the **Mono** theme. When a theme adds its own features, or retro-bits adds a
component of its own, it goes here as well. `tests/reference.test.ts` fails if a Bits UI component
or a `data-rb-*` hook is missing from this file.

## Rules that apply everywhere

- **No wrappers.** Use Bits UI components as they are, and they're styled through the `data-*`
  attributes Bits UI already renders. retro-bits exports no components except `ThemeProvider`.
- **Marks and arrows are drawn for you.** Checkbox, RadioGroup, menu checkbox/radio items and every
  open/close arrow (Select, Combobox, date pickers, Accordion, Collapsible, calendar month/year,
  `<select data-rb-field>`) come from CSS. Give them no glyph or icon children. Give an icon-only
  trigger an `aria-label` instead.
- **One height.** Buttons, toggles, inputs, selects, triggers, date fields and pin cells are all
  exactly `--rb-control-height` tall (border-box), so mixed rows line up. A textarea is the only
  one that grows.
- **Disabled is automatic.** `disabled` or `data-disabled` dims a control's border, text, fill and
  mark to the disabled colour and turns off hover and press feedback. A `Label.Root` that wraps a
  disabled control dims along with it.
- **Focus** is an outline from the `--rb-focus-*` tokens on `:focus-visible`.
- **Theme on `<html>`.** Dialogs, popovers, menus and tooltips are portalled to `<body>`, so they
  take the root's theme. Keep `data-rb-theme` / `data-rb-palette-*` on `<html>`. A nested
  `data-rb-theme` only reaches content that isn't portalled.
- **Overriding.** Everything sits in `@layer rb`, so plain unlayered CSS or a `class` beats it
  without `!important`. Read tokens (`var(--rb-…)`) to match the theme.

## Hooks

Attributes you add yourself. Bits UI parts get everything else automatically.

| Attribute                       | On                                         | Does                                                                     |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| `data-rb-variant="primary"`     | `Button.Root`, `[data-rb-button]`          | Accent fill, for the main action                                         |
| `data-rb-variant="ghost"`       | `Button.Root`, `[data-rb-button]`          | No border or fill until hovered                                          |
| `data-rb-button`                | native `<button>`, `<a>`                   | The full button look, variants included                                  |
| `data-rb-field`                 | native `<input>`, `<select>`, `<textarea>` | The sunken field look; `<select>` gets the drawn arrow                   |
| `data-rb-box`                   | any element                                | Panel: border, surface, inset padding                                    |
| `data-rb-box="raised"`/`sunken` | any element                                | Panel with the raised or sunken surface and bevel                        |
| `data-rb-group`                 | a wrapper                                  | Joins its direct children edge to edge; the shared border separates them |
| `data-rb-indicator`             | the child of `Progress.Root`/`Meter.Root`  | The accent fill; you set its `width`                                     |

```svelte
<div data-rb-box>A panel</div>
<a href="/docs" data-rb-button data-rb-variant="primary">Docs</a>
<div data-rb-group>
	<input data-rb-field placeholder="Search" />
	<button type="button" data-rb-button>Go</button>
</div>
```

## Themes

| Id     | Schemes      | Palettes | Character                                                                        |
| ------ | ------------ | -------- | -------------------------------------------------------------------------------- |
| `mono` | light & dark | 48       | Monospace character grid, 2px rules, no radius, no bevels, no shadows, no motion |

Attributes on `<html>`: `data-rb-theme`, `data-rb-scheme` (`light` / `dark`, or leave it off to
follow the OS), `data-rb-palette-light`, `data-rb-palette-dark`. Palette ids are `<name>-<scheme>`.
`palettesFor(theme, scheme)` lists them. Each theme's defaults are the first palettes in
`src/lib/themes/registry.ts`.

Mono specifics:

- Raised, sunken and plain surfaces are the same colour, so controls are told apart by shape: a
  Select is one button, a Combobox is an input plus an arrow cell.
- A pressed button moves by `--rb-press-offset` instead of darkening.
- It wants JetBrains Mono but doesn't bundle it. Load the font yourself, or it falls back to the
  system monospace face.

## Components

Every Bits UI component is styled, A to Z below. **Parts** lists what the theme styles, **States**
the attributes it reacts to, and **Markup** what you need to render.

### Accordion

- **Parts:** Root is a framed box, and items are separated by a rule. Trigger is a full-width bold
  row with a hover fill and the drawn arrow. Content slides open using Bits UI's measured height.
- **States:** `data-state="open"` flips the arrow. A disabled item dims its trigger only.
- **Markup:** no glyph in `Accordion.Trigger`. Content pads its children by `--rb-inset`, so wrap the
  body in one element.

### AlertDialog

- **Parts:** Overlay is a full-screen scrim. Content is centred on whole pixels with the window radius,
  up to 32rem wide, and scrolls past the viewport height. Title uses the display font, large and bold. Description is muted.
  Trigger and Cancel are buttons, and Action is a primary button.
- **Markup:** render `AlertDialog.Overlay` for the scrim.

### AspectRatio

- **Parts:** Root is a framed sunken well that clips its content.

### Avatar

- **Parts:** Root is a framed square, 1.25 × control height. Image covers it, and Fallback is bold muted text.

### Button

- **Parts:** Root is a raised button with a hover fill, and when pressed it sinks or moves.
- **Variants:** default, `data-rb-variant="primary"`, `data-rb-variant="ghost"`.
- **Markup:** `data-rb-button` gives a native `<button>`/`<a>` the same look.

### Calendar

- **Parts:** Root is a framed panel. Header is a row with Heading (bold) and PrevButton/NextButton
  (square buttons). MonthSelect/YearSelect are raised fields with the drawn arrow. Grid has muted
  head cells, and days are control-height squares.
- **States (Day):** `data-today` gets a border, `data-selected` the accent fill. `data-outside-month`
  is muted, `data-unavailable` struck through, `data-disabled` dimmed.
- **Markup:** put the content you want in Prev/Next (e.g. `‹` `›`). Use Heading, or MonthSelect +
  YearSelect, in the header. Inside a picker's popover the frame is dropped.

### Checkbox

- **Parts:** Root is an icon-size box that draws its own mark: an inner accent square when checked, and
  a centred bar when indeterminate. Group is a column, and GroupLabel is bold.
- **States:** `data-state` = `checked` / `unchecked` / `indeterminate`.
- **Markup:** `<Checkbox.Root />` with no children. Wrap it in `Label.Root` with the text to get a
  clickable label that dims with it.

### Collapsible

- **Parts:** Trigger is a full-width bold row with a hover fill and the drawn arrow. Content pads its
  children. There is no frame, so put it in `data-rb-box` if you want one.
- **Markup:** no glyph in the trigger. Wrap the content body in one element.

### Combobox

- **Parts:** Input is a field. Trigger is a square raised button holding only the drawn arrow. Content is a
  floating list. Items are menu rows, GroupHeading is muted, and Separator (Bits UI's `Separator.Root`) and the
  scroll up/down buttons are styled.
- **States (Item):** `data-highlighted` gets the accent fill, `data-selected` the selected surface.
  The trigger's arrow flips while open.
- **Markup:** join input and trigger with `data-rb-group`, and leave the trigger empty with an
  `aria-label`:

  ```svelte
  <div data-rb-group>
  	<Combobox.Input />
  	<Combobox.Trigger aria-label="Open" />
  </div>
  ```

  Use Combobox when typing should filter the options, and Select for a short fixed list.

### Command

- **Parts:** Root is the box. Input becomes its top rule. List scrolls past 7 rows. Items are menu
  rows. Group heading is muted. Separator, Empty and Loading (centred, muted) are styled.
- **States (Item):** the highlighted row is `data-selected` (Command's own convention) and gets the accent
  fill.

### ContextMenu

Same as [DropdownMenu](#dropdownmenu). The trigger area is your own element and isn't styled.

### DateField

- **Parts:** Input is a field well holding the segments. Label is bold, above it. A focused segment gets the
  selected surface, and placeholder segments are muted.
- **Markup:** render the segments from the `segments` snippet inside `DateField.Input`.

### DatePicker

- **Parts:** as [DateField](#datefield), plus a Content popover holding a frameless
  [Calendar](#calendar). A Trigger placed inside the Input becomes the field's end cell: it fills the
  field's full height, sits behind a separator and holds the drawn arrow.
- **Markup:** put `<DatePicker.Trigger aria-label="Open calendar" />` last inside `DatePicker.Input`,
  after the segments, and give it no glyph.

### DateRangeField

- **Parts:** as [DateField](#datefield). Root lays out the label (full width) and the start and end inputs in a
  wrapping row.
- **Markup:** one `DateRangeField.Input` per `type` (`start`, `end`).

### DateRangePicker

- **Parts:** as [DateRangeField](#daterangefield) plus [DatePicker](#datepicker)'s trigger and popover,
  with a [RangeCalendar](#rangecalendar) inside.
- **Markup:** put the Trigger inside the `end` input only.

### Dialog

- **Parts:** as [AlertDialog](#alertdialog). Trigger and Close are buttons.

### DropdownMenu

- **Parts:** Trigger is a button. Content and SubContent are floating panels. Item, CheckboxItem,
  RadioItem and SubTrigger are menu rows. GroupHeading is muted, small and bold. Separator is a rule.
- **States:** `data-highlighted` gets the accent fill. Checkbox and radio items draw their own box or
  circle, filled when `data-state="checked"` (a bar for indeterminate), in the row's text colour so it
  shows on a highlighted row.
- **Markup:** give CheckboxItem/RadioItem only the label text. SubTrigger gets no arrow, so add one
  yourself if you want it.

### Label

- **Parts:** Root is an inline row with a gap and a pointer cursor.
- **States:** dims when it contains a disabled control.
- **Markup:** wrap the control and its text: `<Label.Root><Switch.Root>…</Switch.Root> Text</Label.Root>`.

### LinkPreview

- **Parts:** Content is a padded floating panel. The trigger is your link, styled as a link.

### Menubar

- **Parts:** Root is a framed bar. Trigger is a flat entry that turns accent while its menu is open or
  highlighted. Menus are as in [DropdownMenu](#dropdownmenu).

### Meter

- **Parts:** Root is a sunken track.
- **Markup:** Meter renders no fill. Pass a child with `data-rb-indicator` and set its width:

  ```svelte
  <Meter.Root value={72} max={100}><div data-rb-indicator style="width: 72%"></div></Meter.Root>
  ```

### NavigationMenu

- **Parts:** List is an unframed row. Triggers and top-level Links are flat entries, and a Trigger turns accent
  while open. Viewport is a floating panel that Bits UI sizes to the open content. Links inside
  Content are menu rows, and Indicator is an accent bar.
- **Markup:** render `NavigationMenu.Viewport`. Give each `Content` exactly one wrapper child, because Bits UI
  measures that child:

  ```svelte
  <NavigationMenu.Content>
  	<ul><li><NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link></li></ul>
  </NavigationMenu.Content>
  ```

### Pagination

- **Parts:** Page, PrevButton and NextButton are buttons. The current page (`data-selected`) is
  accent.
- **Markup:** render ellipsis items as your own element. It isn't styled.

### PinInput

- **Parts:** Root is a row of cells. Each Cell is a narrow monospace field, and the active cell gets the accent
  border.

### Popover

- **Parts:** Trigger and Close are buttons. Content is a padded floating panel. Arrow is in the border
  colour.

### Progress

- **Markup:** as [Meter](#meter). Pass a `data-rb-indicator` child and set its width.

### RadioGroup

- **Parts:** Root is a column. Item is an icon-size circle that draws an inner accent dot when checked.
- **Markup:** `<RadioGroup.Item value="…" />` with no children, wrapped in `Label.Root` with its text.

### RangeCalendar

- **Parts:** as [Calendar](#calendar).
- **States (Day):** `data-selection-start` / `data-selection-end` get the accent fill. Days between
  them (`data-selected`) and the hover preview while picking the second end (`data-highlighted`) get
  the selected surface.

### RatingGroup

- **Parts:** Root is a row. Items are coloured: empty is a faint tint of the accent, and
  `data-state="active"` or `partial` is the full accent.
- **Markup:** you render the symbol, e.g. `<RatingGroup.Item index={i}>★</RatingGroup.Item>`. Partial
  colours the whole item.

### ScrollArea

- **Parts:** Scrollbar is a sunken track, `--rb-scrollbar-size` thick, in either orientation. Thumb is a
  raised bar. Corner is sunken.
- **Markup:** size Root and Viewport yourself.

### Select

- **Parts:** Trigger is a raised field with the drawn arrow, and muted while `data-placeholder`. Content,
  items, group headings and scroll buttons are as in [Combobox](#combobox).
- **Markup:** no glyph in the trigger. Bits UI has no `Select.Separator`, so use `Separator.Root`
  inside Content. Native `<select data-rb-field>` matches it for simple cases.

### Separator

- **Parts:** Root is a rule `--rb-border-width` thick. `orientation="vertical"` stands it up, stretched to
  the row.

### Slider

- **Parts:** Root draws the sunken track. Range is the accent fill. Thumb is an icon-size raised square.
  Tick is a thin mark that ignores the pointer. TickLabel and ThumbLabel are small and muted.
  Root adds top margin when it has tick labels.
- **Markup:** render Range, one Thumb per `thumbItems`, and optionally Tick/TickLabel per `tickItems`.

### Switch

- **Parts:** Root is a track two icon cells wide. Thumb is a solid block that moves one cell and inverts
  when checked.
- **Markup:** `<Switch.Root><Switch.Thumb /></Switch.Root>`.

### Tabs

- **Parts:** List is a row on a bottom rule. Trigger is a muted tab, and the active one (`data-state="active"`)
  is framed and joins the panel. Content is padded vertically.

### TimeField / TimeRangeField

As [DateField](#datefield) / [DateRangeField](#daterangefield).

### Toggle

- **Parts:** Root is a button, at least square. `data-state="on"` inverts it to the accent fill.
- **Markup:** give icon-only toggles an `aria-label`.

### ToggleGroup

- **Parts:** Root is a row with a small gap. Items are as [Toggle](#toggle).

### Toolbar

- **Parts:** Root is a framed bar. Button is ghost-style. Link is link-coloured. Group/GroupItem are as
  [ToggleGroup](#togglegroup). Use a vertical `Separator.Root` between sections.

### Tooltip

- **Parts:** Trigger is a button. Content is small inverted text (text colour background). Arrow
  matches the content.

## Tokens

To match the theme in your own CSS, read the tokens rather than hard-coding values. The ones you'll
reach for most:

| Need     | Tokens                                                                                   |
| -------- | ---------------------------------------------------------------------------------------- |
| Text     | `--rb-text`, `--rb-text-muted`, `--rb-text-disabled`, `--rb-text-on-accent`, `--rb-link` |
| Surfaces | `--rb-surface`, `-raised`, `-sunken`, `-hover`, `-active`, `-selected`, `--rb-desktop`   |
| Accent   | `--rb-accent`, `--rb-accent-hover`                                                       |
| Borders  | `--rb-border-width`, `--rb-border-color`, `--rb-radius`, `--rb-radius-window`            |
| Depth    | `--rb-bevel-out`, `--rb-bevel-in` (and `-thin`), `--rb-window-shadow`                    |
| Spacing  | `--rb-space-1` … `--rb-space-6`, `--rb-gap`, `--rb-inset`                                |
| Sizing   | `--rb-control-height`, `--rb-icon-size`, `--rb-menu-item-height`                         |
| Type     | `--rb-font-ui`, `--rb-font-mono`, `--rb-font-size(-sm/-lg)`, `--rb-font-weight(-bold)`   |

`src/lib/themes/contract.ts` lists them all, and `src/lib/css/themes/_contract.css` explains each
one. The playground's `/tokens` page shows them resolved live.
