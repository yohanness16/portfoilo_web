'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import MatrixCanvas from '@/components/3d/MatrixCanvas'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false })

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
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll('[data-anim]')
      items.forEach((el, i) => {
        ;(el as HTMLElement).style.animation = `fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s both`
      })
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

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
        .card-pendulum-wrapper {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .card-pendulum {
          animation: pendulumSwing 3.5s cubic-bezier(0.455,0.03,0.515,0.955) infinite alternate;
          transform-origin: 50% 0%;
        }
        @keyframes pendulumSwing {
          from { transform: rotate(-3deg); }
          to   { transform: rotate(3deg); }
        }
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
          padding: isMobile ? '120px 20px 80px' : '0 8%',
        }}
      >
        <HeroScene />
        <MatrixCanvas />

        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.9) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={contentRef}
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1400px',
            gap: isMobile ? '50px' : '60px',
          }}
        >
          <div style={{ 
            textAlign: isMobile ? 'center' : 'left',
            flex: isMobile ? 'none' : '1.2',
            width: '100%'
          }}>
            <div
              data-anim
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: 4, color: 'var(--red)',
                marginBottom: 15, opacity: 0,
              }}
            >
              {'>'} ESTABLISHING_SECURE_NODE...
            </div>

            <div data-anim style={{ opacity: 0 }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? 'clamp(38px, 12vw, 60px)' : 'clamp(40px, 8vw, 85px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: -1,
                  color: '#fff',
                  margin: 0,
                }}
              >
                <span style={{ color: 'var(--red)', textShadow: '0 0 30px rgba(255,0,51,0.5)' }}>YOHANNES</span><br /> DESALEGN
              </h1>
            </div>

            <div
              data-anim
              style={{
                fontFamily: 'var(--font-mono)', fontSize: isMobile ? 12 : 14,
                letterSpacing: 2, marginTop: 20, opacity: 0,
                minHeight: '1.5em'
              }}
            >
              <RotatingRoles />
            </div>

            <p
              data-anim
              style={{
                maxWidth: isMobile ? '100%' : 550, fontSize: isMobile ? 11 : 13, lineHeight: 1.8,
                color: '#888', marginTop: 30, opacity: 0,
                fontFamily: 'var(--font-mono)',
                marginInline: isMobile ? 'auto' : '0'
              }}
            >
              Architecting resilient digital systems through high-performance backends and 
              advanced cybersecurity protocols. Mastering the stack from Rust kernels to 
              AI-driven automation.
            </p>

            <div data-anim style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 16, 
              marginTop: 40, 
              opacity: 0,
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <a href="#works" className="btn-neon" style={{ width: (isMobile) ? '100%' : 'auto', minWidth: isTablet ? '180px' : 'auto', textAlign: 'center' }}>DECRYPT_PROJECTS</a>
              <a href="#contact" className="btn-ghost" style={{ width: (isMobile) ? '100%' : 'auto', minWidth: isTablet ? '180px' : 'auto', textAlign: 'center' }}>SEND_SIGNAL</a>
            </div>
          </div>

          <div className="card-pendulum-wrapper" style={{ flex: isMobile ? 'none' : '0.8', width: '100%' }}>
            <div
              data-anim
              className={isMobile ? "" : "card-pendulum"}
              style={{
                padding: isMobile ? '40px 30px' : '40px 50px',
                background: 'rgba(5,5,5,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,0,51,0.3)',
                opacity: 0,
                width: '100%',
                maxWidth: isMobile ? '100%' : '480px',
                position: 'relative',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: 8, color: 'var(--red)', textAlign: 'center', marginBottom: 25, borderBottom: '1px solid rgba(255,0,51,0.1)', paddingBottom: 15 }}>
                // SYSTEM_PROFILE //
              </div>
              
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'column', gap: isMobile ? 25 : 30, alignItems: 'center' }}>
                <div style={{
                  position: 'relative',
                  width: isMobile ? 100 : 120,
                  height: isMobile ? 100 : 120,
                  borderRadius: '50%',
                  border: '2px solid var(--red)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 36, fontWeight: 900,
                  color: 'var(--red)',
                  boxShadow: '0 0 30px rgba(255,0,51,0.3)',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <div className="laser-beam" />
                  YD
                </div>
                
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: isMobile ? 11 : 11, 
                  lineHeight: isMobile ? 2.2 : 2.2, 
                  textAlign: 'center',
                  width: '100%'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: isMobile ? 8 : 0, marginBottom: isMobile ? 8 : 0 }}>
                    <span style={{ color: 'var(--text-dim)' }}>ALIAS:</span> <span style={{ color: '#fff' }}>YOHANNES_D</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: isMobile ? 8 : 0, marginBottom: isMobile ? 8 : 0 }}>
                    <span style={{ color: 'var(--text-dim)' }}>CLASS:</span> <span style={{ color: 'var(--red)' }}>SR_ARCHITECT</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>ROOT:</span> <span style={{ color: '#888' }}>ADDIS_ABABA.et</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute', bottom: 20, left: '50%',
            transform: 'translateX(-50%)',
            display: isMobile ? 'none' : 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, zIndex: 10,
            animation: 'fadeUpIn 0.8s 2s both',
          }}
        >
          <div style={{
            width: 1, height: 50,
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 3, color: 'var(--text-dim)' }}>
            DATA_SCAN
          </span>
        </div>
      </section>
    </>
  )
}