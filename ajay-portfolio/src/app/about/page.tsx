"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ParticleBackground } from "@/components/ui/particle-background";
import { BubbleNav } from "@/components/ui/bubble-nav";
import { Footer } from "@/components/ui/footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { VinylPlayer } from "@/components/ui/vinyl-player";
import { BsPersonStanding } from "react-icons/bs";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { 
  GraduationCap, 
  Music,
  MapPin,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";
import { songs } from "@/config/songs";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  link?: string;
}

const interests = [
  { name: "WATCHING AND PLAYING SPORTS", icon: MdOutlineSportsBasketball, color: "var(--pixel-blue)" },
  { name: "RUNNING", icon: FaRunning, color: "var(--pixel-yellow)" },
  { name: "LEARNING ABOUT HISTORY", icon: BookOpen, color: "var(--pixel-green)" },
  { name: "WATCHING MOVIES/TV SHOWS", icon: BiCameraMovie, color: "var(--pixel-purple)" },
];

const certificates: Certificate[] = [
  {
    name: "MICROSOFT CERTIFIED: AZURE AI FUNDAMENTALS",
    issuer: "MICROSOFT",
    date: "OCT 2024",
    link: "https://www.credly.com/badges/4d56a9b7-2f09-4049-b257-ef91b08f5ea9/linked_in_profile"
  },
  {
    name: "GOOGLE DATA ANALYTICS PROFESSIONAL",
    issuer: "GOOGLE",
    date: "DEC 2024",
    id: "STFOLYJB8GMZ",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/STFOLYJB8GMZ"
  },
  {
    name: "SALESFORCE CERTIFIED AI ASSOCIATE",
    issuer: "SALESFORCE",
    date: "DEC 2024",
    id: "5457325",
    link: "https://trailhead.salesforce.com/en/credentials/verification/"
  },
  {
    name: "CPR/AED/FIRST AID",
    issuer: "CANADIAN RED CROSS",
    date: "APR 2025 - APR 2028",
    id: "106024456",
    link: "https://drive.google.com/file/d/12DtsY0i_7OHqhrBB_IZarhOQSKMufzbt/view"
  }
];

