---
name: laravel-brainstorming
description: Use when creating or developing Laravel features, before writing code or implementation plans - refines rough ideas into fully-formed Laravel designs through collaborative questioning, alternative exploration, and incremental validation.
---

# Brainstorming Laravel Ideas Into Designs

## Overview

Help turn Laravel feature ideas into fully formed designs and specs through natural collaborative dialogue, focusing on Laravel best practices and ecosystem patterns.

## The Process

**Understanding the idea:**
- Check out the current Laravel project state first (routes, models, migrations, recent commits)
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible
- Focus on understanding: purpose, Laravel patterns, constraints, success criteria

**Exploring approaches:**
- Propose 2-3 different Laravel approaches with trade-offs
- Lead with your recommended option

## Laravel-Specific Design Sections

### 1. Database Schema
```
Tables needed, relationships, indexes, enums for status fields.
```

### 2. Models & Relationships
```
Model setup: relationships, scopes (published(), draft()), casts, factories.
```

### 3. API Design
```
RESTful conventions, Sanctum auth, rate limiting, API resources for transformation.
```

### 4. Business Logic
```
Service classes for orchestration, queue jobs for side effects, events for decoupling.
```

## After the Design

**Documentation:**
- Write the validated design to `docs/designs/YYYY-MM-DD-<feature>-design.md`
- Include: feature overview, database schema, API endpoints, business logic flow

**Implementation:**
- Ask: "Ready to set up for implementation?"
- Follow TDD approach starting with migrations and models
