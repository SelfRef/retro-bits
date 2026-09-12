<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children }: { children: Snippet } = $props();

	const groups = [
		{ href: '/gallery/controls', label: 'Controls' },
		{ href: '/gallery/fields', label: 'Fields' },
		{ href: '/gallery/disclosure', label: 'Disclosure' },
		{ href: '/gallery/overlays', label: 'Overlays' },
		{ href: '/gallery/menus', label: 'Menus' },
		{ href: '/gallery/indicators', label: 'Indicators' },
		{ href: '/gallery/date', label: 'Date & time' },
		{ href: '/gallery/window', label: 'Window chrome' }
	] as const;
</script>

<div class="gallery">
	<nav>
		{#each groups as group (group.href)}
			<a
				href={resolve(group.href)}
				aria-current={page.url.pathname === group.href ? 'page' : undefined}
			>
				{group.label}
			</a>
		{/each}
	</nav>
	<div class="content">{@render children()}</div>
</div>

<style>
	.gallery {
		display: grid;
		gap: var(--rb-space-6);
		grid-template-columns: minmax(9rem, 12rem) 1fr;
		align-items: start;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: var(--rb-space-1);
		position: sticky;
		top: var(--rb-space-5);
	}

	nav a {
		padding: var(--rb-space-2) var(--rb-space-3);
		border-radius: var(--rb-radius);
		color: var(--rb-text-muted);
		text-decoration: none;
	}

	nav a[aria-current='page'] {
		background: var(--rb-surface-selected);
		color: var(--rb-text);
	}

	.content {
		min-width: 0;
	}

	@media (max-width: 48rem) {
		.gallery {
			grid-template-columns: 1fr;
		}

		nav {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
</style>
