<script lang="ts">
	import Demo from '$playground/Demo.svelte';
	import DemoGrid from '$playground/DemoGrid.svelte';
</script>

<h1>Plain HTML</h1>

<p class="lede">
	Hooks for your own markup, so a hand-written element matches the Bits UI parts around it.
</p>

<DemoGrid>
	<Demo title="Box" note="data-rb-box, optionally &quot;raised&quot; or &quot;sunken&quot;.">
		<div data-rb-box>A plain box</div>
		<div data-rb-box="raised">Raised</div>
		<div data-rb-box="sunken">Sunken</div>
	</Demo>

	<Demo title="Button" note="data-rb-button on a native button or link; data-rb-variant works too.">
		<button type="button" data-rb-button>Button</button>
		<button type="button" data-rb-button data-rb-variant="primary">Primary</button>
		<a href="#top" data-rb-button data-rb-variant="ghost">Link</a>
	</Demo>

	<Demo title="Field" note="data-rb-field on a native input, select or textarea.">
		<input data-rb-field placeholder="Type here" />
		<select data-rb-field>
			<option>One</option>
			<option>Two</option>
		</select>
	</Demo>
</DemoGrid>

<style>
	.lede {
		max-width: 60ch;
		color: var(--rb-text-muted);
	}
</style>
