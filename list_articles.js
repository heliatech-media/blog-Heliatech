const fs = require('fs');
const path = require('path');

const articlesDir = 'E:/blog-techpulse/src/content/articles';
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

console.log(`JSON_START`);
const data = files.map(f => {
  const content = fs.readFileSync(path.join(articlesDir, f), 'utf8');
  // Match frontmatter between --- and ---
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let title = f;
  let category = 'IA & Automatisation';
  let date = '2026-10-07';
  let author = 'HELIA TECH';
  if (fmMatch) {
    const fm = fmMatch[1];
    const t = fm.match(/title:\s*["']?(.*?)["']?$/m);
    const c = fm.match(/category:\s*["']?(.*?)["']?$/m);
    const d = fm.match(/date:\s*["']?(.*?)["']?$/m);
    const a = fm.match(/author:\s*["']?(.*?)["']?$/m);
    if (t) title = t[1].replace(/^["']|["']$/g, '');
    if (c) category = c[1].replace(/^["']|["']$/g, '');
    if (d) date = d[1].replace(/^["']|["']$/g, '');
    if (a) author = a[1].replace(/^["']|["']$/g, '');
  }
  return { file: f, title, category, date, author };
});
console.log(JSON.stringify(data, null, 2));
console.log(`JSON_END`);
