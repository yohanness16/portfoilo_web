import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS } from '@/data/projects'

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  live: { label: 'LIVE', color: '#00cc55' },
  wip: { label: 'WIP', color: '#ccaa00' },
  archived: { label: 'ARCHIVED', color: '#666' },
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = PROJECTS.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  const status = STATUS_LABELS[project.status] || STATUS_LABELS.live
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id && p.field === project.field).slice(0, 3)

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#d4d4d4' }}>
      {/* ─── HERO ─── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 0%, rgba(230,46,77,0.12), transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,1) 60%)' }} />

        <div style={{ position: 'relative', padding: '40px 20px 0', maxWidth: 1100, margin: '0 auto' }}>
          <Link
            href="/#works"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: 2,
              color: 'var(--red)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(230,46,77,0.35)',
              padding: '8px 12px',
            }}
          >
            {'<'} BACK_TO_WORKS
          </Link>

          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(230,46,77,0.6)' }}>
                [PROJECT_FILE]
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, padding: '2px 8px', border: '1px solid rgba(230,46,77,0.25)', color: 'rgba(230,46,77,0.7)' }}>
                {project.field.toUpperCase()}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, padding: '2px 8px', border: `1px solid ${status.color}`, color: status.color }}>
                {status.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 1, color: 'var(--text-muted)' }}>
                {project.year}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, letterSpacing: 3, color: '#fff', margin: 0 }}>
              {project.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red-dim)', letterSpacing: 1, margin: 0 }}>
              {project.role}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: '#8a8a8a', maxWidth: 760, margin: 0 }}>
              {project.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    padding: '4px 10px',
                    border: '1px solid rgba(230,46,77,0.2)',
                    color: 'rgba(230,46,77,0.85)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── HERO IMAGE ─── */}
        <div style={{ position: 'relative', maxWidth: 1100, margin: '36px auto 0', padding: '0 20px 40px' }}>
          <div style={{ position: 'relative', aspectRatio: '16/10', border: '1px solid rgba(230,46,77,0.25)', background: 'rgba(0,0,0,0.6)', overflow: 'hidden' }}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 70%)' }} />
            <div style={{ position: 'absolute', left: 20, bottom: 20, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'rgba(230,46,77,0.8)' }}>
              VISUAL_BRIEF
            </div>
          </div>
        </div>
      </div>

      {/* ─── METRICS BAR ─── */}
      {project.metrics.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(230,46,77,0.1)', borderBottom: '1px solid rgba(230,46,77,0.1)', padding: '20px', background: 'rgba(230,46,77,0.02)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {project.metrics.map((metric) => (
              <div key={metric} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--red)', letterSpacing: 1 }}>
                  {metric.split(' ')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)', letterSpacing: 1, marginTop: 2 }}>
                  {metric.split(' ').slice(1).join(' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── DETAIL GRID ─── */}
      <div style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div className="cyber-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(230,46,77,0.6)', marginBottom: 12 }}>
              OVERVIEW
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.8, color: '#9a9a9a', margin: 0 }}>
              {project.overview}
            </p>
          </div>

          <div className="cyber-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(230,46,77,0.6)', marginBottom: 12 }}>
              HIGHLIGHTS
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.8, color: '#9a9a9a' }}>
              {project.highlights.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="cyber-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'rgba(230,46,77,0.6)', marginBottom: 12 }}>
              STACK
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    padding: '4px 10px',
                    border: '1px solid rgba(230,46,77,0.2)',
                    color: 'rgba(230,46,77,0.85)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RELATED PROJECTS ─── */}
      {relatedProjects.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(230,46,77,0.1)', padding: '40px 20px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginBottom: 24, textAlign: 'center' }}>
              RELATED_SYSTEMS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/works/${rp.slug}`}
                  className="cyber-card"
                  style={{ padding: 20, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: 2, color: 'rgba(230,46,77,0.5)' }}>
                    [ID: {rp.id}]
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
                    {rp.name}
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, lineHeight: 1.5, color: '#777', margin: 0, flex: 1 }}>
                    {rp.desc}
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: 2, color: 'var(--red)' }}>
                    {'>'} VIEW
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
