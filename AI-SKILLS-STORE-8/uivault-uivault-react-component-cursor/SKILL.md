---
name: react-component-cursor
description: UI Vault resource — Cursor & Micro-interactions. https://github.com/yhattav/react-component-cursor
source: https://github.com/yhattav/react-component-cursor
category: Cursor & Micro-interactions
type: external-resource
github: yhattav/react-component-cursor
---

# react-component-cursor

> Cursor & Micro-interactions · [Open source](https://github.com/yhattav/react-component-cursor)

This skill provides comprehensive reference for using **react-component-cursor** in your projects.
All examples, components, and patterns described below are from the official documentation.

---

# React Component Cursor

[![npm version](https://img.shields.io/npm/v/@yhattav/react-component-cursor.svg)](https://www.npmjs.com/package/@yhattav/react-component-cursor)
[![npm downloads](https://img.shields.io/npm/dm/@yhattav/react-component-cursor.svg)](https://www.npmjs.com/package/@yhattav/react-component-cursor)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@yhattav/react-component-cursor.svg)](https://bundlephobia.com/package/@yhattav/react-component-cursor)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/yhattav/react-component-cursor/blob/main/LICENSE)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://yhattav.github.io/react-component-cursor/)
[![GitHub stars](https://img.shields.io/github/stars/yhattav/react-component-cursor.svg?style=social&label=Star)](https://github.com/yhattav/react-component-cursor)

A flexible and customizable React component for creating smooth, interactive custom cursors and enhancements.

## Features

- Use any React component
- Smooth cursor movement with configurable smoothing
- Global and Container-specific cursors
- Supports Multiple instances
- Lightweight (<10KB)
- Zero dependencies (except React)

## Installation

```bash
npm install @yhattav/react-component-cursor
or
yarn add @yhattav/react-component-cursor
```

**Note:** If you wish to, You'll need to hide the native cursor with CSS (like `cursor: none` in the example above). See our [styling guide](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/docs/CURSOR_STYLING.md) for different approaches.

📖 **New to the library?** Check out our comprehensive [Getting Started Guide](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/GETTING_STARTED.md) for step-by-step tutorials and examples.

## Basic Usage

```tsx
import { CustomCursor } from '@yhattav/react-component-cursor';

function App() {
  return (
    <>
      {/* Hide native cursor globally */}
      <style>{`body { cursor: none !important; }`}</style>
      
      <CustomCursor>
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
          }}
        />
      </CustomCursor>
      {/* Your app content */}
    </>
  );
}
```

## 📋 Complete API Reference

### `<CustomCursor>` Component

The main component for creating custom cursors.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The React component/element to use as cursor content |
| `enabled` | `boolean` | `true` | Whether the cursor is enabled and visible |
| `smoothness` | `number` | `1` | Movement smoothing factor (1=instant, higher=smoother) |
| `containerRef` | `RefObject<HTMLElement>` | - | Limit cursor to specific container element |
| `offset` | `CursorOffset` | `{ x: 0, y: 0 }` | Pixel offset from mouse position |
| `centered` | `boolean` | `true` | Auto-center cursor content on mouse position |
| `throttleMs` | `number` | `0` | Throttle mouse events in milliseconds |
| `className` | `string` | `''` | Additional CSS classes for cursor container |
| `style` | `CSSProperties` | `{}` | Additional inline styles for cursor container |
| `zIndex` | `number` | `9999` | CSS z-index for cursor container |
| `onMove` | `CursorMoveHandler` | - | Callback fired on cursor movement |
| `onVisibilityChange` | `CursorVisibilityHandler` | - | Callback fired when cursor visibility changes |
| `id` | `string` | auto-generated | Unique identifier for cursor instance |
| `showDevIndicator` | `boolean` | `true` | **[Dev Only]** Show debug ring in development |
| `data-testid` | `string` | - | Test ID for automated testing |
| `role` | `string` | - | ARIA role for accessibility |
| `aria-label` | `string` | - | ARIA label for accessibility |

### 📦 TypeScript Types

The library is written in TypeScript and includes built-in type definitions.

```tsx
import type {
  CustomCursorProps,
  CursorPosition,
  CursorOffset,
  CursorMoveHandler,
  CursorVisibilityHandler,
  CursorVisibilityReason,
} from '@yhattav/react-component-cursor';
```

**📖 [Complete TypeScript Reference →](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/docs/TYPES.md)**

All prop types, interfaces, and future-ready types with usage examples.

### 🔧 SSR Utilities

Optional utility functions for advanced SSR scenarios:

```tsx
import { isSSR, isBrowser, browserOnly, safeDocument, safeWindow } from '@yhattav/react-component-cursor';
```

**📖 [Complete SSR Guide →](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/docs/SSR.md)**

### ⚡ Performance

Optimized for performance with advanced control for complex use cases.

**📖 [Complete Performance Guide →](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/docs/PERFORMANCE.md)**

Optimization strategies, settings matrix, and advanced techniques.

### 🌍 Server-Side Rendering (SSR)

Works out of the box with Next.js, Gatsby, Remix, and other SSR frameworks.

```tsx
// Zero configuration needed - SSR handled automatically
import { CustomCursor } from '@yhattav/react-component-cursor';

<CustomCursor>
  <div className="cursor">✨</div>
</CustomCursor>
```

**📖 [Complete SSR Guide →](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/docs/SSR.md)**

### 🎮 Examples & Demos

**Live Demo**: [Interactive Examples & Showcase →](https://yhattav.github.io/react-component-cursor/)

**Local Examples** (clone and run):
```bash
# Vite React example with multiple cursor demos
cd example && npm install && npm run dev

# Next.js example with SSR and advanced patterns  
cd example-nextjs && npm install && npm run dev
```

### 📚 Usage Guidelines

#### Framework Compatibility
- ✅ **Next.js** - Full SSR support with zero configuration
- ✅ **Gatsby** - Static generation compatible
- ✅ **Remix** - Server-side rendering works out of the box
- ✅ **Vite/CRA** - Client-side rendering with optimal performance
- ✅ **Astro** - Partial hydration compatible



## Advanced Usage

### Container-Specific Cursor

```tsx
function ContainerExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        cursor: 'none', // Hide native cursor in this container
      }}
    >
      <CustomCursor containerRef={containerRef} smoothness={2}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '2px solid #ef4444',
            borderRadius: '50%',
          }}
        />
      </CustomCursor>
      {/* Container content */}
    </div>
  );
}
```

### Interactive Cursor

```tsx
function InteractiveCursor() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <style>{`body { cursor: none; }`}</style>
      <div>
        <CustomCursor>
          <div
            style={{
              width: isHovered ? '60px' : '20px',
              height: isHovered ? '60px' : '20px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
            }}
          />
        </CustomCursor>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Hover me!
        </button>
      </div>
    </>
  );
}
```

### Visibility Change Handler

```tsx
function VisibilityAwareCursor() {
  const handleVisibilityChange = (isVisible: boolean, reason: string) => {
    console.log('Cursor visibility:', isVisible, 'reason:', reason);
    // Reason can be: 'container', 'disabled', or other values in future versions
  };

  return (
    <CustomCursor onVisibilityChange={handleVisibilityChange}>
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
        }}
      />
    </CustomCursor>
  );
}
```






## Contributing

We welcome contributions! See our guides:

- **[Contributing Guide](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/CONTRIBUTING.md)** - How to contribute
- **[Development Guide](https://raw.githubusercontent.com/yhattav/react-component-cursor/main/DEVELOPMENT.md)** - Complete development setup and workflow

## License

MIT © [Yonatan Hattav](https://github.com/yhattav)


---
*This skill was auto-generated from [react-component-cursor](https://github.com/yhattav/react-component-cursor) — a UI Vault curated resource.*
