'use client'

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/config/design-tokens'

/**
 * Centralized media query detection.
 * Replaces all inline windowWidth state across components.
 */
export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setIsMobile(w < BREAKPOINTS.md)
      setIsTablet(w >= BREAKPOINTS.md && w < BREAKPOINTS.lg)
      setIsDesktop(w >= BREAKPOINTS.lg)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return { isMobile, isTablet, isDesktop }
}

export function useIsMobile() {
  const { isMobile } = useMediaQuery()
  return isMobile
}

export function useIsTablet() {
  const { isTablet } = useMediaQuery()
  return isTablet
}

export function useIsDesktop() {
  const { isDesktop } = useMediaQuery()
  return isDesktop
}
