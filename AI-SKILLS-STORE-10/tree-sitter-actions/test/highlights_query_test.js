const assert = require('assert');
const { execFileSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const queryPath = path.join(root, 'queries', 'actions', 'highlights.scm');
const examplePath = path.join(root, 'examples', 'with_links.actions');

const output = execFileSync('tree-sitter', ['query', queryPath, examplePath], {
  cwd: root,
  encoding: 'utf8',
});

console.log('Testing highlights query for links...\n');

assert.match(
  output,
  /markup\.link\.label[\s\S]*text: `PR #456`/,
  'link labels should receive link label highlighting'
);
console.log('✓ Link labels receive link label highlighting');

assert.match(
  output,
  /markup\.underline[\s\S]*text: `PR #456`/,
  'link labels should be underlined'
);
console.log('✓ Link labels are underlined');

assert.match(
  output,
  /markup\.link\.label[\s\S]*text: `API docs`/,
  'description link labels should also receive link label highlighting'
);
console.log('✓ Description link labels receive link label highlighting');

assert.match(
  output,
  /markup\.link\.url[\s\S]*text: `https:\/\/github\.com\/org\/repo\/pull\/456`/,
  'explicit link URLs should receive URL highlighting'
);
console.log('✓ Explicit link URLs receive URL highlighting');

assert.match(
  output,
  /markup\.link\.url[\s\S]*text: `https:\/\/example\.com\/checklist`/,
  'shorthand links should receive URL highlighting'
);
console.log('✓ Shorthand link URLs receive URL highlighting');

console.log('\n✅ Highlights query link tests passed!');
