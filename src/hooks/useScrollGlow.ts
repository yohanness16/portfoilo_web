'use client'

import { useEffect, useRef, useCallback } from 'react'
import { GLOW } from '@/lib/animations'

interface TrackedElement {
  element: HTMLElement
  glowLayer: HTMLElement | null
}

/**
 * Scroll-driven ambient glow engine.
 *
 * Two-phase tracking:
 *   Phase 1 — IntersectionObserver (coarse): detects when elements enter the
 *             middle 40% of the viewport. Adds them to the tracking set.
 *   Phase 2 — rAF + Lenis scroll (fine): for each tracked element, calculates
 *             the distance from its center to the viewport center, runs a
 *             smoothstep interpolation, and writes --glow-opacity to the
 *             glow-layer child.
 *
 * Returns a ref callback to attach to any element that should glow.
 * Also returns the current global scrollProgress for R3F shader sync.
 */
export function useScrollGlow() {
  const trackingSetRef = useRef<Set<TrackedElement>>(new Set())
  const rafRef = useRef<number>(0)
  const scrollProgressRef = useRef<number>(0)
  const isScrollingRef = useRef<boolean>(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Phase 1: IntersectionObserver — coarse enter/exit detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const glowLayer = el.querySelector<HTMLElement>('.glow-layer')
          const tracked: TrackedElement = { element: el, glowLayer }

          if (entry.isIntersecting) {
            trackingSetRef.current.add(tracked)
          } else {
            // Fade out when leaving viewport
            if (glowLayer) {
              glowLayer.style.setProperty('--glow-opacity', '0')
            }
            trackingSetRef.current.delete(tracked)
          }
        })
      },
      {
        rootMargin: '-30% 0px -30% 0px', // middle 40% of viewport
        threshold: 0,
      },
    )

    // Observe all glow-tracked elements
    const elements = document.querySelectorAll<HTMLElement>('.glow-tracked')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Phase 2: rAF scroll loop — fine intensity interpolation
  const updateGlow = useCallback(() => {
    if (trackingSetRef.current.size === 0) {
      scrollProgressRef.current = 0
      return
    }

    const viewportHeight = window.innerHeight
    const viewportCenter = viewportHeight / 2
    const activationRadius = viewportHeight * GLOW.activationRadius

    let maxIntensity = 0

    // Batch all reads first (avoid interleaved reads/writes)
    const readings: { tracked: TrackedElement; intensity: number }[] = []

    trackingSetRef.current.forEach((tracked) => {
      const rect = tracked.element.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const deltaY = Math.abs(elementCenter - viewportCenter)
      const intensity = GLOW.intensity(deltaY, activationRadius)

      if (intensity > maxIntensity) {
        maxIntensity = intensity
      }

      readings.push({ tracked, intensity })
    })

    // Then batch all writes
    readings.forEach(({ tracked, intensity }) => {
      if (tracked.glowLayer) {
        const opacity = intensity * GLOW.maxOpacity
        tracked.glowLayer.style.setProperty('--glow-opacity', String(opacity))
      }
    })

    scrollProgressRef.current = maxIntensity
  }, [])

  // Scroll listener — throttled via rAF
  useEffect(() => {
    const onScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
      }

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        updateGlow()
      })

      // Debounce: mark scroll as stopped after 100ms
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 100)
    }

    // Use Lenis scroll event if available, otherwise fall back to window scroll
    const lenis = (window as any).__lenis
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [updateGlow])

  return { scrollProgressRef }
}

/**
 * Simpler hook that just returns the current scrollProgress value
 * for passing as a prop to R3F components.
 * Reads from a shared ref updated by useScrollGlow.
 */
export function useScrollProgress(): number {
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const tick = () => {
      const lenis = (window as any).__lenis
      if (lenis && typeof lenis.scroll === 'number') {
        // Normalize: 0 at top, 1 at bottom of document
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        if (docHeight > 0) {
          progressRef.current = Math.min(lenis.scroll / docHeight, 1)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return progressRef.current
}
