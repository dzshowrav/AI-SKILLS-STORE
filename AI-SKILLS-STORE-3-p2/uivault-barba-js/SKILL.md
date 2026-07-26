---
name: Barba.js
description: UI Vault resource — Scroll & Animation
source: https://github.com/barbajs/barba
category: Scroll & Animation
github: barbajs/barba
---

# Barba.js

> Scroll & Animation · [barbajs/barba](https://github.com/barbajs/barba)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.all-contributorsrc`
  - `.circleci/config.yml`
  - `.editorconfig`
  - `.eslintrc.js`
  - `.gitignore`
  - `.lintstagedrc`
  - `.markdownlint.json`
  - `.vscode/settings.json`
  - `AUTHORS`
  - `CI.md`
  - `LICENSE.md`
  - `NOTES.md`
  - `README.md`
  - `TODO.md`
  - `commitlint.config.js`
  - `cypress.config.ts`
  - `cypress/fixtures/example.json`
  - `cypress/plugins/index.js`
  - `cypress/support/commands.js`
  - `cypress/support/e2e.js`
  - `documentation/theme/layouts/default.hbs`
  - `jest.config.js`
  - `lerna.json`
  - `package.json`
  - `packages/core/.npmignore`
  - `packages/core/AUTHORS`
  - `packages/core/CHANGELOG.md`
  - `packages/core/LICENSE`
  - `packages/core/README.md`
  - `packages/core/__e2e__/container.spec.js`
  - `packages/core/__e2e__/default.spec.js`
  - `packages/core/__e2e__/hooks.spec.js`
  - `packages/core/__e2e__/href.spec.js`
  - `packages/core/__e2e__/views.spec.js`
  - `packages/core/__mocks__/barba.ts`
  - `packages/core/__mocks__/transitions.ts`
  - `packages/core/__web__/container.html`
  - `packages/core/__web__/href.html`
  - `packages/core/__web__/index.html`
  - `packages/core/__web__/page.html`
  - `packages/core/__web__/views.html`
  - `packages/core/jest.config.js`
  - `packages/core/package.json`
  - `packages/core/src/core.ts`
  - `packages/core/src/hooks.ts`
  - `packages/core/src/index.ts`
  - `packages/core/src/typings.ts`
  - `packages/css/.npmignore`
  - `packages/css/AUTHORS`
  - `packages/css/CHANGELOG.md`
  - `packages/css/LICENSE`
  - `packages/css/README.md`
  - `packages/css/__e2e__/default.spec.js`
  - `packages/css/__e2e__/named.spec.js`
  - `packages/css/__e2e__/once.spec.js`
  - `packages/css/__tests__/css.classes.test.ts`
  - `packages/css/__tests__/css.hooks.test.ts`
  - `packages/css/__tests__/css.init.test.ts`
  - `packages/css/__tests__/css.prefix.test.ts`
  - `packages/css/__tests__/css.states.test.ts`
  - `packages/css/__web__/index.html`
  - `packages/css/__web__/named.html`
  - `packages/css/__web__/once.html`
  - `packages/css/__web__/page.html`
  - `packages/css/jest.config.js`
  - `packages/css/package.json`
  - `packages/css/src/css.ts`
  - `packages/css/src/index.ts`
  - `packages/css/src/typings.ts`
  - `packages/prefetch/.npmignore`
  - `packages/prefetch/AUTHORS`
  - `packages/prefetch/CHANGELOG.md`
  - `packages/prefetch/LICENSE`
  - `packages/prefetch/README.md`
  - `packages/prefetch/__e2e__/prefetch.spec.js`
  - `packages/prefetch/__tests__/prefetch.init.test.ts`
  - `packages/prefetch/__web__/index.html`
  - `packages/prefetch/jest.config.js`
  - `packages/prefetch/package.json`
  - `packages/prefetch/src/index.ts`
  - `packages/prefetch/src/prefetch.ts`
  - `packages/prefetch/src/typings.ts`
  - `packages/router/.npmignore`
  - `packages/router/AUTHORS`
  - `packages/router/CHANGELOG.md`
  - `packages/router/LICENSE`
  - `packages/router/README.md`
  - `packages/router/__e2e__/default.spec.js`
  - `packages/router/__tests__/router.test.ts`
  - `packages/router/__web__/default.html`
  - `packages/router/__web__/index.html`
  - `packages/router/__web__/page.html`
  - `packages/router/jest.config.js`
  - `packages/router/package.json`
  - `packages/router/src/index.ts`
  - `packages/router/src/router.ts`
  - `packages/router/src/typings.ts`
  - `prettier.config.js`
  - `tsconfig.json`
  - `tslint.json`

## README Summary

# barba.js – ![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square) [![CircleCI](https://img.shields.io/circleci/project/github/barbajs/barba/main.svg?style=flat-square)](https://circleci.com/gh/barbajs/barba/tree/main) [![Coverage Status](https://img.shields.io/coveralls/github/barbajs/barba/main.svg?style=flat-square)](https://coveralls.io/github/barbajs/barba?branch=main) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lerna.js.org/) [![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/barbajs/barba/blob/main/LICENSE.md) [![All Contributors](https://img.shields.io/badge/all_contributors-73-orange.svg?style=flat-square)](#contributors) [![Slack workspace](https://img.shields.io/badge/slack-workspace-purple.svg?style=flat-square&logo=slack)](https://join.slack.com/t/barbajs/shared_invite/enQtNTU3NTAyMjkxMzAyLTkxYWUwZmM1YWQxMmNlYmE0ZjY4NDQxMGUxYjkwYWFlMzEzOWM4OTRhMWRmYTQyYzFlMmQ3OGFmYmI3MWY0OWY)

Create **badass, fluid and smooth transitions** between your website’s pages.

[![barbajs](https://raw.githubusercontent.com/barbajs/.github/main/profile/barbajs.svg "BarbaJS")](https://barba.js.org/)

## Intro

**Barba.js** — aka *Barba* —  is a small *(7kb minified and compressed)* and easy-to-use library that helps you create fluid and smooth transitions between your website's pages. It makes your website run like a **SPA** *(Single Page Application)* and help reduce the delay between your pages, minimize browser HTTP requests and enhance your user's web experience.

## Features
Barba is user friendly, smart, extensible and futureproof. The lib

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
