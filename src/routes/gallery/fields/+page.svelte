<script lang="ts">
	import { Combobox, Command, PinInput, Select } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	const themes = [
		{ value: 'chicago', label: 'Chicago' },
		{ value: 'platinum', label: 'Platinum' },
		{ value: 'bigblue', label: 'BigBlue' },
		{ value: 'phosphor', label: 'Phosphor' },
		{ value: 'kickstart', label: 'Kickstart' }
	];

	let pin = $state('');
	let selected = $state('chicago');
	let comboValue = $state('');
	let search = $state('');

	const matches = $derived(
		themes.filter((t) => t.label.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<h1>Fields</h1>

<DemoGrid>
	<Demo title="PIN input" note="Cells use the mono face and mark the active one with data-active.">
		<PinInput.Root bind:value={pin} maxlength={6}>
			{#snippet children({ cells })}
				{#each cells as cell, index (index)}
					<PinInput.Cell {cell} />
				{/each}
			{/snippet}
		</PinInput.Root>
	</Demo>

	<Demo
		title="Select"
		note="Content is portalled to the body - it is themed because the attribute is on <html>."
	>
		<Select.Root type="single" bind:value={selected} items={themes}>
			<Select.Trigger>
				{themes.find((t) => t.value === selected)?.label ?? 'Pick a theme'}
			</Select.Trigger>
			<Select.Portal>
				<Select.Content>
					<Select.Viewport>
						{#each themes as theme (theme.value)}
							<Select.Item value={theme.value} label={theme.label}>
								{theme.label}
							</Select.Item>
						{/each}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	</Demo>

	<Demo title="Combobox">
		<Combobox.Root type="single" bind:value={comboValue} items={matches}>
			<Combobox.Input
				placeholder="Filter themes"
				oninput={(event) => (search = event.currentTarget.value)}
			/>
			<Combobox.Trigger aria-label="Open">▾</Combobox.Trigger>
			<Combobox.Portal>
				<Combobox.Content>
					{#each matches as theme (theme.value)}
						<Combobox.Item value={theme.value} label={theme.label}>
							{theme.label}
						</Combobox.Item>
					{:else}
						<div>No matches</div>
					{/each}
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox.Root>
	</Demo>

	<Demo title="Command" unstyled note="Compound enough to deserve its own pass in stage 2.">
		<Command.Root>
			<Command.Input placeholder="Search themes" />
			<Command.List>
				<Command.Empty>No results.</Command.Empty>
				<Command.Group>
					<Command.GroupHeading>Themes</Command.GroupHeading>
					<Command.GroupItems>
						{#each themes as theme (theme.value)}
							<Command.Item value={theme.value}>{theme.label}</Command.Item>
						{/each}
					</Command.GroupItems>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Demo>
</DemoGrid>
