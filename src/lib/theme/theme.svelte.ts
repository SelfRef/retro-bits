import { getContext, hasContext, setContext } from 'svelte';
import { THEMES, isThemeId } from '../themes/registry.js';
import { loadTheme } from '../themes/loader.js';
import { THEME_STORAGE_KEY, SCHEME_STORAGE_KEY } from './constants.js';
import type { ColorScheme, SchemePreference, ThemeId, ThemeMeta } from '../types.js';

export {
	THEME_ATTRIBUTE,
	SCHEME_ATTRIBUTE,
	THEME_STORAGE_KEY,
	SCHEME_STORAGE_KEY
} from './constants.js';

export interface ThemeStateOptions {
	/** Theme to start on. */
	theme?: ThemeId;
	/** Scheme to start on. `auto` follows the OS. */
	scheme?: SchemePreference;
	/**
	 * Remember the choice in `localStorage` and a cookie, so the server can stamp
	 * the right attribute on the next request and avoid a flash.
	 */
	persist?: boolean;
	/** Cookie lifetime in seconds. Defaults to a year. */
	cookieMaxAge?: number;
}

function isColorScheme(value: unknown): value is ColorScheme {
	return value === 'light' || value === 'dark';
}

function isSchemePreference(value: unknown): value is SchemePreference {
	return value === 'auto' || isColorScheme(value);
}

function readStored(key: string): string | null {
	if (typeof localStorage === 'undefined') return null;
	try {
		return localStorage.getItem(key);
	} catch {
		// Safari in private mode, or storage disabled. Not worth failing over.
		return null;
	}
}

function writeStored(key: string, value: string, cookieMaxAge: number): void {
	try {
		localStorage.setItem(key, value);
	} catch {
		// ignore - see readStored
	}
	if (typeof document !== 'undefined') {
		document.cookie = `${key}=${value}; path=/; max-age=${cookieMaxAge}; samesite=lax`;
	}
}

/**
 * The theme a subtree is on, plus the machinery to change it.
 *
 * Applying the result to the DOM is `ThemeProvider`'s job; this class only owns
 * state, so it can be unit tested without a document.
 */
export class ThemeState {
	#theme = $state<ThemeId>('default');
	#scheme = $state<SchemePreference>('auto');
	#systemScheme = $state<ColorScheme>('light');
	#pending = $state(false);
	#persist: boolean;
	#cookieMaxAge: number;

	constructor(options: ThemeStateOptions = {}) {
		this.#persist = options.persist ?? true;
		this.#cookieMaxAge = options.cookieMaxAge ?? 60 * 60 * 24 * 365;

		const storedTheme = this.#persist ? readStored(THEME_STORAGE_KEY) : null;
		const storedScheme = this.#persist ? readStored(SCHEME_STORAGE_KEY) : null;

		if (isThemeId(storedTheme)) this.#theme = storedTheme;
		else if (options.theme) this.#theme = options.theme;

		if (isSchemePreference(storedScheme)) this.#scheme = storedScheme;
		else if (options.scheme) this.#scheme = options.scheme;
	}

	/** The current theme id. */
	get current(): ThemeId {
		return this.#theme;
	}

	get meta(): ThemeMeta {
		return THEMES[this.#theme];
	}

	/** What was asked for, which may be `auto`. */
	get scheme(): SchemePreference {
		return this.#scheme;
	}

	/**
	 * The scheme actually in force: `auto` resolved against the OS, then clamped
	 * to what the current theme implements. Asking a light-only theme for dark
	 * gives you light rather than a half-styled page.
	 */
	get resolvedScheme(): ColorScheme {
		const wanted = this.#scheme === 'auto' ? this.#systemScheme : this.#scheme;
		// Widened: THEMES is a literal-typed record, so .includes() would otherwise
		// narrow its parameter to never.
		const supported: readonly ColorScheme[] = THEMES[this.#theme].schemes;
		return supported.includes(wanted) ? wanted : supported[0];
	}

	/** True while a theme's stylesheet is still loading. */
	get pending(): boolean {
		return this.#pending;
	}

	/** Whether the current theme offers a choice of scheme at all. */
	get canToggleScheme(): boolean {
		return THEMES[this.#theme].schemes.length > 1;
	}

	/**
	 * Switch theme. Resolves once the theme's CSS is in the document, so callers
	 * that flip the attribute afterwards never show an unstyled frame.
	 */
	async set(id: ThemeId): Promise<void> {
		if (!isThemeId(id)) throw new Error(`retro-bits: unknown theme "${id}"`);
		if (id === this.#theme) return;

		this.#pending = true;
		try {
			await loadTheme(id);
			this.#theme = id;
			if (this.#persist) writeStored(THEME_STORAGE_KEY, id, this.#cookieMaxAge);
		} finally {
			this.#pending = false;
		}
	}

	setScheme(scheme: SchemePreference): void {
		this.#scheme = scheme;
		if (this.#persist) writeStored(SCHEME_STORAGE_KEY, scheme, this.#cookieMaxAge);
	}

	toggleScheme(): void {
		this.setScheme(this.resolvedScheme === 'dark' ? 'light' : 'dark');
	}

	/** Called by the provider once the OS preference is known. */
	setSystemScheme(scheme: ColorScheme): void {
		this.#systemScheme = scheme;
	}

	/**
	 * Track `prefers-color-scheme`. Returns a cleanup function; safe to call on
	 * the server, where it does nothing.
	 */
	watchSystemScheme(): () => void {
		if (typeof matchMedia === 'undefined') return () => {};

		const query = matchMedia('(prefers-color-scheme: dark)');
		const sync = () => this.setSystemScheme(query.matches ? 'dark' : 'light');

		sync();
		query.addEventListener('change', sync);
		return () => query.removeEventListener('change', sync);
	}
}

const CONTEXT_KEY = Symbol.for('retro-bits.theme');

let fallback: ThemeState | undefined;

/**
 * Create the theme state and publish it to descendants. Call this during
 * component initialisation - `ThemeProvider` does it for you.
 */
export function createTheme(options?: ThemeStateOptions): ThemeState {
	const state = new ThemeState(options);
	setContext(CONTEXT_KEY, state);
	return state;
}

/**
 * Read the theme state. Falls back to a module-level instance when there is no
 * provider above, so a component can be dropped into an unthemed app without
 * blowing up.
 */
export function useTheme(): ThemeState {
	try {
		if (hasContext(CONTEXT_KEY)) return getContext<ThemeState>(CONTEXT_KEY);
	} catch {
		// called outside component initialisation - fall through to the singleton
	}
	return (fallback ??= new ThemeState());
}
