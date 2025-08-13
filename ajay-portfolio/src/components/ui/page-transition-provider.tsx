"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MarioTransition } from "./mario-transition";

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
  isReady: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
}

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  


  // Initialize ready state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const startTransition = useCallback((href: string) => {
    // Don't navigate if already on the page
    if (pathname === href) {
      console.log('Already on this page:', href);
      return;
    }
    
    // Prevent multiple transitions or transitions when not ready
    if (isTransitioning || showTransition || !isReady) {
      console.log('Transition blocked:', { isTransitioning, showTransition, isReady });
      return;
    }
    
    console.log('Starting transition to:', href);
    setIsTransitioning(true);
    setShowTransition(true);
    
    // Navigate after Mario hits the block (around 1200ms)
    setTimeout(() => {
      console.log('Navigating to:', href);
      router.push(href);
    }, 1200);
  }, [isTransitioning, showTransition, isReady, pathname, router]);

  const handleTransitionComplete = useCallback(() => {
    console.log('Transition complete');
    setShowTransition(false);
    
    // Small delay before allowing new transitions to prevent rapid firing
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);



  // Prevent scroll and pointer events during transition
  useEffect(() => {
    if (showTransition) {
      // Disable scrolling and interactions
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
      document.body.style.userSelect = 'none';
      document.documentElement.style.overflow = 'hidden';
      
      // Add class to indicate transition is active
      document.body.classList.add('mario-transition-active');
      document.documentElement.classList.add('mario-transition-active');
    } else {
      // Re-enable interactions
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.style.userSelect = '';
      document.documentElement.style.overflow = '';
      
      // Remove transition class
      document.body.classList.remove('mario-transition-active');
      document.documentElement.classList.remove('mario-transition-active');
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.body.style.userSelect = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('mario-transition-active');
      document.documentElement.classList.remove('mario-transition-active');
    };
  }, [showTransition]);

  // Debug logging
  useEffect(() => {
    console.log('Transition state:', { 
      isTransitioning, 
      showTransition, 
      isReady, 
      pathname 
    });
  }, [isTransitioning, showTransition, isReady, pathname]);

  return (
    <PageTransitionContext.Provider value={{ 
      isTransitioning, 
      startTransition, 
      isReady 
    }}>
      {children}
      <MarioTransition 
        isVisible={showTransition} 
        onComplete={handleTransitionComplete}
      />
    </PageTransitionContext.Provider>
  );
} 