const fs = require('fs');

const path = 'E:/blog-techpulse/src/app/articles/[slug]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<AudioPlayer \/>/g, '<AudioPlayer title={article.title} content={article.contentHtml} />');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed AudioPlayer props in page.tsx');
