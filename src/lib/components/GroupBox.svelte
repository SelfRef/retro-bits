<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	interface Props extends HTMLFieldsetAttributes {
		/** The caption cut into the top border. */
		label?: string;
		legend?: Snippet;
		children: Snippet;
		ref?: HTMLFieldSetElement | null;
	}

	let { label = '', legend, children, ref = $bindable(null), ...rest }: Props = $props();
</script>

<fieldset bind:this={ref} data-rb-groupbox {...rest}>
	<legend data-rb-groupbox-legend>
		{#if legend}{@render legend()}{:else}{label}{/if}
	</legend>
	{@render children()}
</fieldset>
