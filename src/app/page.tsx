'use client'

import { useEffect } from 'react'
import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import StackSection from '@/components/sections/StackSection'
import WorksSection from '@/components/sections/WorksSection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import { useGSAPScrollEffects } from '@/hooks/useGSAPScrollEffects'

export default function Home() {
  useGSAPScrollEffects()

  // Lenis smooth scroll
  useEffect(() => {
    let lenis: any
    const init = async () => {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      })
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }
    init()
    return () => lenis?.destroy()
  }, [])

  // Tech-bar fill on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>('.tech-bar-fill').forEach((bar) => {
              bar.classList.add('animate')
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    const stack = document.getElementById('stack')
    if (stack) obs.observe(stack)
    return () => obs.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      <div className="scanlines" />
      <div className="scan-sweep" />
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <HeroSection />
      <StackSection />
      <WorksSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
