---
name: Paper Shaders
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/paper-design/shaders
category: 3D / Shader / WebGL
github: paper-design/shaders
---

# Paper Shaders

> 3D / Shader / WebGL · [paper-design/shaders](https://github.com/paper-design/shaders)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.bun-version`
  - `.gitignore`
  - `.prettierrc`
  - `CHANGELOG.md`
  - `LICENSE`
  - `NOTICE`
  - `README.md`
  - `build.js`
  - `bun.lock`
  - `docs/.gitignore`
  - `docs/eslint.config.js`
  - `docs/next.config.js`
  - `docs/package.json`
  - `docs/postcss.config.js`
  - `docs/public/apple-touch-icon.png`
  - `docs/public/flowers.webp`
  - `docs/public/images/git-readme-picture.jpg`
  - `docs/public/images/git-readme-picture.webp`
  - `docs/public/images/opengraph-image.jpg`
  - `docs/public/logo-placeholder.webp`
  - `docs/public/robots.txt`
  - `docs/public/shaders/color-panels.webp`
  - `docs/public/shaders/dithering.webp`
  - `docs/public/shaders/dot-grid.webp`
  - `docs/public/shaders/dot-orbit.webp`
  - `docs/public/shaders/fluted-glass.webp`
  - `docs/public/shaders/gem-smoke.webp`
  - `docs/public/shaders/god-rays.webp`
  - `docs/public/shaders/grain-gradient.webp`
  - `docs/public/shaders/halftone-cmyk.webp`
  - `docs/public/shaders/halftone-dots.webp`
  - `docs/public/shaders/heatmap.webp`
  - `docs/public/shaders/image-dithering.webp`
  - `docs/public/shaders/liquid-metal.webp`
  - `docs/public/shaders/mesh-gradient.webp`
  - `docs/public/shaders/metaballs.webp`
  - `docs/public/shaders/neuro-noise.webp`
  - `docs/public/shaders/paper-texture.webp`
  - `docs/public/shaders/perlin-noise.webp`
  - `docs/public/shaders/pulsing-border.webp`
  - `docs/public/shaders/simplex-noise.webp`
  - `docs/registry.json`
  - `docs/registry/color-panels-example.tsx`
  - `docs/registry/dithering-example.tsx`
  - `docs/registry/dot-grid-example.tsx`
  - `docs/registry/dot-orbit-example.tsx`
  - `docs/registry/fluted-glass-example.tsx`
  - `docs/registry/gem-smoke-example.tsx`
  - `docs/registry/god-rays-example.tsx`
  - `docs/registry/grain-gradient-example.tsx`
  - `docs/registry/halftone-cmyk-example.tsx`
  - `docs/registry/halftone-dots-example.tsx`
  - `docs/registry/heatmap-example.tsx`
  - `docs/registry/image-dithering-example.tsx`
  - `docs/registry/liquid-metal-example.tsx`
  - `docs/registry/mesh-gradient-example.tsx`
  - `docs/registry/metaballs-example.tsx`
  - `docs/registry/neuro-noise-example.tsx`
  - `docs/registry/paper-texture-example.tsx`
  - `docs/registry/perlin-noise-example.tsx`
  - `docs/registry/pulsing-border-example.tsx`
  - `docs/registry/simplex-noise-example.tsx`
  - `docs/src/app/favicon.ico`
  - `docs/src/app/home-thumbnails.ts`
  - `docs/src/app/layout.tsx`
  - `docs/src/app/page.tsx`
  - `docs/src/components/copy-button.tsx`
  - `docs/src/components/logo.tsx`
  - `docs/src/components/save-previous-pathname.tsx`
  - `docs/src/components/shader-container.tsx`
  - `docs/src/components/shader-details.tsx`
  - `docs/src/components/site-header.tsx`
  - `docs/src/generate-llms-txt.ts`
  - `docs/src/helpers/clean-up-leva-params.ts`
  - `docs/src/helpers/color-utils.ts`
  - `docs/src/helpers/leva-image-button.ts`
  - `docs/src/helpers/url-serializer.test.ts`
  - `docs/src/helpers/url-serializer.ts`
  - `docs/src/helpers/use-colors.ts`
  - `docs/src/helpers/use-preset-highlight.ts`
  - `docs/src/helpers/use-reset-leva-params.ts`
  - `docs/src/helpers/use-url-params.ts`
  - `docs/src/icons.tsx`
  - `docs/src/index.css`
  - `docs/src/shader-defs/color-panels-def.ts`
  - `docs/src/shader-defs/common-param-def.ts`
  - `docs/src/shader-defs/dithering-def.ts`
  - `docs/src/shader-defs/dot-grid-def.ts`
  - `docs/src/shader-defs/dot-orbit-def.ts`
  - `docs/src/shader-defs/fluted-glass-def.ts`
  - `docs/src/shader-defs/gem-smoke-def.ts`
  - `docs/src/shader-defs/god-rays-def.ts`
  - `docs/src/shader-defs/grain-gradient-def.ts`
  - `docs/src/shader-defs/halftone-cmyk-def.ts`
  - `docs/src/shader-defs/halftone-dots-def.ts`
  - `docs/src/shader-defs/heatmap-def.ts`
  - `docs/src/shader-defs/image-dithering-def.ts`
  - `docs/src/shader-defs/liquid-metal-def.ts`
  - `docs/src/shader-defs/mesh-gradient-def.ts`
  - `docs/src/shader-defs/metaballs-def.ts`

## README Summary

# Paper Shaders

![mesh-gradient-shader](./docs/public/images/git-readme-picture.webp)

### Getting started

```
// React
npm i @paper-design/shaders-react

// vanilla
npm i @paper-design/shaders

// Please pin your dependency – we will ship breaking changes under 0.0.x versioning
```

### Documentation

[React documentation and interactive examples →](https://shaders.paper.design/)

### React example

```jsx
import {MeshGradient, DotOrbit} from '@paper-design/shaders-react';

<MeshGradient
    colors={['#5100ff', '#00ff80', '#ffcc00', '#ea00ff']}
    distortion={1}
    swirl={0.8}
    speed={0.2}
    style={{width: 200, height: 200}}
/>

<DotOrbit
    colors={['#d2822d', '#0c3b7e', '#b31a57', '#37a066']}
    colorBack={'#000000'}
    scale={0.3}
    style={{width: 200, height: 200}}
/>

// these settings can be configured in code or designed in Paper
```

### Goals:

- Give designers a visual way to use common shaders in their designs
- What you make is directly exportable as lightweight code that works in any codebase

### What it is:

- Zero-dependency HTML canvas shaders that can be installed from npm or designed in Paper
- To be used in websites to add texture as backgrounds or masked with shapes and text
- Animated (or not, your choice) and highly customizable

### Values:

- Very lightweight, maximum performance
- Visual quality
- Abstractions that are easy to play with
- Wide browser and device support

### Framework support:

- Vanilla JS ([@paper-design/shaders](https://www.npmjs.com/package/@paper-design/shaders))
- React JS ([@paper-design/shaders-react](https://www.npmjs.com/package/@paper-design/shaders-react))
- Vue and others: intent to accept community PRs in the future

## Release notes

[View changelog →](./CHANGELOG.md)

## Building and publishing

1. Bump the version numbers as desired manually
2. Use `bun run build` on the top level of the monorepo to build each package
3. Use `bun run publish-all` to publish all (or `bun run publish-all-test` 

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
