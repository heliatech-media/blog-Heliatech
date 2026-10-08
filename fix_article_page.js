const fs = require('fs');

const pagePath = 'E:/blog-techpulse/src/app/articles/[slug]/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

// Replace the massive prose class with just elite-article
content = content.replace(/className="prose prose-invert prose-lg md:prose-xl max-w-none[\s\S]*?"/, 'className="elite-article max-w-none mx-auto"');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Fixed article page.tsx');
