---
name: php-wordpress
version: "2.0.0"
description: WordPress development mastery - themes, plugins, Gutenberg blocks, and REST API
category: cms
---

# WordPress Development Skill

Comprehensive skill for building WordPress themes, plugins, and Gutenberg blocks. Covers WordPress 6.x.

## Skill Parameters

Topics: themes, plugins, gutenberg, rest-api, security, woocommerce
Level: beginner | intermediate | advanced

## Learning Modules

### Module 1: Theme Development
- Theme structure, template hierarchy, enqueuing assets
- Custom post types, theme customizer, block theme basics
- Full Site Editing, theme.json, performance optimization

### Module 2: Plugin Development
- Plugin structure, actions/filters, shortcodes
- Settings API, custom database tables, AJAX
- Plugin architecture patterns, WP-CLI, multisite

### Module 3: Gutenberg Blocks
- Block basics, block.json, edit/save functions
- InnerBlocks, block variations, server-side rendering
- Interactivity API, Block Bindings

## Code Examples

### Plugin Header
```php
<?php
/**
 * Plugin Name: My Custom Plugin
 * Version: 1.0.0
 * Requires PHP: 8.0
 */

declare(strict_types=1);
defined('ABSPATH') || exit;

final class MyCustomPlugin
{
    public function __construct()
    {
        add_action('init', [$this, 'registerPostType']);
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerPostType(): void
    {
        register_post_type('portfolio', [
            'labels' => ['name' => __('Portfolio')],
            'public' => true,
            'show_in_rest' => true,
        ]);
    }
}

new MyCustomPlugin();
```

### Security Best Practices
```php
// Input sanitization
$title = sanitize_text_field($_POST['title'] ?? '');
$content = wp_kses_post($_POST['content'] ?? '');
$id = absint($_POST['id'] ?? 0);

// Output escaping
echo esc_html($title);
echo esc_attr($attribute);
echo esc_url($url);

// Nonce verification
if (!wp_verify_nonce($_POST['_wpnonce'], 'my_action')) {
    wp_die('Security check failed');
}

// Capability check
if (!current_user_can('edit_posts')) {
    wp_die('Unauthorized');
}
```
