'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BIO_DATA = [
  {
    year: '2022',
    title: 'THE_INITIATION',
    content: 'Started journey at Addis Ababa Science and Technology University (AASTU), diving deep into Electrical and Computer Engineering.',
    tags: ['AASTU', 'ENGINEERING']
  },
  {
    year: '2023',
    title: 'CORE_SYSTEMS',
    content: 'Mastered the fundamentals of Web Development and Backend architecture. Built high-performance systems using Node.js and Python.',
    tags: ['BACKEND', 'PYTHON']
  },
  {
    year: '2024',
    title: 'SECURE_NODE',
    content: 'Specialized in Cybersecurity. Developed reconnaissance tools and explored penetration testing, focusing on digital resilience.',
    tags: ['CYBERSECURITY', 'LINUX']
  },
  {
    year: '2025',
    title: 'ADVANCED_STACK',
    content: 'Embraced Rust for low-level performance and AI-driven automation. Started senior graduation thesis on Real-Time Public Transport Tracking.',
    tags: ['RUST', 'AI/ML']
  },
  {
    year: '2026',
    title: 'CURRENT_EXECUTION',
    content: 'Leading projects in financial infrastructure and elite UI libraries. Continuous evolution through high-performance software engineering.',
    tags: ['SCALABILITY', 'INNOVATION']
  }
]

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      )

      const items = gsap.utils.toArray('.bio-item')
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { 
            y: 100, 
            opacity: 0,
            filter: 'blur(10px)'
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="bio"
      style={{
        padding: '100px 0',
        background: '#000',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span className="section-eyebrow">01_BIOGRAPHY</span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: 900,
          color: '#fff',
          letterSpacing: 2
        }}>
          EVOLUTION<span style={{ color: 'var(--red)' }}>_</span>PATH
        </h2>
      </div>

      <div 
        ref={containerRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          padding: '0 20px'
        }}
      >
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, var(--red), var(--red), transparent)',
            transformOrigin: 'top',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}
        />

        {BIO_DATA.map((item, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={item.year}
              className="bio-item"
              style={{
                display: 'flex',
                justifyContent: isEven ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: '100px',
                position: 'relative',
                zIndex: 2
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  textAlign: isEven ? 'right' : 'left',
                  padding: isEven ? '0 50px 0 0' : '0 0 0 50px'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--red)',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  [{item.year}]
                </div>
                
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: '#fff',
                  marginBottom: '15px',
                  letterSpacing: 1
                }}>
                  {item.title}
                </h3>

                <div
                  className="cyber-card"
                  style={{
                    padding: '25px',
                    background: 'rgba(5,5,5,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,0,51,0.1)',
                    display: 'inline-block',
                    textAlign: 'left'
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: 1.8,
                    color: '#aaa',
                    margin: 0
                  }}>
                    {item.content}
                  </p>
                  
                  <div style={{ 
                    marginTop: '15px', 
                    display: 'flex', 
                    gap: '10px',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap'
                  }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 8px',
                        border: '1px solid rgba(255,0,51,0.3)',
                        color: 'var(--red)'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  width: '12px',
                  height: '12px',
                  background: '#000',
                  border: '2px solid var(--red)',
                  borderRadius: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 15px var(--red)'
                }}
              />
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #bio .bio-item {
            justify-content: flex-start !important;
          }
          #bio .bio-item > div:first-child {
            text-align: left !important;
            padding: 0 0 0 40px !important;
            max-width: 100% !important;
          }
          #bio div[ref="lineRef"], 
          #bio .bio-item > div:last-child {
            left: 20px !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}