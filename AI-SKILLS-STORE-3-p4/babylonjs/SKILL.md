---
name: babylonjs
description: "Build 3D scenes, games, and visualizations with Babylon.js. Use for 3D rendering, WebGL/WebGPU, 3D models, physics, animations, VR/AR experiences. Covers scene setup, cameras, lights, meshes, materials, animation, and performance optimization."
license: Apache-2.0
metadata:
  author: terminal-skills
  version: "1.0.0"
  category: development
  tags: ["babylonjs", "3d", "webgl", "webgpu", "game-engine", "rendering"]
---

# Babylon.js 3D Engine

Build 3D scenes, games, and visualizations with Babylon.js.

## Scene Setup

```ts
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder } from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);
const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

engine.runRenderLoop(() => scene.render());
window.addEventListener('resize', () => engine.resize());
```

## Animation

```ts
import { Animation } from '@babylonjs/core';

const anim = new Animation('boxAnim', 'position.x', 30, Animation.ANIMATIONTYPE_FLOAT);
const keys = [
  { frame: 0, value: 0 },
  { frame: 50, value: 5 },
  { frame: 100, value: 0 },
];
anim.setKeys(keys);
box.animations = [anim];
scene.beginAnimation(box, 0, 100, true);
```

## Loading 3D Models

```ts
import { SceneLoader } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

SceneLoader.ImportMesh('', '/models/', 'model.glb', scene, (meshes) => {
  console.log('Loaded:', meshes.length);
});
```

## Physics (Havok)

```ts
import { HavokPlugin } from '@babylonjs/core';
import havok from '@babylonjs/havok';

const havokInstance = await havok();
const havokPlugin = new HavokPlugin(true, havokInstance);
scene.enablePhysics(new Vector3(0, -9.81, 0), havokPlugin);
```

## GUI

```ts
import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';
const ui = AdvancedDynamicTexture.CreateFullscreenUI('ui');
const btn = Button.CreateSimpleButton('btn', 'Click Me');
btn.width = '120px';
btn.height = '40px';
ui.addControl(btn);
```

## Best Practices

1. Use `SceneOptimizer` for auto-performance tuning
2. Animation groups for coordinated sequences
3. `Texture` caching — reuse textures, don't reload
4. `SPS` (Solid Particle System) for thousands of objects
5. GLB/GLTF as preferred format for models
6. Inspector (`scene.debugLayer.show()`) to debug scenes
