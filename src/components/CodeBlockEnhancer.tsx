"use client";

import React, { useEffect, useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

export default function CodeBlockEnhancer() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Select all code blocks in article
    const preElements = document.querySelectorAll<HTMLPreElement>('.elite-article pre');

    preElements.forEach((pre, index) => {
      // Check if wrapper already added
      if (pre.parentElement?.classList.contains('code-terminal-wrapper')) return;

      const codeElement = pre.querySelector('code');
      const rawCode = codeElement ? codeElement.innerText : pre.innerText;

      // Extract language class if present (e.g., language-python, language-xml)
      let lang = 'code';
      if (codeElement) {
        const classList = Array.from(codeElement.classList);
        const langClass = classList.find(c => c.startsWith('language-'));
        if (langClass) {
          lang = langClass.replace('language-', '');
        } else if (rawCode.trim().startsWith('graph LR') || rawCode.trim().startsWith('graph TD') || rawCode.trim().startsWith('sequenceDiagram')) {
          lang = 'architecture';
        }
      }

      // Create terminal wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-terminal-wrapper my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#080c14] shadow-2xl shadow-cyan-950/20';

      // Create terminal header bar
      const header = document.createElement('div');
      header.className = 'flex items-center justify-between px-4 py-3 bg-[#0d1322] border-b border-white/10 text-xs font-mono select-none';

      // Left side: Mac window buttons + language pill
      const leftGroup = document.createElement('div');
      leftGroup.className = 'flex items-center gap-3';
      leftGroup.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block opacity-80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block opacity-80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block opacity-80"></span>
        </div>
        <span class="text-zinc-400 font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5">${lang}</span>
      `;

      // Right side: Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-zinc-400 hover:text-cyan-300 hover:bg-white/5 transition-all text-[11px] font-sans';
      copyBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>Copier</span>
      `;

      copyBtn.addEventListener('click', async () => {
        let success = false;
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(rawCode);
            success = true;
          } catch (err) {
            console.warn('Clipboard API failed, using fallback:', err);
          }
        }
        
        if (!success) {
          try {
            const textArea = document.createElement('textarea');
            textArea.value = rawCode;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            success = true;
          } catch (err) {
            console.error('Fallback copy failed:', err);
          }
        }

        if (success) {
          copyBtn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span class="text-cyan-400 font-bold">Copié !</span>
          `;
          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>Copier</span>
            `;
          }, 2000);
        }
      });

      header.appendChild(leftGroup);
      header.appendChild(copyBtn);

      // Insert wrapper into DOM
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      // Clean pre styling inside wrapper
      pre.style.margin = '0';
      pre.style.border = 'none';
      pre.style.borderRadius = '0';
      pre.style.backgroundColor = 'transparent';
      pre.style.boxShadow = 'none';
    });
  }, []);

  return null;
}
