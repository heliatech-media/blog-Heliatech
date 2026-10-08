const fs = require('fs');
const path = require('path');

const dir = 'src/content/articles';
const files = ['sujet-1.md', 'sujet-2.md', 'sujet-3.md'];

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Fix BOM and broken markdown frontmatter
  content = content.replace(/^ï¿½---/, '---');
  content = content.replace(/^\uFFFD---/, '---');
  content = content.replace(/^\xEF\xBF\xBD---/, '---');
  if (!content.startsWith('---')) {
     content = content.replace(/^.*?---/, '---');
  }

  // Fix image paths
  content = content.replace(/image: "\/images\/covers\/sujet-1\.md\.jpg"/g, 'image: "/images/covers/sujet-1.jpg"');
  content = content.replace(/image: "\/images\/covers\/sujet-2\.md\.jpg"/g, 'image: "/images/covers/sujet-2.jpg"');
  content = content.replace(/image: "\/images\/covers\/sujet-3\.md\.jpg"/g, 'image: "/images/covers/sujet-3.jpg"');
  
  // Fix common Mojibake
  const replacements = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã ': 'à',
    'Ã¢': 'â',
    'Ãª': 'ê',
    'Ã®': 'î',
    'Ã´': 'ô',
    'Ã»': 'û',
    'Ã§': 'ç',
    'Ã(': 'à', // Sometimes Ã alone is à
    'ï¿½': 'é',
    'Ã©': 'é',
    'Ã®': 'î',
    'Ã¯': 'ï'
  };
  
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  // Also replace any remaining weird Ã  which is usually à
  content = content.replace(/Ã /g, 'à ');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned ${file}`);
}
