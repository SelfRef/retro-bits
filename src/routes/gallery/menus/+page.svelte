<script lang="ts">
	import { ContextMenu, DropdownMenu, Menubar, NavigationMenu } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	let scanlines = $state(true);
	let density = $state('comfortable');
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
					<ContextMenu.Separator />
					<ContextMenu.Item>Paste</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	</Demo>

	<Demo
		title="Menubar"
		unstyled
		note="A menu bar is era-defining chrome - it gets a real pass per theme."
	>
		<Menubar.Root>
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content>
						<Menubar.Item>New</Menubar.Item>
						<Menubar.Item>Quit</Menubar.Item>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content>
						<Menubar.Item>Undo</Menubar.Item>
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
		</Menubar.Root>
	</Demo>

	<Demo title="Navigation menu" unstyled>
		<NavigationMenu.Root>
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Themes</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<NavigationMenu.Link href="/gallery">Gallery</NavigationMenu.Link>
						<NavigationMenu.Link href="/tokens">Tokens</NavigationMenu.Link>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
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
