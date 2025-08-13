"use client"

import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>(() => []);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const particleCount = 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.2 + 0.05,
      });
    }

    setParticles(newParticles);

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          // Simple linear movement - real flow
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Smooth edge wrapping - particles flow across the entire screen
          if (newX > window.innerWidth + 20) {
            newX = -20;
          } else if (newX < -20) {
            newX = window.innerWidth + 20;
          }
          
          if (newY > window.innerHeight + 20) {
            newY = -20;
          } else if (newY < -20) {
            newY = window.innerHeight + 20;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="particles-bg">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
} 