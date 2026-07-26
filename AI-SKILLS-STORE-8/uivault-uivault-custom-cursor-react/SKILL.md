---
name: custom-cursor-react
description: UI Vault resource — Cursor & Micro-interactions. https://github.com/ajmnz/custom-cursor-react
source: https://github.com/ajmnz/custom-cursor-react
category: Cursor & Micro-interactions
type: external-resource
github: ajmnz/custom-cursor-react
---

# custom-cursor-react

> Cursor & Micro-interactions · [Open source](https://github.com/ajmnz/custom-cursor-react)

This skill provides comprehensive reference for using **custom-cursor-react** in your projects.
All examples, components, and patterns described below are from the official documentation.

---

<h2 align='center'>React Custom Cursor 🎉</h2>
<p align='center'>Animated, customizable and interactive cursor for React</p>
<p align="center">
    <a href="https://www.npmjs.com/package/custom-cursor-react"><img src="https://img.shields.io/npm/v/custom-cursor-react.svg" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/custom-cursor-react"><img src="https://img.shields.io/npm/dm/custom-cursor-react" alt="npm downloads"></a>
    <a href="https://travis-ci.com/github/ajmnz/custom-cursor-react"><img src="https://travis-ci.com/ajmnz/custom-cursor-react.svg?branch=master" alt="Build status"></a>
</p>

<div align='center'>
  <img src='https://raw.githubusercontent.com/ajmnz/custom-cursor-react/master/screenshots/custom-cursor-react.gif' width='100%'>
</div>

## Installation
```
$ npm install custom-cursor-react
```

## Try it!
[Live Demo](https://ajmnz.github.io/custom-cursor-react)

## Usage
Import the component and styles

```javascript
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
```

Include it in your App

```jsx
const App = () => (
  <div>
    <CustomCursor
      targets={['.link', '.your-css-selector']}
      customClass='custom-cursor'
      dimensions={30}
      fill='#FFF'
      smoothness={{
        movement: 0.2,
        scale: 0.1,
        opacity: 0.2,
      }}
      targetOpacity={0.5}
    />
  </div>
);
```

## Available properties

All of them are optional.
> Don't forget the dot (`.class`) when setting the targets.


| Property            | Type             | Description                                                                       | Default       |
|---------------------|------------------|-----------------------------------------------------------------------------------|---------------|
| **`targets`**       | string or array  | CSS selectors of the elements you want your cursor to interact with when hovered. | undefined     |
| **`customClass`**   | string           | Custom class of the `circle` element.                                             | cursor-circle |
| **`dimensions`**    | number           | Width and height of the circle                                                    | 50            |
| **`fill`**          | string           | Hex code of the cursor's color                                                    | #000          |
| **`strokeColor`**   | string           | Hex code of the cursor's stroke color                                             | #000          |
| **`strokeWidth`**   | number           | Stroke width of the cursor                                                        | 0             |
| **`smoothness`**    | number or object | Global smoothness or specific value for `scale`, `opacity` or `movement`.         | 0.2 (Global)  |
| **`opacity`**       | number           | Opacity of the cursor                                                             | 0.5           |
| **`targetOpacity`** | number           | Opacity of the cursor when hovering the `targets`                                 | 1             |
| **`targetScale`**   | number           | Scale of the cursor when hovering the `targets`                                   | 4             |



> This component is a refactor of a project by Mary Low available [here](https://github.com/codrops/AnimatedCustomCursor/).

---
*This skill was auto-generated from [custom-cursor-react](https://github.com/ajmnz/custom-cursor-react) — a UI Vault curated resource.*
