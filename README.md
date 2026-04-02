#  DEVELOPER PORTFOLIO
### YOH_OS v2.0 — Black & Neon Red Cyber Portfolio

A production-grade Next.js 14 portfolio with full 3D immersion, interactive terminal, and cinematic scroll effects.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D Engine | React Three Fiber + Three.js |
| 3D Helpers | @react-three/drei |
| Post-FX | @react-three/postprocessing (UnrealBloom, ChromaticAberration) |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Icons | react-icons |
| Styling | Tailwind CSS + CSS Variables |

---

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── 3d/
│   │   ├── HeroScene.tsx        # Particle starfield + red nebula
│   │   ├── MatrixCanvas.tsx     # Falling binary/katakana rain
│   │   ├── TechCubeScene.tsx    # Rotating glass cube with Bloom
│   │   └── ProjectsScene.tsx    # 3D nodes + laser lines
│   ├── sections/
│   │   ├── HeroSection.tsx      # Glitch name, pendulum, wanted card
│   │   ├── StackSection.tsx     # 3D cube + 16-item tech grid
│   │   ├── WorksSection.tsx     # Radial HUD + 3D nodes + cards
│   │   ├── ContactSection.tsx   # Terminal + bento social grid
│   │   └── FooterSection.tsx    # Ticker + social icons
│   ├── terminal/
│   │   └── Terminal.tsx         # Interactive sudo shell
│   └── ui/
│       ├── Cursor.tsx           # Custom red cursor + ring
│       └── Navbar.tsx           # Transparent -> blur on scroll
├── hooks/
│   ├── useLenis.ts
│   ├── useScrollReveal.ts
│   └── useGSAPScrollEffects.ts
└── styles/
    └── globals.css              # All CSS vars, keyframes, utilities
```

---

## Customizing Your Info

**Terminal contact data** — `src/components/terminal/Terminal.tsx`
```ts
const CONTACT_DATA = {
  phone: '+251 9XX XXX XXX',
  email: 'yohannes@dev.et',
  linkedin: 'linkedin.com/in/YOUR_HANDLE',
  github: 'github.com/YOUR_USERNAME',
  telegram: 't.me/YOUR_HANDLE',
  whatsapp: '+251 ...',
}
```

**Projects** — `src/components/sections/WorksSection.tsx` → `ALL_PROJECTS` array

**Tech skills** — `src/components/sections/StackSection.tsx` → `TECH` array

**Social links** — update `href` in `ContactSection.tsx` and `FooterSection.tsx`

---

## Features

- Custom red cursor with smooth ring follow
- CRT scanlines + scan sweep beam + noise overlay
- Lenis smooth scroll (physics-based)
- GSAP ScrollTrigger parallax on hero, stagger on cards
- Glitch RGB-split text animation
- Pendulum swing on hero headline
- 3D glass cube with UnrealBloom + ChromaticAberration
- 2800-particle starfield with red nebula ring
- Animated matrix binary rain canvas
- Radial HUD orbit field selector
- 3D dodecahedron project nodes with laser connection lines
- Interactive terminal: boot sequence, sudo commands, decryption animation, command history, easter egg
- Bento contact grid with react-icons branded icons
- Scrolling system status ticker in footer

---

## Deploy

```bash
# Vercel
npx vercel

# Build
npm run build
```
