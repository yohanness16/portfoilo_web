'use client'

import { useEffect } from 'react'

export function useGSAPScrollEffects() {
  useEffect(() => {
    let ctx: any

    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {

        // 🔥 HERO CANVAS ZOOM
        gsap.to('#hero .canvas-wrapper', {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
          scale: 1.18,
          opacity: 0,
        })

        // 🔥 HERO CONTENT FADE
        gsap.to('#hero [data-anim]', {
          scrollTrigger: {
            trigger: '#hero',
            start: 'center top',
            end: 'bottom top',
            scrub: 1,
          },
          y: -60,
          opacity: 0,
          stagger: 0.05,
        })

        // ✅ 🔥 FIXED: REVEAL-UP ANIMATION
        gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // SECTION DIVIDERS
        gsap.utils.toArray<HTMLElement>('.section-divider').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
              },
            }
          )
        })

        // CARDS ANIMATION
        gsap.utils.toArray<HTMLElement>('.cyber-card').forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              delay: (i % 4) * 0.08,
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
              },
            }
          )
        })

      })

      // 🔥 IMPORTANT for Next.js
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }

    init()

    return () => ctx?.revert()
  }, [])
}