---
name: csv-tools
description: "Parse, query, filter, sort, transform, and summarize CSV and JSON data files."
tags: [csv, json, data, filter, sort, statistics, transform, utility]
version: 0.1.0
---

# Skill: csv-tools

## When to Use

Use this skill when the user asks to view, filter, sort, query, convert, or analyze CSV/JSON data files.

## Input Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| action | Yes | view, filter, sort, stats, convert |
| file_path | Yes | Path to the CSV or JSON file |
| column | For filter/sort | Column name to operate on |
| value | For filter | Value to match (supports >, <, >=, <=, !=, =) |
| order | For sort | asc (default) or desc |
| output | For convert | Output file path |

## Procedure

```bash
# View data
python3 scripts/query.py view data.csv --limit 50

# Filter
python3 scripts/query.py filter data.csv --column status --value "active"

# Sort
python3 scripts/query.py sort data.csv --column date --order desc

# Statistics
python3 scripts/query.py stats data.csv

# Convert
python3 scripts/query.py convert data.csv --output data.json
```
