"use client";

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { translations, Locale } from '@/lib/translations';

interface CompactVideoTeaserProps {
  locale?: Locale;
}

export default function CompactVideoTeaser({ locale = 'fr' }: CompactVideoTeaserProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const t = translations[locale].home;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles size={13} />
          <span>{t.teaserTitle}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
          HELIA TECH
        </span>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/5 group">
        <video
          ref={videoRef}
          src="/videos/teaser.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Controls overlay */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="translate-x-0.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
            title={isMuted ? "Audio on" : "Audio off"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>
      </div>
      
      <p className="text-[11px] text-zinc-400 font-light mt-2.5 leading-relaxed">
        {t.teaserSubtitle}
      </p>
    </div>
  );
}
