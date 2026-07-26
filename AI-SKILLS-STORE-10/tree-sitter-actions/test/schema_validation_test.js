/**
 * Schema Validation Smoke Test
 *
 * This test verifies that the generated JSON Schema can successfully validate
 * data in the canonical format. It uses hand-written JSON (not a serializer)
 * to avoid creating a reference implementation that could drift.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Use Ajv for JSON Schema validation
const Ajv = require('ajv');
const ajv = new Ajv({ strict: false });

// Load the generated schema
const schemaPath = path.join(__dirname, '..', 'schema', 'actions.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Compile the schema
const validate = ajv.compile(schema);

console.log('Testing JSON Schema validation...\n');

// Test 1: Valid minimal action
{
  const validMinimal = {
    actions: [
      {
        state: "not_started",
        name: "Buy milk"
      }
    ]
  };

  const valid = validate(validMinimal);
  assert.strictEqual(valid, true, 'Minimal valid action should validate');
  console.log('✓ Valid minimal action passes');
}

// Test 2: Valid action with all fields
{
  const validComplete = {
    actions: [
      {
        state: "completed",
        name: "Go to the store for chicken",
        description: "Make sure you get the stuff from the butcher directly",
        priority: 1,
        story: "Run Errands",
        contexts: ["Driving", "Store", "Market"],
        doDate: {
          datetime: "2025-01-19T08:30",
          duration: 30
        },
        completedDate: "2025-01-19T10:30",
        id: "214342414342413424",
        children: [
          {
            state: "not_started",
            name: "Get chicken from butcher",
            children: [
              {
                state: "in_progress",
                name: "Ask for organic options"
              }
            ]
          }
        ]
      }
    ]
  };

  const valid = validate(validComplete);
  assert.strictEqual(valid, true, 'Complete action with all fields should validate');
  console.log('✓ Valid complete action passes');
}

// Test 3: Invalid - missing required state field
{
  const invalid = {
    actions: [
      {
        name: "Missing state field"
      }
    ]
  };

  const valid = validate(invalid);
  assert.strictEqual(valid, false, 'Action missing state should fail validation');
  console.log('✓ Invalid action (missing state) correctly rejected');
}

// Test 4: Invalid - wrong state enum value
{
  const invalid = {
    actions: [
      {
        state: "invalid_state",
        name: "Task"
      }
    ]
  };

  const valid = validate(invalid);
  assert.strictEqual(valid, false, 'Action with invalid state should fail validation');
  console.log('✓ Invalid action (bad state enum) correctly rejected');
}

// Test 5: Invalid - negative priority
{
  const invalid = {
    actions: [
      {
        state: "not_started",
        name: "Task",
        priority: -1
      }
    ]
  };

  const valid = validate(invalid);
  assert.strictEqual(valid, false, 'Action with negative priority should fail validation');
  console.log('✓ Invalid action (negative priority) correctly rejected');
}

// Test 6: Valid action with recurrence
{
  const validRecurrence = {
    actions: [
      {
        state: "not_started",
        name: "Weekly meeting",
        doDate: {
          datetime: "2025-01-20T14:00",
          duration: 60,
          recurrence: {
            frequency: "weekly",
            interval: 1,
            byDay: ["Mon", "Wed", "Fri"]
          }
        }
      }
    ]
  };

  const valid = validate(validRecurrence);
  assert.strictEqual(valid, true, 'Action with valid recurrence should validate');
  console.log('✓ Valid action with recurrence passes');
}

console.log('\n✅ All schema validation tests passed!');
console.log('Schema successfully validates canonical JSON format.');
