const fs = require('fs');

const pagePath = 'E:/blog-techpulse/src/app/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

content = content.replace(/Ã§a/g, 'a');
content = content.replace(/ça/g, 'a');
// Fix the actual "ça fait peur"
content = content.replace(/a fait peur/g, 'ça fait peur');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Fixed page.tsx');
