const fs = require('fs');
const path = require('path');

// Read the test descriptions
const testDescriptions = JSON.parse(fs.readFileSync('test/test_descriptions.json', 'utf8'));

// Process each test category
for (const [category, tests] of Object.entries(testDescriptions)) {
  const outputPath = path.join('test', 'corpus', `${category}.txt`);
  let output = '';
  
  for (const [testName, description] of Object.entries(tests)) {
    // Read the example file
    const examplePath = path.join('examples', `${testName}.actions`);
    const sexpPath = path.join('test', 'trees', `${testName}.sexp`);
    
    if (!fs.existsSync(examplePath)) {
      console.warn(`Warning: Example file not found: ${examplePath}`);
      continue;
    }
    
    if (!fs.existsSync(sexpPath)) {
      console.warn(`Warning: S-expression file not found: ${sexpPath}`);
      continue;
    }
    
    const exampleContent = fs.readFileSync(examplePath, 'utf8').trim();
    const sexpContent = fs.readFileSync(sexpPath, 'utf8').trim();
    
    // Generate the test case
    const testCase = `${'='.repeat(description.length)}
${description}
${'='.repeat(description.length)}
${exampleContent}

---

${sexpContent}

`;

    output += testCase;
  }

  // Write the output file
  fs.writeFileSync(outputPath, output.trim() + '\n');
  console.log(`Generated: ${outputPath}`);
}

console.log('Test generation complete!');
