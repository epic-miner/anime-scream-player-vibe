
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';
import { cn } from '@/lib/utils';

export const PlaybackControls = () => {
  const { isPlaying, handlePlayPause, videoRef } = useVideoPlayer();

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSkipBackward}
        className="text-white/80 hover:text-primary transition-colors p-1"
        aria-label="Skip 10 seconds backward"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      <button
        onClick={handlePlayPause}
        className={cn(
          "text-white/90 hover:text-primary transition-colors p-1",
          "bg-black/20 hover:bg-black/40 rounded-full"
        )}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={handleSkipForward}
        className="text-white/80 hover:text-primary transition-colors p-1"
        aria-label="Skip 10 seconds forward"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
};
