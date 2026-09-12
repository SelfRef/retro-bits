/**
 * The token contract every retro-bits theme must satisfy.
 *
 * Component CSS only ever reads `var(--rb-*)`; it never names a theme. A theme is
 * therefore nothing but a complete set of these custom properties, and
 * `scripts/check-tokens.mjs` fails the build if any theme file is missing one.
 *
 * Keep this in sync with `css/themes/_contract.css`, which documents what each
 * token is for.
 */
export const RB_TOKEN_GROUPS = {
	meta: ['--rb-theme-name', '--rb-color-scheme'],

	surface: [
		'--rb-surface',
		'--rb-surface-raised',
		'--rb-surface-sunken',
		'--rb-surface-hover',
		'--rb-surface-active',
		'--rb-surface-disabled',
		'--rb-surface-selected',
		'--rb-accent',
		'--rb-accent-hover',
		'--rb-accent-active',
		'--rb-desktop',
		'--rb-overlay'
	],

	text: [
		'--rb-text',
		'--rb-text-muted',
		'--rb-text-disabled',
		'--rb-text-inverted',
		'--rb-text-on-accent',
		'--rb-link',
		'--rb-selection-bg',
		'--rb-selection-text'
	],

	// The expressiveness lever: themes supply whole composite values, not just
	// colours, so a Win9x four-layer bevel and a NeXT hairline are the same token.
	border: [
		'--rb-border-width',
		'--rb-border-color',
		'--rb-border-color-muted',
		'--rb-radius',
		'--rb-radius-window',
		'--rb-bevel-light',
		'--rb-bevel-lighter',
		'--rb-bevel-shadow',
		'--rb-bevel-darker',
		'--rb-bevel-out',
		'--rb-bevel-in',
		'--rb-bevel-out-thin',
		'--rb-bevel-in-thin',
		'--rb-bevel-flat',
		'--rb-bevel-pressed'
	],

	focus: ['--rb-focus-color', '--rb-focus-width', '--rb-focus-offset', '--rb-focus-style'],

	typography: [
		'--rb-font-ui',
		'--rb-font-mono',
		'--rb-font-display',
		'--rb-font-size',
		'--rb-font-size-sm',
		'--rb-font-size-lg',
		'--rb-line-height',
		'--rb-font-weight',
		'--rb-font-weight-bold',
		'--rb-letter-spacing',
		'--rb-text-transform',
		'--rb-font-smoothing',
		'--rb-font-features'
	],

	metrics: [
		'--rb-unit',
		'--rb-cell-w',
		'--rb-cell-h',
		'--rb-space-1',
		'--rb-space-2',
		'--rb-space-3',
		'--rb-space-4',
		'--rb-space-5',
		'--rb-space-6',
		'--rb-control-height',
		'--rb-control-padding-x',
		'--rb-control-padding-y',
		'--rb-gap',
		'--rb-inset',
		'--rb-titlebar-height',
		'--rb-scrollbar-size',
		'--rb-icon-size',
		'--rb-menu-item-height'
	],

	window: [
		'--rb-window-bg',
		'--rb-window-border',
		'--rb-window-bevel',
		'--rb-window-shadow',
		'--rb-titlebar-bg',
		'--rb-titlebar-bg-inactive',
		'--rb-titlebar-text',
		'--rb-titlebar-text-inactive',
		'--rb-titlebar-font',
		'--rb-titlebar-padding',
		'--rb-titlebar-button-size',
		'--rb-titlebar-button-bevel'
	],

	decoration: [
		'--rb-pattern-desktop',
		'--rb-pattern-dither',
		'--rb-pattern-titlebar',
		'--rb-scanlines',
		'--rb-glow',
		'--rb-image-rendering',
		'--rb-cursor',
		'--rb-cursor-pointer',
		'--rb-cursor-text'
	],

	motion: [
		'--rb-duration-fast',
		'--rb-duration',
		'--rb-duration-slow',
		'--rb-ease',
		'--rb-transition'
	]
} as const;

export type RbTokenGroup = keyof typeof RB_TOKEN_GROUPS;

export type RbToken = (typeof RB_TOKEN_GROUPS)[RbTokenGroup][number];

/** Every token in the contract, flattened, in group order. */
export const RB_TOKENS: readonly RbToken[] = Object.values(RB_TOKEN_GROUPS).flat();

export const RB_TOKEN_GROUP_NAMES = Object.keys(RB_TOKEN_GROUPS) as readonly RbTokenGroup[];
