---
name: Rellax.js
description: UI Vault resource — Scroll & Animation
source: https://github.com/dixonandmoe/rellax
category: Scroll & Animation
github: dixonandmoe/rellax
---

# Rellax.js

> Scroll & Animation · [dixonandmoe/rellax](https://github.com/dixonandmoe/rellax)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `LICENSE`
  - `README.md`
  - `absolute.html`
  - `bower.json`
  - `css/bootstrap.min.css`
  - `css/main.css`
  - `demo.html`
  - `option.js`
  - `package-lock.json`
  - `package.json`
  - `rellax.js`
  - `rellax.min.js`
  - `tests/center.html`
  - `tests/destroy.html`
  - `tests/directions.html`
  - `tests/horizontal.html`
  - `tests/percentage.html`
  - `tests/range.html`
  - `tests/responsive-speeds.html`
  - `tests/speed.html`
  - `tests/style.html`
  - `tests/wrapper.html`

## README Summary

# RELLAX

[![NPM Package](https://img.shields.io/npm/v/rellax.svg)](https://www.npmjs.org/package/rellax)
[![Minified Size](https://img.shields.io/bundlephobia/min/rellax.svg?label=minified)](https://bundlephobia.com/result?p=rellax)
[![Gzipped Size](https://img.shields.io/bundlephobia/minzip/rellax.svg?label=gzipped)](https://bundlephobia.com/result?p=rellax)

Rellax is a buttery smooth, super lightweight, vanilla javascript parallax library. **Update:** Rellax now works on mobile (v1.0.0).

* [Demo Website](https://dixonandmoe.com/rellax/)


## Getting Started
### Using npm

`npm install rellax --save`

### Using yarn

`yarn add rellax`

### CDN

`<script src="https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"></script>`

### Download Locally

if you're old school like us download and insert `rellax.min.js` in your html


```html
<div class="rellax">
  I’m that default chill speed of "-2"
</div>
<div class="rellax" data-rellax-speed="7">
  I’m super fast!!
</div>
<div class="rellax" data-rellax-speed="-4">
  I’m extra slow and smooth
</div>

<script src="https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"></script>
<script>
  // Accepts any class name
  var rellax = new Rellax('.rellax');
</script>
```
```html
<script>
  // Also can pass in optional settings block
  var rellax = new Rellax('.rellax', {
    speed: -2,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });
</script>
```
## Features

### Speed
Use the `data-rellax-speed` attribute to set the speed of a `.rellax` element to something other than the default value (which is `-2`). A negative value will make it move slower than regular scrolling, and a positive value will make it move faster. We recommend keeping the speed between `-10` and `10`.

#### Responsive Speed
Use responsive speed attributes for breakpoint levels that require a different speed. Defaults to the `data-rellax-speed` setting in unspecified breakpoints

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
