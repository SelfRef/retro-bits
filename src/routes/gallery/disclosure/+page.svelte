<script lang="ts">
	import { Accordion, Collapsible, Tabs } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	const entries = [
		{ id: 'chicago', label: 'Chicago', body: 'Windows 9x. Four-layer bevels, dotted focus.' },
		{ id: 'platinum', label: 'Platinum', body: 'Mac OS 9. Pinstripe title bars.' },
		{ id: 'cube', label: 'Cube', body: 'NeXTSTEP. Flat chrome and hairlines.' }
	];
</script>

<h1>Disclosure</h1>

<DemoGrid>
	<Demo
		title="Accordion"
		note="Height animates against --bits-accordion-content-height, which Bits UI measures for us."
	>
		<Accordion.Root type="single" style="width: 100%">
			{#each entries as entry (entry.id)}
				<Accordion.Item value={entry.id}>
					<Accordion.Header>
						<Accordion.Trigger>{entry.label}<span aria-hidden="true">▾</span></Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content><p>{entry.body}</p></Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</Demo>

	<Demo title="Collapsible">
		<Collapsible.Root style="width: 100%">
			<Collapsible.Trigger>Show details<span aria-hidden="true">▾</span></Collapsible.Trigger>
			<Collapsible.Content><p>Nine themes, one token contract.</p></Collapsible.Content>
		</Collapsible.Root>
	</Demo>

	<Demo title="Tabs">
		<Tabs.Root value="chicago" style="width: 100%">
			<Tabs.List>
				{#each entries as entry (entry.id)}
					<Tabs.Trigger value={entry.id}>{entry.label}</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each entries as entry (entry.id)}
				<Tabs.Content value={entry.id}>{entry.body}</Tabs.Content>
			{/each}
		</Tabs.Root>
	</Demo>
</DemoGrid>
