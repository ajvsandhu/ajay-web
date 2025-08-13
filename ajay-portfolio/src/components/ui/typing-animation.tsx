"use client"

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function TypingAnimation({ words, className = "", style }: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(-100000);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        setTypeSpeed(150);
        
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        setTypeSpeed(100);
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed]);

  return (
    <span className={className} style={style}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
} 