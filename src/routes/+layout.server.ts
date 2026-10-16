import {
	isThemeId,
	SCHEME_STORAGE_KEY,
	THEME_STORAGE_KEY,
	type SchemePreference
} from 'retro-bits/ssr';
import type { LayoutServerLoad } from './$types.js';

// Hands the cookie to ThemeProvider so server-rendered text that reads the
// theme (the switcher, the overview) matches the attribute hooks.server.ts stamps.
export const load: LayoutServerLoad = ({ cookies }) => {
	const theme = cookies.get(THEME_STORAGE_KEY);
	const scheme = cookies.get(SCHEME_STORAGE_KEY) as SchemePreference | undefined;
	return {
		theme: isThemeId(theme) ? theme : undefined,
		scheme: scheme === 'light' || scheme === 'dark' || scheme === 'auto' ? scheme : undefined
	};
};
