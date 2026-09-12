<script lang="ts">
	import { Button, Checkbox, Label } from 'bits-ui';
	import { Panel, ThemeProvider, Window, themeList, type ThemeId } from 'retro-bits';
	import Demo from '$playground/Demo.svelte';

	let left = $state<ThemeId>('default');
	let right = $state<ThemeId>('phosphor');
</script>

<h1>Nested themes</h1>

<p class="lede">
	Tokens are custom properties, so a nested <code>data-rb-theme</code> simply re-declares them for its
	subtree. Two themes can sit side by side in one page with no extra machinery - which is what makes a
	theme picker with live previews possible.
</p>

<p class="lede">
	These use <code>target="scoped"</code> and <code>persist={false}</code>, so they write to their
	own wrapper and leave the page-wide choice alone. The trade-off: portalled content escapes a
	scoped subtree, so a dialog in here would need
	<code>&lt;Dialog.Portal to={'{element}'}&gt;</code>.
</p>

<div class="split">
	{#each [{ id: left, set: (v: ThemeId) => (left = v) }, { id: right, set: (v: ThemeId) => (right = v) }] as pane, index (index)}
		<div class="pane">
			<select value={pane.id} onchange={(e) => pane.set(e.currentTarget.value as ThemeId)}>
				{#each themeList as entry (entry.id)}
					<option value={entry.id}>{entry.label}</option>
				{/each}
			</select>

			<ThemeProvider target="scoped" theme={pane.id} persist={false}>
				<Demo title={pane.id}>
					<Window label="Preview" style="width: 100%">
						<Panel variant="sunken">
							<Label.Root>
								<Checkbox.Root checked>
									{#snippet children({ checked })}
										<span aria-hidden="true">{checked ? '✓' : ''}</span>
									{/snippet}
								</Checkbox.Root>
								Themed independently
							</Label.Root>
						</Panel>
						<Button.Root data-rb-variant="primary">OK</Button.Root>
					</Window>
				</Demo>
			</ThemeProvider>
		</div>
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

	.pane {
		display: flex;
		flex-direction: column;
		gap: var(--rb-space-3);
	}

	select {
		align-self: flex-start;
		min-height: var(--rb-control-height);
		padding: var(--rb-control-padding-y) var(--rb-control-padding-x);
		border: var(--rb-border-width) solid var(--rb-border-color);
		border-radius: var(--rb-radius);
		background: var(--rb-surface-raised);
		color: var(--rb-text);
		font: inherit;
	}
</style>
