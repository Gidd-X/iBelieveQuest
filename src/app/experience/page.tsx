"use client"

import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  
  const [activeStoryIdx, setActiveStoryIdx] = useState(0)

  const storySteps = [
    "What do I believe?",
    "Why do I believe it?",
    "Have I questioned it?",
    "The Truth Discovered"
  ]

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // --------------------------------------------------------
    // Shared Animations (Run universally regardless of viewport)
    // --------------------------------------------------------
    
    // Experiment #1: Hero Timeline
    // We run this for all viewports.
    const tl = gsap.timeline()
    
    tl.to('.hero-word-1', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-word-2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4")
      .to('.hero-divider-1', { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, "-=0.2")
      .to('.hero-word-3', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.2")
      .to('.hero-word-4', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")
      .to('.hero-divider-2', { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, "-=0.2")
      .to('.hero-word-5', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.2")
      .to('.hero-word-6', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.6")


    // --------------------------------------------------------
    // Desktop and Tablet Animations (min-width: 768px)
    // --------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      
      // Storytelling ScrollTrigger for Desktop
      const sections = gsap.utils.toArray('.story-section')
      
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: '.story-left',
      })

      sections.forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: self => {
            if (self.isActive) {
              setActiveStoryIdx(i)
            }
          }
        })
        
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
          opacity: 0.2,
          duration: 0.5
        })
      })

      // Parallax Image for Desktop
      gsap.to('.parallax-img', {
        yPercent: 30, // Full parallax
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: true,
        }
      })
    })

    // --------------------------------------------------------
    // Mobile Animations (max-width: 767px)
    // --------------------------------------------------------
    mm.add("(max-width: 767px)", () => {
      
      // Storytelling ScrollTrigger for Mobile
      const sections = gsap.utils.toArray('.story-section')
      
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: '.story-left-mobile', // We pin the sticky header equivalent
      })

      sections.forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 40%", // More explicit trigger for taller mobile elements
          end: "bottom 40%",
          onToggle: self => {
            if (self.isActive) {
              setActiveStoryIdx(i)
            }
          }
        })
        
        // Simpler, faster opacity animation for mobile
        gsap.fromTo(section, 
          { opacity: 0.4 },
          {
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play reverse play reverse",
            },
            opacity: 1,
            duration: 0.3
          }
        )
      })

      // Parallax Image for Mobile (Disabled / Minimal)
      gsap.to('.parallax-img', {
        yPercent: 5, // Extremely subtle to save performance and fit screen aspect ratio
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom", 
          end: "bottom top",
          scrub: true,
        }
      })
    })

    // --------------------------------------------------------
    // Reduced Motion Support
    // --------------------------------------------------------
    mm.add("(prefers-reduced-motion: reduce)", () => {
      // For reduced motion users, we kill the parallax entirely to prevent motion sickness.
      // We also ensure opacity animations are immediate.
      gsap.killTweensOf('.parallax-img')
      gsap.set('.parallax-img', { yPercent: 0 })
      
      // We also instantly show all story sections
      gsap.killTweensOf('.story-section')
      gsap.set('.story-section', { opacity: 1 })
    })

    return () => {
      mm.revert() // Cleanup all matchMedia GSAP instances
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden">
      
      {/* Experiment 1: The Timeline */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center font-headline text-5xl md:text-7xl font-bold uppercase tracking-widest leading-none">
        <div className="overflow-hidden p-2">
          <div className="hero-word-1 text-muted-foreground text-3xl md:text-5xl opacity-0 translate-y-[80px]">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-2 text-primary opacity-0 translate-y-[80px]">Question</div>
        </div>
        <div className="hero-divider-1 w-32 h-1 bg-accent my-6 origin-left rounded-full scale-x-0" />
        
        <div className="overflow-hidden p-2">
          <div className="hero-word-3 text-muted-foreground text-3xl md:text-5xl opacity-0 translate-y-[80px]">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-4 text-primary opacity-0 translate-y-[80px]">Truth</div>
        </div>
        <div className="hero-divider-2 w-32 h-1 bg-accent my-6 origin-left rounded-full scale-x-0" />

        <div className="overflow-hidden p-2">
          <div className="hero-word-5 text-muted-foreground text-3xl md:text-5xl opacity-0 translate-y-[80px]">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-6 text-primary opacity-0 translate-y-[80px]">Step</div>
        </div>
      </section>

      {/* Experiment 2: Scroll Storytelling */}
      {/* 
        We unify the DOM structure. 
        Instead of completely separate components, we just hide/show the appropriate "pinned" container 
        depending on screen size, while the React State 'activeStoryIdx' reliably updates the content. 
      */}
      <section ref={storyRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start border-t border-border/50">
        
        {/* Desktop Left Side (Pinned Sidebar) */}
        <div className="story-left hidden md:flex h-screen sticky top-0 w-1/3 flex-col justify-center pr-8 border-r border-border/50">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase">The Journey</h2>
          <div className="h-[120px] relative">
            {storySteps.map((step, i) => (
              <h3 
                key={i} 
                className={`font-headline text-4xl absolute transition-all duration-500 ease-out origin-left
                  ${i === activeStoryIdx ? 'opacity-100 scale-100 translate-y-0 text-primary' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
              >
                {step}
              </h3>
            ))}
          </div>
        </div>

        {/* Mobile Top Side (Pinned Header) */}
        <div className="story-left-mobile md:hidden w-full h-[10vh] bg-background/95 backdrop-blur z-10 flex items-center border-b border-border/50">
          <div className="relative w-full h-8 overflow-hidden">
            {storySteps.map((step, i) => (
              <h3 
                key={i} 
                className={`font-headline text-2xl absolute inset-0 flex items-center transition-all duration-500 ease-out
                  ${i === activeStoryIdx ? 'opacity-100 translate-y-0 text-primary' : i < activeStoryIdx ? 'opacity-0 -translate-y-4' : 'opacity-0 translate-y-4'}`}
              >
                {step}
              </h3>
            ))}
          </div>
        </div>

        {/* Right Side (Scrolling Content) */}
        <div className="story-right w-full md:w-2/3 md:pl-16 pb-[30vh]">
          <div className="story-section min-h-screen flex flex-col justify-center pt-24 md:pt-0">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
              Belief is often inherited. We adopt the worldview of our parents, our culture, or our early communities. But there comes a time when inherited belief must become examined belief.
            </p>
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <p className="italic text-lg">"The unexamined faith is not worth having."</p>
            </div>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8">
              Is it because it feels good? Because it's comforting? Or is it because it aligns with reality? Seeking the 'why' is the first step toward genuine conviction.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center font-bold text-muted-foreground">Comfort</div>
              <div className="h-32 bg-accent/20 rounded-lg flex items-center justify-center font-bold text-accent">Truth</div>
            </div>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              Doubt is not the opposite of faith; it is an element of it. Honest questioning strips away the fragile layers of misunderstanding, leaving a foundation that can actually support the weight of real life.
            </p>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
              When we press through the questioning, we don't always find easy answers. But we do find something better: a resilient truth that stands the test of scrutiny. One question, one truth, one step at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Experiment 3: Parallax Image */}
      <section ref={parallaxRef} className="h-[50vh] md:h-[80vh] w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-headline text-4xl md:text-7xl text-white font-bold mb-6">See Deeper</h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl">Scroll-linked parallax creates depth, making the flat screen feel like a window into another world.</p>
        </div>
        
        {/* We use scale-125 and a negative top margin to give the image room to move up/down within the container without showing borders */}
        <div className="parallax-img absolute inset-0 -top-[20%] scale-125 h-[140%] w-full">
          <Image 
            src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=2832&auto=format&fit=crop"
            alt="Scenic view for parallax"
            fill
            className="object-cover"
          />
        </div>
      </section>
      
      <div className="h-[20vh] bg-background"></div>

    </div>
  )
}
