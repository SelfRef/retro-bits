/**
 * retro-bits - retro operating system themes for Bits UI, plus the chrome Bits
 * UI has no concept of.
 *
 * Themes are CSS. Import `retro-bits/css/index.css` (or `core.css` plus the themes you
 * want), put `data-rb-theme` on an element, and every Bits UI component beneath
 * it is themed - no wrappers, no re-exports to keep in step with bits-ui.
 */
export * from './components/index.js';
export * from './theme/index.js';
export * from './themes/index.js';
export { themeAttributes, noFlashScript } from './ssr.js';
