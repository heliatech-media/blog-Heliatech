const fs = require('fs');
const path = require('path');

const articlesDir = 'E:/blog-techpulse/src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

const existingSlugs = new Set(files.map(f => f.replace('.md', '')));

let errors = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  // Match all hrefs to /articles/xyz
  const matches = [...content.matchAll(/\]\((\/articles\/[^)#\s]+)\)/g)];

  matches.forEach(m => {
    const url = m[1];
    const targetSlug = url.replace('/articles/', '').replace(/\/$/, '');
    if (!existingSlugs.has(targetSlug)) {
      errors.push({
        source: file,
        brokenLink: url,
        targetSlug
      });
    }
  });
});

console.log(`=== AUDIT COMPLET DU MAILLAGE INTERNE ===`);
console.log(`Total articles analysés : ${files.length}`);
if (errors.length === 0) {
  console.log(`✅ 100% DES LIENS INTERNES SONT VALIDES ! Aucun lien brisé.`);
} else {
  console.log(`❌ ${errors.length} LIEN(S) BRISÉ(S) DÉTECTÉ(S) :`);
  errors.forEach(e => {
    console.log(`   - Dans [${e.source}] -> pointe vers [${e.brokenLink}] qui n'existe pas.`);
  });
}
