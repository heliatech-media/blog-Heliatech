const fs = require('fs');
const path = require('path');

const dir = 'src/content/articles';
const files = ['sujet-1.md', 'sujet-2.md', 'sujet-3.md'];

for (const file of files) {
  const fullPath = path.join(dir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  try {
    // If it was written literally as UTF-8 mojibake, decoding it as latin1 then parsing as utf8 can fix it.
    const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
    fs.writeFileSync(fullPath, fixedContent, 'utf8');
    console.log(`Fixed ${file}`);
  } catch (e) {
    console.error(`Error fixing ${file}`, e);
  }
}
