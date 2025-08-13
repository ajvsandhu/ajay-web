"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, FastForward } from "lucide-react";

interface Song {
  src: string;
  title: string;
  artist: string;
}

interface VinylPlayerProps {
  songs: Song[];
  className?: string;
}

export function VinylPlayer({ 
  songs = [], 
  className = "" 
}: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default to 30% volume
  const [isTransitioning, setIsTransitioning] = useState(false); // For smooth song transitions
  const [isSkipping, setIsSkipping] = useState(false); // Prevent double-clicks
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song>(() => {
    return songs.length > 0 ? songs[0] : { src: "", title: "No Songs", artist: "Available" };
  });
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);
  
  const skipToNext = useCallback((userTriggered = false) => {
    if (songs.length === 0 || isSkipping) return; // Prevent double-clicks
    
    setIsSkipping(true); // Block further clicks
    
    // Always reset isSkipping after a short delay to prevent stuck state
    const resetSkipping = () => {
      setIsSkipping(false);
      setIsTransitioning(false);
    };
    
    // Calculate next song index directly
    const nextIndex = (currentSongIndex + 1) % songs.length;
    const newSong = songs[nextIndex];
    
    if (newSong && audioRef.current) {
      const wasPlaying = isPlaying;
      setIsTransitioning(true); // Keep vinyl spinning during transition
      setIsLoaded(false);
      
      // Update state first
      setCurrentSongIndex(nextIndex);
      setCurrentSong(newSong);
      
      audioRef.current.pause(); // Ensure current audio is stopped
      audioRef.current.src = newSong.src;
      audioRef.current.load();
      
      // On mobile, only auto-play if it's user-triggered (button click)
      // Otherwise, just load the song and let user manually play
      const shouldAutoPlay = wasPlaying && (!isMobile || userTriggered);
      
      if (shouldAutoPlay) {
        // Wait for the audio to be ready before playing
        const playWhenReady = (attempts = 0) => {
          if (attempts > 20) { // Max 2 seconds of attempts
            resetSkipping();
            return;
          }
          
          if (audioRef.current && audioRef.current.readyState >= 2) {
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                resetSkipping();
              })
              .catch((error) => {
                console.error("Mobile autoplay blocked:", error);
                // If autoplay fails, just stop and let user manually play
                setIsPlaying(false);
                resetSkipping();
              });
          } else {
            // If not ready, wait a bit and try again
            setTimeout(() => playWhenReady(attempts + 1), 100);
          }
        };
        playWhenReady();
      } else {
        // Don't auto-play, just load and stop
        setIsPlaying(false);
        resetSkipping();
      }
    } else {
      resetSkipping(); // Re-enable button if something went wrong
    }
  }, [songs, currentSongIndex, isSkipping, isPlaying, isMobile]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Mobile touch handlers for better UX
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent page scrolling while adjusting volume
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent page scrolling while adjusting volume
    e.preventDefault();
  };
  
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If no song is loaded yet, start with first song
      if (!currentSong.src || currentSong.src === "") {
        const songToPlay = songs[currentSongIndex];
        if (songToPlay && audioRef.current) {
          audioRef.current.src = songToPlay.src;
          audioRef.current.load();
          
          // Wait for audio to be ready before playing
          const playWhenReady = () => {
            if (audioRef.current && audioRef.current.readyState >= 2) {
              audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error);
            } else {
              setTimeout(playWhenReady, 100);
            }
          };
          playWhenReady();
          return;
        }
      }
      
      // Just play whatever song is currently loaded
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const handleAudioLoad = () => {
    setIsLoaded(true);
  };

  const handleAudioError = () => {
    console.error('Audio loading error');
    setIsPlaying(false);
    setIsLoaded(false);
  };

  // Failsafe to ensure loading state doesn't get stuck
  useEffect(() => {
    if (songs.length > 0 && audioRef.current && !isLoaded) {
      const timeout = setTimeout(() => {
        if (audioRef.current && audioRef.current.readyState >= 2) {
          setIsLoaded(true);
        }
      }, 2000); // If not loaded after 2 seconds, check if it's actually ready
      
      return () => clearTimeout(timeout);
    }
  }, [songs.length, isLoaded]);

  // Initialize first song when component mounts
  useEffect(() => {
    if (songs.length > 0 && audioRef.current && currentSong.src) {
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
    }
  }, [songs, currentSong.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume; // Set initial volume
      
      const handleAudioEnd = () => {
        setIsPlaying(false);
        // Auto-play next song when current ends
        if (songs.length > 1) {
          // Calculate next song index directly
          const nextIndex = (currentSongIndex + 1) % songs.length;
          const newSong = songs[nextIndex];
          
          if (newSong && audioRef.current) {
            setCurrentSongIndex(nextIndex);
            setCurrentSong(newSong);
            setIsLoaded(false);
            
            audioRef.current.src = newSong.src;
            audioRef.current.load();
            
            // On mobile, don't auto-play when song ends naturally
            if (!isMobile) {
              const playWhenReady = () => {
                if (audioRef.current && audioRef.current.readyState >= 2) {
                  audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(console.error);
                } else {
                  setTimeout(playWhenReady, 100);
                }
              };
              playWhenReady();
            }
          }
        }
      };
      
      audio.addEventListener('loadeddata', handleAudioLoad);
      audio.addEventListener('ended', handleAudioEnd);
      audio.addEventListener('error', handleAudioError);
      
      return () => {
        audio.removeEventListener('loadeddata', handleAudioLoad);
        audio.removeEventListener('ended', handleAudioEnd);
        audio.removeEventListener('error', handleAudioError);
      };
    }
  }, [volume, songs, currentSongIndex, isMobile]);

  const isHorizontal = className?.includes('horizontal-layout');

  return (
    <div className={`${isHorizontal ? 'flex items-center gap-4' : 'flex flex-col items-center space-y-4'} ${className}`}>
      {/* Vinyl Record */}
      <div className="relative flex-shrink-0">
        {/* Turntable Base */}
        <div className={`${isHorizontal ? 'w-20 h-20' : 'w-48 h-48'} rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl flex items-center justify-center border-2 border-gray-600`}>
          {/* Vinyl Record */}
          <motion.div
            className={`relative ${isHorizontal ? 'w-16 h-16' : 'w-40 h-40'} rounded-full`}
            animate={{ rotate: (isPlaying || isTransitioning) ? 360 : 0 }}
            transition={{
              duration: 2,
              repeat: (isPlaying || isTransitioning) ? Infinity : 0,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{
              transformOrigin: "center center"
            }}
          >
            {/* Vinyl Record Body */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black via-gray-900 to-black shadow-inner border border-gray-700">
              {/* Grooves - 8-bit style */}
              {[...Array(isHorizontal ? 4 : 6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-gray-600/40"
                  style={{
                    top: `${15 + i * (isHorizontal ? 12 : 8)}%`,
                    left: `${15 + i * (isHorizontal ? 12 : 8)}%`,
                    right: `${15 + i * (isHorizontal ? 12 : 8)}%`,
                    bottom: `${15 + i * (isHorizontal ? 12 : 8)}%`,
                  }}
                />
              ))}
              
              {/* Center Label - 8-bit colors */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHorizontal ? 'w-5 h-5' : 'w-12 h-12'} rounded-full flex items-center justify-center border-2`} 
                   style={{ background: 'var(--pixel-purple)', borderColor: 'var(--accent-primary)' }}>
                <div className={`${isHorizontal ? 'w-0.5 h-0.5' : 'w-1 h-1'} rounded-full bg-black`}></div>
              </div>
            </div>
          </motion.div>
          
          {/* Tonearm - simplified 8-bit style */}
          <motion.div
            className={`absolute ${isHorizontal ? 'top-1 right-1 w-8 h-0.5' : 'top-4 right-4 w-20 h-1'} bg-gray-500 rounded-full origin-right shadow-md`}
            animate={{ rotate: isPlaying ? -20 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "90% 50%" }}
          >
            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${isHorizontal ? 'w-1 h-1' : 'w-2 h-2'} bg-gray-300 rounded-full shadow-sm`}></div>
            <div className={`absolute ${isHorizontal ? 'right-0.5 w-0.5 h-0.5' : 'right-0.5 w-0.5 h-0.5'} top-1/2 transform -translate-y-1/2 rounded-full`} style={{ background: 'var(--accent-error)' }}></div>
          </motion.div>
        </div>
      </div>

      {/* Track Info - compact 8-bit style */}
      <div className={`${isHorizontal ? 'text-left flex-1' : 'text-center'} space-y-1`}>
        <h3 className="text-xs font-bold pixel-text" style={{ color: 'var(--pixel-white)' }}>
          {currentSong.title}
        </h3>
        <p className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
          {currentSong.artist}
        </p>
        <p className="text-xs pixel-text" style={{ color: 'var(--accent-primary)' }}>
          {currentSongIndex + 1} / {songs.length}
        </p>
        
        {/* Play/Pause and Next Buttons - Between vinyl and volume */}
        <div className={`flex items-center ${isHorizontal ? 'justify-start' : 'justify-center'} gap-3 mt-4 mb-4`}>
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 shadow-lg"
            style={{ 
              borderColor: isPlaying ? 'var(--accent-success)' : 'var(--accent-primary)',
              background: isPlaying 
                ? 'linear-gradient(145deg, var(--accent-success), #5bb85b)' 
                : 'linear-gradient(145deg, var(--accent-primary), #5c9cdb)',
              boxShadow: isPlaying 
                ? '0 4px 12px rgba(107, 207, 127, 0.3)' 
                : '0 4px 12px rgba(116, 192, 252, 0.3)'
            }}
          >
            {isPlaying ? (
              <Pause size={18} style={{ color: 'var(--pixel-white)' }} />
            ) : (
              <Play size={18} style={{ color: 'var(--pixel-white)' }} className="ml-0.5" />
            )}
          </button>
          
          {songs.length > 1 && (
            <button
              onClick={() => skipToNext(true)}
              disabled={isSkipping}
              className="p-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 shadow-lg"
              style={{ 
                borderColor: 'var(--accent-secondary)',
                background: isSkipping 
                  ? 'linear-gradient(145deg, var(--pixel-gray), #6b7280)' 
                  : 'linear-gradient(145deg, var(--accent-secondary), #7bc77f)',
                boxShadow: '0 4px 12px rgba(148, 211, 162, 0.3)',
                opacity: isSkipping ? 0.6 : 1,
                cursor: isSkipping ? 'not-allowed' : 'pointer'
              }}
              title={isSkipping ? "Loading next song..." : "Next Song"}
            >
              <FastForward size={18} style={{ color: 'var(--pixel-white)' }} />
            </button>
          )}
        </div>
        
        {/* Controls */}
        <div className="space-y-2">
          {/* Volume Control */}
          <div className={`hidden md:flex items-center ${isHorizontal ? 'justify-start' : 'justify-center'} gap-2`}>
            <Volume2 size={12} style={{ color: 'var(--pixel-gray)' }} />
            <div className="relative flex-1 max-w-24 md:max-w-16">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                className="mobile-volume-slider w-full h-6 md:h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer touch-pan-x"
                style={{
                  background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${volume * 100}%, #4a5568 ${volume * 100}%, #4a5568 100%)`
                }}
                aria-label="Volume control"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
            <span className="text-xs pixel-text min-w-8" style={{ color: 'var(--pixel-gray)' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Status */}
          <div className={`flex items-center ${isHorizontal ? 'justify-start' : 'justify-center'} gap-2`}>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full`} style={{ background: isPlaying ? 'var(--accent-success)' : isLoaded ? 'var(--accent-primary)' : 'var(--pixel-gray)' }}></div>
              <span className="text-xs pixel-text" style={{ color: isPlaying ? 'var(--accent-success)' : isLoaded ? 'var(--accent-primary)' : 'var(--pixel-gray)' }}>
                {isPlaying ? 'PLAYING' : isLoaded ? 'READY' : 'LOADING'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
        className="hidden"
      />

      {/* Custom Mobile-Friendly Slider Styles */}
      <style jsx>{`
        .mobile-volume-slider {
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          border-radius: 6px;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }
        
        .mobile-volume-slider:hover,
        .mobile-volume-slider:focus {
          opacity: 1;
        }
        
        .mobile-volume-slider:focus {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }
        
        /* Webkit browsers (Chrome, Safari, Edge) */
        .mobile-volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: var(--accent-primary);
          cursor: pointer;
          border: 2px solid var(--pixel-white);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: all 0.15s ease;
        }
        
        .mobile-volume-slider::-webkit-slider-thumb:hover {
          background: var(--accent-secondary);
          transform: scale(1.1);
        }
        
        .mobile-volume-slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        
        /* Firefox */
        .mobile-volume-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: var(--accent-primary);
          cursor: pointer;
          border: 2px solid var(--pixel-white);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: all 0.15s ease;
        }
        
        .mobile-volume-slider::-moz-range-thumb:hover {
          background: var(--accent-secondary);
          transform: scale(1.1);
        }
        
        .mobile-volume-slider::-moz-range-thumb:active {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        
        /* Track styling */
        .mobile-volume-slider::-webkit-slider-track {
          height: 24px;
          border-radius: 6px;
          background: transparent;
        }
        
        .mobile-volume-slider::-moz-range-track {
          height: 24px;
          border-radius: 6px;
          background: transparent;
          border: none;
        }
        
        /* Mobile-specific enhancements */
        @media (max-width: 768px) {
          .mobile-volume-slider {
            min-height: 44px;
            padding: 10px 0;
          }
          
          .mobile-volume-slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
            border-radius: 6px;
          }
          
          .mobile-volume-slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 6px;
          }
          
          .mobile-volume-slider::-webkit-slider-track {
            height: 6px;
          }
          
          .mobile-volume-slider::-moz-range-track {
            height: 6px;
          }
        }
        
        /* Touch-specific improvements */
        @media (pointer: coarse) {
          .mobile-volume-slider {
            touch-action: pan-x;
            -webkit-tap-highlight-color: transparent;
          }
          
          .mobile-volume-slider::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
            -webkit-tap-highlight-color: transparent;
          }
          
          .mobile-volume-slider::-moz-range-thumb {
            width: 28px;
            height: 28px;
          }
        }
        
        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .mobile-volume-slider {
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          .mobile-volume-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </div>
  );
} 