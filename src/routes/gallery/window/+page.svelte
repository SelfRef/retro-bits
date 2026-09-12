<script lang="ts">
	import { Button, Checkbox, Label } from 'bits-ui';
	import {
		Desktop,
		GroupBox,
		Panel,
		StatusBar,
		StatusBarSegment,
		TitleBar,
		Window,
		WindowControls
	} from 'retro-bits';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	let closed = $state(false);
	let crisp = $state(true);
</script>

<h1>Window chrome</h1>

<p class="lede">
	retro-bits' own components. Bits UI has no concept of a window frame or a title bar, and these are
	where the eras differ most, so the markup is ours and stays stable across themes.
</p>

<DemoGrid>
	<Demo
		title="Window"
		note="Active and inactive chrome, plus the controls that are actually wired."
	>
		<div class="stack">
			<Window label="README.TXT" style="width: 100%">
				{#snippet controls()}
					<WindowControls
						onminimize={() => {}}
						onmaximize={() => {}}
						onclose={() => (closed = true)}
					/>
				{/snippet}
				<p>A button only appears for a handler you supply.</p>
				{#if closed}<p><em>You closed it. Not really.</em></p>{/if}
			</Window>

			<Window label="Background window" active={false} style="width: 100%">
				{#snippet controls()}
					<WindowControls onclose={() => {}} />
				{/snippet}
				<p>Inactive chrome comes from the title bar tokens, not from opacity.</p>
			</Window>
		</div>
	</Demo>

	<Demo title="Title bar on its own">
		<div class="stack">
			<TitleBar label="Active" />
			<TitleBar label="Inactive" active={false} />
		</div>
	</Demo>

	<Demo title="Panel">
		<div class="stack">
			<Panel variant="raised">Raised</Panel>
			<Panel variant="sunken">Sunken</Panel>
			<Panel variant="flat">Flat</Panel>
		</div>
	</Demo>

	<Demo title="Group box">
		<GroupBox label="Display" style="width: 100%">
			<Label.Root>
				<Checkbox.Root bind:checked={crisp}>
					{#snippet children({ checked })}
						<span aria-hidden="true">{checked ? '✓' : ''}</span>
					{/snippet}
				</Checkbox.Root>
				Crisp bitmap scaling
			</Label.Root>
		</GroupBox>
	</Demo>

	<Demo title="Status bar">
		<StatusBar style="width: 100%">
			<StatusBarSegment grow>Ready</StatusBarSegment>
			<StatusBarSegment>9 themes</StatusBarSegment>
			<StatusBarSegment>NUM</StatusBarSegment>
		</StatusBar>
	</Demo>

	<Demo
		title="Desktop"
		note="Draws --rb-pattern-desktop and the theme's CRT overlay. Both are `none` in Default."
	>
		<Desktop style="width: 100%; min-height: 12rem">
			<Window label="Welcome">
				{#snippet controls()}
					<WindowControls onclose={() => {}} />
				{/snippet}
				<p>A window on a desktop.</p>
				<Button.Root data-rb-variant="primary">OK</Button.Root>
			</Window>
		</Desktop>
	</Demo>
</DemoGrid>

<style>
	.lede {
		max-width: 60ch;
		margin-bottom: var(--rb-space-6);
		color: var(--rb-text-muted);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--rb-gap);
		width: 100%;
	}
</style>
