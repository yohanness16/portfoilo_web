'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import StackSection from '@/components/sections/StackSection'
import WorksSection from '@/components/sections/WorksSection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import BackgroundEffects from '@/components/ui/BackgroundEffects'
import { useGSAPScrollEffects } from '@/hooks/useGSAPScrollEffects'
import { useScrollGlow } from '@/hooks/useScrollGlow'
import BioSection from '@/components/sections/AboutMe'

export default function Home() {
  useGSAPScrollEffects()
  const { scrollProgressRef } = useScrollGlow()
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef<any>(null)
  const rafRef = useRef<number>(0)

  // Expose Lenis instance globally for useScrollGlow
  useEffect(() => {
    let destroyed = false

    const init = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default
      if (destroyed) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis
      ;(window as any).__lenis = lenis

      // Integrate Lenis with GSAP ScrollTrigger
      lenis.on('scroll', () => {
        if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
          ;(window as any).ScrollTrigger.update()
        }
      })

      function raf(time: number) {
        if (destroyed) return
        lenis.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)
    }

    init()

    return () => {
      destroyed = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        delete (window as any).__lenis
      }
    }
  }, [])

  // Poll scrollProgress for React state (low frequency — 4fps is enough for glow)
  useEffect(() => {
    let running = true
    const tick = () => {
      if (!running) return
      setScrollProgress(scrollProgressRef.current)
      setTimeout(tick, 250) // 4fps — glow doesn't need 60fps
    }
    tick()
    return () => { running = false }
  }, [scrollProgressRef])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll<HTMLElement>('.tech-bar-fill')
            bars.forEach((bar) => bar.classList.add('animate'))
          }
        })
      },
      { threshold: 0.1 }
    )

    const stack = document.getElementById('stack')
    if (stack) observer.observe(stack)
    return () => observer.disconnect()
  }, [])

  // Card entrance via IntersectionObserver
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.card-entrance')
            cards.forEach((card) => card.classList.add('visible'))
            cardObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    const grids = document.querySelectorAll('.card-grid')
    grids.forEach((grid) => cardObserver.observe(grid))

    return () => cardObserver.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--black)' }}>
      <style>{`
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
      `}</style>

      <BackgroundEffects scrollProgress={scrollProgress} />
      <div className="scanlines" />
      <div className="scan-sweep" />

      <Navbar />

      <div className="flex flex-col w-full">
        <HeroSection />
        <BioSection />
        <StackSection />
        <WorksSection scrollProgress={scrollProgress} />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  )
}
