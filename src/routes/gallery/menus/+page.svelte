<script lang="ts">
	import { ContextMenu, DropdownMenu, Menubar, NavigationMenu } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	let scanlines = $state(true);
	let density = $state('comfortable');
	let grid = $state(false);
	let wrap = $state(true);
	let view = $state('list');
</script>

<h1>Menus</h1>

<DemoGrid>
	<Demo title="Dropdown menu" note="Rows highlight from data-highlighted, not :hover.">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>File</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content sideOffset={4}>
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>Document</DropdownMenu.GroupHeading>
						<DropdownMenu.Item>New</DropdownMenu.Item>
						<DropdownMenu.Item>Open</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem bind:checked={scanlines}>Scanlines</DropdownMenu.CheckboxItem>
					<DropdownMenu.Separator />
					<DropdownMenu.RadioGroup bind:value={density}>
						<DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
					<DropdownMenu.Separator />
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>More<span aria-hidden="true">▸</span></DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
							<DropdownMenu.Item>Export</DropdownMenu.Item>
							<DropdownMenu.Item>Print</DropdownMenu.Item>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</Demo>

	<Demo
		title="Context menu"
		note="Uses its own data-context-menu-* prefix, styled alongside the rest."
	>
		<ContextMenu.Root>
			<ContextMenu.Trigger class="context-target">Right click here</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content>
					<ContextMenu.Item>Cut</ContextMenu.Item>
					<ContextMenu.Item>Copy</ContextMenu.Item>
					<ContextMenu.Item disabled>Paste</ContextMenu.Item>
					<ContextMenu.Separator />
					<ContextMenu.CheckboxItem bind:checked={grid}>Show grid</ContextMenu.CheckboxItem>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger>Arrange<span aria-hidden="true">▸</span></ContextMenu.SubTrigger
						>
						<ContextMenu.SubContent>
							<ContextMenu.Item>Bring forward</ContextMenu.Item>
							<ContextMenu.Item>Send back</ContextMenu.Item>
						</ContextMenu.SubContent>
					</ContextMenu.Sub>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	</Demo>

	<Demo title="Menubar" note="Triggers invert while their menu is open; arrow keys move along.">
		<Menubar.Root>
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content sideOffset={4}>
						<Menubar.Item>New</Menubar.Item>
						<Menubar.Item>Open</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Item>Quit</Menubar.Item>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content sideOffset={4}>
						<Menubar.Item>Undo</Menubar.Item>
						<Menubar.Item disabled>Redo</Menubar.Item>
						<Menubar.Separator />
						<Menubar.CheckboxItem bind:checked={wrap}>Word wrap</Menubar.CheckboxItem>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>View</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content sideOffset={4}>
						<Menubar.RadioGroup bind:value={view}>
							<Menubar.GroupHeading>Layout</Menubar.GroupHeading>
							<Menubar.RadioItem value="list">List</Menubar.RadioItem>
							<Menubar.RadioItem value="grid">Grid</Menubar.RadioItem>
						</Menubar.RadioGroup>
						<Menubar.Separator />
						<Menubar.Sub>
							<Menubar.SubTrigger>Zoom<span aria-hidden="true">▸</span></Menubar.SubTrigger>
							<Menubar.SubContent>
								<Menubar.Item>In</Menubar.Item>
								<Menubar.Item>Out</Menubar.Item>
							</Menubar.SubContent>
						</Menubar.Sub>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
		</Menubar.Root>
	</Demo>

	<Demo
		title="Navigation menu"
		note="Content opens into one shared viewport, sized by Bits UI from Content's single child."
	>
		<NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Playground</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul>
							<li><NavigationMenu.Link href="/gallery">Gallery</NavigationMenu.Link></li>
							<li><NavigationMenu.Link href="/tokens">Tokens</NavigationMenu.Link></li>
							<li><NavigationMenu.Link href="/nested">Nested themes</NavigationMenu.Link></li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Links</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<ul>
							<li><NavigationMenu.Link href="https://bits-ui.com">Bits UI</NavigationMenu.Link></li>
							<li>
								<NavigationMenu.Link href="https://owickstrom.github.io/the-monospace-web/">
									The Monospace Web
								</NavigationMenu.Link>
							</li>
						</ul>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/">Overview</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Indicator />
			</NavigationMenu.List>
			<NavigationMenu.Viewport />
		</NavigationMenu.Root>
	</Demo>
</DemoGrid>

<style>
	:global(.context-target) {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 6rem;
		border: var(--rb-border-width) dashed var(--rb-border-color);
		border-radius: var(--rb-radius);
		color: var(--rb-text-muted);
	}
</style>
