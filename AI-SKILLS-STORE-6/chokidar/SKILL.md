# Chokidar

Minimal and efficient cross-platform file watching library for Node.js.

## Install

```bash
npm install chokidar
```

**v5 (Nov 2025):** ESM-only, requires Node.js ≥20.19 (backported `require(esm)`). No glob support built-in — use `node:fs/promises` glob() for that.

**⚠️ v5 breaking change — no default export.** Use named or namespace import:

```js
// ✅ v5 — namespace import
import * as chokidar from 'chokidar';

// ✅ v5 — named import
import { watch } from 'chokidar';

// ❌ v5 — BROKEN (default export removed)
import chokidar from 'chokidar';
```

## FSWatcher API

```js
const watcher = chokidar.watch('file, dir, or array', { options });
```

### Methods

| Method | Description |
|--------|-------------|
| `.on(event, callback)` | Listen for FS events |
| `.add(path/s)` | Add files/dirs to watch |
| `.unwatch(path/s)` | Stop watching files/dirs |
| `.close()` | **Async** — remove all listeners, stop watching |
| `.getWatched()` | Returns object of watched paths: `{ '/dir': ['file1', 'file2'] }` |

## Events

| Event | Description |
|-------|-------------|
| `add` | File created |
| `change` | File modified (also receives `fs.Stats` as 2nd arg) |
| `unlink` | File deleted |
| `addDir` | Directory created |
| `unlinkDir` | Directory deleted |
| `error` | Watcher error |
| `ready` | Initial scan complete |
| `raw` | Internal raw OS event (use carefully) |
| `all` | Every event except `ready`, `raw`, `error` — receives `(event, path)` |

```js
watcher
  .on('add',    (path) => console.log('File added', path))
  .on('change', (path, stats) => console.log('File changed', path, stats?.size))
  .on('unlink', (path) => console.log('File removed', path))
  .on('addDir',   (path) => console.log('Dir added', path))
  .on('unlinkDir',(path) => console.log('Dir removed', path))
  .on('error',    (err) => console.error('Error', err))
  .on('ready',    () => console.log('Ready'));
```

## Options

### Persistence

`persistent` (default: `true`) — keep process alive while watching

### Path Filtering

| Option | Default | Description |
|--------|---------|-------------|
| `ignored` | — | Function, regex, or string to ignore paths. Function receives `(path, stats?)` |
| `ignoreInitial` | `false` | If `false`, emit `add`/`addDir` during initial scan |
| `followSymlinks` | `true` | Follow symlink references |
| `cwd` | — | Base dir for relative paths in events |

`ignored` examples:

```js
// ignore dotfiles
ignored: /(^|[\/\\])\.\./
// only watch .js files
ignored: (path, stats) => stats?.isFile() && !path.endsWith('.js')
```

### Performance

| Option | Default | Description |
|--------|---------|-------------|
| `usePolling` | `false` | Use `fs.watchFile` (polling). Set `true` for network filesystems |
| `interval` | `100` | Poll interval (ms) when `usePolling: true` |
| `binaryInterval` | `300` | Poll interval for binary files |
| `alwaysStat` | `false` | Always provide `fs.Stats` object in events |
| `depth` | — | Max subdirectory recursion depth |
| `awaitWriteFinish` | `false` | Wait for writes to complete before emitting. Object form: `{ stabilityThreshold: 2000, pollInterval: 100 }` |

### Errors

| Option | Default | Description |
|--------|---------|-------------|
| `ignorePermissionErrors` | `false` | Suppress EPERM/EACCES errors |
| `atomic` | `true` on macOS | Handle atomic writes (100ms window). Customize with `atomic: <ms>` |

### Globs (v4+ workaround)

Chokidar v4+ removed built-in glob support. Use `node:fs/promises`:

```js
import { glob } from 'node:fs/promises';
const watcher = chokidar.watch(await Array.fromAsync(glob('**/*.js')));
```

## Troubleshooting

**ENOSPC / EMFILE** — too many files watched:

```bash
# Increase inotify limit on Linux
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Or switch to `usePolling: true` (higher CPU but no inotify limits).

## Comparison vs Node.js Raw

| Feature | fs.watch | chokidar |
|---------|----------|----------|
| macOS filenames | ❌ | ✅ |
| Deduplication | ❌ | ✅ |
| add/change/unlink | rename only | proper events |
| Atomic writes | ❌ | ✅ (`atomic`) |
| Recursive | partial | full |
| Polling fallback | ❌ | ✅ (`usePolling`) |
