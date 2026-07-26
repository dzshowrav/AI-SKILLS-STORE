# Architecture Review: Current vs Intended Design

**Date:** 2025-11-04
**Status:** 🚨 CRITICAL REVIEW NEEDED BEFORE PHASE 3

---

## Executive Summary

We have successfully built a working ontology→parser generation pipeline, BUT it differs significantly from the original architectural vision described in CLAUDE.md. Before proceeding to Phase 3 (testing), we need to decide:

1. **Accept current approach** and update CLAUDE.md to match reality
2. **Pivot to intended approach** using TypeScript + type-sitter
3. **Hybrid approach** - keep what works, align what matters

---

## The Discrepancy

### What CLAUDE.md Specifies (Original Vision)

```
V3 Ontology + SHACL (from ../ontology/)
    ↓ [Python JTD generator]
JTD Schemas
    ↓ [jtd-codegen]
TypeScript Types
    ↓ [type-sitter]
grammar.js (GENERATED!)
    ↓ [tree-sitter]
Parser
```

**Key principles from CLAUDE.md:**
- ❌ "We DON'T use separate config files (like `syntax_mapping.json`)"
- ✅ "We DO extend the V3 ontology with parser-specific concepts"
- ✅ "Grammar is GENERATED from TypeScript types"
- ✅ "Use type-sitter to generate grammar.js"

### What We Actually Built (Current Reality)

```
parser-ontology.ttl (local, hand-maintained)
    ↓ [JavaScript regex parser]
syntax_mapping.json (GENERATED)
    ↓ [JavaScript template generator]
grammar-generated.js (GENERATED)
    ↓ [grammar.js merges via eval()]
Complete Grammar
    ↓ [tree-sitter]
Parser
```

**What we're actually doing:**
- ✅ We ARE using a separate config file (`syntax_mapping.json`)
- ✅ We DO have `parser-ontology.ttl` extending concepts
- ❌ Grammar is NOT generated from TypeScript types
- ❌ We're NOT using type-sitter
- ✅ BUT it works and generates a valid parser!

---

## Detailed Comparison

### 1. Ontology Source

| Aspect | CLAUDE.md Spec | Current Implementation | Assessment |
|--------|----------------|------------------------|------------|
| **Ontology location** | Fetch from `https://vocab.clearhead.io/actions/v3` | Local `parser-ontology.ttl` only | ⚠️ **Mismatch** |
| **SHACL integration** | Fetch shapes from web, extract constraints | Hardcoded constraints in generator | ⚠️ **Planned for Phase 4** |
| **Import V3** | `owl:imports <https://vocab...>` | No actual imports, standalone file | ⚠️ **Mismatch** |

**Reality Check:**
- ✅ We DO have `parser-ontology.ttl` with syntax annotations
- ❌ We DON'T actually import or fetch the V3 ontology
- ❌ We DON'T fetch SHACL shapes (yet - Phase 4)

**Impact:** Medium - We can add web fetching later, but we're not validating against actual V3

### 2. Intermediate Format

| Aspect | CLAUDE.md Spec | Current Implementation | Assessment |
|--------|----------------|------------------------|------------|
| **Format** | JTD (JSON Type Definition) | `syntax_mapping.json` (custom format) | 🚨 **Major difference** |
| **Generator** | Python in ontology repo | JavaScript in parser repo | 🚨 **Different language** |
| **Purpose** | Type definitions for AST | Symbol/rule mappings for grammar | 🚨 **Different purpose** |

**Reality Check:**
- 🚨 **CLAUDE.md explicitly says:** "We DON'T use separate config files (like `syntax_mapping.json`)"
- ✅ But we ARE using exactly that!
- ❌ We're NOT generating JTD schemas
- ❌ The ontology repo doesn't have `generate_jtd.py` yet

**Impact:** HIGH - This is a fundamental architectural difference

### 3. TypeScript Layer

| Aspect | CLAUDE.md Spec | Current Implementation | Assessment |
|--------|----------------|------------------------|------------|
| **TypeScript types** | Generated from JTD via `jtd-codegen` | None - skipped entirely | 🚨 **Missing** |
| **Type definitions** | `src/types/` directory | Doesn't exist | 🚨 **Missing** |
| **Benefits** | Type-safe AST manipulation | N/A | ❌ **Lost benefit** |

**Reality Check:**
- ❌ No TypeScript types generated
- ❌ No `src/types/` directory
- ❌ Can't use with type-sitter (no types to process)

**Impact:** HIGH - Loses type safety and type-sitter integration

### 4. Grammar Generation

| Aspect | CLAUDE.md Spec | Current Implementation | Assessment |
|--------|----------------|------------------------|------------|
| **Generator** | `type-sitter` (external tool) | Custom JavaScript generator | 🚨 **Different tool** |
| **Input** | TypeScript types + ontology annotations | `syntax_mapping.json` | 🚨 **Different input** |
| **Output** | `grammar.js` (fully generated) | `grammar-generated.js` + hand-maintained `grammar.js` | ⚠️ **Hybrid approach** |
| **Method** | type-sitter AST analysis | String templating + eval() | 🚨 **Different method** |

