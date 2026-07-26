# Contributing Guide

This guide covers everything you need to know to work on the tree-sitter-actions parser.

## Test File Organization

The test system is split into three separate parts to enable reuse by downstream projects:

### Directory Structure

- **`examples/`** - Valid `.actions` files that serve as test inputs and are published for downstream use
- **`test/trees/`** - Expected parse trees (`.sexp` format) for each example
- **`test/test_descriptions.json`** - Maps categories to test names and descriptions
- **`test/corpus/`** - Generated test files used by tree-sitter (auto-generated, don't edit)
- **`scripts/`** - Helper scripts to regenerate test files

### Why Split Them Up?

Breaking up the normal tree-sitter test format does some wonderful things:

- **Separate formats**: We can read `.actions` in examples, `.sexp` trees in trees/, and descriptions in test_descriptions - each optimized for its purpose
- **Easy to read and edit**: Each part can be viewed and modified independently without parsing through giant combined files
- **Downstream reuse**: Projects using this parser can import the same examples to test their own implementations
  - Example: This parser tests that trees are correct, while a downstream Rust CLI can test that the same examples parse to correct data structures
- **Single source of truth**: `test_descriptions.json` drives both the tree-sitter test corpus and the published Rust API

## Development Workflow

### Running Tests

Test the grammar:

```bash
npm run test:grammar
# or directly:
tree-sitter test
```

Test the JSON Schema:

```bash
npm run test:schema
```

Run all tests (grammar + schema + bindings):

```bash
npm run test:all
```

### Regenerating Test Files

When you modify the grammar or add new examples, regenerate the test files:

```bash
# Regenerate everything and verify tests pass:
npm run regen:verify

# Or run steps individually:
npm run regen:trees    # Generate .sexp files from examples
npm run regen:corpus   # Generate corpus files from trees
npm run test:grammar   # Run tree-sitter tests
```

**The workflow:**
1. **`regen:trees`** - Parses all `.actions` files in `examples/` and generates corresponding `.sexp` tree files
2. **`regen:corpus`** - Combines examples, trees, and descriptions into test corpus files
3. **`test:grammar`** - Runs tree-sitter test suite against the corpus

**When to regenerate:**
- You modify `grammar.js`
- You add/modify files in `examples/`
- You update test descriptions

### Adding New Examples

To add a new example:

1. Create the file in `examples/` (e.g., `examples/my_new_example.actions`)
2. Add an entry to `test/test_descriptions.json` under the appropriate category:
   ```json
   {
     "category_name": {
       "my_new_example": "My New Example Description"
     }
   }
   ```
3. Run `npm run regen:verify` to generate trees and corpus
4. The example is automatically available in:
   - Tree-sitter tests
   - Published Rust crate as `examples::category_name::MY_NEW_EXAMPLE`

No manual changes needed to binding code - the build system handles it automatically.

## JSON Schema Generation

### Overview

The repository maintains a single source of truth for regex patterns that are used in both parsing and validation:

```
Source of Truth        Grammar             Schema
─────────────────────────────────────────────────────
patterns.js       →    grammar.js     →    Parser
   │
   │
   └──────────────→    generate-schema.js → schema/actions.schema.json
```

### How It Works

1. **`patterns.js`** - Defines all regex patterns for fields (name, UUID, datetime, etc.)
2. **`grammar.js`** - Imports patterns to generate the tree-sitter parser
3. **`scripts/generate-schema.js`** - Imports patterns to generate JSON Schema
4. **`schema/actions.schema.json`** - Validates JSON serialization of parsed data

### Why This Approach?

Downstream consumers need to:
- Parse `.actions` files (using tree-sitter parser)
- Convert parsed AST to JSON/structured data
- Validate serialized data matches the specification

By generating the JSON Schema from the same patterns used in the grammar, we guarantee that:
- Parsing rules match validation rules
- No drift between grammar and schema
- Single source of truth for all patterns
- Downstream consumers get both parser and validator

### Schema Generation Commands

```bash
# Generate schema from patterns
npm run generate:schema

# Regenerate during parser build
npm run build:parser

# Generate all artifacts
npm run generate
```

The schema is automatically included in published npm packages and can be imported:

```javascript
import schema from 'tree-sitter-actions/schema';
```

### JSON Serialization Format

The canonical JSON serialization format is documented in [docs/action_specification.md](action_specification.md#json-serialization-format). The generated schema validates this format.

## Rust Bindings Build System

### Overview

The Rust bindings use a three-stage process to make examples available to downstream users:

```
Build Time          Compile Time           Runtime
─────────────────────────────────────────────────────
build.rs            include_str!           User code
  │                      │                     │
  ├─ Reads               │                     │
  │  test_descriptions   │                     │
  │  .json               │                     │
  │                      │                     │
  ├─ Generates           │                     │
  │  generated_tests.rs ─┤                     │
  │  with include_str!   │                     │
  │  macros              │                     │
  │                      │                     │
  │                      ├─ Embeds             │
  │                      │  examples/*.actions │
  │                      │  file contents      │
  │                      │                     │
  │                      └─ Creates           ─┤
  │                         constants          │
  │                                            │
  │                                            ├─ Access
  │                                            │  examples::*
  │                                            │  constants
```

### Build Script (bindings/rust/build.rs)

The build script runs before compilation:

1. **Compiles C parser** - Standard tree-sitter process for `src/parser.c` and `src/scanner.c`
2. **Generates examples module** - Reads `test/test_descriptions.json` and generates `generated_tests.rs`

The generated file creates a module structure:

```rust
pub mod examples {
    pub mod properties {
        pub const WITH_PRIORITY: &str = include_str!(concat!(
            env!("CARGO_MANIFEST_DIR"),
            "/examples/with_priority.actions"
        ));
        // ... more constants
    }
    // ... more modules
}
```

**Why generate code?** We need to create a static module structure from dynamic JSON content. The build script bridges build-time file operations with compile-time constants.

**Why `concat!(env!("CARGO_MANIFEST_DIR"), ...)`?** The `include_str!` paths must be absolute. Using `CARGO_MANIFEST_DIR` ensures the path works regardless of where the code is compiled.

### Why This Approach?

**The problem:** Downstream users need the same examples we use for testing, but can't rely on runtime file I/O.

**Alternatives considered:**

| Approach | Pros | Cons |
|----------|------|------|
| Runtime file reading | Simple | Requires deploying files, runtime I/O |
| Manual constants | No build script | Out of sync risk, tedious to maintain |
| Embed in build.rs | Self-contained | Bloats build.rs, hard to maintain |
| Procedural macro | Clean API | Complex, compile overhead |
| **Current: Generated code** | **Auto-sync, clean API, compile-time** | **Requires understanding three stages** |

**Benefits:**
- Auto-sync: Can't get out of sync with actual files
- Zero runtime cost: Embedded at compile time
- Clean API: Organized modules, not HashMaps
- No deployment complexity: In the binary
- IDE support: Autocomplete works
- Single source of truth: JSON drives tests and API

### Package Contents (Cargo.toml)

The `include` field specifies what gets published:

```toml
include = [
  "bindings/rust/*",
  "examples/*",           # Used by include_str!
  "src/*",                # Generated C parser
  "test/test_descriptions.json",  # Read by build.rs
  # ... other files
]
```

The build script runs on users' machines when they compile the crate.

## Testing

Run Rust tests:

```bash
cargo test
```

This verifies:
- Parser loads correctly
- Examples module is accessible
- Generated code compiles
- Doc examples are valid

View generated code:

```bash
cargo clean
cargo build
find target -name "generated_tests.rs" -type f | head -1 | xargs cat
```

## Publishing Checklist

Before publishing a new version:

1. Ensure all examples are in `test/test_descriptions.json`
2. Run `npm run regen:verify` - verify test corpus is up to date
3. Run `npm run generate:schema` - regenerate JSON schema from patterns
4. Run `npm run test:all` - verify all tests pass (grammar, schema, bindings)
5. Run `cargo test` - verify Rust tests pass
6. Run `cargo doc` - verify documentation builds
7. Update version in `Cargo.toml` and `package.json`
8. Tag release in git: `git tag v0.x.x`
9. Run `cargo publish` (Rust crate)
10. Run `npm publish` (npm package with schema)

The build script runs on users' machines, so ensure `test/test_descriptions.json` and all example files are in the `include` list in `Cargo.toml`.

For npm publishing, ensure `patterns.js` and `schema/` are included in the `files` array in `package.json`.

## Project Structure

```
tree-sitter-actions/
├── bindings/rust/          # Rust binding code
│   ├── build.rs           # Build script (generates code)
│   └── lib.rs             # Main library
├── examples/              # Example .actions files
├── test/
│   ├── trees/            # Expected parse trees
│   ├── corpus/           # Generated test corpus (don't edit)
│   └── test_descriptions.json  # Test metadata
├── scripts/               # Regeneration scripts
│   └── generate-schema.js # Schema generation from patterns
├── schema/                # JSON Schema (generated)
│   └── actions.schema.json # Validates JSON serialization
├── patterns.js            # Single source of truth for regex patterns
├── grammar.js             # Tree-sitter grammar (imports patterns)
├── src/                   # Generated C parser code
└── docs/
    ├── action_specification.md  # Format spec + JSON serialization
    ├── usage.md          # For downstream users
    └── contributing.md   # This file
```

## Getting Help

- Review the [action specification](action_specification.md) for grammar details
- Check [usage.md](usage.md) for examples of using the parser
- Look at existing examples in `examples/` for patterns
- The README covers the project philosophy and inspirations
