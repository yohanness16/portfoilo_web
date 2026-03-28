'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import MatrixCanvas from '@/components/3d/MatrixCanvas'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false })

// Infinite Typewriter for Roles
function RotatingRoles() {
  const roles = [
    "BACKEND DEVELOPER",
    "CYBERSECURITY ENGINEER",
    "ML ENGINEER",
    "NETWORK ENGINEER",
    "FULLSTACK DEVELOPER",
    "RUST SPECIALIST"
  ]
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500)
      return
    }
    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % roles.length)
      return
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 30 : 70)
    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, roles])

  return (
    <span style={{ color: 'var(--red)', fontWeight: 'bold' }}>
      {`> `}{roles[index].substring(0, subIndex)}
      <span className="cursor-blink">_</span>
    </span>
  )
}

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const items = contentRef.current.querySelectorAll('[data-anim]')
    items.forEach((el, i) => {
      ;(el as HTMLElement).style.animation = `fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s both`
    })
  }, [])

  return (
    <>
      <style>{`
        @keyframes fadeUpIn {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.2; }
        }
        
        /* Fixed Pendulum Effect for Card */
        .card-pendulum-wrapper {
          perspective: 1000px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
        .card-pendulum {
          animation: pendulumSwing 3.5s cubic-bezier(0.455,0.03,0.515,0.955) infinite alternate;
          transform-origin: 50% 0%;
        }
        @keyframes pendulumSwing {
          from { transform: rotate(-6deg); }
          to   { transform: rotate(6deg); }
        }

        /* Laser Scanning Effect */
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .laser-beam {
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--red);
          box-shadow: 0 0 15px var(--red), 0 0 5px #fff;
          z-index: 5;
          animation: scan 2.5s linear infinite;
          opacity: 0.8;
        }

        /* Aggressive Glitch for Identity */
        .glitch-active {
          position: relative;
        }
        .glitch-active::before,
        .glitch-active::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.8;
        }
        .glitch-active::before {
          color: #0ff;
          z-index: -1;
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-active::after {
          color: var(--red);
          z-index: -2;
          animation: glitch-anim-2 2s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 50% 0); transform: translate(-4px, 2px); }
          100% { clip-path: inset(10% 0 80% 0); transform: translate(4px, -2px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(60% 0 10% 0); transform: translate(4px, 2px); }
          100% { clip-path: inset(30% 0 40% 0); transform: translate(-4px, -2px); }
        }

        .cursor-blink { animation: blink 0.8s step-start infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <section
        id="hero"
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '0 8%',
        }}
      >
        <HeroScene />
        <MatrixCanvas />

        {/* Radial vignette background */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={contentRef}
          style={{
            position: 'relative', zIndex: 10,
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1400px',
            gap: '60px',
          }}
        >
          {/* LEFT COLUMN: Identity & Roles */}
          <div style={{ textAlign: 'left' }}>
            <div
              data-anim
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: 5, color: 'var(--red)',
                marginBottom: 20, opacity: 0,
              }}
            >
              {'>'} ESTABLISHING_SECURE_NODE...
            </div>

            {/* Red Identity + Glitch Effect */}
            <div data-anim style={{ opacity: 0 }}>
              <h1
                className="glitch-text"
                data-text="YOHANNES DESALEGN"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 6vw, 85px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: -2,
                  color: '#fff',
                  margin: 0,
                }}
              >
                <span style={{ color: 'var(--red)', textShadow: '0 0 40px rgba(255,0,51,0.6)' }}>YOHANNES</span> DESALEGN
              </h1>
            </div>

            {/* Rotating Typewriter Roles */}
            <div
              data-anim
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 14,
                letterSpacing: 3, marginTop: 25, opacity: 0,
                minHeight: '1.5em'
              }}
            >
              <RotatingRoles />
            </div>

            <p
              data-anim
              style={{
                maxWidth: 550, fontSize: 13, lineHeight: 1.8,
                color: '#777', marginTop: 35, opacity: 0,
                fontFamily: 'var(--font-mono)',
              }}
            >
              Architecting resilient digital systems through high-performance backends and 
              advanced cybersecurity protocols. Mastering the stack from Rust kernels to 
              AI-driven automation.
            </p>

            <div data-anim style={{ display: 'flex', gap: 16, marginTop: 45, opacity: 0 }}>
              <a href="#works" className="btn-neon">DECRYPT_PROJECTS</a>
              <a href="#contact" className="btn-ghost">SEND_SIGNAL</a>
            </div>
          </div>

          {/* RIGHT COLUMN: Enlarged Card + Laser + Pendulum */}
          <div className="card-pendulum-wrapper">
            <div
              data-anim
              className="card-pendulum"
              style={{
                padding: '45px 55px',
                background: 'rgba(5,5,5,0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,0,51,0.25)',
                opacity: 0,
                width: '100%',
                maxWidth: '520px', // Enlarged Card
                position: 'relative',
                boxShadow: '0 0 60px rgba(0,0,0,0.9)'
              }}
            >
              <div className="bracket-corners" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: 10, color: 'var(--red)', textAlign: 'center', marginBottom: 40, borderBottom: '1px solid rgba(255,0,51,0.2)', paddingBottom: 20 }}>
                // SYSTEM_PROFILE //
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
                {/* Enlarged Photo Circle with Laser Beam */}
                <div style={{
                  position: 'relative',
                  width: 140, // Enlarged photo
                  height: 140,
                  borderRadius: '50%',
                  border: '3px solid var(--red)',
                  background: 'radial-gradient(circle, rgba(255,0,51,0.2) 0%, transparent 70%)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 900,
                  color: 'var(--red)',
                  boxShadow: '0 0 40px rgba(255,0,51,0.4)',
                  overflow: 'hidden' // Important for laser beam
                }}>
                  <div className="laser-beam" />
                  YD
                </div>
                
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.3, textAlign: 'center' }}>
                  <div><span style={{ color: 'var(--text-dim)' }}>ALIAS:</span> <span style={{ color: '#fff' }}>YOHANNES_D</span></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>CLASS:</span> <span style={{ color: 'var(--red)' }}>SR_ARCHITECT</span></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>ROOT:</span> <span style={{ color: '#888' }}>ADDIS_ABABA.et</span></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>STATUS:</span> <span style={{ color: 'var(--red)' }}>ENCRYPTED</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute', bottom: 40, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 10, zIndex: 10,
            animation: 'fadeUpIn 0.8s 3s both',
          }}
        >
          <div style={{
            width: 1, height: 60,
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 4, color: 'var(--text-dim)' }}>
            DATA_SCAN_CONTINUE
          </span>
        </div>
      </section>
    </>
  )
}