---
name: GSAP + ScrollTrigger
description: UI Vault resource — Scroll & Animation
source: https://github.com/greensock/GSAP
category: Scroll & Animation
github: greensock/GSAP
---

# GSAP + ScrollTrigger

> Scroll & Animation · [greensock/GSAP](https://github.com/greensock/GSAP)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `README.md`
  - `SECURITY.md`
  - `dist/CSSRulePlugin.js`
  - `dist/CSSRulePlugin.min.js`
  - `dist/CSSRulePlugin.min.js.map`
  - `dist/CustomBounce.js`
  - `dist/CustomBounce.min.js`
  - `dist/CustomBounce.min.js.map`
  - `dist/CustomEase.js`
  - `dist/CustomEase.min.js`
  - `dist/CustomEase.min.js.map`
  - `dist/CustomWiggle.js`
  - `dist/CustomWiggle.min.js`
  - `dist/CustomWiggle.min.js.map`
  - `dist/Draggable.js`
  - `dist/Draggable.min.js`
  - `dist/Draggable.min.js.map`
  - `dist/DrawSVGPlugin.js`
  - `dist/DrawSVGPlugin.min.js`
  - `dist/DrawSVGPlugin.min.js.map`
  - `dist/EasePack.js`
  - `dist/EasePack.min.js`
  - `esm/CSSPlugin.js`
  - `esm/CSSRulePlugin.js`
  - `esm/CustomBounce.js`
  - `esm/CustomEase.js`
  - `esm/CustomWiggle.js`
  - `esm/Draggable.js`
  - `esm/DrawSVGPlugin.js`
  - `esm/EasePack.js`
  - `esm/EaselPlugin.js`
  - `esm/Flip.js`
  - `esm/GSDevTools.js`
  - `esm/InertiaPlugin.js`
  - `esm/MorphSVGPlugin.js`
  - `esm/MotionPathHelper.js`
  - `esm/MotionPathPlugin.js`
  - `esm/Observer.js`
  - `esm/Physics2DPlugin.js`
  - `esm/PhysicsPropsPlugin.js`
  - `esm/PixiPlugin.js`
  - `esm/ScrambleTextPlugin.js`
  - `esm/utils/PathEditor.js`
  - `esm/utils/VelocityTracker.js`
  - `esm/utils/matrix.js`
  - `esm/utils/paths.js`
  - `esm/utils/strings.js`
  - `package.json`
  - `src/CSSPlugin.js`
  - `src/CSSRulePlugin.js`
  - `src/CustomBounce.js`
  - `src/CustomEase.js`
  - `src/CustomWiggle.js`
  - `src/Draggable.js`
  - `src/DrawSVGPlugin.js`
  - `src/EasePack.js`
  - `src/EaselPlugin.js`
  - `src/Flip.js`
  - `src/GSDevTools.js`
  - `src/InertiaPlugin.js`
  - `src/MorphSVGPlugin.js`
  - `src/MotionPathHelper.js`
  - `src/MotionPathPlugin.js`
  - `src/Observer.js`
  - `src/Physics2DPlugin.js`
  - `src/PhysicsPropsPlugin.js`
  - `src/PixiPlugin.js`
  - `src/ScrambleTextPlugin.js`
  - `src/utils/PathEditor.js`
  - `src/utils/VelocityTracker.js`
  - `src/utils/matrix.js`
  - `src/utils/paths.js`
  - `src/utils/strings.js`
  - `types/animation.d.ts`
  - `types/css-plugin.d.ts`
  - `types/css-rule-plugin.d.ts`
  - `types/custom-bounce.d.ts`
  - `types/custom-ease.d.ts`
  - `types/custom-wiggle.d.ts`
  - `types/draggable.d.ts`
  - `types/draw-svg-plugin.d.ts`
  - `types/ease.d.ts`
  - `types/easel-plugin.d.ts`
  - `types/flip.d.ts`
  - `types/gs-dev-tools.d.ts`
  - `types/gsap-core.d.ts`
  - `types/gsap-plugins.d.ts`
  - `types/gsap-utils.d.ts`
  - `types/index.d.ts`
  - `types/inertia-plugin.d.ts`
  - `types/morph-svg-plugin.d.ts`
  - `types/motion-path-helper.d.ts`
  - `types/motion-path-plugin.d.ts`
  - `types/utils/VelocityTracker.d.ts`

## README Summary

# GSAP (GreenSock Animation Platform)

[![GSAP - Animate anything](https://gsap.com/GSAP-share-image.png)](https://gsap.com)

GSAP is a **framework-agnostic** JavaScript animation library that turns developers into animation superheroes. Build high-performance animations that work in **every** major browser. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects... anything JavaScript can touch! GSAP's <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/">ScrollTrigger</a> plugin delivers jaw-dropping scroll-based animations with minimal code. <a href="https://gsap.com/docs/v3/GSAP/gsap.matchMedia()">gsap.matchMedia()</a> makes building responsive, accessibility-friendly animations a breeze.

No other library delivers such advanced sequencing, reliability, and tight control while solving real-world problems on over 12 million sites. GSAP works around countless browser inconsistencies; your animations ***just work***. At its core, GSAP is a high-speed property manipulator, updating values over time with extreme accuracy. It's up to 20x faster than jQuery!

GSAP is completely flexible; sprinkle it wherever you want. **Zero dependencies.**

There are many optional <a href="https://gsap.com/docs/v3/Plugins">plugins</a> and <a href="https://gsap.com/docs/v3/Eases">easing</a> functions for achieving advanced effects easily like <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/">scrolling</a>, <a href="https://gsap.com/docs/v3/Plugins/MorphSVGPlugin">morphing</a>, [text splitting](https://gsap.com/docs/v3/Plugins/SplitText), animating along a <a href="https://gsap.com/docs/v3/Plugins/MotionPathPlugin">motion path</a> or <a href="https://gsap.com/docs/v3/Plugins/Flip/">FLIP</a> animations. There's even a handy <a href="https://gsap.com/docs/v3/Plugins/Observer/">Observer</a> for normalizing event detection across browsers/devices. 


### Get Started

[![Get Started with GSAP](https://gsap.com/_img/github/get-started.jpg)](http

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
