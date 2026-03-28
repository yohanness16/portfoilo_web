'use client'

import Terminal from '@/components/terminal/Terminal'
import { SiGithub, SiTelegram, SiWhatsapp, SiGmail } from 'react-icons/si'
//import { SiLinkedin } from 'react-icons/si'
import { HiLocationMarker } from 'react-icons/hi'
import { MdOutlineWorkOutline } from 'react-icons/md'

const DIVIDER = (
  <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--red), transparent)', margin: '0 48px' }} />
)

const SOCIALS = [
  { icon: SiGithub,   label: 'GITHUB',   sub: 'github.com/yohannes',     href: 'https://github.com' },
  //{ icon: SiLinkedin, label: 'LINKEDIN', sub: 'linkedin.com/in/yohannes', href: 'https://linkedin.com' },
  { icon: SiTelegram, label: 'TELEGRAM', sub: '@yohannes_dev',            href: 'https://t.me' },
  { icon: SiWhatsapp, label: 'WHATSAPP', sub: '+251 9XX XXX XXX',         href: 'https://wa.me' },
]

export default function ContactSection() {
  return (
    <>
      {DIVIDER}
      <section id="contact" style={{ padding: '0 48px 100px', position: 'relative', zIndex: 10 }}>
        <div className="reveal-up" style={{ textAlign: 'center', padding: '80px 0 56px' }}>
          <span className="section-eyebrow">04_ROOT_ACCESS</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,56px)', fontWeight: 900, letterSpacing: 3, color: '#fff' }}>
            CONTACT
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: 3, marginTop: 12 }}>
            AUTHENTICATE TO ESTABLISH CONNECTION
          </p>
        </div>

        <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 20, maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
          {/* Terminal */}
          <Terminal />

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Email */}
            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginBottom: 10 }}>// EMAIL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SiGmail style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <a href="mailto:yohanness1621@gmail.com" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', textDecoration: 'none', cursor: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>
                  yohanness1621@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginBottom: 10 }}>// LOCATION</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HiLocationMarker style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#777' }}>Addis Ababa, Ethiopia </span>
              </div>
            </div>

            {/* Availability */}
            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginBottom: 10 }}>// AVAILABILITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MdOutlineWorkOutline style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="status-dot" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00cc55' }}>OPEN TO OPPORTUNITIES</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>Freelance · Full-time · Remote</div>
                </div>
              </div>
            </div>

            {/* Socials grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SOCIALS.map(({ icon: Icon, label, sub, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="cyber-card"
                  style={{ padding: '16px 14px', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', cursor: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,51,0.07)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(255,0,51,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(5,5,5,0.85)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <Icon style={{ fontSize: 24, color: 'var(--red)', filter: 'drop-shadow(0 0 8px rgba(255,0,51,0.6))' }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--text)' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)' }}>{sub}</div>
                </a>
              ))}
            </div>

            <a href="#" className="btn-neon" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              DOWNLOAD_CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
