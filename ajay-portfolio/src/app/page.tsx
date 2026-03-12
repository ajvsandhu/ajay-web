"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/ui/particle-background";
import { BubbleNav } from "@/components/ui/bubble-nav";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ScrollDownIndicator } from "@/components/ui/scroll-down-indicator";
import { 
  ExternalLink,
  Calendar,
  Users
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "ZocraticMMA",
    description: "An app created with my friend to give UFC fans a smarter, data-driven way to explore fighters, compare matchups, and predict outcomes.",
    longDescription: "ZocraticMMA is an app I have created with my friend to give UFC fans a smarter, data-driven way to explore fighters, compare matchups, and predict outcomes. With 20+ monthly users, I developed custom web scrapers to collect fight data, stored everything in a structured SQL database, and created APIs so the app can access and deliver that data in real time.",
    tech: ["Python", "SQL", "Web Scraping", "AI/ML", "Data Visualization", "APIs"],
    github: "https://github.com",
    demo: "https://demo.com",
    type: "Data-Driven Application",
    duration: "6 months",
    team: "Team of 2",
    features: [
      "Custom web scrapers for fight data",
      "AI trained on thousands of fight outcomes",
      "Analysis of 25+ performance metrics",
      "data visualizations and dynamic graphs"
    ],
    challenges: "Building robust web scrapers to collect comprehensive fight data and training AI models on complex MMA performance metrics while ensuring real-time data delivery.",
    impact: "The platform uses AI trained on thousands of fight outcomes and analyses over 25 performance metrics such as striking and wrestling. With 20+ monthly users, Zocratic makes it easy for both seasoned fans and newcomers to understand what's happening inside the octagon."
  },
  {
    id: 2,
    title: "Canadian Unemployment Forecasting (Macro ML)",
    description: "Forecasting Canadian unemployment using macroeconomic indicators and exploring how monetary policy influences short-term labor market dynamics.",
    longDescription: "I explored whether Canadian unemployment can be predicted using macroeconomic indicators and how interest-rate decisions feed through into the labour market. Using monthly data from 2009–2024, I built and evaluated a forecasting pipeline around several baseline, time-series, and machine-learning models. The project walks from data cleaning and feature engineering through model selection, diagnostic checks, and scenario design.",
    tech: ["Python", "pandas", "scikit-learn", "statsmodels", "XGBoost", "Time Series", "Ridge Regression", "ARIMA", "VAR"],
    github: "https://github.com/ajvsandhu/macro-forecasting-ml-canada",
    type: "Data Science / ML Research",
    duration: "2–3 months",
    team: "Solo Project",
    features: [
      "Seven forecasting models (baselines, ARIMA, VAR, Random Forest, XGBoost, Ridge)",
      "Scenario simulation for Bank of Canada rate paths",
      "EDA: correlation, stationarity, lagged effects",
      "Chronological train/test split; RMSE, MAE, MAPE evaluation; data from StatCan, Bank of Canada, FRED"
    ],
    challenges: "Handling non-stationary macro series with differencing and changes, addressing multicollinearity (e.g. CPI and GDP) with Ridge and tree-based models, avoiding data leakage (e.g. excluding unemp_change_1m and unemp_rolling_12m), and interpreting scenario extrapolation for rate levels outside the training range.",
    impact: "Shows that simple, interpretable models (especially Persistence and Ridge) can match or beat more complex ML at a 1‑month horizon for Canadian unemployment. The scenario module turns interest‑rate paths into plausible unemployment trajectories, making the work useful as a 'what if' policy tool and a demonstration of end‑to‑end econometric modeling."
  },
  {
    id: 3,
    title: "Movie Recommendation Tool",
    description: "A personalised, interactive movie recommendation tool to help friends and casual movie watchers save time and avoid endless scrolling.",
    longDescription: "I built a personalised, interactive movie recommendation tool to help friends and casual movie watchers save time and avoid endless scrolling. I noticed how often people, especially students and busy professionals, struggled to pick a movie quickly, so I designed a solution using Python tailored recommendations based on their preferences.",
    tech: ["Python", "Data Processing", "API Integration", "UX Design"],
    github: "https://github.com",
    type: "Recommendation System",
    duration: "3 months",
    team: "Solo Project",
    features: [
      "Personalized recommendations based on preferences",
      "Genre, era, and runtime filtering",
      "Quick decision-making interface",
      "Intuitive UX design"
    ],
    challenges: "Processing user preferences like genre, era, and runtime to provide accurate recommendations while maintaining a simple and intuitive user interface.",
    impact: "The tool narrows decision-making by processing the user's preferences like genre, era, and runtime, then returning recommendations based on them. I showed my software to my friends, and they reported saving 15+ minutes when using the app."
  }
];

