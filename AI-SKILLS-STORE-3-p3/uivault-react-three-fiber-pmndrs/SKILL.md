---
name: react-three-fiber (pmndrs)
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/pmndrs/react-three-fiber
category: 3D / Shader / WebGL
github: pmndrs/react-three-fiber
---

# react-three-fiber (pmndrs)

> 3D / Shader / WebGL · [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.changeset/README.md`
  - `.changeset/config.json`
  - `.codesandbox/ci.json`
  - `.eslintignore`
  - `.eslintrc.json`
  - `.gitignore`
  - `.husky/.gitignore`
  - `.husky/pre-commit`
  - `.prettierignore`
  - `.prettierrc`
  - `CONTRIBUTING.md`
  - `LICENSE`
  - `babel.config.js`
  - `docs/API/additional-exports.mdx`
  - `docs/API/canvas.mdx`
  - `docs/API/events.mdx`
  - `docs/API/hooks.mdx`
  - `docs/API/objects.mdx`
  - `docs/API/testing.mdx`
  - `docs/API/typescript.mdx`
  - `docs/advanced/pitfalls.mdx`
  - `docs/advanced/scaling-performance.mdx`
  - `docs/banner-journey.jpg`
  - `docs/banner-r3f.jpg`
  - `docs/basic-app.gif`
  - `docs/getting-started/basic-example-sandpack/index.jsx`
  - `docs/getting-started/basic-example-sandpack/styles.css`
  - `docs/getting-started/basic-example.gif`
  - `docs/getting-started/community-r3f-components.mdx`
  - `docs/getting-started/examples.mdx`
  - `docs/getting-started/installation.mdx`
  - `docs/getting-started/introduction.mdx`
  - `docs/getting-started/your-first-scene.mdx`
  - `docs/logo.jpg`
  - `docs/preview.jpg`
  - `docs/tutorials/basic-animations.mdx`
  - `docs/tutorials/events-and-interaction.mdx`
  - `docs/tutorials/gltfjsx.png`
  - `docs/tutorials/how-it-works.mdx`
  - `docs/tutorials/loading-models.mdx`
  - `docs/tutorials/loading-textures.mdx`
  - `docs/tutorials/v9-migration-guide.mdx`
  - `example/.gitignore`
  - `example/CHANGELOG.md`
  - `example/favicon.svg`
  - `example/index.html`
  - `example/package.json`
  - `example/public/Parrot.glb`
  - `example/public/Stork.glb`
  - `example/public/apple.gltf`
  - `example/public/bottle.gltf`
  - `example/public/farm.gltf`
  - `example/public/lightning.gltf`
  - `example/public/pmndrs.png`
  - `example/public/ramen.gltf`
  - `example/public/react.png`
  - `example/public/three.png`
  - `example/src/App.tsx`
  - `example/src/components.tsx`
  - `example/src/demos/Activity.tsx`
  - `example/src/demos/AutoDispose.tsx`
  - `example/src/demos/ChangeTexture.tsx`
  - `example/src/demos/ClickAndHover.tsx`
  - `example/src/demos/ContextMenuOverride.tsx`
  - `example/src/demos/FlushSync.tsx`
  - `example/src/demos/Gestures.tsx`
  - `example/src/demos/Gltf.tsx`
  - `example/src/demos/Inject.tsx`
  - `example/src/demos/Layers.tsx`
  - `example/src/demos/Lines.tsx`
  - `example/src/demos/MultiMaterial.tsx`
  - `example/src/demos/MultiRender.tsx`
  - `example/src/demos/MultiView.tsx`
  - `example/src/demos/Pointcloud.tsx`
  - `example/src/demos/Portals.tsx`
  - `example/src/demos/Reparenting.tsx`
  - `example/src/demos/ResetProps.tsx`
  - `example/src/demos/SVGRenderer.tsx`
  - `example/src/demos/Selection.tsx`
  - `example/src/index.tsx`
  - `example/src/styles.css`
  - `example/tsconfig.json`
  - `example/vite.config.ts`
  - `example/yarn.lock`
  - `jest.config.js`
  - `package.json`
  - `packages/eslint-plugin/.npmignore`
  - `packages/eslint-plugin/CHANGELOG.md`
  - `packages/eslint-plugin/README.md`
  - `packages/eslint-plugin/package.json`
  - `packages/eslint-plugin/scripts/codegen.ts`
  - `packages/eslint-plugin/src/index.ts`
  - `packages/fiber/.npmignore`
  - `packages/fiber/CHANGELOG.md`
  - `packages/fiber/__mocks__/expo-asset.ts`
  - `packages/fiber/__mocks__/expo-file-system.ts`
  - `packages/fiber/__mocks__/expo-gl.ts`
  - `packages/fiber/__mocks__/react-native.ts`
  - `packages/fiber/__mocks__/react-use-measure.ts`
  - `packages/fiber/native/package.json`

## README Summary

<h1>@react-three/fiber</h1>

[![Version](https://img.shields.io/npm/v/@react-three/fiber?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@react-three/fiber)
[![Downloads](https://img.shields.io/npm/dt/@react-three/fiber.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/@react-three/fiber)
[![Twitter](https://img.shields.io/twitter/follow/pmndrs?label=%40pmndrs&style=flat&colorA=000000&colorB=000000&logo=twitter&logoColor=000000)](https://twitter.com/pmndrs)
[![Discord](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=000000)](https://discord.gg/ZZjjNvJ)
[![Open Collective](https://img.shields.io/opencollective/all/react-three-fiber?style=flat&colorA=000000&colorB=000000)](https://opencollective.com/react-three-fiber)
[![ETH](https://img.shields.io/badge/ETH-f5f5f5?style=flat&colorA=000000&colorB=000000)](https://blockchain.com/eth/address/0x6E3f79Ea1d0dcedeb33D3fC6c34d2B1f156F2682)
[![BTC](https://img.shields.io/badge/BTC-f5f5f5?style=flat&colorA=000000&colorB=000000)](https://blockchain.com/btc/address/36fuguTPxGCNnYZSRdgdh6Ea94brCAjMbH)

<a href="https://docs.pmnd.rs/react-three-fiber/getting-started/examples"><img src="docs/banner-r3f.jpg" /></a>

react-three-fiber is a <a href="https://reactjs.org/docs/codebase-overview.html#renderers">React renderer</a> for threejs.

Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can participate in React's ecosystem.

```bash
npm install three @types/three @react-three/fiber
```

> [!WARNING]  
> Three-fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19.

---

#### Does it have limitations?

None. Everything that works in Threejs will work here without exception.

#### Is it slower than plain Threejs

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
