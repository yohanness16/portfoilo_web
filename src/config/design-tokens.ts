// Design Tokens — Single source of truth for the visual system
// DESIGN_VARIANCE: 4 (Clean, geometric, premium symmetry)
// MOTION_INTENSITY: 5 (Silky, deliberate, micro-interaction hovers)
// VISUAL_DENSITY: 4 (Spacious, high-end editorial gallery layout)

export const COLORS = {
  // Deep matte backgrounds — never pure black
  bg: '#0a0a0a',
  bgElevated: '#0e0e0e',
  bgSurface: '#141414',

  // Refined crimson accent — not neon
  accent: '#e62e4d',
  accentDim: '#b3263d',
  accentGlow: 'rgba(230, 46, 77, 0.35)',
  accentSubtle: 'rgba(230, 46, 77, 0.07)',
  accentBorder: 'rgba(230, 46, 77, 0.2)',

  // Warm editorial text tones
  text: '#c8c0b8',
  textDim: '#6b6358',
  textMuted: '#3d3730',

  // Grid
  gridLine: 'rgba(230, 46, 77, 0.025)',
} as const

export const TYPOGRAPHY = {
  fontDisplay: "'Orbitron', sans-serif",
  fontBody: "'Space Mono', monospace",
  fontMono: "'Share Tech Mono', monospace",

  // Fluid type scale using clamp()
  fsXs: 'clamp(0.65rem, 0.6vw + 0.4rem, 0.75rem)',
  fsSm: 'clamp(0.75rem, 0.7vw + 0.5rem, 0.875rem)',
  fsBase: 'clamp(0.875rem, 0.8vw + 0.6rem, 1rem)',
  fsMd: 'clamp(1rem, 1vw + 0.7rem, 1.25rem)',
  fsLg: 'clamp(1.25rem, 1.5vw + 0.8rem, 1.75rem)',
  fsXl: 'clamp(1.75rem, 2.5vw + 1rem, 3rem)',
  fs2xl: 'clamp(2.5rem, 4vw + 1.2rem, 4.5rem)',
  fs3xl: 'clamp(3.5rem, 6vw + 1.5rem, 6rem)',

  lhTight: 1.05,
  lhSnug: 1.3,
  lhNormal: 1.6,
  lhRelaxed: 1.8,
} as const

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  base: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
} as const

// ─── SECTION SPACING (DESIGN_VARIANCE: 4 — 4 core values) ───
export const SECTION_SPACING = {
  headerPaddingTop: '3rem',      // 48px — was 80px
  headerPaddingBottom: '1.5rem', // 24px — was 40px
  betweenBlocks: '1.5rem',       // 24px — was 48px
  gridGap: '1.5rem',             // 24px — unifies 16px/32px mix
  sectionPaddingBottom: '4rem',  // 64px — was 100px
} as const

// ─── GLOW SYSTEM (luxury dark ambient — NOT neon) ───
export const GLOW = {
  maxOpacity: 0.22,              // Peak glow — muted, elegant
  dormantOpacity: 0.0,           // No glow at rest
  blurRadius: 20,                // px — soft ambient spread
  spreadRadius: 40,              // px — how far glow extends beyond card
  activationZone: 0.4,           // 40% of half-viewport = activation radius
  transitionDuration: 0.4,       // seconds — smooth fade
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
} as const

// ─── CARD SYSTEM ───
export const CARD = {
  imageAspectRatio: '16/10',     // Strict ratio prevents layout shift
  imageHoverScale: 1.03,         // Subtle zoom on hover
  minHeight: 280,                // px — fallback when no image
  glowMaxOpacity: 0.22,          // Matches GLOW.maxOpacity
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
