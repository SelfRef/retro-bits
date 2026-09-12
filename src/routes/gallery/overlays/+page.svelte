<script lang="ts">
	import { AlertDialog, Button, Dialog, LinkPreview, Popover, Tooltip } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';
</script>

<h1>Overlays</h1>

<p class="lede">
	Bits UI portals all of these to <code>document.body</code>. They are themed anyway because
	<code>ThemeProvider</code> writes <code>data-rb-theme</code> to the document element rather than to
	a wrapper - switch the theme with a dialog open to see it follow.
</p>

<DemoGrid>
	<Demo title="Dialog">
		<Dialog.Root>
			<Dialog.Trigger>Open dialog</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title>Change theme</Dialog.Title>
					<Dialog.Description>
						This content lives at the end of the body, outside the app's DOM.
					</Dialog.Description>
					<Dialog.Close>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	</Demo>

	<Demo title="Alert dialog">
		<AlertDialog.Root>
			<AlertDialog.Trigger>Delete theme</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay />
				<AlertDialog.Content>
					<AlertDialog.Title>Are you sure?</AlertDialog.Title>
					<AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
					<div class="actions">
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action>Delete</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	</Demo>

	<Demo title="Popover">
		<Popover.Root>
			<Popover.Trigger>Open popover</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content sideOffset={8}>
					<p>Popovers, menus and tooltips share one surface rule.</p>
					<Popover.Close>Dismiss</Popover.Close>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	</Demo>

	<Demo title="Tooltip">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>Hover me</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content sideOffset={8}>Inverted surface, small type.</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Demo>

	<Demo title="Link preview">
		<LinkPreview.Root>
			<LinkPreview.Trigger href="https://bits-ui.com">bits-ui.com</LinkPreview.Trigger>
			<LinkPreview.Portal>
				<LinkPreview.Content sideOffset={8}>
					<strong>Bits UI</strong>
					<p>Headless components for Svelte.</p>
				</LinkPreview.Content>
			</LinkPreview.Portal>
		</LinkPreview.Root>
	</Demo>

	<Demo title="Switch theme with an overlay open" note="Proof that portalled content is themed.">
		<Dialog.Root>
			<Dialog.Trigger>Open, then change the theme above</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title>Still here</Dialog.Title>
					<Dialog.Description>
						The switcher in the header stays reachable - the dialog restyles in place.
					</Dialog.Description>
					<Button.Root data-rb-variant="primary">A themed button, portalled</Button.Root>
					<Dialog.Close>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	</Demo>
</DemoGrid>

<style>
	.lede {
		max-width: 60ch;
		margin-bottom: var(--rb-space-6);
		color: var(--rb-text-muted);
	}

	.actions {
		display: flex;
		gap: var(--rb-gap);
		justify-content: flex-end;
	}
</style>
