<script lang="ts">
	import { Button, Checkbox, Label } from 'bits-ui';
	import { ThemeProvider } from 'retro-bits';
	import Demo from '$playground/Demo.svelte';

	const schemes = ['light', 'dark'] as const;
</script>

<h1>Nested themes</h1>

<p class="lede">
	Tokens are custom properties, so a nested <code>data-rb-theme</code> simply re-declares them for its
	subtree. Two themes or schemes can sit side by side in one page with no extra machinery - which is what
	makes a theme picker with live previews possible. Only Mono exists so far, so this shows its two schemes.
</p>

<p class="lede">
	These use <code>target="scoped"</code> and <code>persist={false}</code>, so they write to their
	own wrapper and leave the page-wide choice alone. The trade-off: portalled content escapes a
	scoped subtree, so a dialog in here would need
	<code>&lt;Dialog.Portal to={'{element}'}&gt;</code>.
</p>

<div class="split">
	{#each schemes as scheme (scheme)}
		<ThemeProvider target="scoped" theme="mono" {scheme} persist={false}>
			<Demo title="Mono, {scheme}">
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
