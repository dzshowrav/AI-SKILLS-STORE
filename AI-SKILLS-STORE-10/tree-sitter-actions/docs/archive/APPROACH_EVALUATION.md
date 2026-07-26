# Parser Generation Approach Evaluation

**Date:** 2025-11-04
**Purpose:** Decide between Syntax Mapping vs JTD→TypeScript→type-sitter approaches
**Status:** Critical Decision Point - Must resolve before Phase 3

---

## Executive Summary

We have **two working approaches** to evaluate:

1. **Current Implementation (Syntax Mapping)** - Working now, tested, generates valid parser
2. **Intended Architecture (JTD→TypeScript→type-sitter)** - Documented in ARCHITECTURE.md, not yet implemented

**Key Finding from Web Research:**
- type-sitter (github.com/3p3r/type-sitter) generates grammars from TypeScript types
- It's designed for **declarative DSLs**, not complex syntax rules
- Last updated 2023, focuses on JSON-like structures

**This evaluation will determine which approach to use going forward.**

---

## Approach A: Current Implementation (Syntax Mapping)

### How It Works

```
parser-ontology.ttl (hand-maintained)
    ↓ [JavaScript parser - regex-based]
syntax_mapping.json (GENERATED intermediate)
    ↓ [JavaScript template generator]
grammar-generated.js (GENERATED rules)
    ↓ [grammar.js merges via eval()]
Complete grammar.js
    ↓ [tree-sitter generate]
Parser (C code + .so binary)
```

### What We Built

**Files Created:**
- `scripts/generate-syntax-mapping.js` - Parses `parser-ontology.ttl` → `syntax_mapping.json`
- `src/grammar_generator.js` - Generates tree-sitter rules from mapping
- `grammar-generated.js` - 14 auto-generated grammar rules
- `grammar.js` - Hybrid: imports generated + hand-maintained utilities

**Time Invested:** ~5 hours (Phase 1 + Phase 2)

**Current Status:** ✅ Working, compiles, parses files correctly

### Strengths

1. **✅ Working Right Now**
   - Parser compiles successfully
   - Parses real `.actions` files
   - All basic features working (state, priority, children, etc.)

2. **✅ Complete Control**
   - Direct mapping: ontology property → grammar rule
   - Can handle ANY tree-sitter construct:
     - Bracket syntax: `[x]`, `[-]`, etc.
     - Depth markers: `>`, `>>`, etc.
     - List patterns: `+@office,@work`
     - Regex patterns
     - Value mappings (DAILY→D)

3. **✅ Simple Pipeline**
   - Ontology → Mapping → Grammar (3 steps)
   - No TypeScript dependency
   - No external tools besides tree-sitter
   - Easy to debug: inspect `syntax_mapping.json`

4. **✅ Parser Repo Independence**
   - Self-contained in tree-sitter-actions repo
   - No dependency on ontology repo Python code
   - Works offline
   - Fast iteration

5. **✅ Proven Pattern**
   - Many tree-sitter grammars hand-written this way
   - Hybrid model (generated + hand-maintained) is clean
   - Can customize edge cases easily

### Weaknesses

1. **❌ Violates Documented Architecture**
   - ARCHITECTURE.md line 26: "Bad: Separate syntax_mapping.json"
   - Line 388: "Decision 2: Ontology Extension Over Config Files"
   - We're doing exactly what we said not to do

2. **❌ No Type Safety**
   - Can't use TypeScript types for AST manipulation
   - No compile-time guarantees on AST structure
   - Runtime errors only

3. **❌ Uses eval()**
   - `grammar.js` line 73: `eval(valueString)`
   - Security concern (though input is trusted)
   - Harder to debug (stack traces through eval)
   - Harder for tools to analyze

4. **❌ No CLI Integration Path**
   - ARCHITECTURE.md line 217: "type-sitter --rust --parser tree-sitter-actions"
   - Can't generate Rust structs from our approach
   - Need alternative for CLI type generation

5. **❌ Duplication with Ontology Repo**
   - Ontology repo will generate JTD schemas
   - Parser repo generates own intermediate format
   - Two systems describing same domain

