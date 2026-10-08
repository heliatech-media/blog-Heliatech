const fs = require('fs');
const path = require('path');

const articlesDir = 'E:/blog-techpulse/src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

// Table de décodage complète Latin-1 -> UTF-8
const fixes = [
  [/Ã©/g, 'é'], [/Ã¨/g, 'è'], [/Ãª/g, 'ê'], [/Ã«/g, 'ë'],
  [/Ã /g, 'à'], [/Ã¢/g, 'â'], [/Ã¤/g, 'ä'], [/Ã®/g, 'î'],
  [/Ã¯/g, 'ï'], [/Ã´/g, 'ô'], [/Ã¶/g, 'ö'], [/Ã¹/g, 'ù'],
  [/Ã»/g, 'û'], [/Ã¼/g, 'ü'], [/Ã§/g, 'ç'], [/Ã/g, 'À'],
  [/Ã‰/g, 'É'], [/Ãˆ/g, 'È'], [/ÃŠ/g, 'Ê'], [/Î/g, 'Î'],
  [/Ã"/g, 'Ó'], [/Ã"/g, 'Ô'], [/Ã™/g, 'Ù'], [/Ã›/g, 'Û'],
  [/Ã‡/g, 'Ç'], [/â‚¬/g, '€'], [/Ã¦/g, 'æ'], [/Åâ€"/g, 'œ'],
  [/â€™/g, "'"], [/â€œ/g, '"'], [/â€/g, '"'], [/â€"/g, '–'],
  [/â€"/g, '—'], [/Â«/g, '«'], [/Â»/g, '»'], [/Â /g, ' '],
  [/Ã©/g, 'é'], // double pass
];

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  fixes.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  // Fix author
  content = content.replace(/author:\s*["']?(Lead Content Creator|TechPulse IA|Helia Tech)["']?/g, 'author: "HELIA TECH"');

  // Remove corporate blockquotes
  content = content.replace(/> \*\*Envie de concilier.*?\n(> .*?\n)*/gs, '');

  // Remove generic AI conclusions
  content = content.replace(/En conclusion[,\s][^\n]*/g, '');
  content = content.replace(/Dans ce monde en constante évolution[,\s][^\n]*/g, '');
  content = content.replace(/Il est crucial de[,\s][^\n]*/g, '');
  content = content.replace(/N'oubliez pas que[,\s][^\n]*/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleaned: ${file}`);
    totalFixed++;
  } else {
    console.log(`⚪ No changes: ${file}`);
  }
});

console.log(`\n🛡️ Brand Guardian terminé. ${totalFixed}/${files.length} articles corrigés.`);
