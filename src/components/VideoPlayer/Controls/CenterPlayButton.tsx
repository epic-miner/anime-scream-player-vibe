
import React from 'react';
import { Play } from 'lucide-react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';
import { cn } from '@/lib/utils';

export const CenterPlayButton = () => {
  const { isPlaying, handlePlayPause } = useVideoPlayer();

  return (
    <button
      onClick={handlePlayPause}
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-full",
        "bg-black/40 text-white/90 transition-all duration-300 backdrop-blur-sm",
        "hover:bg-black/60",
        isPlaying ? "opacity-0 scale-90 invisible" : "opacity-100 scale-100 visible"
      )}
      aria-label="Play video"
    >
      <Play className="w-12 h-12" />
    </button>
  );
};
