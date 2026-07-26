---
name: laravel-blade-component-patterns
description: Best practices for Laravel Blade components including class-based and anonymous components, slots, attribute bags, and reusable UI patterns.
---

# Blade Component Patterns

## Class-Based Components

```bash
php artisan make:component Alert
```

```php
class Alert extends Component
{
    public function __construct(
        public string $type = 'info',
        public string $message = '',
        public bool $dismissible = false,
    ) {}

    public function alertClasses(): string
    {
        return match ($this->type) {
            'success' => 'bg-green-100 text-green-800 border-green-300',
            'error' => 'bg-red-100 text-red-800 border-red-300',
            'warning' => 'bg-yellow-100 text-yellow-800 border-yellow-300',
            default => 'bg-blue-100 text-blue-800 border-blue-300',
        };
    }

    public function render(): View
    {
        return view('components.alert');
    }
}
```

```blade
<div {{ $attributes->merge(['class' => 'border rounded-lg p-4 ' . $alertClasses()]) }} role="alert">
    <p>{{ $message ?: $slot }}</p>
    @if ($dismissible)
        <button type="button" @click="$el.parentElement.remove()">&times;</button>
    @endif
</div>
```

## Anonymous Components

```blade
@props(['title' => null, 'footer' => null])

<div {{ $attributes->merge(['class' => 'bg-white rounded-lg shadow-md overflow-hidden']) }}>
    @if ($title)
        <div class="px-6 py-4 border-b"><h3>{{ $title }}</h3></div>
    @endif
    <div class="p-6">{{ $slot }}</div>
    @if ($footer)
        <div class="px-6 py-4 bg-gray-50 border-t">{{ $footer }}</div>
    @endif
</div>
```

## The $attributes Bag

### Merging Attributes
```blade
<div {{ $attributes->merge(['class' => 'base-class', 'role' => 'alert']) }}>
    {{ $slot }}
</div>
```

### Class Manipulation
```blade
<button {{ $attributes->class([
    'px-4 py-2 rounded font-medium',
    'bg-blue-600 text-white hover:bg-blue-700' => $variant === 'primary',
])->merge(['type' => 'button']) }}>
    {{ $slot }}
</button>
```

## Named Slots
```blade
<x-modal title="Confirm Delete">
    <x-slot:headerActions>
        <button @click="close">&times;</button>
    </x-slot:headerActions>
    <p>Are you sure?</p>
    <x-slot:footer>
        <button @click="confirm" class="btn-danger">Delete</button>
    </x-slot:footer>
</x-modal>
```
