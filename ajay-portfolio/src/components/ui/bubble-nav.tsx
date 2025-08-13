"use client"

import { motion } from "framer-motion";
import { Home, User, Mail, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./page-transition-provider";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Resume", href: "https://drive.google.com/file/d/1NF73YzD2FLP2XM11HBOVdkbVu1iEzxiY/view", icon: FileText, external: true },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function BubbleNav() {
  const pathname = usePathname();
  const { startTransition, isTransitioning } = usePageTransition();

  const handleNavClick = (href: string, e: React.MouseEvent, isExternal?: boolean) => {
    if (isExternal) {
      // For external links, let the default behavior happen
      return;
    }
    e.preventDefault();
    startTransition(href);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-[100]"
    >
      <div 
        className="flex items-center justify-center flex-nowrap gap-2 px-4 py-3 rounded-full backdrop-blur-md whitespace-nowrap" 
        style={{ 
          background: 'rgba(10, 10, 15, 0.85)',
          border: '1px solid rgba(116, 192, 252, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          opacity: isTransitioning ? 0.5 : 1,
          pointerEvents: isTransitioning ? 'none' : 'auto',
          transition: 'all 0.2s ease',
          minWidth: '260px', // Ensure enough width for all 4 items
        }}
      >
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={(e) => handleNavClick(item.href, e, item.external)}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <motion.div
                className={`relative p-3 transition-all duration-300 cursor-pointer rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive 
                    ? "text-black" 
                    : "text-white/70 hover:text-white"
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
                style={{ 
                  opacity: isTransitioning ? 0.7 : 1,
                  minWidth: '48px',
                  minHeight: '48px',
                }}
                whileHover={!isTransitioning ? { 
                  scale: 1.1,
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'rgba(116, 192, 252, 0.15)'
                } : {}}
                whileTap={!isTransitioning ? { scale: 0.9 } : {}}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 1.0 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Clean active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      background: 'var(--accent-primary)',
                      boxShadow: '0 0 20px rgba(116, 192, 252, 0.4)'
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                  />
                )}
                
                <item.icon 
                  className="w-5 h-5 relative z-10" 
                  style={{ 
                    color: isActive ? 'var(--pixel-black)' : 'currentColor',
                    filter: isActive ? 'none' : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'
                  }}
                />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
} 