6. **❌ Hardcoded Constraints**
   - Priority values 1-4 hardcoded in generator
   - Not fetching from SHACL shapes (yet)
   - Phase 4 will add this, but still custom code

### Validation Needed

**Can this approach support:**
- ✅ Basic parsing (tested, works)
- ✅ All property types (tested, works)
- ✅ Special syntax (tested, works)
- ⚠️ CLI Rust struct generation (unknown - need alternative to type-sitter)
- ⚠️ SHACL constraint fetching (Phase 4 - should work)
- ⚠️ Multi-format support (YAML, JSON) - would need separate generators

---

## Approach B: Intended Architecture (JTD→TypeScript→type-sitter)

### How It Would Work

```
V3 Ontology + SHACL (ontology repo)
    ↓ [Python: generate_jtd.py]
JTD Schemas (*.jtd.json)
    ↓ [jtd-codegen]
TypeScript Types (src/types/*.ts)
    ↓ [parser-ontology.ttl with symbol mappings]
    ↓ [type-sitter generate]
grammar.js (FULLY GENERATED)
    ↓ [tree-sitter generate]
Parser (C code + .so binary)
```

### What Would Need to Be Built

**In ontology repo:**
- ✅ Already has: `generate_jtd.py` (exists, may need updates)
- ✅ Already has: V3 ontology + SHACL shapes
- ⚠️ May need: Updates to JTD generator for our use case

**In parser repo:**
- ❌ Need: Parser ontology (parser.owl with symbol annotations)
- ❌ Need: TypeScript type generation (`jtd-codegen` integration)
- ❌ Need: type-sitter integration
- ❌ Need: Verification that type-sitter can handle our grammar

**Time Estimate:** 2-3 weeks to build and test

### Strengths

1. **✅ Aligns with Documented Architecture**
   - Matches ARCHITECTURE.md vision
   - Follows "ontology extension" principle
   - No config files, pure ontology

2. **✅ Type Safety End-to-End**
   - TypeScript types for AST manipulation
   - Rust structs from same source (type-sitter --rust)
   - Compile-time guarantees

3. **✅ Single Source of Truth**
   - JTD schemas generated once in ontology repo
   - Parser, CLI, API all use same schemas
   - No duplication

4. **✅ CLI Integration Built-In**
   - type-sitter generates Rust structs directly
   - CLI gets types automatically
   - Consistent AST across JS and Rust

5. **✅ Standards-Based**
   - JTD is ISO standard
   - type-sitter is established tool
   - No custom intermediate formats

6. **✅ SHACL Integration Natural**
   - JTD already generated from SHACL
   - Constraints flow automatically
   - No hardcoding

7. **✅ Multi-Language Support**
   - JTD can generate Python, Go, etc.
   - One schema → many languages
   - Platform-wide consistency

### Weaknesses

1. **❌ Not Implemented Yet**
   - Need to build entire pipeline
   - Unproven for our use case
   - 2-3 weeks of work

2. **❌ type-sitter Limitations (CRITICAL UNKNOWN)**
   - From web research: "designed for declarative DSLs"
   - Our grammar has:
     - Special bracket syntax `[x]`, `[-]`
     - Depth markers `>`, `>>`, `>>>`, etc.
     - Regex patterns for contexts
     - Value mappings (DAILY→D)
   - **Unknown:** Can type-sitter generate these?
   - **Risk:** May not support our complexity

3. **❌ Less Direct Control**
   - type-sitter decides grammar structure
   - Harder to customize edge cases
   - May need post-processing

4. **❌ Tighter Coupling**
   - Parser depends on ontology repo JTD output
   - Can't iterate independently
   - Build pipeline more complex

5. **❌ TypeScript Dependency**
   - Need TypeScript in build
   - Need jtd-codegen
   - Need type-sitter
   - More tools in chain

6. **❌ External Tool Risk**
   - type-sitter last updated 2023
   - Smaller ecosystem
   - If abandoned, we're stuck

### Critical Unknowns

**Must answer before committing:**

