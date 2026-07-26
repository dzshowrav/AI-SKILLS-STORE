---
name: AOS (Animate On Scroll)
description: UI Vault resource — Scroll & Animation
source: https://github.com/michalsnik/aos
category: Scroll & Animation
github: michalsnik/aos
---

# AOS (Animate On Scroll)

> Scroll & Animation · [michalsnik/aos](https://github.com/michalsnik/aos)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.babelrc`
  - `.editorconfig`
  - `.eslintrc.json`
  - `.gitattributes`
  - `.gitignore`
  - `.npmignore`
  - `.travis.yml`
  - `CONTRIBUTING.md`
  - `ISSUE_TEMPLATE.md`
  - `LICENSE`
  - `PULL_REQUEST_TEMPLATE.md`
  - `README.md`
  - `cypress.json`
  - `cypress/integration/aos_spec.js`
  - `cypress/integration/js_events_spec.js`
  - `cypress/integration/mutation_spec.js`
  - `cypress/integration/settings_anchorPlacement_spec.js`
  - `cypress/integration/settings_anchor_spec.js`
  - `cypress/integration/settings_animatedClassName_spec.js`
  - `cypress/integration/settings_delay_spec.js`
  - `cypress/integration/settings_disableMutationObserver_spec.js`
  - `cypress/integration/settings_disable_spec.js`
  - `cypress/integration/settings_duration_spec.js`
  - `cypress/integration/settings_easing_spec.js`
  - `cypress/integration/settings_initClassName_spec.js`
  - `cypress/integration/settings_mirror.js`
  - `cypress/integration/settings_offset_spec.js`
  - `cypress/integration/settings_once_spec.js`
  - `cypress/integration/settings_startEvent_spec.js`
  - `cypress/integration/settings_useClassNames.js`
  - `cypress/plugins/index.js`
  - `cypress/support/commands.js`
  - `cypress/support/index.js`
  - `demo/anchor.html`
  - `demo/animatecss.html`
  - `demo/async.html`
  - `demo/css/styles.css`
  - `demo/index.html`
  - `demo/offset.html`
  - `demo/once.html`
  - `package.json`
  - `rollup.config.js`
  - `scripts/run-cypress-tests.js`
  - `scripts/start-server.js`
  - `src/js/aos.js`
  - `src/js/helpers/detector.js`
  - `src/js/helpers/elements.js`
  - `src/js/helpers/getInlineOption.js`
  - `src/js/helpers/handleScroll.js`
  - `src/js/helpers/offsetCalculator.js`
  - `src/js/helpers/prepare.js`
  - `src/js/libs/observer.js`
  - `src/js/libs/offset.js`
  - `src/sass/_animations.scss`
  - `src/sass/_core.scss`
  - `src/sass/_easing.scss`
  - `src/sass/aos.scss`
  - `yarn.lock`

## README Summary

[![AOS - Animate on scroll library](https://s32.postimg.org/ktvt59hol/aos_header.png)](http://michalsnik.github.io/aos/)

[![NPM version](https://img.shields.io/npm/v/aos/next.svg?style=flat)](https://npmjs.org/package/aos)
[![NPM downloads](https://img.shields.io/npm/dm/aos.svg?style=flat)](https://npmjs.org/package/aos)
[![Build Status](https://travis-ci.org/michalsnik/aos.svg?branch=master)](https://travis-ci.org/michalsnik/aos)
[![Gitter](https://badges.gitter.im/michalsnik/aos.svg)](https://gitter.im/michalsnik/aos?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![Twitter Follow](https://img.shields.io/twitter/follow/michalsnik.svg?style=social)](https://twitter.com/michalsnik) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/home?status=AOS%20-%20Animate%20on%20Scroll%20library%0Ahttps%3A//github.com/michalsnik/aos)

## :exclamation::exclamation::exclamation: This is README for aos@next :exclamation::exclamation::exclamation:

For last stable release (v2) go [here](https://github.com/michalsnik/aos/tree/v2)

---
### 🚀 [Demo](http://michalsnik.github.io/aos/)

### 🌟 Codepen Examples
- [Different built-in animations](http://codepen.io/michalsnik/pen/WxNdvq)
- [With anchor setting in use](http://codepen.io/michalsnik/pen/jrOYVO)
- [With anchor-placement and different easings](http://codepen.io/michalsnik/pen/EyxoNm)
- [With simple custom animations](http://codepen.io/michalsnik/pen/WxvNvE)

👉 To get a better understanding how this actually works, I encourage you to check [my post on CSS-tricks](https://css-tricks.com/aos-css-driven-scroll-animation-library/).

---

## ⚙ Installation

### Basic

Add styles in `<head>`:

```html
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
```

Add script right before closing `</body>` tag, and initialize AOS:
```html
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>
```

### Using 

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
