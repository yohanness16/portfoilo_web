'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  SiPython, SiRust, SiReact, SiFastapi, SiPytorch,
  SiDocker, SiTypescript, SiApachekafka,
  SiRedis, SiLinux,
} from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'
import { BiNetworkChart } from 'react-icons/bi'
import { MdSecurity, MdOutlineVisibility } from 'react-icons/md'
import { FaBrain, FaMicrochip, FaRobot } from 'react-icons/fa'

const ProjectsScene = dynamic(() => import('@/components/3d/ProjectsScene'), { ssr: false })

// Glitch text scrambler
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
          .join('')
      )
      frame++
    }, 50)
    return () => clearInterval(iv)
  }, [trigger, text])

  return display
}

export const ALL_PROJECTS = [
  { id: 'TRANSPORT_TRACKER_V1', name: 'Real-Time Transport Tracker', field: 'backend', tags: ['TypeScript', 'Next.js', 'GPS', 'Fullstack'], desc: 'Senior thesis — real-time public transport tracking system with live GPS telemetry and route optimization.', icons: [SiTypescript, SiFastapi, SiDocker], link: 'https://github.com/yohanness16/FYP-frontend' },
  { id: 'FINAL_YEAR_PY', name: 'Transport ML Pipeline', field: 'ml', tags: ['Python', 'ML', 'Data Analysis', 'Prediction'], desc: 'ML pipeline for transport ETA prediction and anomaly detection. Core of final year project.', icons: [SiPython, SiPytorch], link: 'https://github.com/yohanness16/finalYear' },
  { id: 'MEDIA_COMPRESSOR', name: 'Media Compressor API', field: 'backend', tags: ['TypeScript', 'FFmpeg', 'API', 'Cloud'], desc: 'High-performance media compression service for video, image, and audio. Batch processing with queue.', icons: [SiTypescript, SiFastapi], link: 'https://github.com/yohanness16/media_compressor' },
  { id: 'ECHATTER', name: 'E-Commerce Platform', field: 'backend', tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'], desc: 'Full-stack e-commerce backend with JWT auth, cart system, and payment integration. Production ready.', icons: [SiPython, SiTypescript], link: 'https://github.com/yohanness16/ecommerce_backend' },
  { id: 'CHAT_APP', name: 'ChitChat Messenger', field: 'frontend', tags: ['JavaScript', 'Socket.io', 'Real-Time', 'Chat'], desc: 'Real-time chat application with WebSocket messaging, typing indicators, and user presence detection.', icons: [SiReact, SiApachekafka], link: 'https://github.com/yohanness16/ChitChat' },
  { id: 'OBJECT_DETECTION', name: 'Computer Vision Pipeline', field: 'ml', tags: ['Python', 'OpenCV', 'YOLO', 'Detection'], desc: 'Object detection system using CNN-based models. Real-time inference with custom dataset training.', icons: [SiPython, MdOutlineVisibility], link: 'https://github.com/yohanness16/object_detection' },
  { id: 'DOBOT_CR10A', name: 'Robotic Arm Control System', field: 'systems', tags: ['Python', 'Robotics', 'Automation', 'ROS'], desc: 'Control interface for Dobot CR10A robotic arm. Automated pick-and-place with CV integration.', icons: [SiPython, SiRust, MdSecurity], link: 'https://github.com/yohanness16/dobot-cr10a' },
  { id: 'GDG_AUTH', name: 'JWT Auth with Asymmetric Keys', field: 'backend', tags: ['JavaScript', 'JWT', 'Express', 'Security'], desc: 'Secure auth using JWT asymmetric key pairs. Token tracking and session management. GDG project.', icons: [SiFastapi, SiTypescript], link: 'https://github.com/yohanness16/gdg-express-auth-jwt-public-private-key-tracked-token-yohannes-task' },
  { id: 'CYBER_UI_LIB_V2', name: 'Cyber UI Component Library', field: 'frontend', tags: ['React', 'TypeScript', 'CSS-in-JS', 'Storybook'], desc: 'Production-grade React components with cyber aesthetic. Full TypeScript, zero deps.', icons: [SiReact, SiTypescript], link: 'https://github.com/yohanness16/plug_and_play' },
  { id: 'PC_REPAIR_SYS', name: 'PC Repair Management System', field: 'backend', tags: ['TypeScript', 'Database', 'Management', 'CRUD'], desc: 'Ticket-based PC repair tracking system. Client management, repair status workflow, and reporting.', icons: [SiTypescript, SiDocker], link: 'https://github.com/yohanness16/pc-repair-system' },
  { id: 'PROPOSAL_SYS', name: 'Proposal Generator', field: 'frontend', tags: ['TypeScript', 'Next.js', 'PDF', 'Templates'], desc: 'Dynamic proposal and document generation system with templating and export capabilities.', icons: [SiReact, SiTypescript], link: 'https://github.com/yohanness16/proposal' },
  { id: 'GDG_NODE_APP', name: 'GDG Node.js Track App', field: 'backend', tags: ['JavaScript', 'Node.js', 'Express', 'REST'], desc: 'GDG workshop project — Node.js REST application with routing, middleware, and API patterns.', icons: [SiFastapi, SiTypescript], link: 'https://github.com/yohanness16/GDG-Node-track-yohannes-desalegn' },
  { id: 'BACKEND_API', name: 'Core Backend API', field: 'backend', tags: ['JavaScript', 'REST', 'API', 'Server'], desc: 'Modular backend API server with authentication, CRUD endpoints, and health monitoring. 1★ repo.', icons: [SiFastapi, SiRedis], link: 'https://github.com/yohanness16/backend' },
  { id: 'PORTFOILO_V1', name: 'Portfolio v1 (Legacy)', field: 'frontend', tags: ['TypeScript', 'Next.js', 'Portfolio', 'UI'], desc: 'First iteration of this portfolio site. Superseded by v2 — here for reference and nostalgia.', icons: [SiReact, SiTypescript], link: 'https://github.com/yohanness16/portfoilo' },
]

const FIELDS = [
  { key: 'all', label: 'ALL_SYSTEMS', icon: BiNetworkChart },
  { key: 'ml', label: 'ML & AI', icon: FaBrain },
  { key: 'frontend', label: 'FRONTEND', icon: SiReact },
  { key: 'backend', label: 'BACKEND', icon: SiFastapi },
  { key: 'systems', label: 'SYSTEMS', icon: FaMicrochip },
]

export default function WorksSection() {
  const [activeField, setActiveField] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [glitchTrigger, setGlitchTrigger] = useState(0)
  const glitchRef = useRef<HTMLHeadingElement>(null)

  // Periodic glitch on desktop
  useEffect(() => {
    if (isMobile) return
    const iv = setInterval(() => {
      setGlitchTrigger((t) => t + 1)
    }, 4000 + Math.random() * 6000) // every 4-10s
    return () => clearInterval(iv)
  }, [isMobile])

  const glitchText = useGlitchText('WORKS', glitchTrigger > 0)

  // Glitch flash effect on cards
  const triggerCardGlitch = useCallback(() => {
    if (isMobile) return
    document.querySelectorAll('.work-card').forEach((card) => {
      card.classList.add('work-glitch-active')
      setTimeout(() => card.classList.remove('work-glitch-active'), 300)
    })
  }, [isMobile])

  const filtered = activeField === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.field === activeField)

  const DIVIDER = (
    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--red), transparent)', margin: isMobile ? '0 20px' : '0 48px' }} />
  )

  return (
    <>
      {DIVIDER}
      <section id="works" style={{ padding: isMobile ? '0 20px 60px' : '0 48px 100px', position: 'relative', zIndex: 10 }}>
        
        <div className="reveal-up" style={{ textAlign: 'center', padding: isMobile ? '40px 0 30px' : '80px 0 40px' }}>
          <span className="section-eyebrow">03_PROJECT_VAULT</span>
          <h2 ref={glitchRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 900, letterSpacing: isMobile ? 1 : 3, color: '#fff',
            position: 'relative',
          }}>
            {glitchText}
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', letterSpacing: 2, marginTop: 12 }}>
            SELECT CLEARANCE LEVEL
          </p>
        </div>

        <div className="reveal-up" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 48,
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: isMobile ? 10 : 0
        }}>
          <div style={{ 
            position: 'relative', 
            width: isMobile ? '100%' : 520, 
            height: isMobile ? 'auto' : 160, 
            display: 'flex', 
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            alignItems: 'center', 
            justifyContent: 'center',
            gap: isMobile ? 8 : 0
          }}>
            {!isMobile && (
              <>
                <div className="orbit-ring" style={{ position: 'absolute', width: 480, height: 100, borderRadius: '50%' }} />
                <div className="orbit-ring orbit-ring-reverse" style={{ position: 'absolute', width: 440, height: 80, borderRadius: '50%', opacity: 0.4 }} />
                <div style={{
                  position: 'absolute',
                  width: 50, height: 50, borderRadius: '50%',
                  border: '2px solid var(--red)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 7, letterSpacing: 1,
                  color: 'var(--red)',
                  boxShadow: '0 0 30px rgba(255,0,51,0.4), inset 0 0 20px rgba(255,0,51,0.1)',
                  animation: 'pulseGlow 2s infinite',
                  zIndex: 2,
                }}>CORE</div>
              </>
            )}

            {FIELDS.map((f, i) => {
              const angle = (i / FIELDS.length) * Math.PI * 2 - Math.PI / 2
              const rx = 220, ry = 50
              const x = Math.cos(angle) * rx
              const y = Math.sin(angle) * ry
              const Icon = f.icon
              const isActive = activeField === f.key

              return (
                <button
                  key={f.key}
                  onClick={() => setActiveField(f.key)}
                  style={{
                    position: isMobile ? 'static' : 'absolute',
                    left: isMobile ? 'auto' : `calc(50% + ${x}px)`,
                    top: isMobile ? 'auto' : `calc(50% + ${y}px)`,
                    transform: isMobile ? 'none' : 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 8, letterSpacing: 1,
                    padding: '8px 12px',
                    border: `1px solid ${isActive ? 'var(--red)' : 'rgba(255,0,51,0.2)'}`,
                    background: isActive ? 'var(--red)' : 'rgba(0,0,0,0.8)',
                    color: isActive ? '#000' : 'var(--text-dim)',
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', gap: 6,
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 0 20px rgba(255,0,51,0.5)' : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Icon style={{ fontSize: 12 }} />
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="reveal-up" style={{ 
          maxWidth: 1100, 
          height: isMobile ? 300 : 'auto',
          margin: '0 auto', 
          border: '1px solid rgba(255,0,51,0.1)', 
          background: 'rgba(0,0,0,0.5)', 
          position: 'relative', 
          overflow: 'hidden' 
        }}>
          <div style={{
            position: 'absolute', top: 10, left: 16,
            fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: 2, color: 'rgba(255,0,51,0.4)',
            zIndex: 5,
          }}>
            // 3D_NODE_VIEW
          </div>
          <ProjectsScene projects={ALL_PROJECTS} activeField={activeField} />
        </div>

        <div
          className="reveal-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 14,
            maxWidth: 1100,
            margin: '32px auto 0',
          }}
        >
          {filtered.map((project) => (
            <div key={project.id} className="cyber-card bracket-corners work-card" style={{ padding: isMobile ? 20 : 28 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2, color: 'rgba(255,0,51,0.6)', marginBottom: 14 }}>
                [ID: {project.id}]
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                {project.icons.map((Icon, i) => (
                  <Icon key={i} style={{ fontSize: 18, color: 'var(--red)' }} />
                ))}
                <div style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)', fontSize: 7,
                  padding: '2px 8px',
                  border: '1px solid rgba(255,0,51,0.25)',
                  color: 'rgba(255,0,51,0.7)',
                }}>
                  {project.field}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 1, marginBottom: 10 }}>
                {project.name}
              </div>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.6, color: '#777', marginBottom: 20 }}>
                {project.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 7,
                    padding: '2px 7px',
                    border: '1px solid rgba(255,0,51,0.18)',
                    color: 'rgba(255,0,51,0.8)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2,
                  color: 'var(--red)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                {'>'} DEPLOY
              </a>
            </div>
          ))}
        </div>
      </section>
      <style>{`
        @keyframes work-glitch {
          0% { transform: none; opacity: 1; }
          20% { transform: translate(-2px, 0); opacity: 0.8; }
          40% { transform: translate(1px, 0); }
          60% { transform: translate(-1px, 0); }
          80% { transform: translate(0); opacity: 0.9; }
          100% { transform: none; opacity: 1; }
        }
        .work-glitch-active {
          animation: work-glitch 0.3s ease-out;
          position: relative;
        }
        .work-glitch-active::before,
        .work-glitch-active::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .work-glitch-active::before {
          transform: translate(0);
          clip-path: inset(20% 0 40% 0);
          border-left: 2px solid rgba(255, 0, 51, 0.6);
        }
        .work-glitch-active::after {
          transform: translate(0);
          clip-path: inset(60% 0 10% 0);
          border-right: 2px solid rgba(255, 0, 51, 0.4);
        }
      `}</style>
    </>
  )
}