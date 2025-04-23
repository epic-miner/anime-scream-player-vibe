
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface VideoPlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
  buffered: number;
  setBuffered: (buffered: number) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  qualities: string[];
  currentQuality: string;
  setCurrentQuality: (quality: string) => void;
  subtitles: { label: string; srclang: string; src: string }[];
  currentSubtitle: string | null;
  setCurrentSubtitle: (subtitle: string | null) => void;
  handlePlayPause: () => void;
  handleTimeUpdate: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMute: () => void;
  handleFullscreen: () => void;
  handleSpeedChange: (speed: number) => void;
  formatTime: (timeInSeconds: number) => string;
}

export const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

export const VideoPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [qualities] = useState(['1080p', '720p', '480p', '360p']);
  const [currentQuality, setCurrentQuality] = useState('720p');
  const [subtitles] = useState([
    { label: 'English', srclang: 'en', src: '/subtitles/en.vtt' },
    { label: 'Spanish', srclang: 'es', src: '/subtitles/es.vtt' }
  ]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / videoDuration) * 100);
      
      // Calculate buffered
      if (videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        setBuffered((bufferedEnd / videoDuration) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) * videoRef.current.duration) / 100;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
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
      if (isMuted) {
        if (volume === 0) {
          const newVolume = 0.5;
          videoRef.current.volume = newVolume;
          setVolume(newVolume);
        } else {
          videoRef.current.volume = volume;
        }
      }
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime += 10;
          }
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime -= 10;
          }
          break;
        case 'f':
        case 'F':
          handleFullscreen();
          break;
        case 'm':
        case 'M':
          handleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted]);

  const value = {
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    progress,
    setProgress,
    isFullscreen,
    setIsFullscreen,
    buffered,
    setBuffered,
    videoRef,
    containerRef,
    playbackSpeed,
    setPlaybackSpeed,
    showControls,
    setShowControls,
    qualities,
    currentQuality,
    setCurrentQuality,
    subtitles,
    currentSubtitle,
    setCurrentSubtitle,
    handlePlayPause,
    handleTimeUpdate,
    handleSeek,
    handleVolumeChange,
    handleMute,
    handleFullscreen,
    handleSpeedChange,
    formatTime
  };

  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};
