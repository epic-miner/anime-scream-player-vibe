
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';
import { cn } from '@/lib/utils';

export const SettingsMenu = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'speed' | 'quality' | 'subtitles'>('speed');
  
  const { 
    playbackSpeed, 
    handleSpeedChange, 
    qualities, 
    currentQuality, 
    setCurrentQuality,
    subtitles,
    currentSubtitle,
    setCurrentSubtitle
  } = useVideoPlayer();
  
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSettings}
        className="text-white/80 hover:text-primary transition-colors p-1"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>
      
      {showSettings && (
        <div className="absolute bottom-full right-0 mb-2 w-52 bg-black/80 backdrop-blur-sm rounded-md overflow-hidden shadow-lg z-20">
          <div className="flex border-b border-white/10">
            <button 
              className={cn(
                "flex-1 p-2 text-xs font-medium",
                activeTab === 'speed' ? "text-primary" : "text-white/80"
              )}
              onClick={() => setActiveTab('speed')}
            >
              Speed
            </button>
            <button 
              className={cn(
                "flex-1 p-2 text-xs font-medium",
                activeTab === 'quality' ? "text-primary" : "text-white/80"
              )}
              onClick={() => setActiveTab('quality')}
            >
              Quality
            </button>
            <button 
              className={cn(
                "flex-1 p-2 text-xs font-medium",
                activeTab === 'subtitles' ? "text-primary" : "text-white/80"
              )}
              onClick={() => setActiveTab('subtitles')}
            >
              Subtitles
            </button>
          </div>
          
          {activeTab === 'speed' && (
            <div className="p-2">
              {speedOptions.map(speed => (
                <button
                  key={speed}
                  className={cn(
                    "block w-full text-left px-3 py-1.5 text-xs rounded-sm",
                    playbackSpeed === speed ? "bg-primary/20 text-primary" : "text-white/80 hover:bg-white/10"
                  )}
                  onClick={() => handleSpeedChange(speed)}
                >
                  {speed === 1 ? "Normal" : `${speed}x`}
                </button>
              ))}
            </div>
          )}
          
          {activeTab === 'quality' && (
            <div className="p-2">
              {qualities.map(quality => (
                <button
                  key={quality}
                  className={cn(
                    "block w-full text-left px-3 py-1.5 text-xs rounded-sm",
                    currentQuality === quality ? "bg-primary/20 text-primary" : "text-white/80 hover:bg-white/10"
                  )}
                  onClick={() => setCurrentQuality(quality)}
                >
                  {quality}
                </button>
              ))}
            </div>
          )}
          
          {activeTab === 'subtitles' && (
            <div className="p-2">
              <button
                className={cn(
                  "block w-full text-left px-3 py-1.5 text-xs rounded-sm",
                  currentSubtitle === null ? "bg-primary/20 text-primary" : "text-white/80 hover:bg-white/10"
                )}
                onClick={() => setCurrentSubtitle(null)}
              >
                Off
              </button>
              {subtitles.map(sub => (
                <button
                  key={sub.srclang}
                  className={cn(
                    "block w-full text-left px-3 py-1.5 text-xs rounded-sm",
                    currentSubtitle === sub.srclang ? "bg-primary/20 text-primary" : "text-white/80 hover:bg-white/10"
                  )}
                  onClick={() => setCurrentSubtitle(sub.srclang)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
