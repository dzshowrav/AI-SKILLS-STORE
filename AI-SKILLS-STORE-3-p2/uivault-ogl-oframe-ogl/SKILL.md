---
name: OGL (oframe/ogl)
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/oframe/ogl
category: 3D / Shader / WebGL
github: oframe/ogl
---

# OGL (oframe/ogl)

> 3D / Shader / WebGL · [oframe/ogl](https://github.com/oframe/ogl)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `.npmignore`
  - `README.md`
  - `examples/anisotropic.html`
  - `examples/assets/acorn.jpg`
  - `examples/assets/acorn.json`
  - `examples/assets/airplane.jpg`
  - `examples/assets/airplane.json`
  - `examples/assets/anim-format.json`
  - `examples/assets/compressed/astc-m-y.ktx`
  - `examples/assets/compressed/etc-m-y.ktx`
  - `examples/assets/compressed/etc1-m-y.ktx`
  - `examples/assets/compressed/pvrtc-m-y.ktx`
  - `examples/assets/compressed/s3tc-m-y.ktx`
  - `examples/assets/compressed/uv.jpg`
  - `examples/assets/croissant.jpg`
  - `examples/assets/croissant.json`
  - `examples/assets/cube/negx.jpg`
  - `examples/assets/cube/negy.jpg`
  - `examples/assets/cube/negz.jpg`
  - `examples/assets/cube/posx.jpg`
  - `examples/assets/cube/posy.jpg`
  - `examples/assets/cube/posz.jpg`
  - `examples/assets/earth.jpg`
  - `examples/assets/earth_cloud.jpg`
  - `examples/assets/earth_specular.jpg`
  - `examples/assets/favicon.png`
  - `examples/assets/fonts/FiraSans-Bold.json`
  - `examples/assets/fonts/FiraSans-Bold.png`
  - `examples/assets/fonts/FiraSans-Bold.ttf`
  - `examples/assets/fonts/raleway-bold-webfont.woff`
  - `examples/assets/fonts/raleway-bold-webfont.woff2`
  - `examples/assets/fonts/raleway-regular-webfont.woff`
  - `examples/assets/fonts/raleway-regular-webfont.woff2`
  - `examples/assets/forest.jpg`
  - `examples/assets/forest.json`
  - `examples/assets/fox.jpg`
  - `examples/assets/fox.json`
  - `examples/assets/gltf/cottage-basis-draco.glb`
  - `examples/assets/gltf/cottage-basis.glb`
  - `examples/assets/gltf/hershel-optimized.glb`
  - `examples/assets/gltf/hershel.glb`
  - `examples/assets/goat.jpg`
  - `examples/assets/goat.json`
  - `examples/assets/granite-diffuse.jpg`
  - `examples/assets/granite-normal.jpg`
  - `examples/assets/grid.jpg`
  - `examples/assets/pbr/black.jpg`
  - `examples/assets/pbr/car-ext-color.jpg`
  - `examples/assets/pbr/car-ext-emissive.jpg`
  - `examples/assets/pbr/car-ext-inner.json`
  - `examples/assets/pbr/car-ext-normal.jpg`
  - `examples/assets/pbr/car-ext-opacity.jpg`
  - `examples/assets/pbr/car-ext-rmo.jpg`
  - `examples/assets/pbr/car-ext.json`
  - `examples/assets/pbr/car-int-color.jpg`
  - `examples/assets/pbr/car-int-normal.jpg`
  - `examples/assets/pbr/car-int-rmo.jpg`
  - `examples/assets/pbr/car-int.json`
  - `examples/assets/pbr/car-shadow.jpg`
  - `examples/assets/pbr/car-shadow.png`
  - `examples/assets/pbr/lut.png`
  - `examples/assets/pbr/waterfall-diffuse-RGBM.png`
  - `examples/assets/pbr/waterfall-specular-RGBM.png`
  - `examples/assets/pbr/white.jpg`
  - `examples/base-primitives.html`
  - `examples/compressed-textures.html`
  - `examples/cube-map.html`
  - `examples/curves.html`
  - `examples/draw-modes.html`
  - `examples/flat-shading-matcap.html`
  - `examples/fog.html`
  - `examples/fresnel.html`
  - `examples/frustum-culling.html`
  - `examples/gltf-draco-webp.html`
  - `examples/gltf-ktx2-basis-draco.html`
  - `examples/gltf-ktx2-basis.html`
  - `examples/gpgpu-particles.html`
  - `examples/helpers.html`
  - `examples/high-mesh-count.html`
  - `examples/index.html`
  - `examples/indexed-vs-non-indexed.html`
  - `examples/instancing-gpu-picking.html`
  - `examples/instancing.html`
  - `package.json`
  - `src/core/Camera.js`
  - `src/core/Geometry.js`
  - `src/core/Mesh.js`
  - `src/core/Program.js`
  - `src/core/RenderTarget.js`
  - `src/core/Renderer.js`
  - `src/core/Texture.js`
  - `src/core/Transform.js`
  - `src/extras/Animation.js`
  - `src/extras/BasisManager.js`
  - `src/extras/Box.js`
  - `src/extras/Curve.js`
  - `src/extras/Cylinder.js`
  - `src/extras/DracoManager.js`
  - `src/extras/Flowmap.js`

## README Summary

<p align="center">
  <img src="https://github.com/oframe/ogl/raw/master/examples/assets/ogl.png" alt="OGL" width="510" />
</p>

<h1 align="center">OGL</h1>

<p align="center">
    <a href="https://npmjs.org/package/ogl">
        <img src="https://img.shields.io/npm/v/ogl.svg" alt="version" />
    </a>
    <a href="https://github.com/oframe/ogl/blob/master/LICENSE">
        <img src="https://img.shields.io/npm/l/ogl.svg" alt="license" />
    </a>
    <a href="https://bundlephobia.com/result?p=ogl">
        <img src="https://badgen.net/bundlephobia/minzip/ogl" alt="size" />
    </a>
</p>

<p align="center"><b>Minimal WebGL library.</b></p>

<br />

[See the Examples!](https://oframe.github.io/ogl/examples)

OGL is a small, effective WebGL library aimed at developers who like minimal layers of abstraction, and are interested in creating their own shaders.

Written in es6 modules with zero dependencies, the API shares many similarities with ThreeJS, however it is tightly coupled with WebGL and comes with much fewer features.

In its design, the library does the minimum abstraction necessary, so devs should still feel comfortable using it in conjunction with native WebGL commands.

Keeping the level of abstraction low helps to make the library easier to understand, extend, and also makes it more practical as a WebGL learning resource.

## Install

[Download](https://github.com/oframe/ogl/archive/master.zip)

**or**

```
npm i ogl
```

**or**

```
yarn add ogl
```

## Examples

[Show me what you got!](https://oframe.github.io/ogl/examples) - Explore a comprehensive list of examples, with comments in the source code.

Inspired by the effectiveness of ThreeJS' examples, they will hopefully serve as reference for how to use the library, and to achieve a wide range of techniques.

## Weight

Even though the source is modular, as a guide, below are the complete component download sizes.

| Component | Size (minzipped) |
| --------- | ---------------: |
| Core      |           

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
