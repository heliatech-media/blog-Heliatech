const fs = require('fs');
const path = require('path');

const dirs = [
  'E:/blog-techpulse/src/content/articles',
  'E:/blog-techpulse/src/content/articles-en'
];

let totalFixed = 0;

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Pattern 1: [text](./slug.md) -> [text](/articles/slug)
    content = content.replace(/\]\(\.\/([^)]+?)\.md\)/g, '](/articles/$1)');

    // Pattern 2: [text](slug.md) -> [text](/articles/slug)
    content = content.replace(/\]\((?!https?:\/\/|\/|#)([^)]+?)\.md\)/g, '](/articles/$1)');

    // Pattern 3: [text](/articles/slug.md) -> [text](/articles/slug)
    content = content.replace(/\]\(\/articles\/([^)]+?)\.md\)/g, '](/articles/$1)');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Liens corrigés dans : ${file} (${dir.endsWith('-en') ? 'EN' : 'FR'})`);
      totalFixed++;
    }
  });
});

console.log(`\n🎉 Total fichiers Markdown nettoyés : ${totalFixed}`);
