# Anchored Summary

## Objective
- Deep research Antigravity CLI (agy) binary to extract every feature, tool, schema, config, UI pattern, and working detail for a rebuild-from-scratch reference skill

## Important Details
- Binary: `/data/data/com.termux/files/usr/bin/agy` (15KB Android ELF wrapper) + `/data/data/com.termux/files/usr/bin/agy.va39` (159MB ARM64 glibc Go binary v1.0.0, run via qemu-aarch64)
- Internal Google codename: "Jetski" (product: "Cascade" / "Gemini Coder")
- Cortex engine packages: 40+ subsystems (accumulator, battlemode, executors, gamification, policyguardian, state, sidecars, etc.)
- Full skill package now 66 files, ~190MB across 8 subdirectories + main SKILL.md
- Only ~2.2GB free disk space remaining

## Work State
### Completed
- Populated all 8 subdirectories: `api/`, `architecture/` (4 diagrams), `config/` (9 config formats), `reference/` (29 docs + 20+ discovered systems), `tools/` (24+ tool schemas + pipeline), `examples/` (23 flow files), `uiux/` (11 layout/keybinding/state files), `reference/embedded/` (53 extracted assets)
- Removed duplicate `ui-ux/` directory
- Deep binary re-scan of 712K strings lines found 30+ undocumented features documented in SKILL.md (now 2784 lines, 44 sections)
- Created all reference/ docs, examples/ flows, and uiux/ specs
- Copied original binaries: `agy` (15K), `agy.va39` (159M), `strings_dump.txt` (30M) into `reference/binaries/`
- **Extracted 53 embedded resources** from binary via binwalk:
  - 9 SVG icons (32x32 UI elements)
  - 5 WebP images (2 splash/logo images ~11-12KB each)
  - 20 PEM root CA certificates (Google, GlobalSign, DigiCert, GoDaddy, COMODO, USERTRUST + self-signed localhost)
  - 1 RSA 2048-bit private key (for localhost dev cert)
  - 17 compiled protobuf descriptors (CockroachDB errorspb, Google WKT, gogoproto)
  - 1 VxWorks symbol table (JSON)
  - Organized into `reference/embedded/` with INDEX.md

### Active
- (none — extraction complete)

### Next Move
- Analyze extracted SVG icons and WebP images for UI branding patterns
- Compare certificates with known root CA bundles to identify custom additions
- Decode protobuf descriptors into .proto text definitions for documentation
- Document how self-signed localhost cert + key enables local HTTPS development mode

## Relevant Files
- `.opencode/skills/antigravity-cli/SKILL.md`: Master reference (2784 lines, 44 sections)
- `.opencode/skills/antigravity-cli/reference/binaries/INDEX.md`: Binary descriptions
- `.opencode/skills/antigravity-cli/reference/embedded/INDEX.md`: Extracted resources catalog
- `.opencode/skills/antigravity-cli/reference/embedded/svg/`: 9 UI icons
- `.opencode/skills/antigravity-cli/reference/embedded/images/`: 5 WebP images
- `.opencode/skills/antigravity-cli/reference/embedded/certs/`: 20 PEM certificates + 1 key
- `.opencode/skills/antigravity-cli/reference/embedded/proto/`: 17 protobuf descriptors
- `.opencode/skills/antigravity-cli/reference/embedded/symbols/`: 1 VxWorks symbol table
