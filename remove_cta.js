const fs = require('fs');

const path = 'E:/blog-techpulse/src/content/articles/sujet-4-ecologie-ia.md';
let content = fs.readFileSync(path, 'utf8');

// The blockquote to remove
const blockquoteRegex = /> \*\*Envie de concilier innovation et responsabilit[éÃ©] \?\*\*[\s\S]*?> Chez HELIA TECH.*respectant la plan[èÃ¨]te\./g;

content = content.replace(blockquoteRegex, '');

fs.writeFileSync(path, content.trim() + '\n', 'utf8');
console.log('Removed promotional CTA');
