const fs = require('fs');

const path = 'E:/blog-techpulse/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/Derri[^<]*\./, 'Derrière.');
content = content.replace(/L'IA [^v]*volue/, "L'IA évolue");
content = content.replace(/protocoles priv[^s]*s/, 'protocoles privés');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed encoding with regex');
