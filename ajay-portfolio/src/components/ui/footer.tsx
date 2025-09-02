"use client"

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { usePageTransition } from "@/components/ui/page-transition-provider";

export function Footer() {
  const { startTransition, isTransitioning } = usePageTransition();

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <footer 
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t" 
      style={{ 
        background: 'var(--bg-secondary)',
        borderColor: 'var(--accent-primary)',
        opacity: isTransitioning ? 0.7 : 1,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Social Links */}
        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4 mb-8">
          <a 
            href="mailto:as24sand@uwaterloo.ca"
            className={`flex items-center gap-3 px-6 py-3 transition-all duration-300 text-base pixel-text glass rounded-md ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-white)',
              borderColor: 'var(--accent-primary)'
            }}
          >
            <Mail size={18} style={{ color: 'var(--accent-primary)' }} />
            <span>EMAIL</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/ajayveer-sandhu-7897a72a7/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-6 py-3 transition-all duration-300 text-base pixel-text glass rounded-md ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-white)',
              borderColor: 'var(--accent-secondary)'
            }}
          >
            <Linkedin size={18} style={{ color: 'var(--accent-secondary)' }} />
            <span>LINKEDIN</span>
          </a>
          <a 
            href="https://github.com/ajvsandhu"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-6 py-3 transition-all duration-300 text-base pixel-text glass rounded-md ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-white)',
              borderColor: 'var(--pixel-light-gray)'
            }}
          >
            <Github size={18} style={{ color: 'var(--pixel-light-gray)' }} />
            <span>GITHUB</span>
          </a>
          <a 
            href="https://drive.google.com/file/d/171iChNPT4nQj-EzAZ93xEevR4-KqRwfj/view"
            target="_blank"
            className={`flex items-center gap-3 px-6 py-3 transition-all duration-300 text-base pixel-text glass rounded-md ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--accent-warning)',
              borderColor: 'var(--accent-warning)'
            }}
          >
            <ExternalLink size={18} style={{ color: 'var(--accent-warning)' }} />
            <span>RESUME</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-8">
          <Link 
            href="/" 
            onClick={(e) => handleNavClick('/', e)} 
            className={`text-base pixel-text select-none transition-all duration-300 hover:scale-105 ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-light-gray)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.8)'
            }}
          >
            HOME
          </Link>
          <Link 
            href="/about" 
            onClick={(e) => handleNavClick('/about', e)} 
            className={`text-base pixel-text select-none transition-all duration-300 hover:scale-105 ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-light-gray)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.8)'
            }}
          >
            ABOUT
          </Link>
          <Link 
            href="/contact" 
            onClick={(e) => handleNavClick('/contact', e)} 
            className={`text-base pixel-text select-none transition-all duration-300 hover:scale-105 ${
              isTransitioning ? 'pointer-events-none opacity-50' : ''
            }`}
            style={{ 
              color: 'var(--pixel-light-gray)',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.8)'
            }}
          >
            CONTACT
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="text-center pt-6 border-t" style={{ borderColor: 'var(--accent-primary)' }}>
          <div className="text-2xl font-bold pixel-text tracking-wider" style={{ 
            color: 'var(--accent-primary)',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.15em',
            fontSize: '1.75rem'
          }}>
            AJAYVEER SANDHU
          </div>
        </div>
      </div>
    </footer>
  );
} 