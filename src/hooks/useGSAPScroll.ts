'use client'

import { useEffect } from 'react'

export function useGSAPScroll() {
  useEffect(() => {
    const init = async () => {
      try {
        const { default: gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        // Section title zoom-in from bottom
        const titles = document.querySelectorAll('.section-zoom-title')
        titles.forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.85, opacity: 0, y: 60 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // Cyber cards stagger reveal
        const cardGroups = document.querySelectorAll('.stagger-cards')
        cardGroups.forEach((group) => {
          const cards = group.querySelectorAll('.cyber-card')
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: group,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // Section dividers draw in
        const dividers = document.querySelectorAll('.section-divider-line')
        dividers.forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
              },
            }
          )
        })

        // Parallax on hero elements
        const heroContent = document.querySelector('#hero .hero-content-inner')
        if (heroContent) {
          gsap.to(heroContent, {
            y: -80,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
              trigger: '#hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        }

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill())
        }
      } catch {
        // GSAP not available
      }
    }

    const timeout = setTimeout(() => {
      init()
    }, 500)

    return () => clearTimeout(timeout)
  }, [])
}
