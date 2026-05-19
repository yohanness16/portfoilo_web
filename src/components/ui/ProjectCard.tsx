'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SiPython, SiReact, SiFastapi, SiDocker, SiTypescript, SiRedis, SiLinux } from 'react-icons/si'
import { MdSecurity } from 'react-icons/md'
import type { Project } from '@/data/projects'

const ICON_MAP: Record<string, React.ComponentType<{ style?: React.CSSProperties }>> = {
  typescript: SiTypescript,
  fastapi: SiFastapi,
  docker: SiDocker,
  react: SiReact,
  redis: SiRedis,
  python: SiPython,
  security: MdSecurity,
  linux: SiLinux,
}

const STATUS_LABELS: Record<Project['status'], { label: string; color: string }> = {
  live: { label: 'LIVE', color: '#00cc55' },
  wip: { label: 'WIP', color: '#ccaa00' },
  archived: { label: 'ARCHIVED', color: '#666' },
}

interface ProjectCardProps {
  project: Project
  isMobile: boolean
  scrollProgress?: number
}

export default function ProjectCard({ project, isMobile, scrollProgress = 0 }: ProjectCardProps) {
  const status = STATUS_LABELS[project.status]
  const glowOpacity = Math.min(scrollProgress * 0.22, 0.22)

  return (
    <article
      className="cyber-card bracket-corners work-card card-entrance glow-tracked"
      style={{ padding: 0, '--glow-opacity': glowOpacity } as React.CSSProperties}
    >
      {/* ─── GLOW LAYER ─── */}
      <div className="glow-layer" />

      {/* ─── IMAGE CONTAINER ─── */}
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* ─── CARD BODY ─── */}
      <div style={{ padding: isMobile ? 16 : 24, position: 'relative', zIndex: 1 }}>
        {/* ID + Year + Status row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 7,
              letterSpacing: 2,
              color: 'rgba(230,46,77,0.5)',
            }}
          >
            [ID: {project.id}]
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 7,
                letterSpacing: 1,
                color: 'var(--text-muted)',
              }}
            >
              {project.year}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 6,
                letterSpacing: 1,
                padding: '1px 5px',
                border: `1px solid ${status.color}`,
                color: status.color,
              }}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Icons + Field badge */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
          {project.iconKeys.map((key) => {
            const Icon = ICON_MAP[key]
            return Icon ? <Icon key={key} style={{ fontSize: 16, color: 'var(--red)' }} /> : null
          })}
          <div
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: 7,
              padding: '2px 8px',
              border: '1px solid rgba(230,46,77,0.25)',
              color: 'rgba(230,46,77,0.7)',
            }}
          >
            {project.field}
          </div>
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          {project.name}
        </h3>

        {/* Role */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: 'var(--red-dim)',
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          {project.role}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            lineHeight: 1.6,
            color: '#777',
            marginBottom: 14,
          }}
        >
          {project.desc}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              marginBottom: 14,
            }}
          >
            {project.metrics.map((m) => (
              <span
                key={m}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 7,
                  padding: '2px 6px',
                  background: 'rgba(230,46,77,0.06)',
                  border: '1px solid rgba(230,46,77,0.12)',
                  color: 'rgba(230,46,77,0.7)',
                }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
          {project.tags.slice(0, isMobile ? 3 : 5).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 7,
                padding: '2px 6px',
                border: '1px solid rgba(230,46,77,0.15)',
                color: 'rgba(230,46,77,0.75)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Preview link */}
        <Link
          href={`/works/${project.slug}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: 2,
            color: 'var(--red)',
            background: 'transparent',
            border: '1px solid rgba(230,46,77,0.35)',
            padding: '6px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          {'>'} PREVIEW
        </Link>
      </div>
    </article>
  )
}