export default function About() {

  return (
    <>
      <ParticleBackground />
      <BubbleNav />
      
      <div className="min-h-screen relative">
        {/* Hero Section */}
        <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-8">
              <h1 className="text-3xl lg:text-5xl font-bold mb-6 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                ABOUT <span style={{ color: 'var(--accent-primary)' }}>ME</span>
              </h1>
              <p className="text-xs max-w-2xl mx-auto pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                A PASSIONATE COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT DRIVEN BY CURIOSITY AND INNOVATION
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Personal Info */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <ScrollReveal direction="left" className="space-y-8">
                {/* Profile Picture */}
                <Card className="glass">
                  <CardContent className="p-8">
                    <div className="flex justify-center">
                      <div className="relative mx-auto">
                        <Image 
                          src="/ajayshot.jpg" 
                          alt="Ajayveer Singh - Profile Picture"
                          width={400}
                          height={400}
                          className="max-w-full h-auto rounded-xl shadow-2xl"
                          style={{ 
                            border: '3px solid var(--accent-primary)',
                            backgroundColor: '#ffffff',
                            zIndex: 100,
                            position: 'relative',
                            maxWidth: '400px',
                            imageRendering: 'auto'
                          } as React.CSSProperties}
                        />

                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <h3 className="text-lg font-bold pixel-text mb-2" style={{ color: 'var(--pixel-white)' }}>
                        AJAYVEER SANDHU
                      </h3>
                      <p className="text-sm pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                        COMPUTATIONAL MATH & STATS STUDENT
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-3 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                      <GraduationCap style={{ color: 'var(--pixel-blue)' }} size={24} />
                      MY JOURNEY
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                      HI, I&apos;M A COMPUTATIONAL MATHEMATICS & STATISTICS STUDENT AT THE UNIVERSITY OF WATERLOO. 
                      DRIVEN BY CURIOSITY AND A PASSION FOR PROBLEM-SOLVING, I APPROACH EVERY CHALLENGE 
                      AS AN OPPORTUNITY TO LEARN AND GROW.
                    </p>
                    <p className="text-xs leading-relaxed pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                      WHETHER I&apos;M EXPLORING NEW TECHNOLOGIES, BUILDING MY SKILLSET, OR DIVING INTO 
                      COMPLEX DATA, I&apos;M ALWAYS FOCUSED ON THE EXPERIENCE, NOT JUST THE OUTCOME.
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-3 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                      <MapPin style={{ color: 'var(--pixel-green)' }} size={20} />
                      QUICK FACTS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} style={{ color: 'var(--pixel-blue)' }} />
                        <span className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>CLASS OF 2028</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={12} style={{ color: 'var(--pixel-purple)' }} />
                        <span className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>COMP MATH & STATS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={12} style={{ color: 'var(--pixel-yellow)' }} />
                        <span className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>THIRD YEAR</span>
                      </div>
                       <div className="flex items-center gap-2">
                        <span className="inline-block relative right-[2.5px]">
                        <BsPersonStanding size={16} style={{ color: 'var(--pixel-green)' }} />
                        </span> <span className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>TALLEST IN THE CLASS</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2} className="space-y-8">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-3 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                      <Music style={{ color: 'var(--pixel-purple)' }} size={20} />
                      CURRENT VIBES
                    </CardTitle>
                    <CardDescription className="text-xs pixel-text" style={{ color: 'var(--pixel-gray)' }}>
                      CLICK TO PLAY SOME OF MY FAVORITE TRACKS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VinylPlayer 
                      songs={songs}
                      className="horizontal-layout"
                    />
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-sm pixel-text" style={{ color: 'var(--pixel-white)' }}>INTERESTS & HOBBIES</CardTitle>
                    <CardDescription className="text-xs pixel-text" style={{ color: 'var(--pixel-gray)' }}>
                      WHAT I LOVE DOING OUTSIDE OF CODING
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StaggerContainer className="grid grid-cols-1 gap-4">
                      {interests.map((interest) => (
                        <StaggerItem
                          key={interest.name}
                          className="flex items-center gap-3 p-3 glass hover:bg-white/10 transition-colors"
                        >
                          <interest.icon size={16} style={{ color: interest.color }} />
                          <span className="text-xs pixel-text" style={{ color: 'var(--pixel-white)' }}>{interest.name}</span>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-sm pixel-text" style={{ color: 'var(--pixel-white)' }}>CERTIFICATES</CardTitle>
                    <CardDescription className="text-xs pixel-text" style={{ color: 'var(--pixel-gray)' }}>
                      MILESTONES I&apos;M PROUD OF
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {certificates.map((certificate, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="p-3 glass hover:bg-white/5 transition-colors rounded"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 flex-shrink-0 mt-1" style={{ background: 'var(--pixel-blue)' }}></div>
                            <div className="flex-1 min-w-0">
                              {certificate.link ? (
                                <a 
                                  href={certificate.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold pixel-text mb-1 hover:underline transition-colors cursor-pointer flex items-center gap-1 group"
                                  style={{ color: 'var(--accent-primary)' }}
                                >
                                  {certificate.name}
                                  <span className="text-xs group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--accent-secondary)' }}>↗</span>
                                </a>
                              ) : (
                                <h4 className="text-xs font-bold pixel-text mb-1" style={{ color: 'var(--pixel-white)' }}>
                                  {certificate.name}
                                </h4>
                              )}
                              <p className="text-xs pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                                {certificate.date}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-bold mb-6 pixel-text" style={{ color: 'var(--pixel-white)' }}>
                LET&apos;S BUILD SOMETHING AMAZING TOGETHER
              </h2>
              <p className="text-xs mb-8 pixel-text" style={{ color: 'var(--pixel-light-gray)' }}>
                I&apos;M ALWAYS EXCITED TO COLLABORATE ON INTERESTING PROJECTS AND LEARN FROM FELLOW DEVELOPERS.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/">
                  <button className="btn-8bit-green">
                    [VIEW MY PORTFOLIO]
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="btn-8bit-red">
                    [GET IN TOUCH]
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}