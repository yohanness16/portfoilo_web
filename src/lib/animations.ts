/**
 * Shared animation variants, spring configs, and timing constants.
 * All motion values are centralized here to ensure consistency.
 */

// ─── SPRING PHYSICS ───
export const SPRING = {
  // Standard micro-interaction (buttons, hovers)
  micro: { stiffness: 300, damping: 25, mass: 0.8 },

  // Scroll-driven reveals
  reveal: { stiffness: 200, damping: 30, mass: 1.0 },

  // Hero entrance
  entrance: { stiffness: 150, damping: 20, mass: 1.2 },

  // Hover lift
  hover: { stiffness: 400, damping: 28, mass: 0.6 },

  // Page-level transitions
  page: { stiffness: 100, damping: 15, mass: 1.5 },
} as const

// ─── EASING CURVES ───
export const EASING = {
  out: [0.23, 1, 0.32, 1] as const,    // Strong ease-out
  inOut: [0.77, 0, 0.175, 1] as const, // Strong ease-in-out
  drawer: [0.32, 0.72, 0, 1] as const,  // iOS-like drawer
}

// ─── DURATIONS (ms) ───
export const DURATION = {
  instant: 100,   // Button press feedback
  fast: 160,      // Tooltips, small popovers
  normal: 250,    // Dropdowns, selects
  slow: 400,      // Modals, drawers
  glacial: 800,   // Marketing/explanatory only
} as const

// ─── STAGGER ───
export const STAGGER = {
  cascade: 0.08,  // 80ms between items
  tight: 0.05,    // 50ms between items
  loose: 0.12,    // 120ms between items
} as const

// ─── GLOW TIMING ───
export const GLOW = {
  // Smoothstep interpolation: t² × (3 - 2t)
  // Use for opacity and blur radius based on scroll distance
  smoothstep: (t: number) => t * t * (3 - 2 * t),

  // Calculate glow intensity from distance
  // d = distance from element center to viewport center
  // R = activation radius (viewportHeight * 0.4)
  intensity: (d: number, R: number) => {
    if (d >= R) return 0
    const t = 1 - d / R
    return t * t * (3 - 2 * t) // smoothstep
  },

  // Max glow opacity — keeps it elegant, not neon
  maxOpacity: 0.22,

  // Activation zone as fraction of half-viewport
  activationRadius: 0.4,
} as const

// ─── CSS KEYFRAME NAMES (shared) ───
export const KEYFRAMES = {
  fadeUpIn: 'fadeUpIn',
  scrollPulse: 'scrollPulse',
  tickerScroll: 'tickerScroll',
  statusPulse: 'statusPulse',
  blink: 'blink',
  scanSweep: 'scanSweep',
  pulseGlow: 'pulseGlow',
  holoShimmer: 'holoShimmer',
  grain: 'grain',
  floatUp: 'floatUp',
  orbitRotate: 'orbitRotate',
} as const