1. **Can type-sitter generate our bracket syntax?**
   ```typescript
   type State = '[' + (' ' | 'x' | '-' | '=' | '_') + ']';
   ```
   Does this generate: `choice(seq('[', ' ', ']'), seq('[', 'x', ']'), ...)`?

2. **Can type-sitter generate depth markers?**
   ```typescript
   type Depth = '>' | '>>' | '>>>' | '>>>>' | '>>>>>';
   ```
   Does this work?

3. **Can type-sitter handle regex patterns?**
   ```typescript
   type Context = string; // Pattern: @[a-zA-Z0-9_-]+
   ```
   How do we specify the regex?

4. **Can type-sitter do value mappings?**
   ```typescript
   type Frequency = 'DAILY' | 'WEEKLY'; // But file has 'D' | 'W'
   ```
   Can we map during generation?

5. **Can type-sitter generate optional/repeat constructs?**
   ```typescript
   type Action = {
     state: State;
     name: string;
     priority?: number;  // optional()
     children?: Action[]; // repeat()
   };
   ```

---

## The Critical Test: Can type-sitter Handle Our Grammar?

### What We Need type-sitter to Generate

**1. State (Bracket Syntax)**
```javascript
// Target grammar rule:
state: $ => choice(
  seq('[', ' ', ']'),
  seq('[', 'x', ']'),
  seq('[', '-', ']'),
  seq('[', '=', ']'),
  seq('[', '_', ']')
)
```

**Can type-sitter generate this from TypeScript?**

Possible TypeScript:
```typescript
type State =
  | '[ ]'
  | '[x]'
  | '[-]'
  | '[=]'
  | '[_]';
```

**Issue:** type-sitter sees this as string literals, may generate:
```javascript
state: $ => choice('[ ]', '[x]', '[-]', '[=]', '[_]')
```

Not broken into `seq('[', 'x', ']')`. This MIGHT work, but is less flexible.

**2. Depth Markers**
```javascript
// Target:
depth: $ => choice('>', '>>', '>>>', '>>>>', '>>>>>')
```

TypeScript:
```typescript
type Depth = '>' | '>>' | '>>>' | '>>>>' | '>>>>>';
```

**Likely works!** Simple string union.

**3. Context Pattern**
```javascript
// Target:
context: $ => seq(
  field('icon', '+'),
  field('value', /@[a-zA-Z0-9_-]+(,@[a-zA-Z0-9_-]+)*/)
)
```

TypeScript:
```typescript
interface Context {
  icon: '+';
  value: string; // Pattern?
}
```

**Problem:** How do we specify the regex pattern in TypeScript?

type-sitter documentation says it uses a "base grammar" with primitives. We'd need to:
1. Define regex in base grammar
2. Reference it from TypeScript

This is indirect and unclear.

**4. Recurrence Value Mapping**
```javascript
// Target: File has 'D', 'W', 'M', 'Y'
recurrence: $ => choice('D', 'W', 'M', 'Y')
```

TypeScript (semantic):
```typescript
type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
```

**Problem:** Types are semantic (DAILY), but syntax is abbreviated (D).

We'd need:
- Parser ontology to provide mapping
- type-sitter to apply it

**Unknown if type-sitter supports value mappings.**

### Verdict on type-sitter Feasibility

**From limited web research:**
- ✅ Good for: Simple declarative structures (JSON-like)
- ⚠️ Unknown for: Complex syntax (brackets, patterns, mappings)
- ❌ Last updated: 2023 (2 years ago)
- ⚠️ Documentation: Sparse (examples directory main source)

**Recommendation:** **Test type-sitter with minimal example BEFORE committing**

---

## Hybrid Option: Best of Both Worlds?

### Approach C: Dual Pipeline (Transition Strategy)

**Phase 1 (Now):** Use current syntax mapping approach
- ✅ Get working parser immediately
- ✅ Write tests, validate approach
- ✅ Prove ontology→parser generation works

**Phase 2 (Parallel):** Add TypeScript types alongside
- Generate TypeScript from JTD (ontology repo)
- Generate TypeScript from `syntax_mapping.json` (parser repo)
- Compare outputs, validate alignment

