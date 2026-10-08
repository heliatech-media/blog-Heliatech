const fs = require('fs');
const path = 'E:/blog-techpulse/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
if (!content.includes('MagneticButton')) {
  content = content.replace("import { Tag } from 'lucide-react';", "import { Tag } from 'lucide-react';\nimport MagneticButton from '@/components/MagneticButton';");
}

// Wrap the link
const oldButtonRegex = /<Link href="#newsletter" className="hidden md:flex text-white font-bold[^>]+>\s*<span[^>]+>Rejoindre l'[^\s]+<\/span>\s*<ChevronRight[^>]+>\s*<\/Link>/;

const newButton = `<MagneticButton strength={0.4}>
            <Link href="#newsletter" className="hidden md:flex text-white font-bold px-8 py-3 rounded-full text-sm transition-all items-center gap-3 group relative overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10">
              <span className="relative z-10">Rejoindre l'élite</span> 
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>`;

content = content.replace(oldButtonRegex, newButton);

fs.writeFileSync(path, content, 'utf8');
console.log('MagneticButton added');
