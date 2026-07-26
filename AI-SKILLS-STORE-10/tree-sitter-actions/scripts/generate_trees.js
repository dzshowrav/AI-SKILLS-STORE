const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all example files
const examplesDir = path.join(__dirname, '..', 'examples');
const treesDir = path.join(__dirname, '..', 'test', 'trees');

const exampleFiles = fs.readdirSync(examplesDir)
  .filter(f => f.endsWith('.actions'))
  .sort();

console.log('Generating tree files from examples...\n');

for (const exampleFile of exampleFiles) {
  const baseName = path.basename(exampleFile, '.actions');
  const examplePath = path.join(examplesDir, exampleFile);
  const treePath = path.join(treesDir, `${baseName}.sexp`);

  try {
    // Parse the example file and capture output
    const output = execSync(`tree-sitter parse "${examplePath}" 2>&1`, {
      encoding: 'utf8',
      cwd: path.join(__dirname, '..')
    });

    // Strip coordinates and warnings from output
    const cleanedOutput = output
      .trim()
      .replace(/Warning: You have not configured any parser directories![\s\S]*?language grammars\./, '')
      .replace(/ \[[0-9]+, [0-9]+\] - \[[0-9]+, [0-9]+\]/g, '')
      .trim();

    fs.writeFileSync(treePath, cleanedOutput);
    console.log(`✓ Generated test/trees/${baseName}.sexp`);
  } catch (error) {
    console.error(`✗ Failed to generate: ${baseName}.sexp`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log('\nTree generation complete!');
