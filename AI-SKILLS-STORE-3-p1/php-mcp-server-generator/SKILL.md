---
name: php-mcp-server-generator
description: 'Generate a complete PHP Model Context Protocol server project with tools, resources, prompts, and tests using the official PHP SDK'
---

# PHP MCP Server Generator

You are a PHP MCP server generator. Create a complete, production-ready PHP MCP server project using the official PHP SDK.

## Project Requirements

Ask the user for:
1. **Project name** (e.g., "my-mcp-server")
2. **Server description** (e.g., "A file management MCP server")
3. **Transport type** (stdio, http, or both)
4. **Tools to include** (e.g., "file read", "file write", "list directory")
5. **Whether to include resources and prompts**
6. **PHP version** (8.2+ required)

## Project Structure

```
{project-name}/
├── composer.json
├── .gitignore
├── README.md
├── server.php
├── src/
│   ├── Tools/
│   │   └── {ToolClass}.php
│   ├── Resources/
│   │   └── {ResourceClass}.php
│   ├── Prompts/
│   │   └── {PromptClass}.php
│   └── Providers/
│       └── {CompletionProvider}.php
└── tests/
    └── ToolsTest.php
```

## File Templates

### composer.json

```json
{
    "name": "your-org/{project-name}",
    "description": "{Server description}",
    "type": "project",
    "require": {
        "php": "^8.2",
        "mcp/sdk": "^0.1"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "symfony/cache": "^6.4"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true
    }
}
```

### .gitignore

```
/vendor
/cache
composer.lock
.phpunit.cache
phpstan.neon
```

### README.md

```markdown
# {Project Name}

{Server description}

## Requirements

- PHP 8.2 or higher
- Composer

## Installation

```bash
composer install
```

## Usage

### Start Server (Stdio)

```bash
php server.php
```

### Configure in Claude Desktop

```json
{
  "mcpServers": {
    "{project-name}": {
      "command": "php",
      "args": ["/absolute/path/to/server.php"]
    }
  }
}
```

## Testing

```bash
vendor/bin/phpunit
```

## Tools

- **{tool_name}**: {Tool description}

## Development

Test with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector php server.php
```
```

### server.php

```php
#!/usr/bin/env php
<?php

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use Mcp\Server;
use Mcp\Server\Transport\StdioTransport;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\Psr16Cache;

// Setup cache for discovery
$cache = new Psr16Cache(new FilesystemAdapter('mcp-discovery', 3600, __DIR__ . '/cache'));

// Build server with discovery
$server = Server::builder()
    ->setServerInfo('{Project Name}', '1.0.0')
    ->setDiscovery(
        basePath: __DIR__,
        scanDirs: ['src'],
        excludeDirs: ['vendor', 'tests', 'cache'],
        cache: $cache
    )
    ->build();

// Run with stdio transport
$transport = new StdioTransport();

$server->run($transport);
```

### src/Tools/ExampleTool.php

```php
<?php

declare(strict_types=1);

namespace App\Tools;

use Mcp\Capability\Attribute\McpTool;
use Mcp\Capability\Attribute\Schema;

class ExampleTool
{
    /**
     * Performs a greeting with the provided name.
     * 
     * @param string $name The name to greet
     * @return string A greeting message
     */
    #[McpTool]
    public function greet(string $name): string
    {
        return "Hello, {$name}!";
    }
    
    /**
     * Performs arithmetic calculations.
     */
    #[McpTool(name: 'calculate')]
    public function performCalculation(
        float $a,
        float $b,
        #[Schema(pattern: '^(add|subtract|multiply|divide)$')]
        string $operation
    ): float {
        return match($operation) {
            'add' => $a + $b,
            'subtract' => $a - $b,
            'multiply' => $a * $b,
            'divide' => $b != 0 ? $a / $b : 
                throw new \InvalidArgumentException('Division by zero'),
            default => throw new \InvalidArgumentException('Invalid operation')
        };
    }
}
```

### src/Resources/ConfigResource.php

```php
<?php

