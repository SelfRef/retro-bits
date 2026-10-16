<script lang="ts">
	import { palettesFor, themeList, useTheme, type ColorScheme, type ThemeId } from 'retro-bits';

	const theme = useTheme();
	const schemes: ColorScheme[] = ['light', 'dark'];

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
		<select data-rb-field value={theme.current} onchange={pick} disabled={switching}>
			{#each themeList as entry (entry.id)}
				<option value={entry.id}>{entry.label}</option>
			{/each}
		</select>
	</label>

	{#each schemes as scheme (scheme)}
		{@const options = palettesFor(theme.current, scheme)}
		{#if options.length > 0}
			<label>
				<span>{scheme === 'light' ? 'Light' : 'Dark'}</span>
				<select
					data-rb-field
					value={theme.palettes[scheme]?.id}
					onchange={(e) => theme.setPalette(e.currentTarget.value)}
				>
					{#each options as palette (palette.id)}
						<option value={palette.id}>{palette.label}</option>
					{/each}
				</select>
			</label>
		{/if}
	{/each}

	<button
		type="button"
		data-rb-button
		onclick={() => theme.toggleScheme()}
		disabled={!theme.canToggleScheme}
		title={theme.canToggleScheme
			? 'Toggle light and dark'
			: `${theme.meta.label} only implements ${theme.meta.schemes.join(' and ')}`}
	>
		{theme.resolvedScheme === 'dark' ? 'Dark' : 'Light'}
	</button>

	{#if theme.pending}<span>loading...</span>{/if}
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
	}
</style>
