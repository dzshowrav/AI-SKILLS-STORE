---
name: analyse-with-phpstan
description: Analyse PHP code with PHPStan via the playground API. Tests across all PHP versions (7.2-8.5) and reports errors grouped by version.
---

# Analyse PHP code with PHPStan

Analyse PHP code using the PHPStan playground API at `https://api.phpstan.org/analyse`.

## Step 1: Prepare the code

Get PHP code to analyse. Must start with `<?php`.

## Step 2: Determine settings

Default: level "10", strictRules false, bleedingEdge false.

## Step 3: Call API

```bash
curl -s -X POST 'https://api.phpstan.org/analyse' \
  -H 'Content-Type: application/json' \
  -d '{
    "code": "<JSON-escaped PHP code>",
    "level": "10",
    "strictRules": false,
    "bleedingEdge": false,
    "treatPhpDocTypesAsCertain": true,
    "saveResult": true
  }'
```

## Step 4: Parse response

Response contains `versionedErrors` array (one per PHP version) with `phpVersion` (e.g., 80400 = PHP 8.4) and `errors` array.

## Step 5: Present results

Show Playground link: `https://phpstan.org/r/<id>`

Group consecutive PHP versions with identical errors into ranges. Display errors in a table with Line, Error, and Identifier columns.
