const { execSync } = require('child_process');
const path = require('path');

console.log('='.repeat(50));
console.log('Regenerating all test files');
console.log('='.repeat(50));
console.log();

try {
  // Step 1: Generate tree files from examples
  console.log('Step 1: Generating tree files...');
  execSync('node scripts/generate_trees.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log();

  // Step 2: Generate corpus files from trees and examples
  console.log('Step 2: Generating corpus files...');
  execSync('node scripts/generate_tests.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log();

  console.log('='.repeat(50));
  console.log('✓ All test files regenerated successfully!');
  console.log('='.repeat(50));
  console.log();
  console.log('Run "npm test" to verify the changes.');
} catch (error) {
  console.error('\n✗ Failed to regenerate test files');
  console.error(error.message);
  process.exit(1);
}
