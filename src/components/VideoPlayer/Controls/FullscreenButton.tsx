
import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';

export const FullscreenButton = () => {
  const { isFullscreen, handleFullscreen } = useVideoPlayer();

  return (
    <button
      onClick={handleFullscreen}
      className="text-white/80 hover:text-primary transition-colors p-1"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2 className="w-5 h-5" />
      ) : (
        <Maximize2 className="w-5 h-5" />
      )}
    </button>
  );
};
