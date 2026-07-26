---
name: Swup
description: UI Vault resource — Scroll & Animation
source: https://github.com/swup/swup
category: Scroll & Animation
github: swup/swup
---

# Swup

> Scroll & Animation · [swup/swup](https://github.com/swup/swup)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.editorconfig`
  - `.eslintrc.compat.cjs`
  - `.gitignore`
  - `.husky/pre-commit`
  - `.nvmrc`
  - `AGENTS.md`
  - `CHANGELOG.md`
  - `LICENSE`
  - `README.md`
  - `eslint.config.js`
  - `package-lock.json`
  - `package.json`
  - `src/Swup.ts`
  - `src/config/version.ts`
  - `src/helpers.ts`
  - `src/helpers/Location.ts`
  - `src/helpers/classify.ts`
  - `src/helpers/delegateEvent.ts`
  - `src/helpers/getCurrentUrl.ts`
  - `src/helpers/history.ts`
  - `src/helpers/matchPath.ts`
  - `src/index.ts`
  - `src/modules/Cache.ts`
  - `src/modules/Classes.ts`
  - `src/modules/Hooks.ts`
  - `src/modules/Visit.ts`
  - `src/modules/animatePageIn.ts`
  - `src/modules/animatePageOut.ts`
  - `src/modules/awaitAnimations.ts`
  - `src/modules/fetchPage.ts`
  - `src/modules/getAnchorElement.ts`
  - `src/modules/navigate.ts`
  - `src/modules/plugins.ts`
  - `src/modules/renderPage.ts`
  - `src/modules/replaceContent.ts`
  - `src/modules/resolveUrl.ts`
  - `src/modules/scrollToContent.ts`
  - `src/utils.ts`
  - `src/utils/index.ts`
  - `tests/config/playwright.config.ts`
  - `tests/config/serve.json`
  - `tests/config/vitest.config.ts`
  - `tests/config/vitest.setup.ts`
  - `tests/fixtures/alpinejs/page-1.html`
  - `tests/fixtures/alpinejs/page-2.html`
  - `tests/fixtures/animation-complex.html`
  - `tests/fixtures/animation-duration.html`
  - `tests/fixtures/animation-keyframes.html`
  - `tests/fixtures/animation-native.html`
  - `tests/fixtures/animation-none.html`
  - `tests/fixtures/animation-partial.html`
  - `tests/fixtures/assets/main.css`
  - `tests/fixtures/containers-1.html`
  - `tests/fixtures/containers-2.html`
  - `tests/fixtures/containers-missing.html`
  - `tests/fixtures/history.html`
  - `tests/fixtures/ignore-visits.html`
  - `tests/fixtures/instance.html`
  - `tests/fixtures/link-resolution.html`
  - `tests/fixtures/link-selector.html`
  - `tests/fixtures/nested/nested-1.html`
  - `tests/fixtures/nested/nested-2.html`
  - `tests/fixtures/page-1.html`
  - `tests/fixtures/page-2.html`
  - `tests/fixtures/page-3.html`
  - `tests/fixtures/persist-1.html`
  - `tests/fixtures/persist-2.html`
  - `tests/fixtures/rapid-navigation/page-1.html`
  - `tests/fixtures/rapid-navigation/page-2.html`
  - `tests/fixtures/rapid-navigation/page-3.html`
  - `tests/fixtures/redirect-1.html`
  - `tests/functional/alpinejs.spec.ts`
  - `tests/functional/animation-classes.spec.ts`
  - `tests/functional/animation-timing.spec.ts`
  - `tests/functional/api-navigation.spec.ts`
  - `tests/functional/cache.spec.ts`
  - `tests/functional/containers.spec.ts`
  - `tests/functional/events.spec.ts`
  - `tests/functional/history.spec.ts`
  - `tests/functional/ignore-visit.spec.ts`
  - `tests/functional/link-resolution.spec.ts`
  - `tests/functional/link-selector.spec.ts`
  - `tests/functional/markup.spec.ts`
  - `tests/functional/native-mode.spec.ts`
  - `tests/functional/navigation.spec.ts`
  - `tests/functional/page-load.spec.ts`
  - `tests/functional/persisting.spec.ts`
  - `tests/functional/plugins/body-class-plugin.spec.ts`
  - `tests/functional/plugins/scroll-plugin.spec.ts`
  - `tests/functional/redirects.spec.ts`
  - `tests/functional/request.spec.ts`
  - `tests/functional/scrolling.spec.ts`
  - `tests/functional/visit-object.spec.ts`
  - `tests/support/commands.ts`
  - `tests/support/swup.ts`
  - `tests/support/utils.ts`
  - `tests/unit/awaitAnimations.test.ts`
  - `tests/unit/cache.test.ts`
  - `tests/unit/delegateEvent.test.ts`
  - `tests/unit/exports.test.ts`

## README Summary

<div align="center">

**swup 4 is released  🎉  Check out the [release notes](https://swup.js.org/announcements/swup-4/) and [upgrade guide](https://swup.js.org/getting-started/upgrading/).**

</div>

<br>

<p align="center">
  <img width="280" alt="swup" src="https://swup.js.org/assets/images/swup-logo.svg">
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/swup.svg)](https://www.npmjs.com/package/swup)
[![Bundle size](https://img.shields.io/bundlejs/size/swup?exports=default%20as%20Swup&label=size)](https://bundlejs.com/?q=swup&treeshake=%5B%7B+default+%7D%5D)
[![npm downloads](https://img.shields.io/npm/dt/swup.svg)](https://www.npmjs.com/package/swup)
[![Test status](https://img.shields.io/github/actions/workflow/status/swup/swup/e2e-tests.yml?branch=main&label=tests)](https://github.com/swup/swup/actions/workflows/e2e-tests.yml)
[![License](https://img.shields.io/github/license/swup/swup.svg)](https://github.com/swup/swup/blob/main/LICENSE)

</div>

<br>

# Swup

Versatile and extensible **page transition library** for server-rendered websites.

[Features](#features) •
[Demos](#demos) •
[Plugins](#plugins) •
[Themes](#themes) •
[Documentation](https://swup.js.org/getting-started) •
[Discussions](https://github.com/swup/swup/discussions)

## Overview

Swup adds **page transitions** to server-rendered websites. It manages the complete page load lifecycle
and smoothly animates between the current and next page. In addition, it offers many other
quality-of-life improvements like **caching**, **smart preloading**, native **browser history** and
enhanced **accessibility**.

Make your site feel like a snappy single-page app — without any of the complexity.

## Features

- ✏️ Works out of the box with [minimal markup](https://swup.js.org/getting-started/example/)
- ✨ Auto-detects [CSS transitions](https://swup.js.org/getting-started/how-it-works/) & animations for perfect timing
- 🔗 Updates URLs and preserves native [browser history](https://swup.

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
