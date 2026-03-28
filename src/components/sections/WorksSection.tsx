'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  SiPython, SiRust, SiReact, SiFastapi, SiPytorch,
  SiDocker, SiTypescript, SiApachekafka, // Updated
  SiRedis, SiLinux,
} from 'react-icons/si'
import { TbBrandThreejs } from 'react-icons/tb'
import { BiNetworkChart } from 'react-icons/bi'
import { MdSecurity, MdOutlineVisibility } from 'react-icons/md'
import { FaBrain, FaMicrochip, FaRobot } from 'react-icons/fa'

const ProjectsScene = dynamic(() => import('@/components/3d/ProjectsScene'), { ssr: false })

export const ALL_PROJECTS = [
  {
    id: 'AI_STORY_GEN_V1',
    name: 'AI Story Generator',
    field: 'ml',
    tags: ['PyTorch', 'Transformers', 'FastAPI', 'Python'],
    desc: 'Fine-tuned transformer for long-form narrative generation with custom attention architecture.',
    icons: [SiPytorch, SiPython, SiFastapi],
    link: '#',
  },
  {
    id: 'TRANSPORT_TRACKER_V1',
    name: 'Real-Time Transport Tracker',
    field: 'backend',
    tags: ['Rust', 'ESP32-CAM', 'WebSocket', 'FastAPI'],
    desc: 'Live GPS tracking with Rust backend for ultra-low-latency telemetry over WebSocket.',
    icons: [SiRust, SiFastapi],
    link: '#',
  },
  {
    id: 'CYBER_UI_LIB_V2',
    name: 'Cyber UI Component Library',
    field: 'frontend',
    tags: ['React', 'TypeScript', 'CSS-in-JS', 'Storybook'],
    desc: '40+ production-grade React components with cyber aesthetic. Full TypeScript, zero deps.',
    icons: [SiReact, SiTypescript],
    link: '#',
  },
  {
    id: 'VISION_CLASSIFY_V1',
    name: 'Computer Vision Pipeline',
    field: 'ml',
    tags: ['Python', 'ONNX', 'OpenCV', 'CUDA'],
    desc: 'End-to-end CV pipeline for real-time object detection. Sub-20ms inference on edge hardware.',
    icons: [SiPython, MdOutlineVisibility],
    link: '#',
  },
  {
    id: 'DIST_MONITOR_V1',
    name: 'Distributed System Monitor',
    field: 'systems',
    tags: ['Rust', 'Kafka', 'Prometheus', 'Docker'],
    desc: 'High-availability monitoring for distributed architectures with anomaly detection and auto-failover.',
    icons: [SiRust, SiApachekafka, SiDocker],
    link: '#',
  },
  {
    id: '3D_ANALYTICS_V1',
    name: '3D Analytics Dashboard',
    field: 'frontend',
    tags: ['R3F', 'Three.js', 'GSAP', 'D3.js'],
    desc: 'Immersive data visualization in full 3D space with physics-based interactions.',
    icons: [SiReact, TbBrandThreejs],
    link: '#',
  },
  {
    id: 'NEURAL_NET_V1',
    name: 'Neural Network Visualizer',
    field: 'ml',
    tags: ['PyTorch', 'React', 'Three.js', 'WebGL'],
    desc: 'Live 3D visualization of neural network training with real-time gradient flow rendering.',
    icons: [SiPytorch, SiReact],
    link: '#',
  },
  {
    id: 'PENTEST_TOOL_V1',
    name: 'Pentest Automation Suite',
    field: 'systems',
    tags: ['Python', 'Rust', 'Linux', 'Shell'],
    desc: 'Modular penetration testing framework with automated recon, exploit chaining, and reporting.',
    icons: [SiPython, SiRust, MdSecurity],
    link: '#',
  },
  {
    id: 'LLM_AGENT_V1',
    name: 'LLM Agent Framework',
    field: 'ml',
    tags: ['Python', 'FastAPI', 'Redis', 'Docker'],
    desc: 'Multi-agent orchestration framework with tool-use, memory, and autonomous task planning.',
    icons: [SiPython, SiFastapi, SiDocker],
    link: '#',
  },
]

