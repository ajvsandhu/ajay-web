"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticleBackground } from "@/components/ui/particle-background";
import { BubbleNav } from "@/components/ui/bubble-nav";
import { Footer } from "@/components/ui/footer";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";


export default function Contact() {

  return (
    <>
      <ParticleBackground />
      <BubbleNav />
      
      <div className="min-h-screen relative z-10 bg-gradient-bg">
        {/* Hero Section */}
        <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                GET IN <span className="pixel-glow" style={{ color: 'var(--accent-primary)' }}>TOUCH</span>
              </h1>
              <p className="text-xs max-w-2xl mx-auto pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                LET&apos;S DISCUSS OPPORTUNITIES, COLLABORATIONS, OR JUST HAVE A CHAT ABOUT TECHNOLOGY
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-bg">
          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-sm pixel-text" style={{ color: 'var(--pixel-white)' }}>CONTACT INFORMATION</CardTitle>
                  <CardDescription className="text-xs pixel-text" style={{ color: 'var(--pixel-gray)' }}>
                    FEEL FREE TO REACH OUT THROUGH ANY OF THESE CHANNELS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass flex items-center justify-center">
                      <Mail style={{ color: 'var(--pixel-blue)' }} size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium pixel-text" style={{ color: 'var(--pixel-white)' }}>EMAIL</p>
                      <p className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>as24sand@uwaterloo.ca</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass flex items-center justify-center">
                      <MapPin style={{ color: 'var(--pixel-purple)' }} size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium pixel-text" style={{ color: 'var(--pixel-white)' }}>LOCATION</p>
                      <p className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>MISSISSAUGA, ONTARIO</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-sm pixel-text" style={{ color: 'var(--pixel-white)' }}>SOCIAL LINKS</CardTitle>
                  <CardDescription className="text-xs pixel-text" style={{ color: 'var(--pixel-gray)' }}>
                    CONNECT WITH ME ON SOCIAL PLATFORMS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <a
                      href="https://github.com/ajvsandhu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-4 glass hover:bg-white/10 transition-colors group"
                    >
                      <Github className="text-white/70 group-hover:text-white transition-colors" size={24} />
                      <span className="text-xs pixel-text text-white/70 group-hover:text-white transition-colors">GITHUB</span>
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/ajayveer-sandhu-7897a72a7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3 p-4 glass hover:bg-white/10 transition-colors group"
                    >
                      <Linkedin className="text-white/70 group-hover:text-blue-400 transition-colors" size={24} />
                      <span className="text-xs pixel-text text-white/70 group-hover:text-white transition-colors">LINKEDIN</span>
                    </a>
                    
                    <a
                      href="mailto:as24sand@uwaterloo.ca"
                      className="flex flex-col items-center gap-3 p-4 glass hover:bg-white/10 transition-colors group"
                    >
                      <Mail className="text-white/70 group-hover:text-green-400 transition-colors" size={24} />
                      <span className="text-xs pixel-text text-white/70 group-hover:text-white transition-colors">EMAIL</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-xs font-semibold mb-3 pixel-text" style={{ color: 'var(--pixel-white)' }}>RESPONSE TIME</h3>
                  <p className="text-xs leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                    I TYPICALLY RESPOND TO MESSAGES WITHIN 24 HOURS DURING WEEKDAYS. 
                    FOR URGENT MATTERS I RECOMMAND SENDING AN EMAIL TO ME.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
} 