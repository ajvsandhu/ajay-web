"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const ScrollDownIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  // Same fade pattern as hero section
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('projects');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      style={{ opacity: indicatorOpacity }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] cursor-pointer"
      onClick={scrollToPortfolio}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          opacity: 1
        }}
        whileTap={{ 
          scale: 0.95 
        }}
        className="relative hover:drop-shadow-xl transition-all duration-300 p-4 -m-4"
      >
        <ChevronDown 
          className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg" 
          style={{ 
            color: 'var(--accent-primary)',
            filter: 'drop-shadow(0 0 12px rgba(116, 192, 252, 0.4))'
          }}
        />
      </motion.div>
    </motion.div>
  );
}; 