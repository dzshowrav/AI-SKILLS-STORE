---
name: blatui-laravel-blade-components
description: CLI that installs shadcn/ui-style Blade components for the BLAT stack (Blade, Laravel, Alpine, Tailwind) into your Laravel project
---

# BlatUI Laravel Blade Components

BlatUI is a CLI for Laravel that brings shadcn/ui's component philosophy to the **BLAT stack** (Blade - Laravel - Alpine - Tailwind). It copies accessible, themeable UI components directly into your project.

**Key Features:**
- 156+ accessible components (WCAG AA compliant)
- Components are copied, not installed — you own and edit them
- Full design token system with light/dark mode
- Faithful port of shadcn/ui's design language

## Requirements

- PHP 8.2+
- Laravel 11, 12, or 13
- Tailwind CSS v4 (required)
- Alpine.js 3
- Node 18+

## Installation

### New Project Setup

```bash
composer require anousss007/blatui
composer require gehrisandro/tailwind-merge-laravel mallardduck/blade-lucide-icons
npm install -D alpinejs @alpinejs/anchor @alpinejs/collapse @alpinejs/focus
php artisan vendor:publish --tag=blatui-foundations
php artisan blatui:init
```

### Existing Project Setup

```css
/* resources/css/app.css */
@import "tailwindcss";
@import "./blatui.css";
```

```js
// resources/js/app.js
import Alpine from 'alpinejs'
import { registerBlatUI } from './blatui-core.js'
registerBlatUI(Alpine)
window.Alpine = Alpine
Alpine.start()
```

## CLI Commands

```bash
# Check setup
php artisan blatui:init

# List components
php artisan blatui:list

# Add components
php artisan blatui:add button
php artisan blatui:add button card input select
php artisan blatui:add --all
```

## Component Usage

```blade
<x-ui.card class="max-w-md">
    <x-ui.card-header>
        <x-ui.card-title>Account Settings</x-ui.card-title>
        <x-ui.card-description>Manage preferences</x-ui.card-description>
    </x-ui.card-header>
    <x-ui.card-content>
        <p>Content here</p>
    </x-ui.card-content>
    <x-ui.card-footer>
        <x-ui.button>Save Changes</x-ui.button>
    </x-ui.card-footer>
</x-ui.card>
```

### Button Variants

```blade
<x-ui.button>Click Me</x-ui.button>
<x-ui.button variant="destructive">Delete</x-ui.button>
<x-ui.button variant="outline">Cancel</x-ui.button>
<x-ui.button variant="secondary">Secondary</x-ui.button>
<x-ui.button variant="ghost">Ghost</x-ui.button>
<x-ui.button variant="link">Link Style</x-ui.button>
<x-ui.button size="sm">Small</x-ui.button>
<x-ui.button size="lg">Large</x-ui.button>
```
