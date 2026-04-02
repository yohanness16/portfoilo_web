'use client'

import { useState, useEffect } from 'react'
import Terminal from '@/components/terminal/Terminal'
import { SiGithub, SiTelegram, SiWhatsapp, SiGmail } from 'react-icons/si'
import { HiLocationMarker } from 'react-icons/hi'
import { MdOutlineWorkOutline } from 'react-icons/md'

const SOCIALS = [
  { icon: SiGithub, label: 'GITHUB', sub: 'github.com/yohanness16', href: 'https://github.com/yohanness16' },
  { icon: SiTelegram, label: 'TELEGRAM', sub: '@Yohannes_1216', href: 'https://t.me/Yohannes_1216' },
  { icon: SiWhatsapp, label: 'WHATSAPP', sub: '+251974852985', href: 'https://wa.me/251974852985' },
]

export default function ContactSection() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isSmall = windowWidth < 1024
  const isMobile = windowWidth < 768

  const DIVIDER = (
    <div style={{ 
      height: 1, 
      background: 'linear-gradient(90deg, transparent, var(--red), transparent)', 
      margin: isSmall ? '0 20px' : '0 48px' 
    }} />
  )

  return (
    <>
      {DIVIDER}
      <section id="contact" style={{ padding: isSmall ? '0 20px 80px' : '0 48px 100px', position: 'relative', zIndex: 10 }}>
        <div className="reveal-up" style={{ textAlign: 'center', padding: isSmall ? '60px 0 40px' : '80px 0 56px' }}>
          <span className="section-eyebrow">04_ROOT_ACCESS</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: 3, color: '#fff' }}>
            CONTACT
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: 2, marginTop: 12 }}>
            AUTHENTICATE TO ESTABLISH CONNECTION
          </p>
        </div>

        <div className="reveal-up" style={{ 
          display: 'flex',
          flexDirection: isSmall ? 'column' : 'row',
          gap: isSmall ? 40 : 20, 
          maxWidth: 1100, 
          margin: '0 auto', 
          alignItems: 'start' 
        }}>
          <div style={{ 
            width: '100%', 
            overflow: 'hidden', 
            order: isSmall ? 1 : 1,
            flex: isSmall ? 'none' : '1'
          }}>
            <Terminal />
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 14, 
            order: isSmall ? 2 : 2,
            width: isSmall ? '100%' : '400px',
            flexShrink: 0
          }}>
            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--red)', marginBottom: 10 }}>// EMAIL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SiGmail style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <a href="mailto:yohanness1621@gmail.com" style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: isMobile ? 11 : 13, 
                  color: 'var(--text)', 
                  textDecoration: 'none', 
                  wordBreak: 'break-all' 
                }}>
                  yohanness1621@gmail.com
                </a>
              </div>
            </div>

            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--red)', marginBottom: 10 }}>// LOCATION</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <HiLocationMarker style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#888' }}>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--red)', marginBottom: 10 }}>// AVAILABILITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MdOutlineWorkOutline style={{ fontSize: 18, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.5))' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00cc55', boxShadow: '0 0 8px #00cc55' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00cc55' }}>OPEN TO OPPORTUNITIES</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginTop: 4 }}>Freelance · Full-time · Remote</div>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: 10 
            }}>
              {SOCIALS.map(({ icon: Icon, label, sub, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="cyber-card"
                  style={{ 
                    padding: '16px 12px', 
                    textDecoration: 'none', 
                    display: 'flex', 
                    flexDirection: isMobile ? 'row' : 'column', 
                    alignItems: 'center', 
                    gap: isMobile ? 15 : 8, 
                    textAlign: isMobile ? 'left' : 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,0,51,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(5,5,5,0.85)')}
                >
                  <Icon style={{ fontSize: 20, color: 'var(--red)', filter: 'drop-shadow(0 0 6px rgba(255,0,51,0.4))' }} />
                  <div style={{ flex: isMobile ? 1 : 'none' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text)' }}>{label}</div>
                    {!isMobile && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{sub}</div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            <a href="#" className="btn-neon" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '16px', marginTop: 10 }}>
              DOWNLOAD_CV
            </a>
          </div>
        </div>
      </section>
    </>
  )
}