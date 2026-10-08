import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category?: string;
  image?: string;
  tldr?: string[];
  readingTime?: string;
}

export interface ArticleContent extends ArticleData {
  contentHtml: string;
}

function getArticlesDirectory(locale: string = 'fr') {
  const dirName = locale === 'en' ? 'articles-en' : 'articles';
  return path.join(process.cwd(), `src/content/${dirName}`);
}

export function getSortedArticlesData(locale: string = 'fr'): ArticleData[] {
  const directory = getArticlesDirectory(locale);
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(directory);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      const data = matterResult.data;
      const formattedDate = data.date instanceof Date 
        ? data.date.toISOString().split('T')[0] 
        : String(data.date || '2026-10-07');
      
      return {
        slug,
        ...data,
        date: formattedDate,
      } as ArticleData;
    });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

export async function getArticleData(slug: string, locale: string = 'fr'): Promise<ArticleContent> {
  const cleanSlug = slug.replace(/\.md$/, '');
  const directory = getArticlesDirectory(locale);
  const fullPath = path.join(directory, `${cleanSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);
  const data = matterResult.data;
  const formattedDate = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0] 
    : String(data.date || '2026-10-07');

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(matterResult.content);
    
  let contentHtml = processedContent.toString();

  // Apply server-side syntax highlighting to code blocks
  try {
    const hljs = (await import('highlight.js')).default;
    // Replace <pre><code class="language-xyz">...</code></pre> with highlighted tokens
    contentHtml = contentHtml.replace(/<pre><code(?:\s+class="language-([a-zA-Z0-9_-]+)")?>([\s\S]*?)<\/code><\/pre>/gi, (match, lang, codeContent) => {
      // Decode standard and hex/decimal HTML entities before highlighting
      const decodedCode = codeContent
        .replace(/&#x3C;/gi, '<')
        .replace(/&#x3E;/gi, '>')
        .replace(/&#60;/g, '<')
        .replace(/&#62;/g, '>')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&#x26;/gi, '&')
        .replace(/&#38;/g, '&')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/gi, "'");

      const validLanguage = lang && hljs.getLanguage(lang) ? lang : undefined;
      let highlighted = '';

      if (validLanguage) {
        try {
          highlighted = hljs.highlight(decodedCode, { language: validLanguage }).value;
        } catch {
          highlighted = hljs.highlightAuto(decodedCode).value;
        }
      } else {
        // Auto-detect or fallback
        try {
          highlighted = hljs.highlightAuto(decodedCode).value;
        } catch {
          highlighted = codeContent;
        }
      }

      const displayLang = lang || 'code';
      const encodedRawCode = Buffer.from(decodedCode).toString('base64');
      
      return `
<div class="code-terminal-wrapper my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#080c14] shadow-2xl shadow-cyan-950/20">
  <div class="flex items-center justify-between px-4 py-3 bg-[#0d1322] border-b border-white/10 text-xs font-mono select-none">
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block opacity-80"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block opacity-80"></span>
      </div>
      <span class="text-zinc-400 font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5">${displayLang}</span>
    </div>
    <button type="button" onclick="(function(btn){
      const raw = atob('${encodedRawCode}');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(raw).then(function(){
          btn.innerHTML = '<span class=\\'text-cyan-400 font-bold flex items-center gap-1\\'>✓ Copié !</span>';
          setTimeout(function(){ btn.innerHTML = '<span>Copier</span>'; }, 2000);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = raw;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        btn.innerHTML = '<span class=\\'text-cyan-400 font-bold flex items-center gap-1\\'>✓ Copié !</span>';
        setTimeout(function(){ btn.innerHTML = '<span>Copier</span>'; }, 2000);
      }
    })(this)" class="copy-code-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md text-zinc-400 hover:text-cyan-300 hover:bg-white/5 transition-all text-[11px] font-sans cursor-pointer">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      <span>Copier</span>
    </button>
  </div>
  <pre class="m-0 p-5 overflow-x-auto bg-[#070b12] text-sm"><code class="hljs language-${displayLang}">${highlighted}</code></pre>
</div>`;
    });
  } catch (err) {
    console.error('Highlight.js failed to process:', err);
  }

  // Wrap markdown tables in a responsive scroll container for mobile
  contentHtml = contentHtml.replace(/<table(?:\s+[^>]*)?>[\s\S]*?<\/table>/gi, (match) => {
    return `<div class="table-responsive-container">${match}</div>`;
  });

  return {
    slug,
    contentHtml,
    ...data,
    date: formattedDate,
  } as ArticleContent;
}
