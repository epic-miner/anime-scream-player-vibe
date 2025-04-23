
import React from 'react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';

export const ProgressBar = () => {
  const {
    progress,
    buffered,
    handleSeek,
    currentTime,
    duration,
    formatTime
  } = useVideoPlayer();

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-white/80">{formatTime(currentTime)}</span>
      
      <div className="relative flex-1 h-1 group">
        {/* Buffered progress */}
        <div 
          className="absolute h-1 bg-white/30 rounded-full transition-all"
          style={{ width: `${buffered}%` }}
        ></div>
        
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer group-hover:h-2 transition-all z-10
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:invisible
                    group-hover:[&::-webkit-slider-thumb]:visible"
        />
        
        {/* Active progress */}
        <div 
          className="absolute h-1 bg-primary rounded-full group-hover:h-2 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <span className="text-xs text-white/80">{formatTime(duration)}</span>
    </div>
  );
};
