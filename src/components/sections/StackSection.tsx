'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  SiPython, SiRust, SiReact, SiNextdotjs, SiFastapi,
  SiPytorch, SiDocker, SiPostgresql,
  SiTypescript, SiLinux, SiGit,
  SiRedis, SiKubernetes,
} from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'

const TechCubeScene = dynamic(() => import('@/components/3d/TechCubeScene'), { ssr: false })

const TECH = [
  { icon: SiPython, name: 'Python', level: 95, category: 'Core', examples: 'FastAPI, Django, Celery' },
  { icon: SiRust, name: 'Rust', level: 78, category: 'Systems', examples: 'Axum, Tokio, Reqwest' },
  { icon: SiReact, name: 'React / R3F', level: 88, category: 'Frontend', examples: 'Context, Hooks, Fiber' },
  { icon: SiNextdotjs, name: 'Next.js', level: 85, category: 'Frontend', examples: 'App Router, SSR, API Routes' },
  { icon: SiFastapi, name: 'FastAPI', level: 92, category: 'Backend', examples: 'Pydantic, Starlette, Uvicorn' },
  { icon: SiPytorch, name: 'PyTorch', level: 82, category: 'ML/AI', examples: 'LLMs, CNN, Transformers' },
  { icon: SiDocker, name: 'Docker', level: 86, category: 'DevOps', examples: 'Containers, Compose, Registry' },
  { icon: SiPostgresql, name: 'PostgreSQL', level: 87, category: 'Data', examples: 'JSONB, Extensions, Indexing' },
  { icon: SiTypescript, name: 'TypeScript', level: 84, category: 'Frontend', examples: 'Strict typing, Generics, Unions' },
  { icon: TbBrandThreejs, name: 'Three.js', level: 72, category: '3D', examples: 'WebGL, Shaders, Geometries' },
  { icon: SiLinux, name: 'Linux / Bash', level: 90, category: 'Systems', examples: 'Shell scripting, Sysadmin' },
  { icon: SiRedis, name: 'Redis', level: 80, category: 'Data', examples: 'Cache, Pub/Sub, Streams' },
  { icon: SiKubernetes, name: 'Kubernetes', level: 70, category: 'DevOps', examples: 'Pods, Deployments, Services' },
  { icon: MdSecurity, name: 'Cybersecurity', level: 80, category: 'Sec', examples: 'Encryption, Auth, Pentesting' },
  { icon: SiGit, name: 'Git / CI/CD', level: 90, category: 'DevOps', examples: 'GitHub Actions, Pipelines' },
]

const ARCHITECTURE_PATTERNS = {
  'Core': { icon: '⚙️', desc: 'Distributed-first systems', examples: ['Python', 'Rust', 'FastAPI'] },
  'Systems': { icon: '🔧', desc: 'Performance by default', examples: ['Rust', 'Linux', 'Docker'] },
  'Frontend': { icon: '🎨', desc: 'Cyber-aware design', examples: ['React', 'Next.js', 'Three.js'] },
  'Backend': { icon: '⚡', desc: 'ML at the edge', examples: ['FastAPI', 'PyTorch', 'Redis'] },
  'ML/AI': { icon: '🧠', desc: 'ML at the edge', examples: ['PyTorch', 'Python', 'Redis'] },
  'DevOps': { icon: '🛠️', desc: 'Infrastructure as code', examples: ['Docker', 'Kubernetes', 'CI/CD'] },
  'Data': { icon: '📊', desc: 'Data-driven optimization', examples: ['PostgreSQL', 'Redis', 'PyTorch'] },
  '3D': { icon: '🎭', desc: 'Immersive experiences', examples: ['Three.js', 'React', 'WebGL'] },
  'Sec': { icon: '🔒', desc: 'Security-first mindset', examples: ['Cybersecurity', 'Encryption', 'Linux'] },
}

