const fs = require('fs');
const path = require('path');

const dir = 'src/content/articles';
const files = ['workflows-departement-entier.md'];

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
    'ï¿½': 'é'
  };
  
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }

  // Also replace any remaining weird Ã  which is usually à
  content = content.replace(/Ã /g, 'à ');

  // Set an image for this article too so it looks good on the homepage
  if (!content.includes('image:')) {
      content = content.replace(/date: (.*?)\n/, 'date: $1\nimage: "/images/covers/sujet-2.jpg"\n');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned ${file}`);
}
