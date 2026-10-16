# Agents

Instructions for AI agents working in this repository. The [README](README.md) describes the
project, and [PLAN.md](PLAN.md) lists what isn't built yet.

## Keep docs/REFERENCE.md current

[docs/REFERENCE.md](docs/REFERENCE.md) is the main reference for using retro-bits: every component,
its styled parts, the states it reacts to, the markup it needs, and every hook. It ships in the
package, so agents in consuming apps read it instead of the CSS.

Any change to what a consumer can use or see must update the reference in the same commit. That
includes:

- a new theme, or a change to a theme's schemes, palettes or specific behaviour (the Themes section)
- a new `data-rb-*` hook or `data-rb-variant` value (the Hooks table and the component's section)
- a new option, part, state or markup requirement on an existing control
- a new Bits UI component, or new parts on an existing one, after a bits-ui upgrade
- a component of retro-bits' own, if one is ever added
- a removed or renamed feature: delete or update its entry rather than leaving it stale

Write what a user of the control needs to know, not how the CSS does it. Keep the A to Z order
and the Parts / States / Markup shape of the component sections.

`tests/reference.test.ts` fails when a Bits UI component has no section or a `data-rb-*` hook used
in the CSS is undocumented. It can't check options, states or themes, so those are on you.

## Before committing

```sh
pnpm lint && pnpm check && pnpm test
```

Run `pnpm run prepack` too when the package surface (`package.json`, exports, `src/lib`) changes.
