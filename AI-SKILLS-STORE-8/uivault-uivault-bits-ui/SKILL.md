---
name: Bits UI
description: UI Vault resource — Framework-Specific Components
source: https://www.bits-ui.com/
category: Framework-Specific Components
type: external-resource
---

# Bits UI

> Framework-Specific Components · [Visit website](https://www.bits-ui.com/)

## Overview

This is a curated resource from [UI Vault](https://en970.github.io/ui-vault/) — a hand-picked collection of premium UI design resources.

**Category:** Framework-Specific Components

**Website:** https://www.bits-ui.com/

## Reference Content

The following content was fetched from the resource's website:

(function setInitialMode({ defaultMode = "system", themeColors, darkClassNames = ["dark"], lightClassNames = [], defaultTheme = "", modeStorageKey = "mode-watcher-mode", themeStorageKey = "mode-watcher-theme" }) { const rootEl = document.documentElement; const mode = localStorage.getItem(modeStorageKey) ?? defaultMode; const theme = localStorage.getItem(themeStorageKey) ?? defaultTheme; const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches; if (light) { if (darkClassNames.length) rootEl.classList.remove(...darkClassNames.filter(Boolean)); if (lightClassNames.length) rootEl.classList.add(...lightClassNames.filter(Boolean)); } else { if (lightClassNames.length) rootEl.classList.remove(...lightClassNames.filter(Boolean)); if (darkClassNames.length) rootEl.classList.add(...darkClassNames.filter(Boolean)); } rootEl.style.colorScheme = light ? "light" : "dark"; if (themeColors) { const themeMetaEl = document.querySelector('meta[name="theme-color"]'); if (themeMetaEl) { themeMetaEl.setAttribute("content", mode === "light" ? themeColors.light : themeColors.dark); } } if (theme) { rootEl.setAttribute("data-theme", theme); localStorage.setItem(themeStorageKey, theme); } localStorage.setItem(modeStorageKey, mode); })({"defaultMode":"system","darkClassNames":["dark"],"lightClassNames":[],"defaultTheme":"","modeStorageKey":"mode-watcher-mode","themeStorageKey":"mode-watcher-theme"}); Bits UI Home Docs GitHub Get started Bits UI v2 Now Available The headless components for Svelte Flexible, unstyled, and accessible primitives that provide the foundation for building your own high-quality component library. S Start building Sound control L R 21 69 °C °F Air Conditioner Follow Other HB Huntabyte @huntabyte PS Pavel @pavelstianko PJ Pája @paja PS Adrian @AdrianGonz97 0:00:00 Task: new design code other New App explore The foundation for your next web project Customizable Freedom with foundation. Accessible Built for everyone, by default. Unified Predictable patterns, powerful results. 2026 Bits UI team LLMs GitHub Changelog { __sveltekit_a9ygpj = { base: new URL(".", location).pathname.slice(0, -1) }; const element = document.currentScript.parentElement; Promise.all([ import("./_app/immutable/entry/start.CyaElPTU.js"), import("./_app/immutable/entry/app.BNgfxDKG.js") ]).then(([kit, app]) => { kit.start(app, element, { node_ids: [0, 5], data: [null,null], form: null, error: null }); }); }

## How to Use This Skill

When working with Bits UI, reference this skill to:
- Understand the core features and capabilities
- Find the official documentation and examples
- Apply best practices from the UI Vault curation

## Related Resources

Visit the full [UI Vault](https://en970.github.io/ui-vault/) for more resources in the Framework-Specific Components category.

---
*This skill was auto-generated from [Bits UI](https://www.bits-ui.com/) — a UI Vault curated resource.*
