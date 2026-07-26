---
name: Whatamesh
description: UI Vault resource — 3D / Shader / WebGL. https://github.com/jordienr/whatamesh
source: https://github.com/jordienr/whatamesh
category: 3D / Shader / WebGL
type: external-resource
github: jordienr/whatamesh
---

# Whatamesh

> 3D / Shader / WebGL · [Open source](https://github.com/jordienr/whatamesh)

This skill provides comprehensive reference for using **Whatamesh** in your projects.
All examples, components, and patterns described below are from the official documentation.

---

# Whatamesh

Easily create mesh gradients like Stripe.

This project wouldn't be possible without stripe and https://kevinhufnagl.com/

## Live Demo 

[https://whatamesh.vercel.app/](https://whatamesh.vercel.app/)

## Getting started

### Creating your first gradient

```html
<canvas id="gradient-canvas"></canvas>
```

```js
import { Gradient } from "whatamesh";

const gradient = new Gradient();
gradient.initGradient("#gradient-canvas");
```

```css
#gradient-canvas {
  width: 100%;
  height: 100%;
  --gradient-color-1: #449ce4;
  --gradient-color-2: #2f8bc1;
  --gradient-color-3: #ccbeee;
  --gradient-color-4: #4c57f6;
}
```


---
*This skill was auto-generated from [Whatamesh](https://github.com/jordienr/whatamesh) — a UI Vault curated resource.*
