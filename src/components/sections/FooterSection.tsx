'use client'

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
  { icon: SiGithub,   href: 'https://github.com',   label: 'GitHub' },
  // { icon: SiLinkedin, href: 'https://linkedin.com',  label: 'LinkedIn' },
  { icon: SiTelegram, href: 'https://t.me',          label: 'Telegram' },
  { icon: SiWhatsapp, href: 'https://wa.me',         label: 'WhatsApp' },
]

export default function FooterSection() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10,
      borderTop: '1px solid rgba(255,0,51,0.2)',
      boxShadow: '0 -24px 80px rgba(255,0,51,0.04)',
    }}>
      {/* Ticker */}
      <div style={{
        borderBottom: '1px solid rgba(255,0,51,0.08)',
        padding: '10px 0',
        overflow: 'hidden',
        background: 'rgba(255,0,51,0.02)',
      }}>
        <div className="ticker-track" style={{ display: 'inline-flex', gap: 0, whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginRight: 40 }}>
              [{item.label}: <span style={{ color: 'var(--red)' }}>{item.value}</span>]
            </span>
          ))}
        </div>
      </div>

      {/* Main footer row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 48px',
        flexWrap: 'wrap', gap: 20,
      }}>
        {/* Copyright */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-dim)' }}>
          © 2026{' '}
          <span style={{ color: 'var(--red)' }}>YOHANNES_DESALEGN</span>
          {' '}// ALL_RIGHTS_RESERVED
        </div>

        {/* Center: logo */}
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900,
          letterSpacing: 5, color: 'var(--red)',
          textShadow: '0 0 20px rgba(255,0,51,0.4)',
        }}>
          YOH_OS v2.0
        </div>

        {/* Right: socials + top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{ color: 'var(--text-dim)', textDecoration: 'none', cursor: 'none', transition: 'color 0.2s, filter 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--red)'
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255,0,51,0.7))'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-dim)'
                e.currentTarget.style.filter = 'none'
              }}
            >
              <Icon style={{ fontSize: 18 }} />
            </a>
          ))}

          <div style={{ width: 1, height: 20, background: 'rgba(255,0,51,0.2)' }} />

          <a
            href="#hero"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
              color: 'var(--text-dim)', textDecoration: 'none', cursor: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
          >
            <HiArrowUp style={{ fontSize: 14 }} />
            TOP
          </a>
        </div>
      </div>

      {/* Bottom micro bar */}
      <div style={{
        borderTop: '1px solid rgba(255,0,51,0.05)',
        padding: '10px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)' }}>
          BUILT WITH NEXT.JS · THREE.JS · REACT THREE FIBER · GSAP
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)' }}>
          v2.0.26_STABLE
        </span>
      </div>
    </footer>
  )
}
