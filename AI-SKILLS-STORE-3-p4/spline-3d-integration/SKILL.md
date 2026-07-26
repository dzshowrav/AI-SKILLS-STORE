---
name: spline-3d-integration
description: "Integrate Spline 3D scenes into web projects. Use when adding interactive 3D content via Spline Viewer, embedding Spline scenes in React/Vue/Svelte/HTML, or exporting Spline designs as code."
license: MIT
metadata:
  author: community
  version: "1.0.0"
  category: development
  tags: ["spline", "3d", "design", "embed", "interactive", "webgl"]
---

# Spline 3D Integration

Embed and integrate Spline 3D scenes into web projects.

## Web Embed (Spline Viewer)

```html
<iframe src="https://my.spline.design/your-scene-id/" 
  width="100%" height="600" frameborder="0"></iframe>
```

## React Integration

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

```tsx
import Spline from '@splinetool/react-spline';

function Scene() {
  return (
    <Spline
      scene="https://prod.spline.design/your-scene-id/scene.splinecode"
      onLoad={(spline) => console.log('loaded')}
    />
  );
}
```

## Runtime Events & Controls

```tsx
function SplineScene() {
  const splineRef = useRef(null);

  function onLoad(spline) {
    splineRef.current = spline;
    // Find and control 3D objects
    const obj = spline.findObjectByName('Cube');
    if (obj) obj.position.y += 1;
  }

  function triggerAnimation() {
    splineRef.current?.emitEvent('mouseDown', 'Button');
  }

  return (
    <Spline
      scene="https://prod.spline.design/your-scene-id/scene.splinecode"
      onLoad={onLoad}
    />
  );
}
```

## Vue Integration

```bash
npm install @splinetool/vue-spline
```

```vue
<template>
  <SplineScene scene="https://prod.spline.design/your-scene-id/scene.splinecode" />
</template>

<script setup>
import { SplineScene } from '@splinetool/vue-spline';
</script>
```

## Best Practices

1. Use `@splinetool/runtime` directly for low-level control (no framework wrapper)
2. Optimize scenes by reducing polygon count and texture sizes
3. Spline's export → "Copy React Code" for framework-optimized output
4. Lazy-load heavy scenes with dynamic imports
5. Always use `onLoad` callback before interacting with objects
