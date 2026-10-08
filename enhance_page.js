const fs = require('fs');
const path = 'E:/blog-techpulse/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix ALL broken encodings manually by overwriting the text completely
content = content.replace(/Insights non censur[^\s]+ sur l'IA g[^\s]+r[^\s]+ et l'automatisation [^\s]+ grande [^\s]+chelle\. Pour les fondateurs qui refusent la m[^\s]+diocrit[^\s]+\./g, "Insights non censurés sur l'IA générative et l'automatisation à grande échelle. Pour les fondateurs qui refusent la médiocrité.");
content = content.replace(/Ã€ la une/g, "À la une");
content = content.replace(/compl[^\s]+te du syst[^\s]+me qui a g[^\s]+n[^\s]+r[^\s]+ 10x de revenus avec 0 employ[^\s]+s suppl[^\s]+mentaires\./g, "complète du système qui a généré 10x de revenus avec 0 employés supplémentaires.");
content = content.replace(/Lire l'Ã©tude/g, "Lire l'étude");
content = content.replace(/DerriÃ¨re/g, "Derrière");
content = content.replace(/L'IA Ã©volue/g, "L'IA évolue");
content = content.replace(/protocoles privÃ©s/g, "protocoles privés");
content = content.replace(/Ã‰chelle/g, "Échelle");
content = content.replace(/Rejoindre l'Ã©lite/g, "Rejoindre l'élite");


// Import SpotlightCard
if (!content.includes('SpotlightCard')) {
  content = content.replace("import MagneticButton from '@/components/MagneticButton';", "import MagneticButton from '@/components/MagneticButton';\nimport SpotlightCard from '@/components/SpotlightCard';");
}

// Wrap Bento Grid items in SpotlightCard
content = content.replace(/<div className="group relative w-full h-full block rounded-\[2rem\] overflow-hidden bg-zinc-900 border border-white\/5 hover:border-white\/10 transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-\[0_20px_40px_-15px_rgba\(0,0,0,0\.5\)\]">/g, 
  `<SpotlightCard className="group relative w-full h-full block transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">`);

// Close SpotlightCard instead of div
// This is tricky with regex, so let's just do it cleanly for the bento items
const parts = content.split('<Link href={`/articles/${article.slug}`} className="group relative w-full h-full block rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/10 transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">');

if (parts.length > 1) {
    let newContent = parts[0];
    for (let i = 1; i < parts.length; i++) {
        // Change the wrapper
        newContent += `<Link href={\`/articles/\${article.slug}\`} className="w-full h-full block">
                  <SpotlightCard className="group relative w-full h-full block transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">`;
        
        // Find the closing </div></Link> of this block
        // Wait, the original code had:
        // <Link> <div className="..."> ... </div> </Link>
        // No, the Link had the className!
        // `<Link ... className="...">  ...  </Link>`
    }
}

// Let's use a simpler replace strategy for SpotlightCard
// Just replace the <Link className="..."> with <Link><SpotlightCard>
content = content.replace(
  /<Link href={`\/articles\/\${article\.slug}`} className="group relative w-full h-full block rounded-\[2rem\] overflow-hidden bg-zinc-900 border border-white\/5 hover:border-white\/10 transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-\[0_20px_40px_-15px_rgba\(0,0,0,0\.5\)\]">/g,
  `<Link href={\`/articles/\${article.slug}\`} className="block h-full">
                  <SpotlightCard className="group relative w-full h-full transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">`
);

// Now we need to replace the closing </Link> for these specific bento items.
// We can replace `</Link>\n                </FadeInItem>` with `</SpotlightCard>\n                  </Link>\n                </FadeInItem>`
content = content.replace(
  /                    <\/div>\n                  <\/Link>\n                <\/FadeInItem>/g,
  `                    </div>\n                  </SpotlightCard>\n                  </Link>\n                </FadeInItem>`
);

// We should also magnetize the Hero article!
content = content.replace(
  /<div className="group relative w-full rounded-\[2rem\] overflow-hidden bg-zinc-900\/30 border border-white\/5 hover:border-white\/20 transition-all duration-700 mb-40 flex flex-col lg:flex-row">/g,
  `<SpotlightCard className="group relative w-full transition-all duration-700 mb-40 flex flex-col lg:flex-row">`
);

content = content.replace(
  /<\/div>\n          <\/FadeIn>\n        \)}/g,
  `</SpotlightCard>\n          </FadeIn>\n        )}`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Homepage Enhanced');
