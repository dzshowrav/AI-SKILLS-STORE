#!/usr/bin/env node

/**
 * Generate JSON Schema for .actions file serialization
 *
 * This script generates a JSON Schema that validates the canonical JSON
 * serialization format for .actions files. It uses the same regex patterns
 * from grammar.js to ensure parsing and validation are consistent.
 */

const fs = require('fs');
const path = require('path');

// Import patterns from shared source
const PATTERNS = require('../patterns.js');

// Helper to convert RegExp to pattern string
function patternToString(regex) {
  if (!regex) return ''; // Handle undefined patterns
  return regex.source; // Extract just the pattern string
}

// Build the JSON Schema
const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/clearheadtodo-devs/tree-sitter-actions/schema/actions.schema.json",
  "title": "Actions File Serialization Format",
  "description": "JSON Schema for the canonical serialization of .actions files",
  "type": "object",
  "required": ["actions"],
  "properties": {
    "actions": {
      "type": "array",
      "description": "Array of root-level actions",
      "items": {
        "$ref": "#/definitions/action"
      }
    }
  },
  "definitions": {
    "action": {
      "type": "object",
      "required": ["state", "name"],
      "properties": {
        "state": {
          "type": "string",
          "description": "Current state of the action",
          "enum": ["not_started", "completed", "in_progress", "blocked", "cancelled"]
        },
        "name": {
          "type": "string",
          "description": "Name/title of the action",
          "minLength": 1,
          "pattern": patternToString(PATTERNS.name)
        },
        "description": {
          "type": "string",
          "description": "Long-form description of the action",
          "pattern": patternToString(PATTERNS.description_text)
        },
        "priority": {
          "type": "integer",
          "description": "Numeric priority level",
          "minimum": 0
        },
        "story": {
          "type": "string",
          "description": "Parent project/story name (root actions only)",
          "pattern": patternToString(PATTERNS.story_name)
        },
        "contexts": {
          "type": "array",
          "description": "Array of context tags",
          "items": {
            "type": "string",
            "pattern": patternToString(PATTERNS.tag)
          },
          "minItems": 1
        },
        "doDate": {
          "type": "object",
          "description": "Scheduled date/time for the action",
          "required": ["datetime"],
          "properties": {
            "datetime": {
              "type": "string",
              "description": "ISO 8601 formatted date/time",
              "pattern": patternToString(PATTERNS.datetime_do)
            },
            "duration": {
              "type": "integer",
              "description": "Duration in minutes",
              "minimum": 1
            }
          }
        },
        "completedDate": {
          "type": "string",
          "description": "ISO 8601 formatted completion date/time",
          "pattern": patternToString(PATTERNS.datetime_completed)
        },
        "createdDate": {
          "type": "string",
          "description": "ISO 8601 formatted creation date/time",
          "pattern": patternToString(PATTERNS.datetime_created)
        },
        "id": {
          "type": "string",
          "description": "UUIDv7 identifier",
          "pattern": patternToString(PATTERNS.uuid)
        },
        "children": {
          "type": "array",
          "description": "Nested child actions",
          "items": {
            "$ref": "#/definitions/action"
          }
        }
      },
      "additionalProperties": false
    }
  }
};

// Write schema to file
const schemaPath = path.join(__dirname, '..', 'schema', 'actions.schema.json');
const schemaJson = JSON.stringify(schema, null, 2);

fs.writeFileSync(schemaPath, schemaJson, 'utf8');

console.log(`✓ Generated JSON Schema at ${schemaPath}`);
console.log(`  Using patterns from grammar.js:`);
for (const [key, value] of Object.entries(PATTERNS)) {
  if (key !== 'metadata_chars') {
    console.log(`    - ${key}: /${value}/`);
  }
}
