"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { translations, Locale } from '@/lib/translations';

interface AudioPlayerProps {
  content?: string;
  title?: string;
  locale?: Locale;
}

export default function AudioPlayer({ content = "", title = "", locale = 'fr' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const t = translations[locale].articleDetail;
  
  // Ref pour l'intervalle de progression
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      synthRef.current = window.speechSynthesis;
      window.speechSynthesis.cancel();
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const initSpeech = () => {
    if (!synthRef.current) return;
    
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    setTimeout(() => {
      const cleanContent = content.replace(/<[^>]+>/g, ' ').slice(0, 1500); 
      const endPhrase = locale === 'en' ? 'Read the full investigation below.' : "Lisez la suite sur l'article.";
      const textToRead = `${title}. ${cleanContent}... ${endPhrase}`;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = locale === 'en' ? 'en-US' : 'fr-FR';
      utterance.rate = 1.0; 
      utterance.pitch = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const matchedVoices = voices.filter(v => v.lang.startsWith(locale));
      if (matchedVoices.length > 0) {
        utterance.voice = matchedVoices.find(v => v.name.includes('Premium') || v.name.includes('Natural') || v.name.includes('Google')) || matchedVoices[0];
      }
      
      const wordCount = textToRead.split(' ').length;
      const estimatedSeconds = Math.max((wordCount / 130) * 60, 10);
      
      let startTime = Date.now();

      utterance.onstart = () => {
        setIsPlaying(true);
        startTime = Date.now();
        
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            clearInterval(progressIntervalRef.current!);
            return;
          }
          if (window.speechSynthesis.paused) return;
          
          const elapsed = (Date.now() - startTime) / 1000;
          const currentProgress = Math.min((elapsed / estimatedSeconds) * 100, 100);
          setProgress(currentProgress);
        }, 500);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(0);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      };
      
      utterance.onerror = (e) => {
        console.warn("Speech error handled:", e);
        setIsPlaying(false);
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      };
      
      (window as any).currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const togglePlay = () => {
    if (!synthRef.current) return;
    
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        initSpeech();
      }
    }
  };

  return (
    <div className="w-full bg-[#121826]/80 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-5 sm:gap-6">
        <button 
          type="button"
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-cyan-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
        </button>
        
        <div className="flex-grow min-w-0 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-2.5">
            <span className="text-sm sm:text-base font-semibold text-slate-200">
              {t.readSummary} {isSupported ? '' : t.audioNotSupported}
            </span>
          </div>
          
          <div className="relative h-1.5 sm:h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
