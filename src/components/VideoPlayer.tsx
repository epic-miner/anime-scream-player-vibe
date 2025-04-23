
import React, { useEffect, useRef } from 'react';
import { VideoPlayerProvider, useVideoPlayer } from '@/context/VideoPlayerContext';
import { VideoControls } from './VideoPlayer/Controls/VideoControls';
import { cn } from '@/lib/utils';

const VideoPlayerContent = () => {
  const {
    videoRef,
    containerRef,
    handleTimeUpdate,
    setDuration,
    setShowControls,
    showControls,
    currentSubtitle,
    subtitles,
  } = useVideoPlayer();
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const lastTapRef = useRef<{ time: number; x: number }>({ time: 0, x: 0 });

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const x = e.clientX;
    const tapGap = currentTime - lastTapRef.current.time;
    const xDiff = Math.abs(x - lastTapRef.current.x);

    if (tapGap < 300 && xDiff < 30) { // Double tap detected
      if (videoRef.current) {
        const skipAmount = x < window.innerWidth / 2 ? -10 : 10;
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + skipAmount, videoRef.current.duration));
      }
    }

    lastTapRef.current = { time: currentTime, x };
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      onClick={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handleVideoTap}
        src="https://huggingface.co/Aman6u5/fgfdggrtettrtetfdgdfg/resolve/main/anime/One_Punch_Man_Season_1/Episode_1/720p.mp4?download=true"
        poster="/your-video-poster.jpg"
        playsInline
      >
        {/* Add subtitle tracks */}
        {subtitles.map(subtitle => (
          <track 
            key={subtitle.srclang}
            kind="subtitles"
            src={subtitle.src}
            srcLang={subtitle.srclang}
            label={subtitle.label}
            default={currentSubtitle === subtitle.srclang}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      <VideoControls />
    </div>
  );
};

const VideoPlayer = () => {
  return (
    <VideoPlayerProvider>
      <VideoPlayerContent />
    </VideoPlayerProvider>
  );
};

export default VideoPlayer;
