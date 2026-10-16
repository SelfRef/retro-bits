<script lang="ts">
	import { resolve } from '$app/paths';
	import { themeList, useTheme } from 'retro-bits';

	const theme = useTheme();
</script>

<h1>retro-bits</h1>

<p class="lede">
	Retro operating system themes for <a href="https://bits-ui.com">Bits UI</a>. Themes are plain CSS
	driven by <code>--rb-*</code> custom properties, so consumers need no Tailwind and no build step.
</p>

<section>
	<h2>How it works</h2>
	<ol>
		<li>
			Import the stylesheet: <code>import 'retro-bits/css/index.css'</code> for every theme, or
			<code>core.css</code> plus the one you want.
		</li>
		<li>
			Put <code>data-rb-theme</code> on an element - <code>&lt;ThemeProvider&gt;</code> puts it on
			<code>&lt;html&gt;</code> so portalled dialogs and menus are covered too.
		</li>
		<li>
			Use Bits UI directly. The theme styles it through the data attributes Bits UI already renders
			(<code>data-button-root</code>, <code>data-state</code>), so there are no wrappers to keep in
			step with bits-ui releases.
		</li>
	</ol>
</section>

<section>
	<h2>Themes</h2>
	<p>
		Currently on <strong>{theme.meta.label}</strong> in <strong>{theme.resolvedScheme}</strong>.
	</p>
	<table>
		<thead>
			<tr><th>Theme</th><th>Inspiration</th><th>Name from</th></tr>
		</thead>
		<tbody>
			{#each themeList as entry (entry.id)}
				<tr>
					<th scope="row">{entry.label}</th>
					<td>{entry.inspiration}</td>
					<td>{entry.reference}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p class="note">
		Only Mono exists so far. The retro themes are planned - see <code>PLAN.md</code>.
	</p>
</section>

<section>
	<h2>What to look at</h2>
	<ul>
		<li>
			<a href={resolve('/gallery')}>Gallery</a> - every Bits UI component.
		</li>
		<li>
			<a href={resolve('/tokens')}>Tokens</a> - the contract, resolved live for the current theme.
		</li>
		<li><a href={resolve('/nested')}>Nested themes</a> - two themes side by side in one page.</li>
	</ul>
</section>

<style>
	.lede {
		max-width: 65ch;
		font-size: var(--rb-font-size-lg);
		color: var(--rb-text-muted);
	}

	section {
		max-width: 70ch;
		margin-top: var(--rb-space-6);
	}

	h2 {
		font-size: var(--rb-font-size-lg);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: var(--rb-space-2) var(--rb-space-3);
		border-bottom: var(--rb-border-width) solid var(--rb-border-color-muted);
		text-align: left;
		vertical-align: top;
	}

	thead th {
		color: var(--rb-text-muted);
		font-size: var(--rb-font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.note {
		color: var(--rb-text-muted);
	}

	li {
		margin-bottom: var(--rb-space-2);
	}
</style>
