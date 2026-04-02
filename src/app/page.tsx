'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Cursor from '@/components/ui/Cursor'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import StackSection from '@/components/sections/StackSection'
import WorksSection from '@/components/sections/WorksSection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import BackgroundEffects from '@/components/ui/BackgroundEffects'
import { useGSAPScrollEffects } from '@/hooks/useGSAPScrollEffects'
import BioSection from '@/components/sections/AboutMe'

export default function Home() {
  useGSAPScrollEffects()

  useEffect(() => {
    let lenis: any
    const init = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    init()
    return () => lenis?.destroy()
  }, [])

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

  return (
    <main className="relative min-h-screen w-full bg-black overflow-x-hidden selection:bg-red-500/30">
      <style>{`
        .scanlines {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 0, 51, 0.02) 50%
          );
          background-size: 100% 4px;
          z-index: 50;
          pointer-events: none;
        }

        .scan-sweep {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 0, 51, 0.05),
            transparent
          );
          opacity: 0.4;
          z-index: 51;
          pointer-events: none;
          animation: sweep 8s linear infinite;
        }

        @keyframes sweep {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }

        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
      `}</style>

      <BackgroundEffects />
      <div className="scanlines" />
      <div className="scan-sweep" />
      
      <Cursor />
      <Navbar />
      
      <div className="flex flex-col w-full">
        <HeroSection />
        <BioSection />
        <StackSection />
        <WorksSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  )
}