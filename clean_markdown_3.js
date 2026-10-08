const fs = require('fs');
const path = require('path');

const dir = 'src/content/articles';
const files = ['remplacer-assistant-ia.md'];

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix common Mojibake
  const replacements = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã ': 'à',
    'Ã¢': 'â',
    'Ãª': 'ê',
    'Ã®': 'î',
    'Ã´': 'ô',
    'Ã»': 'û',
    'Ã§': 'ç',
    'Ã(': 'à',
    'ï¿½': 'é',
    'â‚¬': '€'
  };
  
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  // Also replace any remaining weird Ã  which is usually à
  content = content.replace(/Ã /g, 'à ');

  // Fix image path
  content = content.replace(/\/images\/covers\/remplacer-assistant-ia\.jpg/g, '/images/covers/sujet-1.jpg');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned ${file}`);
}
