/**
 * Formatting Test Suite
 *
 * Tests that the Topiary query produces spec-compliant formatting.
 * Test cases are symlinked from specifications/examples/formatting/
 *
 * Requirements:
 * - topiary CLI must be installed (cargo install topiary-cli)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const ROOT = path.join(__dirname, '..');
const FORMATTING_EXAMPLES = path.join(ROOT, 'examples', 'formatting');
const TOPIARY_CONFIG = path.join(ROOT, '.topiary', 'languages.ncl');
const TOPIARY_QUERY = path.join(ROOT, 'queries', 'actions', 'formatting.scm');

// Check if formatting examples exist
if (!fs.existsSync(FORMATTING_EXAMPLES)) {
  console.error('❌ ERROR: formatting examples not found at:', FORMATTING_EXAMPLES);
  console.error('Expected: examples/formatting/ (symlink to specifications/examples/formatting/)');
  process.exit(1);
}

// Check if topiary is installed
try {
  execSync('topiary --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ ERROR: topiary CLI not found');
  console.error('Install with: cargo install topiary-cli');
  process.exit(1);
}

// Check if topiary config exists
if (!fs.existsSync(TOPIARY_CONFIG)) {
  console.error('❌ ERROR: Topiary config not found at:', TOPIARY_CONFIG);
  process.exit(1);
}

console.log('Testing Topiary formatting against spec examples...\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

/**
 * Run formatting tests for a category
 */
function testCategory(categoryName) {
  const categoryDir = path.join(FORMATTING_EXAMPLES, categoryName);

  if (!fs.existsSync(categoryDir)) {
    console.log(`⚠️  SKIP: ${categoryName} (directory not found)`);
    return;
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Testing: ${categoryName}`);
  console.log('='.repeat(50));

  const testCases = fs.readdirSync(categoryDir)
    .filter(name => {
      const fullPath = path.join(categoryDir, name);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  for (const testCase of testCases) {
    const testDir = path.join(categoryDir, testCase);
    const inputFile = path.join(testDir, 'input.actions');
    const expectedFile = path.join(testDir, 'expected.actions');

    if (!fs.existsSync(inputFile) || !fs.existsSync(expectedFile)) {
      console.log(`  ⚠️  SKIP: ${testCase} (missing files)`);
      continue;
    }

    totalTests++;

    try {
      // Read expected output
      const expected = fs.readFileSync(expectedFile, 'utf8');

      // Read input
      const input = fs.readFileSync(inputFile, 'utf8');

      // Run topiary
      const topiaryCmd = `TOPIARY_CONFIG_FILE="${TOPIARY_CONFIG}" topiary format --language actions --query "${TOPIARY_QUERY}"`;
      const actual = execSync(topiaryCmd, {
        input: input,
        encoding: 'utf8',
        cwd: ROOT,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Compare
      if (actual === expected) {
        console.log(`  ✅ PASS: ${testCase}`);
        passedTests++;
      } else {
        console.log(`  ❌ FAIL: ${testCase}`);
        console.log(`    Expected: ${JSON.stringify(expected)}`);
        console.log(`    Got:      ${JSON.stringify(actual)}`);
        failedTests++;
        failures.push(`${categoryName}/${testCase}`);
      }
    } catch (error) {
      console.log(`  ❌ FAIL: ${testCase} (topiary error)`);
      console.log(`    Error: ${error.message}`);
      if (error.stderr) {
        console.log(`    Stderr: ${error.stderr.toString()}`);
      }
      failedTests++;
      failures.push(`${categoryName}/${testCase}`);
    }
  }
}

// Test newlines (the only formatting rule)
testCategory('newlines');

// Summary
console.log('\n' + '='.repeat(50));
console.log('Test Summary');
console.log('='.repeat(50));
console.log(`Total:  ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests > 0) {
  console.log('\nFailed tests:');
  failures.forEach(name => console.log(`  - ${name}`));
  console.log('\n❌ Some tests failed');
  process.exit(1);
} else if (totalTests === 0) {
  console.log('\n⚠️  No tests found');
  process.exit(1);
} else {
  console.log('\n✅ All formatting tests passed!');
}
