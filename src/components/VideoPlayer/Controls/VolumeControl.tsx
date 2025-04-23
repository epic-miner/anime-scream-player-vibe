
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';

export const VolumeControl = () => {
  const { volume, isMuted, handleVolumeChange, handleMute } = useVideoPlayer();
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);

  return (
    <div 
      className="flex items-center group relative"
      onMouseEnter={() => setIsVolumeControlVisible(true)}
      onMouseLeave={() => setIsVolumeControlVisible(false)}
    >
      <button
        onClick={handleMute}
        className="text-white/80 hover:text-primary transition-colors p-1"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
      
      <div 
        className={`absolute bottom-full left-0 p-2 bg-black/70 rounded-md transition-all ${
          isVolumeControlVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1.5 appearance-none cursor-pointer bg-white/20 rounded-lg
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5
                   [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-primary"
          aria-label="Volume control"
        />
      </div>
    </div>
  );
};
