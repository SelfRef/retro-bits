<script lang="ts">
	import {
		Button,
		Checkbox,
		Label,
		RadioGroup,
		RatingGroup,
		Separator,
		Switch,
		Toggle,
		ToggleGroup,
		Toolbar
	} from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	let checked = $state(true);
	let indeterminate = $state(false);
	let on = $state(false);
	let formats = $state<string[]>(['bold']);
	let choice = $state('chicago');
	let rating = $state(3);
	let toolbarFormats = $state<string[]>([]);
	let features = $state<string[]>(['grid']);
</script>

<h1>Controls</h1>

<DemoGrid>
	<Demo title="Button" note="`data-rb-variant` asks for a different treatment without a wrapper.">
		<Button.Root>Default</Button.Root>
		<Button.Root data-rb-variant="primary">Primary</Button.Root>
		<Button.Root data-rb-variant="ghost">Ghost</Button.Root>
		<Button.Root disabled>Disabled</Button.Root>
	</Demo>

	<Demo
		title="Checkbox"
		note="The theme draws the mark from data-state, including indeterminate - no children needed."
	>
		<Label.Root>
			<Checkbox.Root bind:checked bind:indeterminate />
			Accept
		</Label.Root>
		<Button.Root onclick={() => (indeterminate = !indeterminate)}>Toggle mixed</Button.Root>
		<Label.Root>
			<Checkbox.Root disabled />
			Disabled
		</Label.Root>
	</Demo>

	<Demo title="Checkbox group">
		<Checkbox.Group bind:value={features} name="features">
			<Checkbox.GroupLabel>Features</Checkbox.GroupLabel>
			{#each ['grid', 'scanlines', 'sound'] as id (id)}
				<Label.Root>
					<Checkbox.Root value={id} disabled={id === 'sound'} />
					{id}
				</Label.Root>
			{/each}
		</Checkbox.Group>
	</Demo>

	<Demo title="Switch">
		<Label.Root>
			<Switch.Root bind:checked={on}><Switch.Thumb /></Switch.Root>
			Scanlines
		</Label.Root>
		<Label.Root>
			<Switch.Root checked disabled><Switch.Thumb /></Switch.Root>
			Locked
		</Label.Root>
	</Demo>

	<Demo title="Toggle & toggle group">
		<Toggle.Root aria-label="Bold">B</Toggle.Root>
		<ToggleGroup.Root type="multiple" bind:value={formats}>
			<ToggleGroup.Item value="bold" aria-label="Bold">B</ToggleGroup.Item>
			<ToggleGroup.Item value="italic" aria-label="Italic">I</ToggleGroup.Item>
			<ToggleGroup.Item value="underline" aria-label="Underline">U</ToggleGroup.Item>
			<ToggleGroup.Item value="strike" aria-label="Strikethrough" disabled>S</ToggleGroup.Item>
		</ToggleGroup.Root>
	</Demo>

	<Demo title="Radio group">
		<RadioGroup.Root bind:value={choice}>
			{#each ['chicago', 'platinum', 'cube'] as id (id)}
				<Label.Root>
					<RadioGroup.Item value={id} disabled={id === 'cube'} />
					{id}
				</Label.Root>
			{/each}
		</RadioGroup.Root>
	</Demo>

	<Demo title="Rating group">
		<RatingGroup.Root bind:value={rating} max={5} aria-label="Rating">
			{#snippet children({ items })}
				{#each items as item (item.index)}
					<RatingGroup.Item index={item.index}>★</RatingGroup.Item>
				{/each}
			{/snippet}
		</RatingGroup.Root>
	</Demo>

	<Demo title="Separator">
		<span>Before</span>
		<Separator.Root orientation="vertical" />
		<span>After</span>
	</Demo>

	<Demo title="Toolbar">
		<Toolbar.Root>
			<Toolbar.Group type="multiple" bind:value={toolbarFormats}>
				<Toolbar.GroupItem value="bold" aria-label="Bold">B</Toolbar.GroupItem>
				<Toolbar.GroupItem value="italic" aria-label="Italic">I</Toolbar.GroupItem>
			</Toolbar.Group>
			<Separator.Root orientation="vertical" />
			<Toolbar.Button>Run</Toolbar.Button>
			<Toolbar.Link href="https://bits-ui.com">Docs</Toolbar.Link>
		</Toolbar.Root>
	</Demo>
</DemoGrid>