declare(strict_types=1);

namespace App\Resources;

use Mcp\Capability\Attribute\McpResource;

class ConfigResource
{
    /**
     * Provides application configuration.
     */
    #[McpResource(
        uri: 'config://app/settings',
        name: 'app_config',
        mimeType: 'application/json'
    )]
    public function getConfiguration(): array
    {
        return [
            'version' => '1.0.0',
            'environment' => 'production',
            'features' => [
                'logging' => true,
                'caching' => true
            ]
        ];
    }
}
```

### src/Resources/DataProvider.php

```php
<?php

declare(strict_types=1);

namespace App\Resources;

use Mcp\Capability\Attribute\McpResourceTemplate;

class DataProvider
{
    /**
     * Provides data for a given item.
     */
    #[McpResourceTemplate(
        uriTemplate: 'data://{category}/{item}',
        name: 'data_provider'
    )]
    public function getData(string $category, string $item): array
    {
        return [
            'category' => $category,
            'item' => $item,
            'data' => "{$category}/{$item} data"
        ];
    }
}
```

### src/Prompts/GreetingPrompt.php

```php
<?php

declare(strict_types=1);

namespace App\Prompts;

use Mcp\Capability\Attribute\McpPrompt;
use Mcp\Types\PromptArgument;
use Mcp\Types\PromptMessage;

class GreetingPrompt
{
    /**
     * Creates a greeting message for the user.
     */
    #[McpPrompt(
        name: 'greeting',
        description: 'Creates a personalized greeting',
        arguments: [
            new PromptArgument(
                name: 'style',
                description: 'Greeting style (formal/casual)',
                required: false
            )
        ]
    )]
    public function createGreeting(?string $style = 'casual'): array
    {
        $greeting = $style === 'formal' 
            ? 'Good day! How may I assist you?'
            : 'Hey there! What can I help you with?';

        return [
            new PromptMessage(
                role: 'assistant',
                content: $greeting
            )
        ];
    }
}
```

### src/Providers/CompletionProvider.php

```php
<?php

declare(strict_types=1);

namespace App\Providers;

use Mcp\Capability\Attribute\McpCompletionProvider;

class CompletionProvider
{
    /**
     * Provides completions for the data resource.
     */
    #[McpCompletionProvider(
        resourceTemplate: 'data://{category}/{item}',
        argumentName: 'category'
    )]
    public function completeCategory(): array
    {
        return [
            'values' => ['users', 'products', 'orders'],
            'total' => 3
        ];
    }
}
```

### tests/ToolsTest.php

```php
<?php

declare(strict_types=1);

namespace Tests;

use App\Tools\ExampleTool;
use PHPUnit\Framework\TestCase;

final class ToolsTest extends TestCase
{
    private ExampleTool $tool;

    protected function setUp(): void
    {
        $this->tool = new ExampleTool();
    }

    public function testGreet(): void
    {
        $result = $this->tool->greet('World');
        $this->assertEquals('Hello, World!', $result);
    }

    public function testCalculate(): void
    {
        $result = $this->tool->performCalculation(10, 5, 'add');
        $this->assertEquals(15.0, $result);
    }
}
```

## Best Practices

### Naming Conventions
- Use **PascalCase** for class names, **camelCase** for methods
- Tool methods: descriptive names (e.g., `listFiles`, `readFile`)
- Resource classes: `{Entity}Resource` pattern
- Prompt classes: `{Purpose}Prompt` pattern

### Error Handling
- Throw typed exceptions for domain errors
- Use PHP 8+ named arguments in SDK calls
- Validate all user inputs at tool boundaries
- Never expose stack traces to clients

### Testing
- Test each tool with valid and invalid inputs
- Test error paths explicitly (division by zero, missing files)
- Use PHPUnit data providers for multiple test cases

### Performance
- Use generators for streaming large results
- Cache resource discovery results
- Implement pagination for list operations
- Use lazy loading for expensive operations
