const fs = require('fs');

const path = 'E:/blog-techpulse/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix encoding issues
const encodingFixes = {
  'SystÃ¨mes': 'Systèmes',
  'Ã‰chelle': 'Échelle',
  'Rejoindre l\'Ã©lite': 'Rejoindre l\'élite',
  'L\'IA Ã©volue': 'L\'IA évolue',
  'DerriÃ¨re.': 'Derrière.',
  'protocoles privÃ©s': 'protocoles privés',
  'La nouvelle Ã¨re est lÃ ': 'La nouvelle ère est là',
  'Insights non censurÃ©s': 'Insights non censurés',
  'gÃ©nÃ©rative': 'générative',
  'mÃ©diocritÃ©': 'médiocrité'
};

for (const [bad, good] of Object.entries(encodingFixes)) {
  content = content.replace(new RegExp(bad, 'g'), good);
}

// Update the navigation menu
const oldNav = `<div className="space-x-12 hidden md:flex font-semibold text-sm text-zinc-400 tracking-widest uppercase">
            <Link href="#" className="hover:text-white transition-colors duration-300">Intelligence</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Systèmes</Link>
            <Link href="#" className="hover:text-white transition-colors duration-300">Échelle</Link>
          </div>
          
          <button className="hidden md:flex text-white font-bold px-8 py-3 rounded-full text-sm transition-all items-center gap-3 group relative overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10">
            <span className="relative z-10">Rejoindre l'élite</span> 
            <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>`;

const newNav = `<div className="space-x-12 hidden md:flex font-semibold text-sm text-zinc-400 tracking-widest uppercase">
            <Link href="/articles" className="hover:text-white transition-colors duration-300">Tous les Articles</Link>
            <Link href="#newsletter" className="hover:text-white transition-colors duration-300">Newsletter</Link>
            <Link href="https://twitter.com/HeliaTech" target="_blank" className="hover:text-white transition-colors duration-300">Twitter</Link>
          </div>
          
          <Link href="#newsletter" className="hidden md:flex text-white font-bold px-8 py-3 rounded-full text-sm transition-all items-center gap-3 group relative overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10">
            <span className="relative z-10">Rejoindre l'élite</span> 
            <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>`;

content = content.replace(oldNav, newNav);

// Add id="newsletter" to the CTA section
content = content.replace('<section>', '<section id="newsletter">');

fs.writeFileSync(path, content, 'utf8');
console.log('Homepage fixed');
