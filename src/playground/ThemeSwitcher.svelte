<script lang="ts">
	import { themeList, useTheme, type ThemeId } from 'retro-bits';

	const theme = useTheme();

	let switching = $state(false);

	async function pick(event: Event) {
		const id = (event.currentTarget as HTMLSelectElement).value as ThemeId;
		switching = true;
		// `set` resolves only once the theme's CSS is in the document, which is what
		// keeps a lazily loaded theme from painting an unstyled frame.
		await theme.set(id);
		switching = false;
	}
</script>

<div class="switcher">
	<label>
		<span>Theme</span>
		<select value={theme.current} onchange={pick} disabled={switching}>
			{#each themeList as entry (entry.id)}
				<option value={entry.id}>
					{entry.label}{entry.status === 'planned' ? ' (planned)' : ''}
				</option>
			{/each}
		</select>
	</label>

	<button
		type="button"
		onclick={() => theme.toggleScheme()}
		disabled={!theme.canToggleScheme}
		title={theme.canToggleScheme
			? 'Toggle light and dark'
			: `${theme.meta.label} only implements ${theme.meta.schemes.join(' and ')}`}
	>
		{theme.resolvedScheme === 'dark' ? 'Dark' : 'Light'}
	</button>

	<span class="status">
		{theme.meta.inspiration}{theme.pending ? ' - loading...' : ''}
	</span>
</div>

<style>
	.switcher {
		display: flex;
		align-items: center;
		gap: var(--rb-gap);
		flex-wrap: wrap;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: var(--rb-space-2);
	}

	span {
		color: var(--rb-text-muted);
		font-size: var(--rb-font-size-sm);
	}

	select,
	button {
		min-height: var(--rb-control-height);
		padding: var(--rb-control-padding-y) var(--rb-control-padding-x);
		border: var(--rb-border-width) solid var(--rb-border-color);
		border-radius: var(--rb-radius);
		background: var(--rb-surface-raised);
		color: var(--rb-text);
		font: inherit;
		cursor: var(--rb-cursor-pointer);
	}

	.status {
		max-width: 20rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
