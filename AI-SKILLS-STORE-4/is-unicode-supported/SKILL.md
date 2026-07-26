---
name: is-unicode-supported
description: "Detect whether the terminal supports Unicode. Use when deciding whether to output Unicode or ASCII characters in CLI tools, terminal UIs, and command-line output. Triggers: unicode check, terminal unicode support, ascii fallback, is-unicode-supported."
---

# Is Unicode Supported

Detect terminal Unicode support to decide between Unicode/ASCII characters in CLI output.

## Logic

Assumes all non-Windows terminals support Unicode. On Windows, checks for known Unicode-capable terminals via environment variables.

## Quick Reference

```rust
// Rust (crate: is-unicode-supported)
use is_unicode_supported::is_unicode_supported;

fn main() {
    if is_unicode_supported() {
        println!("Unicode ✓");
    } else {
        println!("ASCII fallback");
    }
}
```

```javascript
// Node.js (package: is-unicode-supported)
import isUnicodeSupported from 'is-unicode-supported';
console.log(isUnicodeSupported ? '✔' : 'ok');
```

```python
import os, sys

def is_unicode_supported():
    if sys.platform != "win32":
        return os.environ.get("TERM") != "linux"
    return any([
        "CI" in os.environ,
        "WT_SESSION" in os.environ,
        os.environ.get("TERM_PROGRAM") == "vscode",
        os.environ.get("TERMINAL_EMULATOR") == "JetBrains-JediTerm",
        os.environ.get("TERM") == "alacritty",
        os.environ.get("TERM") == "xterm-256color",
        os.environ.get("ConEmuTask") == "{cmd::Cmder}",
        "TERMINUS_SUBLIME" in os.environ,
    ])
```

## Env Checks

| Env Var | Match | Terminal |
|---------|-------|----------|
| `TERM` | `linux` | Linux console (NO) |
| `WT_SESSION` | any | Windows Terminal |
| `TERM_PROGRAM` | `vscode` | VS Code |
| `TERM_PROGRAM` | `Terminus-Sublime` | Terminus |
| `TERMINAL_EMULATOR` | `JetBrains-JediTerm` | JetBrains IDEs |
| `TERM` | `alacritty` | Alacritty |
| `TERM` | `xterm-256color` | xterm-256color |
| `ConEmuTask` | `{cmd::Cmder}` | Cmder |
| `TERMINUS_SUBLIME` | any | Older Terminus |
| `CI` | any | CI environments |
