---
name: Lenis
description: UI Vault resource — Scroll & Animation
source: https://github.com/darkroomengineering/lenis
category: Scroll & Animation
github: darkroomengineering/lenis
---

# Lenis

> Scroll & Animation · [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `.vscode/extensions.json`
  - `.vscode/settings.json`
  - `CONTRIBUTING.md`
  - `LICENSE`
  - `MANIFESTO.md`
  - `README.md`
  - `V2-ROADMAP.md`
  - `biome.json`
  - `bun.lock`
  - `package.json`
  - `packages/core/browser.ts`
  - `packages/core/index.ts`
  - `packages/core/lenis.css`
  - `packages/core/package.json`
  - `packages/core/src/animate.ts`
  - `packages/core/src/debounce.ts`
  - `packages/core/src/dimensions.ts`
  - `packages/core/src/emitter.ts`
  - `packages/core/src/lenis.ts`
  - `packages/core/src/maths.ts`
  - `packages/core/src/types.ts`
  - `packages/core/src/virtual-scroll.ts`
  - `packages/react/README.md`
  - `packages/react/index.ts`
  - `packages/react/package.json`
  - `packages/react/src/provider.tsx`
  - `packages/react/src/store.ts`
  - `packages/react/src/types.ts`
  - `packages/react/src/use-lenis.ts`
  - `packages/snap/README.md`
  - `packages/snap/browser.ts`
  - `packages/snap/index.ts`
  - `packages/snap/package.json`
  - `packages/snap/src/debounce.ts`
  - `packages/snap/src/element.ts`
  - `packages/snap/src/snap.ts`
  - `packages/snap/src/types.ts`
  - `packages/snap/src/uid.ts`
  - `packages/vue/README.md`
  - `packages/vue/index.ts`
  - `packages/vue/nuxt/module.ts`
  - `packages/vue/nuxt/tsconfig.json`
  - `packages/vue/package.json`
  - `packages/vue/src/provider.ts`
  - `packages/vue/src/store.ts`
  - `packages/vue/src/use-lenis.ts`
  - `playground/.gitignore`
  - `playground/astro.config.mjs`
  - `playground/core/browser.js`
  - `playground/core/static.html`
  - `playground/core/style.css`
  - `playground/core/test.ts`
  - `playground/horizontal/browser.js`
  - `playground/horizontal/static.html`
  - `playground/horizontal/style.css`
  - `playground/horizontal/test.ts`
  - `playground/infinite/browser.js`
  - `playground/infinite/static.html`
  - `playground/infinite/style.css`
  - `playground/infinite/test.ts`
  - `playground/nuxt/.gitignore`
  - `playground/nuxt/README.md`
  - `playground/nuxt/app.vue`
  - `playground/nuxt/components/inner.vue`
  - `playground/nuxt/nuxt.config.ts`
  - `playground/nuxt/package.json`
  - `playground/nuxt/pages/about.vue`
  - `playground/nuxt/pages/index.vue`
  - `playground/nuxt/plugins/lenis.ts`
  - `playground/nuxt/public/favicon.ico`
  - `playground/nuxt/public/robots.txt`
  - `playground/nuxt/server/tsconfig.json`
  - `playground/nuxt/tsconfig.json`
  - `playground/package.json`
  - `playground/react/app.tsx`
  - `playground/react/style.css`
  - `playground/snap/style.css`
  - `playground/snap/test.ts`
  - `playground/touch-debug/test.ts`
  - `playground/tsconfig.json`
  - `playground/vue/App.vue`
  - `playground/vue/Child.vue`
  - `playground/vue/InnerChild.vue`
  - `playground/vue/setup.ts`
  - `playground/vue/style.css`
  - `playground/www/layouts/Layout.astro`
  - `playground/www/pages/anchor-special-chars.astro`
  - `playground/www/pages/core.astro`
  - `playground/www/pages/horizontal.astro`
  - `playground/www/pages/index.astro`
  - `playground/www/pages/infinite.astro`
  - `playground/www/pages/react.astro`
  - `playground/www/pages/scroll-margin.astro`
  - `playground/www/pages/snap.astro`
  - `playground/www/pages/touch-debug.astro`
  - `playground/www/pages/vue.astro`
  - `scripts/update-readme.js`
  - `tsconfig.json`
  - `tsdown.config.ts`

## README Summary

[![LENIS](https://assets.darkroom.engineering/lenis/banner.gif)](https://github.com/darkroomengineering/lenis)

[![npm](https://img.shields.io/npm/v/lenis?colorA=E30613&colorB=000000
)](https://www.npmjs.com/package/lenis)
[![downloads](https://img.shields.io/npm/dm/lenis?colorA=E30613&colorB=000000
)](https://www.npmjs.com/package/lenis)
[![size](https://img.shields.io/bundlephobia/minzip/lenis?label=size&colorA=E30613&colorB=000000)](https://bundlephobia.com/package/lenis)

## Introduction

Lenis ("smooth" in latin) is a lightweight, robust, and performant smooth scroll library. It's designed by [@darkroom.engineering](https://twitter.com/darkroomdevs) to be simple to use and easy to integrate into your projects. It's built with performance in mind and is optimized for modern browsers. It's perfect for creating smooth scrolling experiences on your website such as WebGL scroll syncing, parallax effects, and much more, see [Demo](https://lenis.darkroom.engineering/) and [Showcase](https://www.lenis.dev/showcase).

Read our [Manifesto](https://github.com/darkroomengineering/lenis/blob/main/MANIFESTO.md) to learn more about the inspiration behind Lenis.

<br/>

- [Features](#features)
- [Sponsors](#sponsors)
- [Packages](#packages)
- [Showcase](https://www.lenis.dev/showcase)
- [Installation](#installation)
- [Setup](#setup)
- [No-code usage](#no-code-usage)
- [Settings](#settings)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Considerations](#considerations)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)
- [Tutorials](#tutorials)
- [Plugins](#plugins)
- [License](#license)

<br/>

## Features

- **Lightweight & dependency-free** — the whole library is a few KB with zero runtime dependencies
- **Runs on native scroll** — wraps the browser's own scroll, so position: sticky, anchor links, and accessibility keep working
- **Any axis** — smooth vertical, horizontal, and nested scrolling from a single instance
- **Built for s

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