**Reality Check:**
- ❌ We're NOT using type-sitter at all
- ✅ But we DO have working grammar generation
- ✅ Hybrid approach is cleaner for utilities (iso_date, safe_text, etc.)
- ⚠️ Using `eval()` is not ideal (security/debugging)

**Impact:** MEDIUM-HIGH - Works but diverges from architectural vision

### 5. Integration Points

| Aspect | CLAUDE.md Spec | Current Implementation | Assessment |
|--------|----------------|------------------------|------------|
| **Ontology repo** | Python generates JTD | Independent - no connection | 🚨 **Not integrated** |
| **CLI integration** | Uses type-sitter for Rust structs | TBD | ⚠️ **Future concern** |
| **Type safety** | End-to-end via TypeScript types | None | ❌ **Missing** |

**Reality Check:**
- 🚨 We're completely independent of the ontology repo
- ❌ No shared artifacts between ontology and parser repos
- ⚠️ This might be good (independence) or bad (duplication)

**Impact:** HIGH - Affects overall platform integration strategy

---

## Pros and Cons of Each Approach

### Current Approach (What We Built)

**Pros:**
- ✅ **Working right now** - Parser compiles and works
- ✅ **Simpler pipeline** - No TypeScript intermediary
- ✅ **Parser repo is independent** - No Python dependency
- ✅ **Fast iteration** - Direct ontology→grammar
- ✅ **Easier to debug** - Can inspect `syntax_mapping.json` and `grammar-generated.js`
- ✅ **Hybrid model works** - Clean separation of generated vs hand-maintained

**Cons:**
- ❌ **Violates documented architecture** - CLAUDE.md explicitly says "DON'T use syntax_mapping.json"
- ❌ **No type safety** - Can't use TypeScript for AST manipulation
- ❌ **Uses eval()** - Security/debugging concerns
- ❌ **Not using type-sitter** - Can't generate Rust bindings for CLI
- ❌ **Hardcoded constraints** - Not fetching from SHACL yet
- ❌ **No JTD schemas** - Ontology repo can't generate them for us

### Intended Approach (CLAUDE.md Spec)

**Pros:**
- ✅ **Type-safe AST** - TypeScript types for all nodes
- ✅ **Uses type-sitter** - Industry standard tool
- ✅ **CLI integration** - Can generate Rust structs from same types
- ✅ **Semantic alignment** - JTD schemas are semantic, not just syntax
- ✅ **Shared artifacts** - Ontology repo generates types for multiple consumers
- ✅ **No eval()** - type-sitter is safer
- ✅ **Documented approach** - Matches CLAUDE.md

**Cons:**
- ❌ **Not implemented yet** - Requires significant rework
- ❌ **Ontology repo doesn't have JTD generator** - Need to build that first
- ❌ **More complex pipeline** - Python→JTD→TypeScript→Grammar
- ❌ **Tighter coupling** - Parser depends on ontology repo output
- ❌ **Unknown unknowns** - type-sitter might have limitations we haven't discovered

---

## Critical Questions

### 1. Why was CLAUDE.md written this way?

Looking at CLAUDE.md line 33: **"We DON'T use separate config files (like `syntax_mapping.json`)"**

This suggests the TypeScript approach was chosen to avoid exactly what we built. But why?

**Possible reasons:**
- Type safety across the entire platform (JS, Rust, Python all use same types)
- type-sitter can generate bindings for multiple languages
- JTD is a standard format, `syntax_mapping.json` is custom
- Avoid duplication between ontology semantics and parser syntax

### 2. Does type-sitter actually support what we need?

**Unknown:** Can type-sitter generate:
- Choice rules with specific values?
- Regex patterns?
- Special bracket syntax for state?
- Depth markers?

We need to verify type-sitter can handle our grammar complexity.

### 3. What about the CLI integration?

From platform CLAUDE.md:
- "CLI uses type-sitter to generate Rust structs from AST nodes"

If we don't use type-sitter in the parser, how will the CLI get Rust types?

**Current options:**
1. CLI generates Rust from our `src/node-types.json` (tree-sitter output)
2. CLI uses a different tool
3. We need to adopt type-sitter

### 4. What about the ontology repo?

The ontology repo is supposed to generate JTD schemas. If we're not using them:
- Why generate them?
- What's the point of the ontology repo for the parser?
- Are we duplicating work?

---

## Recommended Decisions

### Decision 1: Architecture Path

**Option A: Accept Current Implementation (Pragmatic)**
- Update CLAUDE.md to reflect `syntax_mapping.json` approach
- Document why we chose this over TypeScript
- Keep working parser, iterate from here
- Find alternative for CLI Rust bindings

**Option B: Pivot to TypeScript Approach (Alignment)**
- Build JTD generator in ontology repo first
- Regenerate parser using TypeScript + type-sitter
- Align with documented architecture
- More work but better long-term alignment