export default function StackSection() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024

  const DIVIDER = (
    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--red), transparent)', margin: isMobile ? '0 20px' : '0 48px' }} />
  )

  return (
    <>
      {DIVIDER}
      <section id="stack" style={{ padding: isMobile ? '0 20px 60px' : '0 48px 100px', position: 'relative', zIndex: 10 }}>
        <div className="reveal-up" style={{ textAlign: 'center', padding: isMobile ? '40px 0 30px' : '80px 0 56px' }}>
          <span className="section-eyebrow">02_TECH_MATRIX</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900, letterSpacing: 3, color: '#fff',
          }}>
            SKILL<span style={{ color: 'var(--red)' }}>_</span>SET
          </h2>
        </div>

        <div
          className="reveal-up"
          style={{
            display: 'flex',
            flexDirection: (isMobile || isTablet) ? 'column' : 'row',
            gap: isMobile ? 30 : 60,
            maxWidth: 1200,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          <div style={{ 
            width: (isMobile || isTablet) ? '100%' : '400px',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 24,
            flexShrink: 0
          }}>
            <div style={{ 
              width: '100%', 
              border: '1px solid rgba(255,0,51,0.12)', 
              padding: 20, 
              background: 'rgba(5,5,5,0.8)',
              boxShadow: 'inset 0 0 20px rgba(255,0,51,0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2, color: 'var(--red)', marginBottom: 15 }}>
                // ARCH_PATTERN
              </div>
              
              {hoveredTech ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {(() => {
                    const hoveredItem = TECH.find(t => t.name === hoveredTech)
                    const pattern = hoveredItem ? ARCHITECTURE_PATTERNS[hoveredItem.category as keyof typeof ARCHITECTURE_PATTERNS] : null
                    return pattern ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 24 }}>{pattern.icon}</span>
                          <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: '#fff' }}>
                              {hoveredItem?.name}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginTop: 2 }}>
                              {pattern.desc}
                            </div>
                          </div>
                        </div>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1fr 1fr', 
                          gap: 8,
                          paddingTop: 10,
                          borderTop: '1px solid rgba(255,0,51,0.1)'
                        }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--red)', letterSpacing: 1, marginBottom: 6 }}>
                              STACK
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#999', lineHeight: 1.5 }}>
                              {hoveredItem?.examples}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--red)', letterSpacing: 1, marginBottom: 6 }}>
                              SKILL
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ width: `${hoveredItem?.level}%`, height: '100%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
                              </div>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--red)', minWidth: 25 }}>
                                {hoveredItem?.level}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null
                  })()}
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr', 
                  gap: 10 
                }}>
                  {['⚙️ Distributed-first', '🧠 ML at the edge', '🔒 Cyber-aware', '⚡ Performance-first'].map((t) => (
                    <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 12 }}>{t.split(' ')[0]}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#999' }}>{t.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ 
              width: '100%', 
              height: isMobile ? '260px' : isTablet ? '320px' : '400px',
              position: 'relative'
            }}>
              <TechCubeScene />
            </div>
            
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-dim)', textAlign: 'center' }}>
              {'>'} HOVER_TO_DECELERATE
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
              width: '100%'
            }}
          >
            {TECH.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className="cyber-card"
                  style={{ 
                    padding: isMobile ? '12px' : '18px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,0,51,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(255,0,51,0.4)'
                    setHoveredTech(item.name)
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(5,5,5,0.85)'
                    e.currentTarget.style.borderColor = 'rgba(255,0,51,0.15)'
                    setHoveredTech(null)
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Icon
                      style={{ fontSize: isMobile ? 18 : 22, color: 'var(--red)', flexShrink: 0, filter: 'drop-shadow(0 0 8px rgba(255,0,51,0.5))' }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: isMobile ? 9 : 11, 
                        color: '#fff', 
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {item.name.toUpperCase()}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)', letterSpacing: 1 }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                    <div className="tech-bar-fill" style={{ 
                      width: `${item.level}%`, 
                      height: '100%', 
                      background: 'var(--red)',
                      boxShadow: '0 0 10px var(--red)'
                    }} />
                  </div>
                  
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: 8, 
                    color: 'rgba(255,0,51,0.6)', 
                    marginTop: 6, 
                    textAlign: 'right',
                    letterSpacing: 1
                  }}>
                    {item.level}%_LOAD
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}