---
name: pathe
description: Cross-platform path utilities — drop-in replacement for Node.js path module with normalization.
license: MIT
metadata:
  version: "1.0.0"
  category: utilities
  tags: ["path", "cross-platform", "normalize", "filesystem"]
---

# Pathe

Pathe is a drop-in replacement for Node.js's `path` module that normalizes paths with forward slashes across all platforms.

## Usage

```typescript
import { join, resolve, dirname, basename, extname, normalize } from 'pathe'

const path1 = join('src', 'utils', 'helper.ts')
// 'src/utils/helper.ts'

const absolute = resolve('./src')
const dir = dirname('/path/to/file.ts')   // '/path/to'
const ext = extname('/path/to/file.ts')   // '.ts'

// Always uses forward slashes
normalize('path\\to\\file')  // 'path/to/file'
```

## Extra Utilities (pathe/utils)

```typescript
import { filename, normalizeAliases, resolveAlias } from 'pathe/utils'
```

## Key Points
- Cross-platform: consistent across Windows/macOS/Linux
- Normalized: always uses forward slashes internally
- Drop-in replacement for Node.js path API
- Full TypeScript support, works in Node/browser/edge