**Option C: Hybrid Evolution (Incremental)**
- Keep current generator as Phase 1
- Add TypeScript layer in parallel
- Gradually migrate to type-sitter
- Both pipelines work during transition

**Recommendation:** 🎯 **Option A (Accept Current)** for these reasons:

1. **Working > Perfect** - We have a working parser NOW
2. **Independence** - Parser repo doesn't need Python/ontology repo
3. **Simplicity** - Fewer moving parts, easier to debug
4. **Speed** - Can iterate and test immediately
5. **Unknowns** - Don't know if type-sitter can handle our grammar

**However:** We should validate type-sitter can do what we need before committing.

### Decision 2: CLAUDE.md Update

If we accept current approach:
- ✅ Update CLAUDE.md to document `syntax_mapping.json` approach
- ✅ Explain rationale: independence, simplicity, working solution
- ✅ Add note about future TypeScript migration if needed
- ✅ Document current→intended migration path

### Decision 3: CLI Integration Strategy

For Rust bindings in the CLI:
- Use `src/node-types.json` (tree-sitter's output) to generate Rust structs
- OR investigate if tree-sitter itself can generate Rust bindings
- OR keep type-sitter as future enhancement

### Decision 4: Ontology Repo Role

Clarify purpose:
- ✅ Ontology repo generates JSON schemas for validation
- ✅ Ontology repo publishes V3 ontology to web
- ⚠️ Parser repo independently adds syntax annotations
- ⚠️ Phase 4: Parser fetches SHACL from ontology repo for constraints

---

## Breaking Changes Risk Assessment

### If We Continue Current Approach

**Low Risk Changes (Can add without breaking):**
- ✅ Add web fetching of V3 ontology (Phase 4)
- ✅ Add SHACL constraint extraction (Phase 4)
- ✅ Add corpus tests (Phase 3)
- ✅ Add more rule types

**Medium Risk Changes (Might require regeneration):**
- ⚠️ Adding TypeScript types alongside current approach
- ⚠️ Changing generated rule format
- ⚠️ Modifying grammar structure

**High Risk Changes (Would break everything):**
- 🚨 Switching to type-sitter (complete rewrite)
- 🚨 Changing ontology format significantly
- 🚨 Removing `syntax_mapping.json` intermediate

### If We Pivot to TypeScript Approach

**Immediate Breaking Changes:**
- 🚨 Current `grammar_generator.js` becomes obsolete
- 🚨 `syntax_mapping.json` no longer used
- 🚨 Need to build JTD generator in ontology repo
- 🚨 All current work replaced

**Long-term Benefits:**
- ✅ Type safety
- ✅ Better CLI integration
- ✅ Alignment with documented architecture

---

## Recommendation: Pre-Phase 3 Checklist

Before writing tests and "establishing" the current approach:

### Must Do:
1. **✅ Test type-sitter feasibility**
   - Can it generate our bracket syntax?
   - Can it handle choice rules with specific values?
   - Can it generate regex patterns?
   - Document findings

2. **✅ Decide on architecture**
   - Stick with current (accept and document)
   - OR pivot to TypeScript (plan migration)
   - Get stakeholder buy-in

3. **✅ Update CLAUDE.md**
   - Reflect actual implementation
   - Document decision rationale
   - Clear migration path if needed

4. **✅ Check CLI integration**
   - How will Rust get types?
   - Verify approach works

### Should Do:
5. **⚠️ Replace eval() with safer approach**
   - Could use `new Function()` instead
   - Or generate actual JavaScript file with proper functions

6. **⚠️ Add validation**
   - Validate `syntax_mapping.json` schema
   - Validate generated grammar syntax

7. **⚠️ Test ontology fetch**
   - Try fetching V3 from web
   - Verify we can merge local + remote

### Nice to Have:
8. **✨ Add TypeScript alongside**
   - Generate types from `syntax_mapping.json`
   - Don't use them yet, but have them
   - Opens door for future migration

9. **✨ Document alternatives**
   - Why current approach vs TypeScript
   - Trade-offs clearly stated

---

## Conclusion

We've built a **working parser generator** that successfully creates a tree-sitter parser from the ontology. However, it **significantly diverges** from the documented architecture in CLAUDE.md.

**Critical Decision Needed:**
- Accept divergence and update docs (pragmatic)
- Pivot to align with specs (architectural purity)
- Hybrid approach (incremental)

**My Recommendation:** Accept current approach AFTER validating that:
1. type-sitter can't easily do what we need (test first!)
2. CLI integration strategy is clear
3. CLAUDE.md is updated to reflect reality

**Immediate Action:** Test type-sitter before Phase 3 to avoid building on wrong foundation.

---

**Next Steps:**
1. Review this document with stakeholders
2. Test type-sitter capabilities
3. Make architecture decision
4. Update CLAUDE.md accordingly
5. THEN proceed to Phase 3 (testing)

**Do NOT proceed to Phase 3 until architecture is validated!**
