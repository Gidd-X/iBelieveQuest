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
    // 1. Experiment #1: Hero Timeline
    const tl = gsap.timeline()
    
    tl.from('.hero-word-1', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' })
      .from('.hero-word-2', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' }, "-=0.4")
      .from('.hero-divider-1', { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power3.out' }, "-=0.2")
      .from('.hero-word-3', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' }, "-=0.2")
      .from('.hero-word-4', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' }, "-=0.6")
      .from('.hero-divider-2', { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power3.out' }, "-=0.2")
      .from('.hero-word-5', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' }, "-=0.2")
      .from('.hero-word-6', { opacity: 0, y: 80, duration: 0.8, ease: 'power3.out' }, "-=0.6")

    // 2. Experiment #2: Scroll Storytelling
    // Pin the left side and track sections
    const sections = gsap.utils.toArray('.story-section')
    
    ScrollTrigger.create({
      trigger: storyRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: '.story-left',
    })

    // Update active index based on scroll position of right sections
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
      
      // Fade in each section text as you scroll
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

    // 3. Experiment #3: Parallax Image
    gsap.to('.parallax-img', {
      yPercent: 30, // Move the image 30% down relative to its container
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: true,
      }
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-background text-foreground overflow-hidden">
      
      {/* Experiment 1: The Timeline */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center font-headline text-5xl md:text-7xl font-bold uppercase tracking-widest leading-none">
        <div className="overflow-hidden p-2">
          <div className="hero-word-1 text-muted-foreground text-3xl md:text-5xl">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-2 text-primary">Question</div>
        </div>
        <div className="hero-divider-1 w-32 h-1 bg-accent my-6 origin-left rounded-full" />
        
        <div className="overflow-hidden p-2">
          <div className="hero-word-3 text-muted-foreground text-3xl md:text-5xl">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-4 text-primary">Truth</div>
        </div>
        <div className="hero-divider-2 w-32 h-1 bg-accent my-6 origin-left rounded-full" />

        <div className="overflow-hidden p-2">
          <div className="hero-word-5 text-muted-foreground text-3xl md:text-5xl">One</div>
        </div>
        <div className="overflow-hidden p-2">
          <div className="hero-word-6 text-primary">Step</div>
        </div>
      </section>

      {/* Experiment 2: Scroll Storytelling */}
      <section ref={storyRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start border-t border-border/50">
        
        {/* Left Side (Pinned) */}
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

        {/* Right Side (Scrolling Content) */}
        <div className="story-right w-full md:w-2/3 md:pl-16 pb-[30vh]">
          {/* Mobile indicator (since pinned left is hidden on very small screens) */}
          <div className="md:hidden sticky top-20 z-10 bg-background/90 backdrop-blur py-4 mb-8 border-b">
             <h3 className="font-headline text-2xl text-primary">{storySteps[activeStoryIdx]}</h3>
          </div>

          <div className="story-section min-h-screen flex flex-col justify-center pt-24 md:pt-0">
            <h4 className="text-2xl font-semibold mb-4 text-primary md:hidden">What do I believe?</h4>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              Belief is often inherited. We adopt the worldview of our parents, our culture, or our early communities. But there comes a time when inherited belief must become examined belief.
            </p>
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <p className="italic text-lg">"The unexamined faith is not worth having."</p>
            </div>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <h4 className="text-2xl font-semibold mb-4 text-primary md:hidden">Why do I believe it?</h4>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              Is it because it feels good? Because it's comforting? Or is it because it aligns with reality? Seeking the 'why' is the first step toward genuine conviction.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center font-bold text-muted-foreground">Comfort</div>
              <div className="h-32 bg-accent/20 rounded-lg flex items-center justify-center font-bold text-accent">Truth</div>
            </div>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <h4 className="text-2xl font-semibold mb-4 text-primary md:hidden">Have I questioned it?</h4>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Doubt is not the opposite of faith; it is an element of it. Honest questioning strips away the fragile layers of misunderstanding, leaving a foundation that can actually support the weight of real life.
            </p>
          </div>

          <div className="story-section min-h-[80vh] flex flex-col justify-center">
            <h4 className="text-2xl font-semibold mb-4 text-primary md:hidden">The Truth Discovered</h4>
            <p className="text-xl leading-relaxed text-foreground">
              When we press through the questioning, we don't always find easy answers. But we do find something better: a resilient truth that stands the test of scrutiny. One question, one truth, one step at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Experiment 3: Parallax Image */}
      <section ref={parallaxRef} className="h-[80vh] w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-headline text-5xl md:text-7xl text-white font-bold mb-6">See Deeper</h2>
          <p className="text-white/80 text-xl max-w-2xl">Scroll-linked parallax creates depth, making the flat screen feel like a window into another world.</p>
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
