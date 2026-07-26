---
name: shadergradient (ruucm/shadergradient)
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/ruucm/shadergradient
category: 3D / Shader / WebGL
github: ruucm/shadergradient
---

# shadergradient (ruucm/shadergradient)

> 3D / Shader / WebGL · [ruucm/shadergradient](https://github.com/ruucm/shadergradient)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.changeset/config.json`
  - `.gitignore`
  - `.npmrc`
  - `.prettierignore`
  - `.prettierrc`
  - `.vscode/settings.json`
  - `README.md`
  - `apps/email-previews/.react-email/CHANGELOG.md`
  - `apps/email-previews/.react-email/index.mjs`
  - `apps/email-previews/.react-email/license.md`
  - `apps/email-previews/.react-email/module-punycode.d.ts`
  - `apps/email-previews/.react-email/next-env.d.ts`
  - `apps/email-previews/.react-email/next.config.mjs`
  - `apps/email-previews/.react-email/package-lock.json`
  - `apps/email-previews/.react-email/package.json`
  - `apps/email-previews/.react-email/postcss.config.js`
  - `apps/email-previews/.react-email/readme.md`
  - `apps/email-previews/.react-email/tailwind.config.ts`
  - `apps/email-previews/.react-email/tsconfig.json`
  - `apps/email-previews/.react-email/vitest.config.ts`
  - `apps/email-previews/emails/ProductUpdateEmail.tsx`
  - `apps/email-previews/emails/ShaderGradientEmail.tsx`
  - `apps/email-previews/emails/ShaderGradientUpdateEmail.tsx`
  - `apps/email-previews/lib/emailContent.ts`
  - `apps/email-previews/package.json`
  - `apps/email-previews/tsconfig.json`
  - `apps/example-nextjs-dev/.eslintrc.json`
  - `apps/example-nextjs-dev/.gitignore`
  - `apps/example-nextjs-dev/CHANGELOG.md`
  - `apps/example-nextjs-dev/README.md`
  - `apps/example-nextjs-dev/app/favicon.ico`
  - `apps/example-nextjs-dev/app/globals.css`
  - `apps/example-nextjs-dev/app/layout.tsx`
  - `apps/example-nextjs-dev/app/page.tsx`
  - `apps/example-nextjs-dev/next.config.mjs`
  - `apps/example-nextjs-dev/package.json`
  - `apps/example-nextjs-dev/postcss.config.mjs`
  - `apps/example-nextjs-dev/tailwind.config.ts`
  - `apps/example-nextjs-dev/tsconfig.json`
  - `apps/examples/example-nextjs/.editorconfig`
  - `apps/examples/example-nextjs/.eslintignore`
  - `apps/examples/example-nextjs/.eslintrc`
  - `apps/examples/example-nextjs/.gitignore`
  - `apps/examples/example-nextjs/.prettierignore`
  - `apps/examples/example-nextjs/.prettierrc`
  - `apps/examples/example-nextjs/LICENSE`
  - `apps/examples/example-nextjs/README.md`
  - `apps/examples/example-nextjs/next-env.d.ts`
  - `apps/examples/example-nextjs/next.config.js`
  - `apps/examples/example-nextjs/package.json`
  - `apps/examples/example-nextjs/postcss.config.js`
  - `apps/examples/example-nextjs/sandbox.config.json`
  - `apps/examples/example-nextjs/tailwind.config.js`
  - `apps/examples/example-nextjs/tsconfig.json`
  - `apps/examples/example-vite-react/.gitignore`
  - `apps/examples/example-vite-react/README.md`
  - `apps/examples/example-vite-react/eslint.config.js`
  - `apps/examples/example-vite-react/index.html`
  - `apps/examples/example-vite-react/package-lock.json`
  - `apps/examples/example-vite-react/package.json`
  - `apps/examples/example-vite-react/pnpm-lock.yaml`
  - `apps/examples/example-vite-react/tsconfig.app.json`
  - `apps/examples/example-vite-react/tsconfig.json`
  - `apps/examples/example-vite-react/tsconfig.node.json`
  - `apps/examples/example-vite-react/vite.config.ts`
  - `apps/figma-plugin/README.md`
  - `apps/figma-plugin/manifest.json`
  - `apps/figma-plugin/package.json`
  - `apps/figma-plugin/src/code.ts`
  - `apps/figma-plugin/src/ui.css`
  - `apps/figma-plugin/src/ui.html`
  - `apps/figma-plugin/src/ui.tsx`
  - `apps/figma-plugin/tsconfig.json`
  - `apps/figma-plugin/webpack.config.js`
  - `apps/framer-plugin/.gitignore`
  - `apps/framer-plugin/README.md`
  - `apps/framer-plugin/eslint.config.js`
  - `apps/framer-plugin/framer.json`
  - `apps/framer-plugin/index.html`
  - `apps/framer-plugin/package.json`
  - `apps/framer-plugin/public/icon.png`
  - `apps/framer-plugin/src/App.css`
  - `apps/framer-plugin/src/App.tsx`
  - `apps/framer-plugin/src/main.tsx`
  - `apps/framer-plugin/src/vite-env.d.ts`
  - `apps/framer-plugin/tsconfig.json`
  - `apps/framer-plugin/vite.config.ts`
  - `assets/feconf.png`
  - `assets/figma.gif`
  - `assets/framer.gif`
  - `assets/intro.gif`
  - `package.json`
  - `packages/eslint-config-custom/index.js`
  - `packages/eslint-config-custom/package.json`
  - `packages/shadergradient/.eslintrc.js`
  - `packages/shadergradient/.npmignore`
  - `packages/shadergradient/CHANGELOG.md`
  - `packages/shadergradient/package.json`
  - `packages/shadergradient/pnpm-lock.yaml`
  - `packages/shadergradient/src/FramerControls.ts`

## README Summary

# Shader Gradient v2

Customizable 3D, moving gradient for React. The v2 package is lean: it only ships the `ShaderGradient` renderer (and its canvas helper), while the stateless UI pieces now live in the separate `@shadergradient/ui` package.

![Intro](./assets/intro.gif)

# Table of contents

- 📦 [Installation](#installation)
- 📦 [Packages](#packages)
- 💻 [Usage](#usage)
- 📚 [Examples](#examples)
- 🎤 [Conference Talks](#conference-talks)
- 📝 [Contributing](#contributing)
- 🚀 [Future Plan](#future-plan)
- ⚖️ [License](#license)

# Installation

## Figma

[Figma Plugin](https://www.figma.com/community/plugin/1203016883447870818)

## Framer

[Framer Component (Copy this URL and paste it on Framer Canvas)](https://framer.com/m/ShaderGradient-oWuS.js)

## React

Install the core renderer and its peer deps.

```
# with yarn
yarn add @shadergradient/react @react-three/fiber three three-stdlib camera-controls
yarn add -D @types/three

# with npm
npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
npm i -D @types/three

# with pnpm
pnpm add @shadergradient/react @react-three/fiber three three-stdlib camera-controls
pnpm add -D @types/three
```

Need the stateless control surfaces? Pull them from the `@shadergradient/ui` package (ESM build used by Framer/Figma), not from `@shadergradient/react`.

### Compatibility matrix

`@shadergradient/react` itself works on React 18 or 19, but the right `@react-three/fiber` version depends on your environment. **For Next.js 15 App Router specifically**, you must use R3F v9 + React 19 — R3F v8 is structurally incompatible with the App Router's vendored React 19 canary (see [#138](https://github.com/ruucm/shadergradient/issues/138) for the full trace).

| Environment                           | React          | @react-three/fiber   | three       |
| ------------------------------------- | -------------- | -------------------- | ----------- |
| **Next 15 — App Router**              | `^19.0.0`      | `^9.0.0` 

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
