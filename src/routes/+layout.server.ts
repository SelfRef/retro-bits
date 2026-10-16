import { readThemeSettings } from 'retro-bits/ssr';
import { defaults } from '$playground/defaults.js';
import type { LayoutServerLoad } from './$types.js';

// Hands the cookie to ThemeProvider so server-rendered text that reads the
// theme (the switcher, the overview) matches the attributes hooks.server.ts stamps.
export const load: LayoutServerLoad = ({ cookies }) =>
	readThemeSettings((key) => cookies.get(key), defaults);
