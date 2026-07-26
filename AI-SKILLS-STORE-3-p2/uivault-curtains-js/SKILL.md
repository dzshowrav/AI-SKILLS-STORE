---
name: curtains.js
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/martinlaxenaire/curtainsjs
category: 3D / Shader / WebGL
github: martinlaxenaire/curtainsjs
---

# curtains.js

> 3D / Shader / WebGL · [martinlaxenaire/curtainsjs](https://github.com/martinlaxenaire/curtainsjs)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.gitignore`
  - `.npmignore`
  - `CHANGELOG.md`
  - `LICENSE.txt`
  - `README.md`
  - `dist/curtains.umd.js`
  - `dist/curtains.umd.min.js`
  - `documentation/.htaccess`
  - `documentation/curtains-class.html`
  - `documentation/documentation.html`
  - `documentation/download.html`
  - `documentation/fxaa-pass-class.html`
  - `documentation/get-started.html`
  - `documentation/images/curtains-js-aeforia.jpg`
  - `documentation/images/curtains-js-analogue-production.jpg`
  - `documentation/images/curtains-js-benjamin-henon.jpg`
  - `documentation/images/curtains-js-cher-ami.jpg`
  - `documentation/images/curtains-js-corsaires-studio.jpg`
  - `documentation/images/curtains-js-jonathan-alpmyr.jpg`
  - `documentation/images/curtains-js-logo-square-white.jpg`
  - `documentation/images/curtains-js-logo.jpg`
  - `documentation/images/curtains-js-martin-laxenaire.jpg`
  - `documentation/images/curtains-js-mirage-festival-2019.jpg`
  - `documentation/images/curtains-js-nordik-impakt.jpg`
  - `documentation/images/curtains-js-theo-gil.jpg`
  - `documentation/images/favicons/android-chrome-192x192.png`
  - `documentation/images/favicons/android-chrome-512x512.png`
  - `documentation/images/favicons/apple-touch-icon.png`
  - `documentation/images/favicons/browserconfig.xml`
  - `documentation/images/favicons/favicon-16x16.png`
  - `documentation/images/favicons/favicon-32x32.png`
  - `documentation/images/favicons/favicon.ico`
  - `documentation/images/favicons/mstile-150x150.png`
  - `documentation/images/favicons/safari-pinned-tab.svg`
  - `documentation/images/favicons/site.webmanifest`
  - `documentation/images/intro-background.jpg`
  - `documentation/images/plane-vertices-helper.jpg`
  - `documentation/images/promo.gif`
  - `documentation/index.html`
  - `documentation/js/main.navigation.js`
  - `documentation/mat-4-class.html`
  - `documentation/migration-guide-to-v7.html`
  - `documentation/ping-pong-plane-class.html`
  - `documentation/plane-class.html`
  - `documentation/quat-class.html`
  - `documentation/render-target-class.html`
  - `documentation/scene-rendering-order.html`
  - `documentation/shader-pass-class.html`
  - `documentation/sitemap.xml`
  - `documentation/style.css`
  - `documentation/texture-class.html`
  - `documentation/texture-loader-class.html`
  - `documentation/vec-2-class.html`
  - `examples/ajax-navigation-with-plane-removal/archive1.html`
  - `examples/ajax-navigation-with-plane-removal/archive2.html`
  - `examples/ajax-navigation-with-plane-removal/index.html`
  - `examples/ajax-navigation-with-plane-removal/js/ajax.nav.setup.js`
  - `examples/ajax-navigation-with-plane-removal/style.css`
  - `examples/asynchronous-textures/index.html`
  - `examples/asynchronous-textures/js/async.textures.setup.js`
  - `examples/asynchronous-textures/style.css`
  - `examples/basic-plane/index.html`
  - `examples/gsap-click-to-fullscreen-gallery/index.html`
  - `examples/gsap-click-to-fullscreen-gallery/js/click.to.fullscreen.gallery.setup.js`
  - `examples/gsap-click-to-fullscreen-gallery/js/gsap.min.js`
  - `examples/gsap-click-to-fullscreen-gallery/style.css`
  - `examples/medias/displacement.jpg`
  - `examples/medias/plane-small-texture-1.jpg`
  - `examples/medias/plane-small-texture-2.jpg`
  - `examples/medias/plane-small-texture-3.jpg`
  - `examples/medias/plane-small-texture-4.jpg`
  - `examples/medias/plane-texture-1.jpg`
  - `examples/medias/plane-texture-2.jpg`
  - `examples/medias/plane-texture-3.jpg`
  - `examples/medias/plane-texture-4.jpg`
  - `examples/medias/plane-video-texture-1.mp4`
  - `examples/medias/plane-video-texture-2.mp4`
  - `examples/medias/video-displacement.jpg`
  - `examples/multiple-planes-canvas-text/index.html`
  - `examples/multiple-planes-canvas-text/js/multiple.planes.canvas.setup.js`
  - `examples/multiple-planes-canvas-text/style.css`
  - `examples/multiple-planes-scroll-effect-custom-scroll/index.html`
  - `examples/multiple-planes-scroll-effect-custom-scroll/js/locomotive-scroll.min.js`
  - `examples/multiple-planes-scroll-effect-custom-scroll/js/multiple.planes.parallax.setup.js`
  - `examples/multiple-planes-scroll-effect-custom-scroll/locomotive-scroll.min.css`
  - `examples/multiple-planes-scroll-effect-custom-scroll/style.css`
  - `examples/multiple-planes-scroll-effect/index.html`
  - `examples/multiple-planes-scroll-effect/js/multiple.planes.parallax.setup.js`
  - `examples/multiple-planes-scroll-effect/style.css`
  - `examples/multiple-planes/index.html`
  - `examples/multiple-planes/js/multiple.planes.setup.js`
  - `examples/multiple-planes/style.css`
  - `examples/multiple-textures/index.html`
  - `examples/multiple-textures/js/multiple.textures.setup.js`
  - `examples/multiple-textures/style.css`
  - `examples/multiple-video-textures/index.html`
  - `examples/multiple-video-textures/js/multiple.video.textures.setup.js`
  - `examples/multiple-video-textures/style.css`
  - `examples/ping-pong-shading-flowmap/index.html`
  - `examples/ping-pong-shading-flowmap/js/flowmap.setup.js`

## README Summary

<h2>What is it ?</h2>
<p>
    Shaders are the new front-end web developpment big thing, with the ability to create very powerful 3D interactions and animations. A lot of very good javascript libraries already handle WebGL but with most of them it's kind of a headache to position your meshes relative to the DOM elements of your web page.
</p>
<p>
    curtains.js was created with just that issue in mind. It is a small vanilla WebGL javascript library that converts HTML elements containing images and videos into 3D WebGL textured planes, allowing you to animate them via shaders.<br />
    You can define each plane size and position via CSS, which makes it super easy to add WebGL responsive planes all over your pages.
</p>
<p style="text-align: center;">
    <img src="https://github.com/martinlaxenaire/curtainsjs/blob/master/documentation/images/promo.gif" alt="curtains.js demo gif" width="300" height="225" />
</p>
<h2>Knowledge and technical requirements</h2>
<p>
    It is easy to use but you will of course have to possess good basics of HTML, CSS and javascript.
</p>
<p>
    If you've never heard about shaders, you may want to learn a bit more about them on <a href="https://thebookofshaders.com/" title="The Book of Shaders" >The Book of Shaders</a> for example. You will have to understand what are the vertex and fragment shaders, the use of uniforms as well as the GLSL syntax basics.
</p>
<h2>Installation and usage</h2>
<div>
    You can directly download the files and start using the ES6 modules:
    
```javascript
import {Curtains, Plane} from 'path/to/src/index.mjs';

const curtains = new Curtains({
    container: "canvas"
});

const plane = new Plane(curtains, document.querySelector("#plane"));
```
</div>
<div>
    Or you can use npm:

```
npm i curtainsjs
```

</div>
<div>
    Load ES6 modules:

```javascript
import {Curtains, Plane} from 'curtainsjs';
```

</div>
<div>
In a browser, you can use the UMD files located in the `dist` directory:
    
```html
<script 

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
