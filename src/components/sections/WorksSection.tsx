'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { BiNetworkChart } from 'react-icons/bi'
import { SiReact, SiFastapi } from 'react-icons/si'
import { FaMicrochip } from 'react-icons/fa'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

const ProjectsScene = dynamic(() => import('@/components/3d/ProjectsScene'), { ssr: false })

const GLITCH_CHARS = '!@#$%^&*<>?/~+=_'

function useGlitchText(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const max = 12
    const iv = setInterval(() => {
      if (frame >= max) {
        setDisplay(text)
        clearInterval(iv)
        return
      }
      setDisplay(
        text
          .split('')
          .map((c) => (c === ' ' ? ' ' : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
          .join(''),
      )
      frame++
    }, 50)
    return () => clearInterval(iv)
  }, [trigger, text])

  return display
}

const FIELDS = [
  { key: 'all', label: 'ALL_SYSTEMS', icon: BiNetworkChart },
  { key: 'frontend', label: 'FRONTEND', icon: SiReact },
  { key: 'backend', label: 'BACKEND', icon: SiFastapi },
  { key: 'systems', label: 'SYSTEMS', icon: FaMicrochip },
] as const

interface WorksSectionProps {
  scrollProgress?: number
}

export default function WorksSection({ scrollProgress = 0 }: WorksSectionProps) {
  const [activeField, setActiveField] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [glitchTrigger, setGlitchTrigger] = useState(0)
  const glitchRef = useRef<HTMLHeadingElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const iv = setInterval(() => {
      setGlitchTrigger((t) => t + 1)
    }, 4000 + Math.random() * 6000)
    return () => clearInterval(iv)
  }, [isMobile])

  const glitchText = useGlitchText('WORKS', glitchTrigger > 0)
  const filtered = activeField === 'all' ? PROJECTS : PROJECTS.filter((p) => p.field === activeField)

  const handlePreview = useCallback((slug: string) => {
    router.push(`/works/${slug}`)
  }, [router])

  return (
    <section
      id="works"
      className="section-deferred layout-contain"
      style={{ padding: isMobile ? '0 20px 48px' : '0 48px 64px', position: 'relative', zIndex: 10 }}
    >
      {/* ─── HEADER ─── */}
      <header
        className="reveal-up"
        style={{ textAlign: 'center', padding: isMobile ? '32px 0 20px' : '48px 0 24px' }}
      >
        <span className="section-eyebrow">03_PROJECT_VAULT</span>
        <h2
          ref={glitchRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 900,
            letterSpacing: isMobile ? 1 : 3,
            color: '#fff',
            position: 'relative',
            minHeight: '1.2em',
          }}
        >
          {glitchText}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--text-dim)',
            letterSpacing: 2,
            marginTop: 12,
          }}
        >
          SELECT CLEARANCE LEVEL
        </p>
      </header>

      {/* ─── FILTER BUTTONS ─── */}
      <div
        className="reveal-up"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            maxWidth: 520,
          }}
        >
          {!isMobile && (
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 7,
                letterSpacing: 1,
                color: 'var(--red)',
                boxShadow: '0 0 30px rgba(230,46,77,0.4), inset 0 0 20px rgba(230,46,77,0.1)',
                animation: 'pulseGlow 2s infinite',
                padding: '4px 12px',
                border: '1px solid var(--red)',
                marginRight: 8,
              }}
            >
              CORE
            </div>
          )}

          {FIELDS.map((f) => {
            const Icon = f.icon
            const isActive = activeField === f.key

            return (
              <button
                key={f.key}
                onClick={() => setActiveField(f.key)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 8,
                  letterSpacing: 1,
                  padding: '8px 12px',
                  border: `1px solid ${isActive ? 'var(--red)' : 'rgba(230,46,77,0.2)'}`,
                  background: isActive ? 'var(--red)' : 'rgba(10,10,10,0.8)',
                  color: isActive ? '#0a0a0a' : 'var(--text-dim)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 20px rgba(230,46,77,0.5)' : 'none',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                }}
              >
                <Icon style={{ fontSize: 12 }} />
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 3D CANVAS ─── */}
      <div
        className="reveal-up canvas-boundary"
        style={{
          maxWidth: 1100,
          aspectRatio: isMobile ? '16/10' : '16/9',
          margin: '0 auto',
          border: '1px solid rgba(230,46,77,0.1)',
          background: 'rgba(10,10,10,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 7,
            letterSpacing: 2,
            color: 'rgba(230,46,77,0.4)',
            zIndex: 5,
          }}
        >
          {'// 3D_NODE_VIEW'}
        </div>
        <ProjectsScene
          projects={PROJECTS}
          activeField={activeField}
          onPreview={handlePreview}
          scrollProgress={scrollProgress}
        />
      </div>

      {/* ─── PROJECT CARDS GRID ─── */}
      <div
        className="card-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 24,
          maxWidth: 1100,
          margin: '24px auto 0',
        }}
      >
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isMobile={isMobile}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </section>
  )
}
