---
name: glslCanvas
description: UI Vault resource — 3D / Shader / WebGL
source: https://github.com/patriciogonzalezvivo/glslCanvas
category: 3D / Shader / WebGL
github: patriciogonzalezvivo/glslCanvas
---

# glslCanvas

> 3D / Shader / WebGL · [patriciogonzalezvivo/glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)

The full repository has been cloned locally. All files are available in the `repo/` subdirectory.

## Local Files

  - `.babelrc`
  - `.gitignore`
  - `.jscsrc`
  - `.jshintignore`
  - `.jshintrc`
  - `.travis.yml`
  - `LICENSE`
  - `README.md`
  - `buffers.html`
  - `data/logo.jpg`
  - `data/moon.jpg`
  - `dist/GlslCanvas.es.js`
  - `dist/GlslCanvas.js`
  - `dist/GlslCanvas.min.js`
  - `dist/GlslCanvas.min.js.map`
  - `index.html`
  - `lib/GlslCanvas.js`
  - `package-lock.json`
  - `package.json`
  - `rollup.config.js`
  - `src/GlslCanvas.js`
  - `src/gl/Texture.js`
  - `src/gl/gl.js`
  - `src/tools/common.js`
  - `src/tools/mixin.js`
  - `yarn.lock`

## README Summary

[GlslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas) is JavaScript Library that helps you easily load GLSL Fragment and Vertex Shaders into an HTML canvas. I have used this in my [Book of Shaders](http://thebookofshaders.com) and [glslEditor](http://editor.thebookofshaders.com).

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4BQMKQJDQ9XH6)

## How to use it?

There are different ways to do this. But first, make sure you are loading the latest version of ```GlslCanvas.js``` on your page by adding this line to your HTML:
```html
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js"></script>
```

or if you are using npm package manager on your console do:

```bash
npm install glslCanvas
```

### The easy way

1. Create a canvas element in your HTML.
2. Add the class name ```glslCanvas``` to the canvas.
3. Assign it a shader...
	* through a url using the attribute ```data-fragment-url```
	* or directly writing your code inside the ```data-fragment``` attribute

```html
<canvas class="glslCanvas" data-fragment-url="shader.frag" width="500" height="500"></canvas>
```

That's all! glslCanvas will automatically load a WebGL context in that ```<canvas>``` element, compile the shader and animate it for you.

As you can see, in this example we are loading the fragment shader by setting the attribute ```data-fragment-url``` to a url. But there are also a few other ways to load data to our ```glslCanvas```:

* ```data-fragment``` : load a fragment shader by providing the content of the shader as a string
* ```data-fragment-url``` : load a fragment shader by providing a valid url
* ```data-vertex``` : load a vertex shader by providing the content of the shader as a string
* ```data-vertex-url``` : load a vertex shader by providing a valid url
* ```data-textures```: add a list of texture urls separated by commas (e

## Usage

All source code, components, and examples from this resource are available locally in:
- `repo/` — the full cloned repository
