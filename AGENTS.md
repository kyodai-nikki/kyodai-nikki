# Codex Notes

Project handoff notes for future Codex sessions.

## General Principles

- Prefer the existing Astro structure, component boundaries, and CSS variables.
- Keep changes scoped to the requested page or feature. Avoid broad incidental refactors.
- Shared display text and labels should live under `src/msg/`.
- Public asset URLs and internal links should work with a configured base path. Use `withBase()` for final `href` and `src` values.
- Avoid hard-coded CSS URLs like `url("/...")` when the site may be deployed under a base path. If CSS needs a URL, prefer passing a `withBase()` value from Astro into a CSS custom property.

## Layout And CSS

- Use `styles/variables.css` for shared colors, spacing, fonts, widths, and breakpoints.
- Put global page foundation styles in `styles/globals.css`.
- Keep component-specific styles inside each `.astro` component.
- Parent components should not directly override child component internals. Use a `class` prop, local wrapper class, or CSS custom property when customization is needed.
- Follow the existing responsive breakpoints: `@media (--bp-tablet)` and `@media (--bp-mobile)`.
- The visual direction is mostly monochrome. Prefer line work, spacing, and typography over heavy shadows or strong color blocks.

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
