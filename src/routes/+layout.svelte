<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	// The everything bundle: core plus all nine themes, so switching needs no
	// loading step. An app that only ever uses one theme would import
	// `retro-bits/css/core.css` and that theme instead.
	import 'retro-bits/css/index.css';
	import { ThemeProvider } from 'retro-bits';
	import ThemeSwitcher from '$playground/ThemeSwitcher.svelte';

	let { children }: { children: Snippet } = $props();

	const sections = [
		{ href: '/', label: 'Overview' },
		{ href: '/gallery', label: 'Gallery' },
		{ href: '/tokens', label: 'Tokens' },
		{ href: '/nested', label: 'Nested themes' }
	] as const;

	const isCurrent = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<ThemeProvider>
	<div class="shell">
		<header>
			<a class="wordmark" href={resolve('/')}>retro-bits</a>
			<nav>
				{#each sections as section (section.href)}
					<a
						href={resolve(section.href)}
						aria-current={isCurrent(section.href) ? 'page' : undefined}
					>
						{section.label}
					</a>
				{/each}
			</nav>
			<ThemeSwitcher />
		</header>
		<main>{@render children()}</main>
	</div>
</ThemeProvider>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		display: flex;
		align-items: center;
		gap: var(--rb-space-5);
		flex-wrap: wrap;
		padding: var(--rb-space-3) var(--rb-space-5);
		border-bottom: var(--rb-border-width) solid var(--rb-border-color);
		background: var(--rb-surface);
	}

	.wordmark {
		color: var(--rb-text);
		font-family: var(--rb-font-display);
		font-weight: var(--rb-font-weight-bold);
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: var(--rb-space-4);
		margin-right: auto;
	}

	nav a {
		color: var(--rb-text-muted);
		text-decoration: none;
	}

	nav a[aria-current='page'] {
		color: var(--rb-text);
		text-decoration: underline;
	}

	main {
		flex: 1;
		padding: var(--rb-space-6) var(--rb-space-5);
	}
</style>
