<script lang="ts">
	import { palettesFor, themeList, useTheme, type ThemeId } from 'retro-bits';

	const theme = useTheme();

	// The current theme's palettes in one list, light first. Picking one also
	// switches to its scheme, the way an app's own theme menu would.
	const groups = $derived(
		(['light', 'dark'] as const).map((scheme) => ({
			scheme,
			label: scheme === 'light' ? 'Light' : 'Dark',
			palettes: palettesFor(theme.current, scheme)
		}))
	);

	async function pickTheme(event: Event & { currentTarget: HTMLSelectElement }) {
		// `set` resolves only once the theme's CSS is in the document, which is what
		// keeps a lazily loaded theme from painting an unstyled frame.
		await theme.set(event.currentTarget.value as ThemeId);
	}

	function pickPalette(event: Event & { currentTarget: HTMLSelectElement }) {
		theme.setScheme(theme.setPalette(event.currentTarget.value).scheme);
	}
</script>

<div class="switcher">
	<label>
		<span>Theme</span>
		<select data-rb-field value={theme.current} onchange={pickTheme} disabled={theme.pending}>
			{#each themeList as entry (entry.id)}
				<option value={entry.id}>{entry.label}</option>
			{/each}
		</select>
	</label>

	<label>
		<span>Palette</span>
		<select data-rb-field value={theme.palette?.id} onchange={pickPalette}>
			{#each groups as group (group.scheme)}
				{#if group.palettes.length > 0}
					<optgroup label={group.label}>
						{#each group.palettes as palette (palette.id)}
							<option value={palette.id}>{palette.label}</option>
						{/each}
					</optgroup>
				{/if}
			{/each}
		</select>
	</label>
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
