const fs = require('fs');

const dirs = [
  'E:/blog-techpulse/src/content/articles',
  'E:/blog-techpulse/src/content/articles-en'
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const path = `${dir}/${file}`;
      let content = fs.readFileSync(path, 'utf8');
      
      const lines = content.split('\n');
      let newLines = [];
      let currentBlockquote = [];
      let hasHeliaTech = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('>')) {
          currentBlockquote.push(line);
          if (line.includes('HELIA TECH')) {
            hasHeliaTech = true;
          }
        } else {
          if (currentBlockquote.length > 0) {
            if (!hasHeliaTech) {
              newLines.push(...currentBlockquote);
            }
            currentBlockquote = [];
            hasHeliaTech = false;
          }
          newLines.push(line);
        }
      }
      
      if (currentBlockquote.length > 0 && !hasHeliaTech) {
        newLines.push(...currentBlockquote);
      }
      
      let finalContent = newLines.join('\n');
      finalContent = finalContent.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      if (content !== finalContent) {
        fs.writeFileSync(path, finalContent, 'utf8');
        console.log(`Cleaned ${path}`);
      }
    });
  }
});
