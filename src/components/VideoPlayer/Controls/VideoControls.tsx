
import React from 'react';
import { useVideoPlayer } from '@/context/VideoPlayerContext';
import { ProgressBar } from './ProgressBar';
import { PlaybackControls } from './PlaybackControls';
import { VolumeControl } from './VolumeControl';
import { SettingsMenu } from './SettingsMenu';
import { FullscreenButton } from './FullscreenButton';
import { CenterPlayButton } from './CenterPlayButton';
import { cn } from '@/lib/utils';

export const VideoControls = () => {
  const { showControls } = useVideoPlayer();

  return (
    <>
      <CenterPlayButton />
      
      {/* Controls overlay */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300 transform",
        showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="flex flex-col gap-3">
          {/* Progress bar */}
          <ProgressBar />

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlaybackControls />
              <VolumeControl />
            </div>

            <div className="flex items-center gap-2">
              <SettingsMenu />
              <FullscreenButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
