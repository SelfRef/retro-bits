<script lang="ts">
	import { Button, Checkbox, Label } from 'bits-ui';
	import { ThemeProvider } from 'retro-bits';
	import Demo from '$playground/Demo.svelte';

	const panes = [
		{ scheme: 'light', palette: 'mono-light' },
		{ scheme: 'dark', palette: 'mono-dark' },
		{ scheme: 'light', palette: 'sepia-light' },
		{ scheme: 'dark', palette: 'gruvbox-dark' }
	] as const;
</script>

<h1>Nested themes</h1>

<p class="lede">
	Tokens are custom properties, so a nested <code>data-rb-theme</code> simply re-declares them for its
	subtree. Two themes, schemes or palettes can sit side by side in one page with no extra machinery -
	which is what makes a theme picker with live previews possible. Only Mono exists so far, so this shows
	a few of its palettes.
</p>

<p class="lede">
	These use <code>target="scoped"</code> and <code>persist={false}</code>, so they write to their
	own wrapper and leave the page-wide choice alone. The trade-off: portalled content escapes a
	scoped subtree, so a dialog in here would need
	<code>&lt;Dialog.Portal to={'{element}'}&gt;</code>.
</p>

<div class="split">
	{#each panes as { scheme, palette } (palette)}
		<ThemeProvider
			target="scoped"
			theme="mono"
			{scheme}
			palettes={{ [scheme]: palette }}
			persist={false}
		>
			<Demo title={palette}>
				<Label.Root>
					<Checkbox.Root checked />
					Themed independently
				</Label.Root>
				<Button.Root data-rb-variant="primary">OK</Button.Root>
			</Demo>
		</ThemeProvider>
	{/each}
</div>

<style>
	.lede {
		max-width: 60ch;
		color: var(--rb-text-muted);
	}

	.split {
		display: grid;
		gap: var(--rb-space-5);
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		margin-top: var(--rb-space-6);
	}
</style>
