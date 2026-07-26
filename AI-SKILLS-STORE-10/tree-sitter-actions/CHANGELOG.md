# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [0.9.0] - 2025-12-30
### Removed
No longer exporting the schema or examples within the rust bindings.

These were always janky and ive decided to move them and all other shared docs to the new [specifications repo](https://github.com/ClearHeadToDo-Devs/specifications.git) to better separate concerns.

This means downstream consumers are expected to vendor the examples and schemas directly to reduce direct dependencies and allow migration at at their own pace instead of coupling them to the treesitter implementation.

## [0.6.0] - 2024-12-24

### Added
- **Recurring Actions Support**: Full implementation of recurring actions using RFC 5545 RRULE syntax
  - New `R:` prefix for recurrence rules (e.g., `R:FREQ=WEEKLY;BYDAY=MO,WE,FR`)
  - Supports all RRULE components: FREQ, INTERVAL, COUNT, UNTIL, BYDAY, BYMONTH, BYMONTHDAY, etc.
  - Template + log model for tracking recurring action completions
- **Enhanced Date/Time Parsing**:
  - Grammar now separately captures `datetime`, `duration`, and `recurrence` components
  - Strict ISO 8601 datetime format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM` with optional timezone
  - Duration syntax: `D` + minutes (e.g., `D30` for 30 minutes)
- **Schema Enhancements**:
  - SQL schema: Enhanced `action_recurrence` table with complete RRULE field mapping
  - JSON schema: Auto-generated with structured recurrence object
- **Documentation**:
  - Comprehensive recurrence documentation in `docs/action_specification.md`
  - Common recurrence pattern examples (daily, weekly, monthly, yearly)
  - Template + log file convention for completion tracking
  - Design rationale for choosing RRULE over custom syntax
- **Examples**:
  - `examples/recurring_templates.actions`: 10 common recurring patterns
  - `examples/recurring_log_example.actions`: Shows completion logging
  - Quick example section added to README.md

### Changed
- **BREAKING**: Date/time format now strictly ISO 8601 (previously accepted 12-hour AM/PM format)
  - Old: `@2019-01-01 12:01AM`
  - New: `@2019-01-01T00:01`
- **BREAKING**: Removed custom recurrence shorthand syntax (RD, RW, RM, RY)
  - Old: `@2025-01-20 RW Mon,Wed,Fri`
  - New: `@2025-01-20 R:FREQ=WEEKLY;BYDAY=MO,WE,FR`
- Updated all example files to use new ISO 8601 + RRULE syntax
- Grammar: `do_date` now has structured children (`datetime`, `duration`, `recurrence`) instead of opaque string

### Fixed
- Recurrence regex now properly terminates at metadata markers (was consuming trailing whitespace)
- Highlights query updated to work with new grammar structure (removed invalid `uuid` node reference)

### Technical
- All test trees and corpus files regenerated for new grammar
- 100% test pass rate maintained (14/14 tests passing)
- SQL schema synced between canonical schema and clearhead-cli implementation

## [0.5.0] - Prior Release

Initial public release with core action parsing functionality.

