"use client";

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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
    <section id="video-showcase" className="mb-24 md:mb-36">
      <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/80 via-black to-black shadow-2xl shadow-cyan-950/20 group">
        
        {/* Glow ambient effects */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Overlay */}
        <div className="p-6 sm:p-10 md:p-12 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Teaser Officiel • HELIA TECH</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              L'Expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">En Mouvement</span>
            </h3>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-md">
            Découvrez comment HELIA TECH redéfinit la transmission du savoir sur l'intelligence artificielle et l'automatisation.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video max-h-[640px] overflow-hidden bg-black/90 mx-auto">
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

          {/* Video Controls Overlay */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 z-30">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all active:scale-95 cursor-pointer shadow-lg hover:border-cyan-400"
              title={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all active:scale-95 cursor-pointer shadow-lg hover:border-cyan-400"
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Bottom subtle gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