**Phase 3 (Experiment):** Try type-sitter
- Install type-sitter
- Attempt to generate grammar from TypeScript
- Compare with current grammar
- Document capabilities/limitations

**Phase 4 (Decision):** Choose winner
- If type-sitter works: migrate, deprecate syntax mapping
- If type-sitter fails: keep syntax mapping, add types separately

**Phase 5 (CLI):** Handle Rust generation
- If using type-sitter: use `--rust` flag
- If using syntax mapping: generate Rust from `src/node-types.json`

### Benefits of Hybrid Approach

1. **✅ No Sunk Cost**
   - Current work not wasted
   - Tests remain valid
   - Parser works during transition

2. **✅ De-risked**
   - Test type-sitter without commitment
   - Fall back if it doesn't work
   - Gradual migration

3. **✅ Types Available Either Way**
   - Can add TypeScript types now
   - Can use for documentation
   - Can validate against AST

4. **✅ Learn While Building**
   - Discover type-sitter limits empirically
   - Iterate on approach
   - Document findings

### Risks of Hybrid Approach

1. **⚠️ Maintenance Burden**
   - Two systems to maintain during transition
   - May never fully migrate
   - Technical debt

2. **⚠️ Confusion**
   - Which approach is "right"?
   - Documentation needs to cover both
   - Onboarding complexity

3. **⚠️ Delayed Decision**
   - Kicks can down road
   - May never commit
   - Architecture unclear

---

## Decision Criteria

### Must-Haves (Non-Negotiable)

1. **✅ Generates working tree-sitter parser**
   - Approach A: ✅ Proven
   - Approach B: ⚠️ Unknown

2. **✅ Handles our grammar complexity**
   - Brackets, depth markers, patterns, mappings
   - Approach A: ✅ Proven
   - Approach B: ⚠️ Unknown (critical test needed)

3. **✅ Supports CLI Rust struct generation**
   - Approach A: ⚠️ Need alternative
   - Approach B: ✅ Built-in (if type-sitter works)

4. **✅ Fetches SHACL constraints**
   - Approach A: ⚠️ Phase 4 (custom code)
   - Approach B: ✅ Natural (via JTD)

### Should-Haves (Important)

5. **Type safety for AST manipulation**
   - Approach A: ❌ No types
   - Approach B: ✅ Full TypeScript + Rust types

6. **Aligns with documented architecture**
   - Approach A: ❌ Violates ARCHITECTURE.md
   - Approach B: ✅ Matches spec

7. **No duplication with ontology repo**
   - Approach A: ❌ Separate intermediate format
   - Approach B: ✅ Shared JTD schemas

8. **Easy to debug and customize**
   - Approach A: ✅ Direct control
   - Approach B: ⚠️ Less control

### Nice-to-Haves

9. **Multi-language code generation**
   - Approach A: ❌ JavaScript only
   - Approach B: ✅ JTD → many languages

10. **Industry standard tools**
    - Approach A: ⚠️ Custom generator
    - Approach B: ✅ JTD + type-sitter standards

---

## Recommendation

### Immediate Action: TEST TYPE-SITTER

**Before deciding, we MUST:**

1. **Install type-sitter**
   ```bash
   npm install -g type-sitter
   ```

2. **Create minimal test**
   ```typescript
   // test/type-sitter-test.ts
   type State = '[ ]' | '[x]' | '[-]' | '[=]' | '[_]';
   type Depth = '>' | '>>' | '>>>' | '>>>>' | '>>>>>';
   interface Action {
     state: State;
     depth?: Depth;
     name: string;
   }
   ```

3. **Try generation**
   ```bash
   type-sitter -i test/type-sitter-test.ts
   ```

4. **Inspect output**
   - Does it generate valid tree-sitter grammar?
   - Does it handle our special syntax?
   - Can we customize patterns?

**Time: 2-4 hours**

### Decision Tree

