---
name: Vanta.js
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/tengbao/vanta
category: 3D / Shader / WebGL
github: tengbao/vanta
---

# Vanta.js

> 3D / Shader / WebGL · [tengbao/vanta](https://github.com/tengbao/vanta)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `CHANGELOG.md`
  - `LICENSE.md`
  - `README.md`
  - `dist/vanta.birds.min.js`
  - `dist/vanta.cells.min.js`
  - `dist/vanta.clouds.min.js`
  - `dist/vanta.clouds2.min.js`
  - `dist/vanta.dots.min.js`
  - `dist/vanta.fog.min.js`
  - `dist/vanta.globe.min.js`
  - `dist/vanta.halo.min.js`
  - `dist/vanta.net.min.js`
  - `dist/vanta.rings.min.js`
  - `dist/vanta.ripple.min.js`
  - `dist/vanta.topology.min.js`
  - `dist/vanta.trunk.min.js`
  - `dist/vanta.waves.min.js`
  - `index.html`
  - `package-lock.json`
  - `package.json`
  - `src/_base.js`
  - `src/_p5Base.js`
  - `src/_shaderBase.js`
  - `src/gallery.js`
  - `src/helpers.js`
  - `src/skeleton.less`
  - `src/styles.less`
  - `src/vanta.birds.js`
  - `src/vanta.cells.js`
  - `src/vanta.clouds.js`
  - `src/vanta.clouds2.js`
  - `src/vanta.dots.js`
  - `src/vanta.fog.js`
  - `src/vanta.globe.js`
  - `src/vanta.halo.js`
  - `src/vanta.net.js`
  - `src/vanta.rings.js`
  - `src/vanta.ripple.js`
  - `src/vanta.topology.js`
  - `src/vanta.trunk.js`
  - `vendor/FilmGrain_v1.1.frag`
  - `vendor/GPUComputationRenderer.js`
  - `vendor/p5.min.js`
  - `vendor/three.r134.min.js`
  - `webpack.build.js`
  - `webpack.config.js`

## README Summary

# Vanta JS

## [View demo gallery & customize effects at www.vantajs.com &rarr;](https://www.vantajs.com)

[![alt text](https://www.vantajs.com/gallery/vanta-preview.gif "Vanta JS")](https://www.vantajs.com)



## What is Vanta? / FAQs

- **Add 3D animated digital art to any webpage with just a few lines of code.**
- How it works: Vanta inserts an animated effect as a background into any HTML element.
- Works with vanilla JS, React, Angular, Vue, etc.
- Effects are rendered by [three.js](https://github.com/mrdoob/three.js/) (using WebGL) or [p5.js](https://github.com/processing/p5.js).
- Effects can interact with mouse/touch inputs.
- Effect parameters (e.g. color) can be easily modified to match your brand.
- Total additional file size is ~120kb minified and gzipped (mostly three.js), which is smaller than comparable background images/videos.
- Vanta includes many predefined effects to try out. *More effects will be added soon!*

## [View demo gallery & customize effects at www.vantajs.com &rarr;](https://www.vantajs.com)

## Basic usage with script tags:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js"></script>
<script>
  VANTA.WAVES('#my-background')
</script>
```

[View fiddle &rarr;](https://jsfiddle.net/usdzfbLt/1/)

## More options:

```js
VANTA.WAVES({
  el: '#my-background', // element selector string or DOM object reference
  color: 0x000000,
  waveHeight: 20,
  shininess: 50,
  waveSpeed: 1.5,
  zoom: 0.75
})
```

- **el:** The container element.
  - The Vanta canvas will be appended as a child of this element, and will assume the width and height of this element. (If you want a fullscreen canvas, make sure this container element is fullscreen.)
  - This container *can* have other children. The other children will appear as foreground content, in front of the Vanta canvas.

- **mouseControls:** (defaults to *true*) Set to false to di

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
