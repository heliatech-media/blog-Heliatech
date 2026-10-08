const fs = require('fs');
const articlesDir = 'E:/blog-techpulse/src/content/articles';
const coversDir = 'E:/blog-techpulse/public/images/covers';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
let issues = [];
let ok = [];

files.forEach(f => {
  const content = fs.readFileSync(articlesDir + '/' + f, 'utf8');
  const match = content.match(/image:\s*["']?([^"'\n\r]+)["']?/);
  if (match) {
    const imgPath = match[1].trim().replace('/images/covers/', '');
    const exists = fs.existsSync(coversDir + '/' + imgPath);
    if (!exists) {
      issues.push({ article: f, image: imgPath });
    } else {
      ok.push(f);
    }
  } else {
    issues.push({ article: f, image: 'CHAMP IMAGE MANQUANT' });
  }
});

console.log(`\n=== QA IMAGES ===`);
console.log(`✅ OK: ${ok.length} articles`);
ok.forEach(f => console.log(`   - ${f}`));
if (issues.length > 0) {
  console.log(`\n❌ Problèmes: ${issues.length} articles`);
  issues.forEach(i => console.log(`   - ${i.article} -> ${i.image}`));
} else {
  console.log(`\n🛡️ Toutes les images sont présentes et liées !`);
}
