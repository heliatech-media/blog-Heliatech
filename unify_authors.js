const fs = require('fs');
const files = ['10-societe.md', '11-robotique.md', '09-culture-web.md', '12-quantique.md'];
files.forEach(f => {
  const p = 'E:/blog-techpulse/src/content/articles/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/author:\s*["']?Helia["']?/g, 'author: "HELIA TECH"');
  fs.writeFileSync(p, c, 'utf8');
});
console.log('Authors unified to HELIA TECH');
