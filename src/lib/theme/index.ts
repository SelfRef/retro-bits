export { default as ThemeProvider } from './ThemeProvider.svelte';
export { ThemeState, createTheme, useTheme } from './theme.svelte.js';
export {
	THEME_ATTRIBUTE,
	SCHEME_ATTRIBUTE,
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY
} from './constants.js';
export type { ThemeStateOptions } from './theme.svelte.js';