```
Can type-sitter generate our grammar correctly?
├─ YES → Approach B (JTD→TypeScript→type-sitter)
│   ├─ Update ARCHITECTURE.md to add migration plan
│   ├─ Build JTD → TypeScript pipeline
│   ├─ Migrate to type-sitter
│   └─ Deprecate syntax mapping approach
│
├─ PARTIAL (works but needs post-processing) → Hybrid
│   ├─ Keep syntax mapping for complex rules
│   ├─ Use type-sitter for basic structure
│   ├─ Document which approach for which rules
│   └─ Revisit in 6 months
│
└─ NO → Approach A (Syntax Mapping)
    ├─ Update ARCHITECTURE.md to reflect reality
    ├─ Document rationale: "type-sitter insufficient for grammar complexity"
    ├─ Find alternative for Rust struct generation
    ├─ Add TypeScript types separately (for documentation)
    └─ Proceed with current approach
```

### My Recommendation (with caveat)

**Test type-sitter first** (2-4 hours), then:

**If type-sitter works:** → **Approach B** (align with architecture)
- Invest 2-3 weeks to build proper pipeline
- Get type safety and CLI integration
- Future-proof with standards

**If type-sitter fails/limited:** → **Approach A** (accept current)
- Update ARCHITECTURE.md with rationale
- Add "type-sitter was evaluated and found insufficient for our grammar complexity due to: [specific limitations]"
- Find alternative for Rust generation (use tree-sitter node-types.json)
- Add TypeScript types for documentation (parallel track)

**Rationale:**
- We're at a decision point NOW (before Phase 3 tests)
- 2-4 hour test prevents weeks of wasted work
- Either path is defensible IF documented with evidence
- Architecture purity is good, but **working parser is better**

---

## Action Items

### Immediate (This Week)

1. **[ ] Test type-sitter** (2-4 hours)
   - Install tool
   - Create minimal example
   - Document capabilities/limitations

2. **[ ] Make architecture decision** (1 hour meeting)
   - Review test results
   - Decide: A, B, or C
   - Document rationale

3. **[ ] Update ARCHITECTURE.md** (1 hour)
   - Add decision
   - Add evidence (test results)
   - Update pipeline diagram

### If Choosing Approach A (Current)

4. **[ ] Document syntax mapping approach** (2 hours)
   - Why it's better for our use case
   - How it differs from original vision
   - Migration path if type-sitter improves

5. **[ ] Investigate Rust struct generation alternatives** (4 hours)
   - Can tree-sitter generate Rust bindings directly?
   - Can we use node-types.json?
   - Document approach for CLI

6. **[ ] Replace eval() with safer alternative** (2 hours)
   - Use `new Function()` or generate actual .js file
   - Improve security and debuggability

### If Choosing Approach B (Type-Sitter)

4. **[ ] Build JTD generation in ontology repo** (1 week)
   - Update generate_jtd.py
   - Generate schemas from V3 + SHACL
   - Test output

5. **[ ] Set up TypeScript pipeline** (2-3 days)
   - Install jtd-codegen
   - Generate types
   - Validate structure

6. **[ ] Integrate type-sitter** (3-4 days)
   - Create parser ontology
   - Configure type-sitter
   - Generate grammar
   - Test parser

### If Choosing Approach C (Hybrid)

4. **[ ] Add TypeScript types alongside** (1 week)
   - Generate from JTD and syntax_mapping
   - Compare outputs
   - Use for documentation

5. **[ ] Plan migration timeline** (1 hour)
   - When to revisit?
   - What triggers migration?
   - How to deprecate old approach?

---

## Conclusion

We have **two viable approaches**, but **critical unknowns** about type-sitter capabilities.

**Do NOT proceed to Phase 3 until:**
1. ✅ type-sitter tested
2. ✅ Architecture decision made
3. ✅ ARCHITECTURE.md updated

**The 2-4 hour type-sitter test is the GATE for moving forward.**

After testing, we'll have evidence to make informed decision between:
- **Pragmatic** (Approach A: works now, diverges from vision)
- **Architectural** (Approach B: aligns with vision, risky unknown)
- **Incremental** (Approach C: hedge bets, higher complexity)

**Next Step:** Test type-sitter, report findings, decide.

---

**Status:** Awaiting type-sitter validation test
**Blocker:** Cannot proceed to Phase 3 (testing) until architecture decided
**Timeline:** 2-4 hours for test + 1 hour decision = proceed tomorrow