const FIELDS = [
  { key: 'all', label: 'ALL_SYSTEMS', icon: BiNetworkChart },
  { key: 'ml', label: 'ML & AI', icon: FaBrain },
  { key: 'frontend', label: 'FRONTEND', icon: SiReact },
  { key: 'backend', label: 'BACKEND', icon: SiFastapi },
  { key: 'systems', label: 'SYSTEMS', icon: FaMicrochip },
]

const DIVIDER = (
  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--red), transparent)', margin: '0 48px' }} />
)

export default function WorksSection() {
  const [activeField, setActiveField] = useState('all')
  const filtered = activeField === 'all' ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.field === activeField)

  return (
    <>
      {DIVIDER}
      <section id="works" style={{ padding: '0 48px 100px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="reveal-up" style={{ textAlign: 'center', padding: '80px 0 40px' }}>
          <span className="section-eyebrow">03_PROJECT_VAULT</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 900, letterSpacing: 3, color: '#fff',
          }}>
            WORKS
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: 3, marginTop: 12 }}>
            SELECT CLEARANCE LEVEL TO FILTER PROJECTS
          </p>
        </div>

        {/* Radial HUD Field Selector */}
        <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{ position: 'relative', width: 520, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Orbit rings */}
            <div className="orbit-ring" style={{ position: 'absolute', width: 480, height: 100, borderRadius: '50%' }} />
            <div className="orbit-ring orbit-ring-reverse" style={{ position: 'absolute', width: 440, height: 80, borderRadius: '50%', opacity: 0.4 }} />

            {/* Center kernel */}
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
            }}>
              CORE
            </div>

            {/* Field buttons orbiting */}
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
                  data-cursor
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9, letterSpacing: 2,
                    padding: '8px 14px',
                    border: `1px solid ${isActive ? 'var(--red)' : 'rgba(255,0,51,0.2)'}`,
                    background: isActive ? 'var(--red)' : 'rgba(0,0,0,0.8)',
                    color: isActive ? '#000' : 'var(--text-dim)',
                    cursor: 'none',
                    transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', gap: 6,
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 0 20px rgba(255,0,51,0.5)' : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--red)'
                      e.currentTarget.style.color = 'var(--red)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255,0,51,0.2)'
                      e.currentTarget.style.color = 'var(--text-dim)'
                    }
                  }}
                >
                  <Icon style={{ fontSize: 12 }} />
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Project Nodes Scene */}
        <div className="reveal-up" style={{ maxWidth: 1100, margin: '0 auto', border: '1px solid rgba(255,0,51,0.1)', background: 'rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 10, left: 16,
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'rgba(255,0,51,0.4)',
            zIndex: 5,
          }}>
            // 3D PROJECT NODES — HOVER TO INSPECT — SCROLL TO ORBIT
          </div>
          <ProjectsScene projects={ALL_PROJECTS} activeField={activeField} />
        </div>

        {/* Project Cards Grid (HTML layer beneath) */}
        <div
          className="reveal-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 14,
            maxWidth: 1100,
            margin: '32px auto 0',
          }}
        >
          {filtered.map((project) => (
            <div key={project.id} className="cyber-card bracket-corners" style={{ padding: 28 }}>
              {/* ID */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'rgba(255,0,51,0.6)', marginBottom: 14 }}>
                [PROJECT_ID: {project.id}]
              </div>

              {/* Icons row */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                {project.icons.map((Icon, i) => (
                  <Icon key={i} style={{ fontSize: 20, color: 'var(--red)', filter: 'drop-shadow(0 0 4px rgba(255,0,51,0.5))' }} />
                ))}
                <div style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2,
                  padding: '3px 10px',
                  border: '1px solid rgba(255,0,51,0.25)',
                  color: 'rgba(255,0,51,0.7)',
                  textTransform: 'uppercase',
                }}>
                  {project.field}
                </div>
              </div>

              {/* Name */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: 1, marginBottom: 10 }}>
                {project.name}
              </div>

              {/* Desc */}
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.75, color: '#777', marginBottom: 20 }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2,
                    padding: '3px 9px',
                    border: '1px solid rgba(255,0,51,0.18)',
                    color: 'rgba(255,0,51,0.8)',
                    textTransform: 'uppercase',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.link}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
                  color: 'var(--red)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = '14px')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = '8px')}
              >
                {'>'} INITIATE_DEPLOYMENT
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
