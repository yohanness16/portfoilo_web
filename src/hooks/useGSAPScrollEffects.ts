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

        // ─── HERO CANVAS ZOOM ───
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

        // ─── HERO CONTENT FADE ───
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

        // ─── REVEAL-UP ANIMATION (section-level only, not per-card) ───
        gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // ─── SECTION DIVIDERS ───
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

      })

      // Refresh after Next.js hydration
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }

    init()

    return () => ctx?.revert()
  }, [])
}

/**
 * IntersectionObserver-based card entrance.
 * Attaches a single observer to the parent grid, adds .visible to children.
 * This replaces the per-card GSAP ScrollTrigger pattern that caused layout thrashing.
 */
export function useCardEntrance() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>('.card-entrance')
            cards.forEach((card) => {
              card.classList.add('visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    const grids = document.querySelectorAll('.card-grid')
    grids.forEach((grid) => observer.observe(grid))

    return () => observer.disconnect()
  }, [])
}
