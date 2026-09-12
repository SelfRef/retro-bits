<script lang="ts">
	import { RB_TOKEN_GROUPS, useTheme, type RbTokenGroup } from 'retro-bits';

	const theme = useTheme();

	let values = $state<Record<string, string>>({});

	// Resolved values, read back from the document. This is the honest check that
	// a theme switch actually landed: the attribute changing is not proof, the
	// computed value is.
	$effect(() => {
		// Re-read whenever either half of the selection changes.
		void theme.current;
		void theme.resolvedScheme;

		const styles = getComputedStyle(document.documentElement);
		const next: Record<string, string> = {};

		for (const tokens of Object.values(RB_TOKEN_GROUPS)) {
			for (const token of tokens) next[token] = styles.getPropertyValue(token).trim();
		}

		values = next;
	});

	const groups = Object.keys(RB_TOKEN_GROUPS) as RbTokenGroup[];

	const looksLikeColor = (value: string) =>
		/^(#|rgb|hsl|oklch|color\(|light-dark\()/.test(value) || CSS.supports('color', value);
</script>

<h1>Tokens</h1>

<p class="lede">
	Every token in the contract, as the browser resolves it right now for
	<strong>{theme.meta.label}</strong> in <strong>{theme.resolvedScheme}</strong>. The eight planned
	themes still carry Default's values - what changes today is
	<code>--rb-theme-name</code> and the attribute.
</p>

{#each groups as group (group)}
	<section>
		<h2>{group}</h2>
		<table>
			<tbody>
				{#each RB_TOKEN_GROUPS[group] as token (token)}
					<tr>
						<th scope="row"><code>{token}</code></th>
						<td>
							{#if values[token] && looksLikeColor(values[token])}
								<span class="swatch" style="background: {values[token]}"></span>
							{/if}
							<code>{values[token] || '—'}</code>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
{/each}

<style>
	.lede {
		max-width: 60ch;
		color: var(--rb-text-muted);
	}

	section {
		margin-top: var(--rb-space-6);
	}

	h2 {
		margin: 0 0 var(--rb-space-3);
		font-size: var(--rb-font-size);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--rb-text-muted);
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
		font-weight: var(--rb-font-weight);
		vertical-align: top;
	}

	th {
		width: 18rem;
		color: var(--rb-text-muted);
	}

	td {
		display: flex;
		align-items: center;
		gap: var(--rb-gap);
		word-break: break-word;
	}

	.swatch {
		flex: none;
		width: var(--rb-icon-size);
		height: var(--rb-icon-size);
		border: var(--rb-border-width) solid var(--rb-border-color);
		border-radius: calc(var(--rb-radius) / 2);
	}
</style>
