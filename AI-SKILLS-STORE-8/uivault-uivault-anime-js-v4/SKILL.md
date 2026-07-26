---
name: Anime.js v4
description: UI Vault resource — Scroll & Animation
source: https://animejs.com/
category: Scroll & Animation
type: external-resource
---

# Anime.js v4

> Scroll & Animation · [Visit website](https://animejs.com/)

## Overview

This is a curated resource from [UI Vault](https://en970.github.io/ui-vault/) — a hand-picked collection of premium UI design resources.

**Category:** Scroll & Animation

**Website:** https://animejs.com/

## Reference Content

The following content was fetched from the resource's website:

Anime.js | JavaScript Animation Engine window.paths = { demos: '/documentation-demos', 'easings': '/assets/json/easings.json', 'github-sponsors': '/sponsors/github-sponsors', 'platinum-sponsors': '/sponsors/platinum-sponsors', 'gold-sponsors': '/sponsors/gold-sponsors', 'silver-sponsors': '/sponsors/silver-sponsors', }; window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-16LTPBS8QC'); Anime.js | JavaScript Animation Engine 4.0.0 3.2.2 2.1.0 Docs Easings Learn Examples GitHub Discord --> Sponsor All-in-one animation engine . A fast and flexible JavaScript library to animate the web . npm i animejs Learn more Sponsored by The complete animator's toolbox Break free from browser limitations and animate anything on the web with a single API. Intuitive API Animate faster with an easy-to-use, yet powerful animation API. Per property parameters Flexible keyframes system Built-in easings Enhanced transforms Smoothly blend individual CSS transform properties with a versatile composition API. Individual CSS Transforms Function based values Blend composition Scroll Observer Synchronise and trigger animations on scroll with the Scroll Observer API. Multiple synchronisation modes Advanced thresholds Complete set of callbacks Advanced staggering Create stunning effects in seconds with the built-in Stagger utility function. Time staggering Values staggering Timeline positions staggering SVG toolset Morph shapes, follow motion paths, and draw lines easily with the built-in SVG utilities. Shape morphing Line drawing Motion path Springs and draggable Drag, snap, flick and throw HTML elements with the fully-featured Draggable API. Versatile settings Comprehensive callbacks Useful methods Runs like clockwork Orchestrate animation sequences and keep callbacks in sync with the powerful Timeline API. Synchronise animations Advanced time positions Playback settings Responsive animations Make animations respond to media queries easily with the Scope API. Media queries Custom root element Scopped methods A lightweight and modular API Keep your bundle size small by only importing the parts you need. Our sponsors Anime.js is 100% free and is only made possible with the help of our sponsors. Become a sponsor Start animating Get started quickly with our in-depth documentation. Getting started Timer Animation Timeline Animatable Draggable Scope Scroll SVG Utils Easings WAAPI Engine --> animate('.square', { rotate: 90, loop: true, ease: 'inOutExpo', }); animate('.shape', { x: random(-100, 100), y: random(-100, 100), rotate: random(-180, 180), duration: random(500, 1000), composition: 'blend', }); animate('.car', { ...createMotionPath('.circuit'), }); animate(createDrawable('.circuit'), { draw: '0 1', }); animate('.circuit-a', { d: morphTo('.circuit-b'), }); animate(createDrawable('path'), { draw: ['0 0', '0 1', '1 1'], delay: stagger(40), ease: 'inOut(3)', autoplay: onScroll({ sync: true }), }); const options = { grid: [13, 13], from: 'center', }; createTimeline() .add('.dot', { scale: stagger([1.1, .75], options), ease: 'inOutQuad', }, stagger(200, options)); createDraggable('.circle', { releaseEase: createSpring({ stiffness: 120, damping: 6, }) }); createTimeline() .add('.tick', { y: '-=6', duration: 50, }, stagger(10)) .add('.ticker', { rotate: 360, duration: 1920, }, ' createScope({ mediaQueries: { portrait: '(orientation: portrait)', } }) .add(({ matches }) => { const isPortrait = matches.portrait; createTimeline().add('.circle', { y: isPortrait ? 0 : [-50, 50, -50], x: isPortrait ? [-50, 50, -50] : 0, }, stagger(100)); }); Bundle size 24.50 KB Timer 5.60 KB Animation +5.20 KB Timeline +0.55 KB Animatable +0.40 KB Draggable +6.41 KB Scroll +4.30 KB Scope +0.22 KB SVG 0.35 KB Stagger +0.48 KB Spring 0.52 KB WAAPI 3.50 KB Platinum sponsors Become a sponsor Become a sponsor Site Home Documentation Easings editor Learn Socials X / Twitter Bluesky GitHub CodePen Anime.js | JavaScript Animation Engine &copy; 2026 Julian Garnier Stay in the loop Thanks! Check your inbox to confirm your subscription. Something went wrong. Please try again later or email me directly at &#x6A;&#x75;&#x6C;&#x69;&#x61;&#x6E;&#x40;&#x61;&#x6E;&#x69;&#x6D;&#x65;&#x6A;&#x73;&#x2E;&#x63;&#x6F;&#x6D;

## How to Use This Skill

When working with Anime.js v4, reference this skill to:
- Understand the core features and capabilities
- Find the official documentation and examples
- Apply best practices from the UI Vault curation

## Related Resources

Visit the full [UI Vault](https://en970.github.io/ui-vault/) for more resources in the Scroll & Animation category.

---
*This skill was auto-generated from [Anime.js v4](https://animejs.com/) — a UI Vault curated resource.*
