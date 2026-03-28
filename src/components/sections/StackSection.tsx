'use client'

import dynamic from 'next/dynamic'
import {
  SiPython, SiRust, SiReact, SiNextdotjs, SiFastapi,
  SiPytorch, SiDocker, SiPostgresql, // Updated
  SiTypescript, SiLinux, SiGit,
  SiTailwindcss, SiRedis, SiKubernetes,
} from 'react-icons/si'
//import { SiAmazonaws } from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'

const TechCubeScene = dynamic(() => import('@/components/3d/TechCubeScene'), { ssr: false })

const TECH = [
  { icon: SiPython, name: 'Python', level: 95, category: 'Core' },
  { icon: SiRust, name: 'Rust', level: 78, category: 'Systems' },
  { icon: SiReact, name: 'React / R3F', level: 88, category: 'Frontend' },
  { icon: SiNextdotjs, name: 'Next.js', level: 85, category: 'Frontend' },
  { icon: SiFastapi, name: 'FastAPI', level: 92, category: 'Backend' },
  { icon: SiPytorch, name: 'PyTorch', level: 82, category: 'ML/AI' },
  { icon: SiDocker, name: 'Docker', level: 86, category: 'DevOps' },
  { icon: SiPostgresql, name: 'PostgreSQL', level: 87, category: 'Data' },
 // { icon: SiAmazonaws, name: 'AWS', level: 76, category: 'Cloud' },
  { icon: SiTypescript, name: 'TypeScript', level: 84, category: 'Frontend' },
  { icon: TbBrandThreejs, name: 'Three.js', level: 72, category: '3D' },
  { icon: SiLinux, name: 'Linux / Bash', level: 90, category: 'Systems' },
  { icon: SiRedis, name: 'Redis', level: 80, category: 'Data' },
  { icon: SiKubernetes, name: 'Kubernetes', level: 70, category: 'DevOps' },
  { icon: MdSecurity, name: 'Cybersecurity', level: 80, category: 'Sec' },
  { icon: SiGit, name: 'Git / CI/CD', level: 90, category: 'DevOps' },
]

const DIVIDER = (
  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--red), transparent)', margin: '0 48px' }} />
)

export default function StackSection() {
  return (
    <>
      {DIVIDER}
      <section id="stack" style={{ padding: '0 48px 100px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: 'center', padding: '80px 0 56px' }}>
          <span className="section-eyebrow">02_TECH_MATRIX</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 900, letterSpacing: 3, color: '#fff',
          }}>
            SKILL<span style={{ color: 'var(--red)' }}>_</span>SET
          </h2>
        </div>

        {/* Layout: cube left, grid right */}
        <div
          className="reveal-up"
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: 60,
            maxWidth: 1100,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* 3D Cube */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
             <TechCubeScene />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'var(--text-dim)', textAlign: 'center' }}>
              {'>'} HOVER_TO_DECELERATE
            </div>
            {/* Cube caption panels */}
            <div style={{ width: '100%', border: '1px solid rgba(255,0,51,0.12)', padding: 16, background: 'rgba(5,5,5,0.8)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginBottom: 12 }}>
                // ARCHITECTURE_PHILOSOPHY
              </div>
              {['Distributed-first systems', 'ML at the edge', 'Cyber-aware design', 'Performance by default'].map((t) => (
                <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ color: 'var(--red)', fontSize: 10 }}>▸</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#888' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
              gap: 10,
            }}
          >
            {TECH.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className="cyber-card"
                  style={{ padding: '16px 18px' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,0,51,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(5,5,5,0.85)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Icon
                      style={{ fontSize: 22, color: 'var(--red)', flexShrink: 0, filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }}
                    />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)', letterSpacing: 0.5 }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', letterSpacing: 2, marginTop: 2 }}>
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="tech-bar-bg">
                    <div className="tech-bar-fill" style={{ width: `${item.level}%` }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,0,51,0.5)', marginTop: 5, textAlign: 'right' }}>
                    {item.level}%
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
