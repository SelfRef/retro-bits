import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			/*
			 * The playground consumes the library the way a real app does, by its
			 * published specifiers, instead of reaching into `$lib`. That keeps the
			 * public API honest, and makes a later split into a monorepo a matter of
			 * moving two directories and deleting this block.
			 *
			 * The entries mirror the package's `exports` map one for one, so the
			 * playground cannot import something a real consumer could not. Order
			 * matters: Vite tries aliases in declaration order, so the more specific
			 * keys have to come first.
			 */
			alias: {
				'retro-bits/css/*': 'src/lib/css/*',
				'retro-bits/ssr': 'src/lib/ssr.ts',
				'retro-bits': 'src/lib/index.ts',
				// Shared playground pieces, kept out of src/routes so they are not routes.
				$playground: 'src/playground'
			},

			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
