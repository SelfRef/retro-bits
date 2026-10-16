import type { ThemeId } from '../types.js';

/**
 * Per-theme stylesheet loaders.
 *
 * These are only needed if you did *not* import `retro-bits/css/index.css` (which
 * already contains every theme). Apps that care about bytes can import
 * `retro-bits/css/core.css` plus a single theme, and let `loadTheme()` pull in
 * the rest on demand. The specifiers are static so bundlers can see them.
 */
const loaders: Record<ThemeId, () => Promise<unknown>> = {
	default: () => import('../css/themes/default.css')
};

const pending = new Map<ThemeId, Promise<void>>();
const loaded = new Set<ThemeId>();

export function isThemeLoaded(id: ThemeId): boolean {
	return loaded.has(id);
}

/**
 * Ensure a theme's tokens are in the document. Resolves immediately on the
 * server and for themes already loaded, and de-duplicates concurrent calls so
 * rapid switching does not fire the same import twice.
 */
export function loadTheme(id: ThemeId): Promise<void> {
	if (typeof document === 'undefined' || loaded.has(id)) return Promise.resolve();

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