export default function Home() {
  const [showZoomedImage, setShowZoomedImage] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll();

  // Scroll-based animations - faster fade to hide hero before projects show
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <>
      <ParticleBackground />
      <BubbleNav />
      <ScrollDownIndicator />
      
      <div className="relative">
        {/* Hero Section - Fixed positioned */}
        <motion.section 
          className="fixed inset-0 z-30 flex items-center justify-center min-h-screen"
          style={{ 
            opacity: heroOpacity,
            scale: heroScale,
            pointerEvents: 'auto'
          }}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-8 lg:pt-0">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                  HEY, I&apos;M <span className="pixel-glow" style={{ color: 'var(--accent-primary)' }}>AJAYVEER</span>
                </h1>
                <div className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 h-12 sm:h-16 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                  I LOVE {" "}
                  <TypingAnimation 
                    words={["WORKING IN FAST-PACE ENVIRONMENTS", "COLLABORATING WITH A TEAM", "TO CHALLENGE MYSELF", "CHANGE AND GROWTH"]}
                    className="pixel-glow"
                    style={{ color: 'var(--accent-secondary)' }}
                  />
                </div>
                <p className="text-xs sm:text-sm leading-relaxed max-w-xl mb-8 sm:mb-10 pixel-text mx-auto lg:mx-0" style={{ color: 'var(--pixel-light-gray)' }}>
                  A DUAL MAJOR COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT AT THE UNIVERSITY OF WATERLOO.
                  DRIVEN BY CURIOSITY AND A PASSION FOR PROBLEM-SOLVING.
                </p>
                


              </motion.div>

              <motion.div
                className="relative mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 rounded-lg border-2 border-gray-700 shadow-2xl">
                  {/* Browser-like frame dots */}
                  <div className="absolute top-2 sm:top-3 left-4 sm:left-6 flex space-x-1.5 sm:space-x-2 z-10">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-center mb-3 sm:mb-4 pt-1 sm:pt-2">
                    <span style={{ color: 'var(--pixel-light-gray)' }} className="text-xs pixel-text">TERMINAL v2.0</span>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 pixel-text text-xs sm:text-sm">
                    <div className="flex flex-wrap">
                      <span style={{ color: 'var(--accent-success)' }}>ajay@portfolio</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>:</span>
                      <span style={{ color: 'var(--accent-primary)' }}>~</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>$ </span>
                      <span style={{ color: 'var(--pixel-white)' }}>whoami</span>
                    </div>
                    <div style={{ color: 'var(--accent-warning)' }} className="pl-4">→ computational_math_stats_student</div>
                    <div className="flex flex-wrap">
                      <span style={{ color: 'var(--accent-success)' }}>ajay@portfolio</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>:</span>
                      <span style={{ color: 'var(--accent-primary)' }}>~</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>$ </span>
                      <span style={{ color: 'var(--pixel-white)' }}>ls skills/</span>
                    </div>
                    <div style={{ color: 'var(--accent-primary)' }} className="pl-4">
                      python.py  javascript.js  react.jsx  node.js
                    </div>
                    <div className="flex flex-wrap">
                      <span style={{ color: 'var(--accent-success)' }}>ajay@portfolio</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>:</span>
                      <span style={{ color: 'var(--accent-primary)' }}>~</span>
                      <span style={{ color: 'var(--pixel-light-gray)' }}>$ </span>
                      <span className="animate-pulse pixel-glow" style={{ color: 'var(--accent-warning)' }}>█</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            

        </div>
        </motion.section>

        {/* Content Section - Moves up to overlap hero */}
        <div className="relative z-50 bg-gradient-bg" style={{ pointerEvents: 'auto' }}>
          {/* Spacer to push content down initially */}
          <div className="h-screen"></div>
          
          {/* Projects Section */}
          <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-bg relative z-50" style={{ pointerEvents: 'auto' }}>
            <div className="max-w-5xl mx-auto">
              <ScrollReveal direction="up">
                <div className="text-center mb-24">
                  <h2 className="text-3xl lg:text-5xl font-bold mb-8 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                    MY <span className="pixel-glow" style={{ color: 'var(--accent-tertiary)' }}>PORTFOLIO</span>
                  </h2>
                  <p className="text-base max-w-2xl mx-auto pixel-text leading-relaxed" style={{ color: 'var(--pixel-light-gray)' }}>
                    A SHOWCASE OF MY RECENT WORK AND CREATIVE SOLUTIONS
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-32 relative z-50" style={{ pointerEvents: 'auto' }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`grid lg:grid-cols-2 gap-16 items-center relative z-50 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {/* Project Details */}
                    <div className={`space-y-8 relative z-50 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`} style={{ pointerEvents: 'auto' }}>
                      <div>
                        <div className="flex items-center flex-wrap gap-x-6 gap-y-3 mb-6">
                          <Badge variant="outline" className="badge-8bit">
                            {project.type}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                            <Calendar size={16} />
                            {project.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                            <Users size={16} />
                            {project.team}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-bold mb-6 pixel-text pixel-glow" style={{ color: 'var(--accent-primary)' }}>
                          {project.title}
                        </h3>
                        <p className="text-base leading-relaxed mb-8 pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                          {project.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>KEY FEATURES</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {project.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent-secondary)' }}></div>
                              <span className="text-sm pixel-text leading-relaxed" style={{ color: 'var(--pixel-light-gray)' }}>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>TECH STACK</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.tech.map((tech) => (
                            <Badge 
                              key={tech} 
                              className="badge-8bit"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-50" style={{ pointerEvents: 'auto' }}>
                        {project.id === 1 && (
                          <a 
                            href="https://zocraticmma.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block relative z-50"
                            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                          >
                            <Button variant="outline" className="btn-8bit-white-sm relative z-50" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                              <ExternalLink size={20} className="mr-2" />
                              VISIT ZOCRATIC
                            </Button>
                          </a>
                        )}
                        {project.id === 2 && (
                          <>
                            <Link href="/projects/macro-forecasting-ml" className="inline-block relative z-50">
                              <Button variant="outline" className="btn-8bit-white-sm relative z-50" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                                <ExternalLink size={20} className="mr-2" />
                                READ CASE STUDY
                              </Button>
                            </Link>
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-block relative z-50"
                              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                            >
                              <Button variant="outline" className="btn-8bit-white-sm relative z-50" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                                <ExternalLink size={20} className="mr-2" />
                                VIEW ON GITHUB
                              </Button>
                            </a>
                          </>
                        )}
                        {project.github && project.github !== "https://github.com" && project.id !== 1 && project.id !== 2 && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block relative z-50"
                            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                          >
                            <Button variant="outline" className="btn-8bit-white-sm relative z-50" style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
                              <ExternalLink size={20} className="mr-2" />
                              VIEW ON GITHUB
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                                        {/* Project Card or Image */}
                    <div className={`relative z-50 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`} style={{ pointerEvents: 'auto' }}>
                      {project.id === 1 ? (
                        /* ZocraticMMA Image */
                        <div className="relative group">
                          <div className="glass p-6 hover:border-white/60 transition-all duration-300 overflow-hidden">
                            <div className="mb-4 text-center">
                              <h4 className="text-lg font-semibold pixel-text mb-2" style={{ color: 'var(--pixel-white)' }}>
                                LIVE APPLICATION
                              </h4>
                              <span className="text-xs pixel-text" style={{ color: 'var(--accent-primary)' }}>
                                ZOCRATICMMA.COM
                              </span>
                            </div>
                            <div 
                              className="relative bg-gradient-to-br from-gray-900 to-black p-3 rounded-lg border-2 border-gray-700 shadow-2xl group/image cursor-pointer z-50"
                              onClick={() => setShowZoomedImage(showZoomedImage === 'zocratic' ? null : 'zocratic')}
                              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                            >
                              <div className="absolute top-0.5 left-3 flex space-x-1.5 z-20">
                                <div className="w-2 h-2 rounded-full bg-red-500 opacity-90"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-90"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500 opacity-90"></div>
                              </div>
                              <Image 
                                src="/projects/zocratic/zocraticmma_screenshot.png" 
                                alt="ZocraticMMA Application Screenshot"
                                width={800}
                                height={400}
                                className="w-full h-auto rounded-md shadow-xl transition-all duration-300"
                                style={{ 
                                  maxHeight: '400px', 
                                  objectFit: 'contain',
                                  filter: 'brightness(1.1) contrast(1.15) saturate(1.1)',
                                  background: '#1a1a1a'
                                }}
                              />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <div className="text-center">
                                <div className="text-sm font-bold pixel-text" style={{ color: 'var(--accent-success)' }}>20+</div>
                                <div className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>MONTHLY USERS</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold pixel-text" style={{ color: 'var(--accent-warning)' }}>25+</div>
                                <div className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>METRICS TRACKED</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold pixel-text" style={{ color: 'var(--accent-primary)' }}>AI</div>
                                <div className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>POWERED</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : project.id === 2 ? (
                        /* Macro ML: restore full block styling, remove only the image */
                        <div className="relative group">
                          <div className="glass p-6 hover:border-white/60 transition-all duration-300 overflow-hidden">
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-base font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                                  ACTUAL VS PREDICTED
                                </h4>
                                <div
                                  onClick={() => setShowZoomedImage(showZoomedImage === 'macro-pred' ? null : 'macro-pred')}
                                  className="block w-full text-left"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-3 rounded-lg border-2 border-gray-700 shadow-2xl">
                                    <div className="absolute top-0.5 left-3 flex space-x-1.5 z-20 pointer-events-none">
                                      <div className="w-2 h-2 rounded-full bg-red-500 opacity-90"></div>
                                      <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-90"></div>
                                      <div className="w-2 h-2 rounded-full bg-green-500 opacity-90"></div>
                                    </div>
                                    <Image
                                      src="/projects/macro-ml/predictions_vs_actual_window.png"
                                      alt="Actual vs Predicted Unemployment Rate (Test Period)"
                                      width={1000}
                                      height={600}
                                      unoptimized
                                      className="w-full h-auto rounded-md shadow-xl transition-all duration-300"
                                      style={{ background: "#1a1a1a" }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-base font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                                  IMPACT & RESULTS
                                </h4>
                                <p className="text-sm leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                                  {project.impact}
                                </p>
                              </div>

                              <div className="pt-6 border-t" style={{ borderColor: 'var(--accent-primary)' }}>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>PROJECT STATUS</span>
                                  <Badge className="badge-8bit" style={{ background: 'var(--accent-success)', color: 'var(--pixel-black)' }}>
                                    COMPLETED
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Default Project Card for remaining projects */
                        <Card className="glass hover:border-white/40 transition-all duration-300">
                          <CardContent className="p-8">
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-base font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>TECHNICAL CHALLENGES</h4>
                                <p className="text-sm leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>{project.challenges}</p>
                              </div>

                              <div>
                                <h4 className="text-base font-semibold mb-4 pixel-text" style={{ color: 'var(--pixel-white)' }}>IMPACT & RESULTS</h4>
                                <p className="text-sm leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>{project.impact}</p>
                              </div>

                              <div className="pt-6 border-t" style={{ borderColor: 'var(--accent-primary)' }}>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>PROJECT STATUS</span>
                                  <Badge className="badge-8bit" style={{ background: 'var(--accent-success)', color: 'var(--pixel-black)' }}>
                                    COMPLETED
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-bg">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal direction="up">
                <h2 className="text-3xl lg:text-4xl font-bold pixel-text mb-6" style={{ color: 'var(--pixel-white)' }}>
                  WANT TO KNOW MORE <span style={{ color: 'var(--accent-primary)' }}>ABOUT ME?</span>
                </h2>
                <p className="text-base lg:text-lg mb-12 pixel-text leading-relaxed" style={{ color: 'var(--pixel-light-gray)' }}>
                  EXPLORE MY BACKGROUND, SKILLS, AND EXPERIENCE
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-50">
                  <Link href="/about" className="relative z-50">
                    <button 
                      className="btn-8bit-green relative z-50"
                      style={{
                        pointerEvents: 'auto',
                        cursor: 'pointer'
                      }}
                    >
                      [DISCOVER MY STORY]
                    </button>
                  </Link>
                  <a 
                    href="https://drive.google.com/file/d/1LF9i0Vd6_8Im3xYBmUC2vcOD5nAi18kT/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-50"
                  >
                    <button 
                      className="btn-8bit-red relative z-50"
                      style={{
                        pointerEvents: 'auto',
                        cursor: 'pointer'
                      }}
                    >
                      [VIEW RESUME]
                    </button>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <Footer />
        </div>
    </div>
    
    {/* Enlarged Image Overlay - Completely outside all containers */}
    {showZoomedImage && (
      <div 
        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-2 sm:p-4"
        onClick={() => setShowZoomedImage(null)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative w-[95vw] h-[85vh] sm:w-[90vw] sm:h-[90vh] rounded-lg shadow-2xl overflow-hidden"
            style={{ background: 'white' }}
          >
            <Image
              src={
                showZoomedImage === "macro-pred"
                  ? "/projects/macro-ml/predictions_vs_actual_window.png"
                  : "/projects/zocratic/zocraticmma_screenshot.png"
              }
              alt={showZoomedImage === 'macro-pred' ? "Actual vs Predicted Unemployment Rate (Full Size)" : "ZocraticMMA Application - Full Size"}
              fill
              sizes="(max-width: 640px) 95vw, 90vw"
              unoptimized={showZoomedImage === "macro-pred"}
              className="object-contain"
              style={
                showZoomedImage === "macro-pred"
                  ? undefined
                  : undefined
              }
              priority
            />
          </div>
          
          {/* Close instruction */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-2 sm:px-6 sm:py-3 rounded-lg">
            <span className="text-white text-xs sm:text-sm pixel-text">
              <span className="hidden sm:inline">CLICK ANYWHERE TO CLOSE</span>
              <span className="sm:hidden">TAP TO CLOSE</span>
            </span>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
