'use client'

import { useState, useEffect } from 'react'
import { SiGithub, SiTelegram, SiWhatsapp } from 'react-icons/si'
import { HiArrowUp } from 'react-icons/hi'

const TICKER_ITEMS = [
  { label: 'CPU', value: 'OPTIMAL' },
  { label: 'ENCRYPTION', value: 'AES-256' },
  { label: 'LOCATION', value: 'ADDIS ABABA, ET' },
  { label: 'RUST', value: 'ACTIVE' },
  { label: 'AI_MODELS', value: 'LOADING' },
  { label: 'CYBERSEC', value: 'MONITORING' },
  { label: 'STATUS', value: 'AVAILABLE' },
  { label: 'UPTIME', value: '99.9%' },
  { label: 'PYTHON', value: 'v3.12' },
  { label: 'NODE', value: 'ONLINE' },
]

const SOCIALS = [
  { icon: SiGithub, href: 'https://github.com/yohanness16', label: 'GitHub' },
  { icon: SiTelegram, href: 'https://t.me/Yohannes_1216', label: 'Telegram' },
  { icon: SiWhatsapp, href: 'https://wa.me/251974852985', label: 'WhatsApp' },
]

export default function FooterSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <footer
      className="layout-contain"
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(230,46,77,0.2)',
        background: 'black',
        contentVisibility: 'auto',
        containIntrinsicSize: 'auto 300px',
      }}
    >
      <div style={{
        borderBottom: '1px solid rgba(230,46,77,0.08)',
        padding: '12px 0',
        overflow: 'hidden',
        background: 'rgba(230,46,77,0.02)',
      }}>
        <div className="footer-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-dim)',
              paddingRight: 50,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              [{item.label}: <span style={{ color: 'var(--red)' }}>{item.value}</span>]
            </span>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '40px 24px' : '32px 48px',
        gap: 24,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: 2,
          color: 'var(--text-dim)',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          © 2026 <span style={{ color: 'var(--red)' }}>YOHANNES_DESALEGN</span>
          {!isMobile && ' // ALL_RIGHTS_RESERVED'}
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 16 : 14,
          fontWeight: 900,
          letterSpacing: 6,
          color: 'var(--red)',
          textShadow: '0 0 20px rgba(230,46,77,0.4)',
        }}>
          YOH_OS v2.0
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}>
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={label}
            >
              <Icon style={{ fontSize: 20 }} />
            </a>
          ))}

          <div style={{ width: 1, height: 20, background: 'rgba(230,46,77,0.2)' }} />

          <a
            href="#hero"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
              color: 'var(--text-dim)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'color 0.3s'
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            <HiArrowUp style={{ fontSize: 16 }} />
            {!isMobile && 'TOP'}
          </a>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(230,46,77,0.05)',
        padding: '12px 24px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: 1,
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          NEXT.JS · THREE.JS · R3F · GSAP
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 8,
          letterSpacing: 2,
          color: 'var(--text-muted)'
        }}>
          v2.0.26_STABLE
        </span>
      </div>
    </footer>
  )
}
