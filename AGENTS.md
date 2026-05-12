# Codex Notes

Project handoff notes for future Codex sessions.

## General Principles

- Prefer the existing Astro structure, component boundaries, and CSS variables.
- Keep changes scoped to the requested page or feature. Avoid broad incidental refactors.
- Shared display text and labels should live under `src/msg/`.
- Public asset URLs and internal links should work with a configured base path. Use `withBase()` for final `href` and `src` values.
- Avoid hard-coded CSS URLs like `url("/...")` when the site may be deployed under a base path. If CSS needs a URL, prefer passing a `withBase()` value from Astro into a CSS custom property.
- When editing either `AGENTS.md` or `CLAUDE.md`, keep shared project conventions in sync by adding the same policy to both files.

## Layout And CSS

- Use `styles/variables.css` for shared colors, spacing, fonts, widths, and breakpoints.
- Keep `styles/variables.css` limited to raw palette colors, shared semantic roles, and reusable component defaults. If a color role is only used by one page, define it in that page/component stylesheet instead.
- For common components, expose component-owned CSS custom properties or props so the same component can be customized by component instance rather than by page-level overrides.
- Put global page foundation styles in `styles/globals.css`.
- Keep component-specific styles inside each `.astro` component.
- Parent components should not directly override child component internals. Use a `class` prop, local wrapper class, or CSS custom property when customization is needed.
- Avoid using `:global()` from a parent component to force child component styling. Prefer explicit component props, CSS custom properties passed to the child root, or a small child-component API extension.
- Use `border-radius: var(--r-md)` for standard rounded UI corners unless an existing component pattern or token calls for a different radius.
- Follow the existing responsive breakpoints: `@media (--bp-tablet)` and `@media (--bp-mobile)`.
- The visual direction is mostly monochrome. Prefer line work, spacing, and typography over heavy shadows or strong color blocks.

## Before Editing Components

- Before styling a child component from a parent, check whether the target is the child component root or an internal element.
- If styling seems to require `:global()`, pause and first consider using or adding component props, passing CSS custom properties to the child root, adding a local wrapper, or making a small child-component API extension.
- Use `:global()` only for true global foundations, third-party markup, or documented escape hatches.

## Icons

- Add icons as single-purpose Astro components under `src/components/common/icon/`.
- Register new icons in `src/components/common/icon/IconName.ts` and the mapping in `src/components/common/Icon.astro`.
- Use `Icon.astro` from call sites instead of embedding SVG paths directly in page or feature components.
- Do not add React integration or external UI libraries for a small number of simple SVG icons. Prefer the existing Icon component structure.

## Page Background

- The main page background uses `public/images/bg.png`.
- `src/layouts/BaseLayout.astro` computes `withBase("/images/bg.png")` and passes it to `main` as `--page-shell-bg-image`.
- `styles/globals.css` reads that custom property on `main`.
- Keep these background rules unless the design changes:

```css
background-position: center top;
background-size: 1920px;
```

## Characters

- Character detail page layout lives in `src/pages/characters/[slug].astro`.
- When a character has a quote, keep the 3-column layout: quote, standing portrait, info.
- When a character has no quote, apply `char-detail--no-quote` and use a 2-column layout: standing portrait, info. This avoids the empty quote column gap.
- On tablet and mobile, collapse to a single column and respect the existing portrait size rules.

## Assets

- Public files are referenced without the `public` segment.
  - Example: `public/images/bg.png` becomes `/images/bg.png`.
- Character portrait and standing image paths should go through helpers in `src/lib/characters.ts`.
- When adding images, confirm that the actual directory and the referenced URL directory match.

## Verification

- After changing Astro templates or CSS, run a build when practical.
- If PowerShell blocks `npm run build`, use the bundled Node runtime directly:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; & 'C:\Users\PC_User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' .\node_modules\astro\astro.js build
```

- When starting the Astro dev server on Windows, avoid nesting double-quoted `cmd.exe /c` commands inside another quoted PowerShell string. If the command fails because of quoting, use PowerShell single quotes around the `cmd.exe /c` payload:

```powershell
cmd.exe /c 'set ASTRO_TELEMETRY_DISABLED=1&& start "" /B "C:\Users\PC_User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "C:\Users\PC_User\Desktop\it\kyodai-nikki\node_modules\astro\astro.js" dev --host 127.0.0.1 --port 4321 > .astro-dev.out.log 2> .astro-dev.err.log'
```
