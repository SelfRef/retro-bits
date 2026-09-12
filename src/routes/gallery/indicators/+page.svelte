<script lang="ts">
	import { AspectRatio, Avatar, Meter, Pagination, Progress, ScrollArea, Slider } from 'bits-ui';
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';

	let loaded = $state(62);
	let volume = $state([40]);
	let page = $state(1);
</script>

<h1>Indicators</h1>

<DemoGrid>
	<Demo
		title="Progress"
		note="Progress renders no fill of its own, so the child is marked with data-rb-indicator."
	>
		<Progress.Root value={loaded} max={100} style="width: 100%">
			<div data-rb-indicator style="width: {loaded}%"></div>
		</Progress.Root>
		<input type="range" min="0" max="100" bind:value={loaded} aria-label="Progress" />
	</Demo>

	<Demo title="Meter">
		<Meter.Root value={72} max={100} style="width: 100%">
			<div data-rb-indicator style="width: 72%"></div>
		</Meter.Root>
	</Demo>

	<Demo title="Slider">
		<Slider.Root type="multiple" bind:value={volume} max={100} style="width: 100%">
			{#snippet children({ thumbItems })}
				<Slider.Range />
				{#each thumbItems as thumb (thumb.index)}
					<Slider.Thumb index={thumb.index} />
				{/each}
			{/snippet}
		</Slider.Root>
	</Demo>

	<Demo title="Pagination">
		<Pagination.Root count={100} perPage={10} bind:page>
			{#snippet children({ pages })}
				<Pagination.PrevButton>‹</Pagination.PrevButton>
				{#each pages as item (item.key)}
					{#if item.type === 'ellipsis'}
						<span>…</span>
					{:else}
						<Pagination.Page page={item}>{item.value}</Pagination.Page>
					{/if}
				{/each}
				<Pagination.NextButton>›</Pagination.NextButton>
			{/snippet}
		</Pagination.Root>
	</Demo>

	<Demo title="Avatar">
		<Avatar.Root>
			<Avatar.Image src="/favicon.svg" alt="retro-bits" />
			<Avatar.Fallback>RB</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="/does-not-exist.png" alt="" />
			<Avatar.Fallback>9x</Avatar.Fallback>
		</Avatar.Root>
	</Demo>

	<Demo title="Aspect ratio">
		<div style="width: 100%">
			<AspectRatio.Root ratio={16 / 9}>
				<div class="ratio-body">16 : 9</div>
			</AspectRatio.Root>
		</div>
	</Demo>

	<Demo title="Scroll area" note="The scrollbar is chrome, so it reads --rb-scrollbar-size.">
		<ScrollArea.Root style="width: 100%; height: 8rem">
			<ScrollArea.Viewport style="width: 100%; height: 100%">
				{#each Array.from({ length: 20 }, (_, i) => i + 1) as line (line)}
					<p>Scanline {line}</p>
				{/each}
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar orientation="vertical">
				<ScrollArea.Thumb />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner />
		</ScrollArea.Root>
	</Demo>
</DemoGrid>

<style>
	.ratio-body {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		color: var(--rb-text-muted);
	}
</style>
