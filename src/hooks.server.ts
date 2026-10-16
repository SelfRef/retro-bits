import type { Handle } from '@sveltejs/kit';
import { noFlashScript, themeAttributes } from 'retro-bits/ssr';

/**
 * Stamps the theme onto the server-rendered HTML so the first paint is already
 * themed. This is the no-flash story an app is expected to copy - it is why
 * `retro-bits/ssr` exists as an entry point with no Svelte runtime in it.
 */
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html
				.replace(
					'%rb.theme%',
					themeAttributes((key) => event.cookies.get(key))
				)
				.replace('%rb.noflash%', noFlashScript())
	});
