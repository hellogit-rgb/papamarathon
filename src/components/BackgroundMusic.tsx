import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setHasError(true);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
      <audio ref={audioRef} src="/assets/running-bgm.mp3" loop preload="metadata" />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        disabled={hasError}
        aria-label={hasError ? 'Background music unavailable' : isPlaying ? 'Pause background music' : 'Play background music'}
        title={hasError ? 'Add running-bgm.mp3 to public/assets' : isPlaying ? 'Pause music' : 'Play music'}
        className="group flex h-12 items-center gap-3 border border-copper/70 bg-ink/90 px-4 text-cream shadow-warm backdrop-blur-md transition-colors hover:border-copper hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="relative flex h-5 w-5 items-center justify-center text-copper">
          {isPlaying ? <Pause size={16} fill="currentColor" /> : hasError ? <VolumeX size={17} /> : <Play size={16} fill="currentColor" />}
          {isPlaying && <span className="absolute inset-0 animate-ping rounded-full border border-copper/50" />}
        </span>
        <span className="hidden font-heading text-[10px] uppercase tracking-[0.22em] text-bone/70 sm:block">
          {hasError ? 'Music unavailable' : isPlaying ? 'Playing' : 'Run with me'}
        </span>
        {!hasError && !isPlaying && <Volume2 size={14} className="text-bone/40" />}
      </button>
    </div>
  );
}