'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

/**
 * Reusable IntersectionObserver hook with guaranteed cleanup.
 * Returns [ref, isIntersecting] — attach ref to the target element.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
) {
  const { rootMargin = '0px', threshold = 0, once = false } = options
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (once && observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current)
        }
      } else if (!once) {
        setIsIntersecting(false)
      }
    },
    [once],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold,
    })
    observerRef.current.observe(el)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [handleIntersect, rootMargin, threshold])

  return { ref, isIntersecting } as const
}
