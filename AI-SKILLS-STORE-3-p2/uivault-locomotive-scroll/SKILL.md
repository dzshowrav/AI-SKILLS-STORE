---
name: Locomotive Scroll
description: UI Vault resource — Scroll & Animation
source: https://github.com/locomotivemtl/locomotive-scroll
category: Scroll & Animation
github: locomotivemtl/locomotive-scroll
---

# Locomotive Scroll

> Scroll & Animation · [locomotivemtl/locomotive-scroll](https://github.com/locomotivemtl/locomotive-scroll)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.editorconfig`
  - `.eslintrc.json`
  - `.gitignore`
  - `.nvmrc`
  - `.prettierrc.json`
  - `LICENSE`
  - `README.md`
  - `context7.json`
  - `package-lock.json`
  - `package.json`
  - `packages/demo/.editorconfig`
  - `packages/demo/.gitignore`
  - `packages/demo/.nvmrc`
  - `packages/demo/.prettierignore`
  - `packages/demo/.prettierrc`
  - `packages/demo/.vscode/extensions.json`
  - `packages/demo/.vscode/launch.json`
  - `packages/demo/.vscode/settings.json`
  - `packages/demo/.vscode/tailwind.json`
  - `packages/demo/LICENSE`
  - `packages/demo/README.md`
  - `packages/demo/astro.config.ts`
  - `packages/demo/package.json`
  - `packages/demo/public/favicon.svg`
  - `packages/demo/src/env.d.ts`
  - `packages/demo/tailwind.config.ts`
  - `packages/demo/tsconfig.json`
  - `packages/demo/types/global.d.ts`
  - `packages/demo/types/swup.d.ts`
  - `packages/docs/.gitignore`
  - `packages/docs/README.md`
  - `packages/docs/babel.config.js`
  - `packages/docs/docs/examples.md`
  - `packages/docs/docs/intro.md`
  - `packages/docs/docusaurus.config.js`
  - `packages/docs/package-lock.json`
  - `packages/docs/package.json`
  - `packages/docs/sidebars.js`
  - `packages/docs/static/.nojekyll`
  - `packages/landing/.browserslistrc`
  - `packages/landing/.editorconfig`
  - `packages/landing/.gitignore`
  - `packages/landing/.npmrc`
  - `packages/landing/.nvmrc`
  - `packages/landing/LICENSE`
  - `packages/landing/README.md`
  - `packages/landing/assets.json`
  - `packages/landing/build/build.js`
  - `packages/landing/build/migrate_imports.js`
  - `packages/landing/build/watch.js`
  - `packages/landing/data/features.json`
  - `packages/landing/data/general.json`
  - `packages/landing/data/metadata.json`
  - `packages/landing/data/perks.json`
  - `packages/landing/data/showcase.json`
  - `packages/landing/data/tools.json`
  - `packages/landing/docs/development.md`
  - `packages/landing/docs/grid.md`
  - `packages/landing/docs/technologies.md`
  - `packages/landing/eleventy.config.cjs`
  - `packages/landing/loconfig.example.json`
  - `packages/landing/loconfig.json`
  - `packages/landing/package.json`
  - `packages/lib/README.md`
  - `packages/lib/bundled/locomotive-scroll.css`
  - `packages/lib/bundled/locomotive-scroll.js`
  - `packages/lib/bundled/locomotive-scroll.min.js`
  - `packages/lib/core/Core.ts`
  - `packages/lib/core/IO.ts`
  - `packages/lib/core/ScrollElement.ts`
  - `packages/lib/dist/locomotive-scroll.cjs`
  - `packages/lib/dist/locomotive-scroll.cjs.map`
  - `packages/lib/dist/locomotive-scroll.css`
  - `packages/lib/dist/locomotive-scroll.mjs`
  - `packages/lib/dist/locomotive-scroll.mjs.map`
  - `packages/lib/dist/locomotive-scroll.modern.mjs`
  - `packages/lib/dist/locomotive-scroll.modern.mjs.map`
  - `packages/lib/dist/locomotive-scroll.umd.js`
  - `packages/lib/dist/locomotive-scroll.umd.js.map`
  - `packages/lib/index.ts`
  - `packages/lib/package.json`
  - `packages/lib/styles/locomotive-scroll.css`
  - `packages/lib/styles/main.css`
  - `packages/lib/tsconfig.json`
  - `packages/lib/types.ts`
  - `packages/lib/utils/maths.ts`
  - `postcss.config.cjs`
  - `scripts/ignore-build-step.js`
  - `turbo.json`
  - `vercel.json`
  - `www/docs/.nojekyll`
  - `www/docs/assets/data-scroll-position.jpg`
  - `www/docs/assets/scroll-offset-1.jpg`
  - `www/docs/index.html`
  - `www/landing/assets.json`
  - `www/landing/assets/site.webmanifest`
  - `www/landing/index.html`

## README Summary

# Locomotive Scroll

[![npm version](https://img.shields.io/npm/v/locomotive-scroll.svg)](https://www.npmjs.com/package/locomotive-scroll)
[![npm downloads](https://img.shields.io/npm/dm/locomotive-scroll.svg)](https://www.npmjs.com/package/locomotive-scroll)
[![bundle size](https://img.shields.io/bundlephobia/minzip/locomotive-scroll)](https://bundlephobia.com/package/locomotive-scroll)

A **lightweight** & **modern** scroll library for detection, animation, and smooth scrolling. Built on top of [Lenis](https://github.com/darkroomengineering/lenis).

## Documentation

Full documentation available at [scroll.locomotive.ca/docs](https://scroll.locomotive.ca/docs).

## Quick Start

```bash
npm install locomotive-scroll
```

```js
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll();
```

```css
@import 'locomotive-scroll/dist/locomotive-scroll.css';
```

```html
<div data-scroll data-scroll-speed="0.5">I move at half speed</div>
```

## Features

-   **Lightweight** — Only 9.4kB gzipped
-   **TypeScript First** — Fully typed
-   **Built on Lenis** — Latest stable release with improved performance
-   **Dual Intersection Observers** — Optimized detection for triggers vs. animations
-   **Smart Touch Detection** — Parallax auto-disabled on mobile
-   **Accessible** — Native scrollbar, keyboard navigation, proper ARIA support

## Demo

Check out the [examples and playground](https://scroll.locomotive.ca/docs/examples)

## Support

[GitHub Issues](https://github.com/locomotivemtl/locomotive-scroll/issues)


## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
