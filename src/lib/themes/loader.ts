import type { ThemeId } from '../types.js';
import { THEMES } from './registry.js';
import { THEME_ATTRIBUTE } from '../theme/constants.js';

/**
 * Per-theme stylesheet loaders.
 *
 * These are only needed if you did *not* import `retro-bits/css/index.css` (which
 * already contains every theme). Apps that care about bytes can import
 * `retro-bits/css/core.css` plus a single theme, and let `loadTheme()` pull in
 * the rest on demand. The specifiers are static so bundlers can see them.
 */
const loaders: Record<ThemeId, () => Promise<unknown>> = {
	mono: () => import('../css/themes/mono.css')
};

const pending = new Map<ThemeId, Promise<void>>();
const loaded = new Set<ThemeId>();

/**
 * True once a theme's tokens are in the document, whether `loadTheme()` brought
 * them in or a static import did (`css/index.css` carries every theme).
 *
 * The probe reads `--rb-theme-name` off a throwaway element. Custom properties
 * inherit, so an unloaded theme reports the page's current theme name instead
 * of its own - which is why the name is compared, not just checked for presence.
 */
export function isThemeLoaded(id: ThemeId): boolean {
	if (loaded.has(id)) return true;
	if (typeof document === 'undefined') return false;

	const probe = document.createElement('span');
	probe.setAttribute(THEME_ATTRIBUTE, id);
	probe.hidden = true;
	document.body.append(probe);
	const name = getComputedStyle(probe).getPropertyValue('--rb-theme-name');
	probe.remove();

	if (name.replace(/['"]/g, '').trim() !== THEMES[id].label) return false;
	loaded.add(id);
	return true;
}

/**
 * Ensure a theme's tokens are in the document. Resolves immediately on the
 * server and for themes already loaded, and de-duplicates concurrent calls so
 * rapid switching does not fire the same import twice.
 */
export function loadTheme(id: ThemeId): Promise<void> {
	if (typeof document === 'undefined' || isThemeLoaded(id)) return Promise.resolve();

	let promise = pending.get(id);
	if (!promise) {
		promise = loaders[id]()
			.then(() => {
				loaded.add(id);
			})
			.finally(() => {
				pending.delete(id);
			});
		pending.set(id, promise);
	}
	return promise;
}
