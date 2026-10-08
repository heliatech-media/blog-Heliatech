const fs = require('fs');
const path = require('path');

const articlesDir = 'E:/blog-techpulse/src/content/articles';
const coversDir = 'E:/blog-techpulse/public/images/covers';

// Articles avec images déjà présentes à utiliser comme placeholders
const fixes = {
  '13-droit-ethique.md':   { image: '/images/covers/cover_droit_ethique.jpg',    fallback: 'sujet-1.jpg' },
  '14-transhumanisme.md':  { image: '/images/covers/cover_transhumanisme.jpg',   fallback: 'sujet-2.jpg' },
  '15-creation-contenu.md':{ image: '/images/covers/cover_creation_contenu.jpg', fallback: 'sujet-3.jpg' },
  '16-hardware.md':        { image: '/images/covers/cover_hardware.jpg',          fallback: 'sujet-4.jpg' },
  '17-edtech.md':          { image: '/images/covers/17-edtech.jpg',               fallback: null },
  '18-open-source.md':     { image: '/images/covers/18-open-source.jpg',          fallback: null },
  '19-agritech.md':        { image: '/images/covers/19-agritech.jpg',             fallback: null },
  '20-finances-trading.md':{ image: '/images/covers/20-finances-trading.jpg',    fallback: null },
};

let fixed = 0;

Object.entries(fixes).forEach(([filename, cfg]) => {
  const filePath = path.join(articlesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Fichier non trouvé: ${filename}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if image field already exists
  const hasImage = /^image:/m.test(content);
  
  // Check if the cover file actually exists, use fallback if not
  let imagePath = cfg.image;
  const coverFilename = imagePath.replace('/images/covers/', '');
  if (!fs.existsSync(path.join(coversDir, coverFilename))) {
    if (cfg.fallback) {
      imagePath = `/images/covers/${cfg.fallback}`;
      console.log(`   🔄 Placeholder utilisé pour ${filename}: ${imagePath}`);
    }
  }
  
  if (!hasImage) {
    // Add image field after date or author line
    content = content.replace(/(date:.*)/m, `$1\nimage: "${imagePath}"`);
    console.log(`✅ Image ajoutée: ${filename} -> ${imagePath}`);
    fixed++;
  }
  
  // Also ensure author is HELIA TECH
  content = content.replace(/author:\s*["']?(?!HELIA TECH)[^"'\n\r]+["']?/m, 'author: "HELIA TECH"');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`\n🛡️ ${fixed} frontmatters corrigés.`);
