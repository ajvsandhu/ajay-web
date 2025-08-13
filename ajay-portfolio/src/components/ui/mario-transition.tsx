"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface MarioTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function MarioTransition({ isVisible, onComplete }: MarioTransitionProps) {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'jumping' | 'hitting' | 'complete'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device for performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setAnimationPhase('idle');
      return;
    }

    const sequence = async () => {
      // Reset to idle first
      setAnimationPhase('idle');
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Start jumping phase
      setAnimationPhase('jumping');
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Hit the block
      setAnimationPhase('hitting');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Complete the animation
      setAnimationPhase('complete');
      
      // Call onComplete after the smooth completion animation starts
      setTimeout(() => {
        onComplete?.();
      }, 600);
    };

    sequence();
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="mario-transition"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animationPhase === 'complete' ? [1, 1, 1, 0] : 1,
          scale: animationPhase === 'complete' ? [1, 1, 1.02, 1.05] : 1,
          // Remove expensive blur filters on mobile
          filter: !isMobile && animationPhase === 'complete' ? [
            "blur(0px)", 
            "blur(0px)", 
            "blur(1px)", 
            "blur(3px)"
          ] : "blur(0px)"
        }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          filter: isMobile ? "blur(0px)" : "blur(4px)",
          y: -50
        }}
        transition={{
          duration: animationPhase === 'complete' ? 0.8 : 0.3,
          times: animationPhase === 'complete' ? [0, 0.3, 0.6, 1] : undefined,
          ease: animationPhase === 'complete' ? "easeInOut" : "easeOut"
        }}
        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          width: '100vw',
          height: '100vh',
          // Mobile performance optimizations
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Background effects */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            opacity: animationPhase === 'complete' ? [1, 1, 0.5, 0] : 1
          }}
          transition={{
            duration: animationPhase === 'complete' ? 0.8 : 0,
            times: animationPhase === 'complete' ? [0, 0.2, 0.5, 1] : undefined
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent animate-pulse" />
          {/* Scanlines - simplified for mobile */}
          {!isMobile && (
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(transparent 0%, rgba(0, 255, 255, 0.03) 50%, transparent 51%, rgba(0, 255, 255, 0.03) 100%)',
                backgroundSize: '100% 4px',
                animation: 'scanlines 2s linear infinite'
              }}
            />
          )}
          
          {/* Smooth reveal effect */}
          {animationPhase === 'complete' && (
            <motion.div
              className="absolute inset-0"
              initial={{ 
                background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 60%)"
              }}
              animate={{ 
                background: "radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0) 100%)"
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </motion.div>
        
        {/* Mario Block - Positioned higher */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{
              width: '10vh',
              height: '10vh',
              marginTop: '-14vh' // Positioned higher on screen
            }}
            animate={{
              y: animationPhase === 'hitting' ? [0, -6, 0] : 0,
              scale: animationPhase === 'hitting' ? [1, 1.1, 1] : 1,
              rotate: animationPhase === 'hitting' ? [0, 2, -2, 0] : 0
            }}
            transition={{ 
              duration: animationPhase === 'hitting' ? 0.4 : 0,
              ease: "easeOut",
              times: animationPhase === 'hitting' ? [0, 0.5, 1] : undefined
            }}
          >
            <Image
              src="/mario-block.png"
              alt="Mario Block"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
                filter: isMobile ? 'none' : 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                willChange: 'transform'
              }}
            />
          </motion.div>
        </div>

        {/* Mario - Positioned to hit block from below */}
        <div className="absolute inset-0 flex items-end justify-center">
          <motion.div
            className="relative"
            style={{
              width: '10vh',
              height: '10vh',
              marginBottom: '15vh' // Starting position closer to center
            }}
            animate={{
              y: animationPhase === 'jumping' ? [0, '-24vh'] : 
                 animationPhase === 'hitting' ? ['-28vh', '-30vh', '-28vh'] : 0
            }}
            transition={{
              duration: animationPhase === 'jumping' ? 0.9 : 0.4,
              ease: animationPhase === 'jumping' ? [0.25, 0.46, 0.45, 0.94] : "easeOut",
              times: animationPhase === 'hitting' ? [0, 0.5, 1] : undefined
            }}
          >
            <Image
              src="/mario-transparent-8-bit-6.png"
              alt="Mario"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
                filter: isMobile ? 'none' : 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                willChange: 'transform'
              }}
            />
          </motion.div>
        </div>

        {/* Coins - Spawning from block center */}
        <AnimatePresence>
          {animationPhase === 'hitting' && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`coin-${i}`}
                  className="absolute"
                  style={{
                    width: '2.5vh',
                    height: '2.5vh',
                    marginTop: '-14vh' // Centered with the block
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: 0
                  }}
                  animate={{
                    x: `${(i - 1.5) * 4 + (Math.random() - 0.5) * 3}vw`,
                    y: ['0vh', '-8vh', '15vh'],
                    scale: [1, 1.3, 0.8],
                    opacity: [1, 1, 0],
                    rotate: [0, 360, 720]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <Image
                    src="/mario-coin-png-9.png"
                    alt="Mario Coin"
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                    style={{
                      imageRendering: 'pixelated',
                      filter: isMobile ? 'none' : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5))',
                      willChange: 'transform'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Score popup */}
        <AnimatePresence>
          {animationPhase === 'hitting' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute pixel-text pointer-events-none"
                style={{
                  color: 'var(--pixel-yellow)',
                  fontSize: '2.5vh',
                  textShadow: '0.2vh 0.2vh 0 var(--pixel-black)',
                  marginTop: '-18vh',
                  transform: 'translateX(4rem)'
                }}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: '-6vh', scale: 1 }}
                exit={{ opacity: 0, y: '-12vh' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                +100
              </motion.div>
            </div>
          )}
        </AnimatePresence>



        {/* Loading/Complete text */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 pixel-text text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationPhase === 'complete' ? [1, 1, 1, 0] : 1, 
            y: animationPhase === 'complete' ? [0, 0, -10, -30] : 0,
            scale: animationPhase === 'complete' ? [1, 1.2, 1.1, 0.8] : 1
          }}
          transition={{ 
            delay: 0.2, 
            duration: animationPhase === 'complete' ? 0.8 : 0.5,
            times: animationPhase === 'complete' ? [0, 0.2, 0.5, 1] : undefined,
            ease: "easeInOut"
          }}
          style={{
            color: animationPhase === 'complete' ? 'var(--pixel-green)' : 'var(--pixel-white)',
            fontSize: 'clamp(0.6rem, 1.5vw, 1rem)',
            textShadow: '2px 2px 0 var(--pixel-black)',
            letterSpacing: '2px'
          }}
        >
          {animationPhase === 'complete' ? 'COMPLETE!' : 'LOADING...'}
        </motion.div>

        {/* Pixel border frame */}
        <div 
          className="absolute inset-4 sm:inset-8 border-2 pointer-events-none"
          style={{
            borderColor: 'var(--pixel-blue)',
            boxShadow: 'inset 0 0 0 1px var(--pixel-cyan)'
          }}
        />

        {/* Corner pixels for retro feel */}
        <div className="absolute top-6 left-6 w-2 h-2 bg-cyan-400" />
        <div className="absolute top-6 right-6 w-2 h-2 bg-cyan-400" />
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-cyan-400" />
        <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-400" />
      </motion.div>
    </AnimatePresence>
  );
} 