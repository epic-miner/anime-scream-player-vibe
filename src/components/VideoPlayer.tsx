import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipForward,
  SkipBack,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const lastTapRef = useRef<{ time: number; x: number }>({ time: 0, x: 0 });

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        videoRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) * videoRef.current.duration) / 100;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
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

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isMuted) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-anime-dark group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handleVideoTap}
        src="https://huggingface.co/Aman6u5/fgfdggrtettrtetfdgdfg/resolve/main/anime/One_Punch_Man_Season_1/Episode_1/720p.mp4?download=true"
        poster="/your-video-poster.jpg"
      >
        Your browser does not support the video tag.
      </video>

      {/* Center play/pause button */}
      <button
        onClick={handlePlayPause}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full",
          "bg-black/40 text-white/90 transition-all duration-300 backdrop-blur-sm",
          "hover:bg-black/60",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
      >
        <Play className="w-12 h-12" />
      </button>

      {/* Skip indicators */}
      <div className={cn(
        "absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-2 rounded-full backdrop-blur-sm",
        "transition-opacity duration-300",
        showControls ? "opacity-0" : "opacity-0"
      )}>
        <SkipBack className="w-8 h-8 text-white/90" />
      </div>
      <div className={cn(
        "absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-2 rounded-full backdrop-blur-sm",
        "transition-opacity duration-300",
        showControls ? "opacity-0" : "opacity-0"
      )}>
        <SkipForward className="w-8 h-8 text-white/90" />
      </div>

      {/* Controls overlay */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300 transform",
        showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <div className="flex flex-col gap-3">
          {/* Progress bar */}
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              value={progress}
              onChange={handleProgress}
              className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-primary hover:[&::-webkit-slider-thumb]:bg-primary-hover
                       [&::-webkit-slider-thumb]:transition-colors"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="text-white/80 hover:text-primary transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleMute}
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5
                           [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-white/80"
                />
              </div>
            </div>

            <button
              onClick={handleFullscreen}
              className="text-white/80 hover:text-primary transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-6 h-6" />
              ) : (
                <Maximize2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
