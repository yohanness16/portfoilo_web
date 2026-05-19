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
] as const

export default function ContactSection() {
  const [isSmall, setIsSmall] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024)
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="contact"
      className="section-deferred layout-contain"
      style={{ padding: isSmall ? '0 20px 80px' : '0 48px 100px', position: 'relative', zIndex: 10 }}
    >
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
          margin: isSmall ? '0 0 20px' : '0 0 48px',
        }}
      />
        <header
          className="reveal-up"
          style={{ textAlign: 'center', padding: isSmall ? '60px 0 40px' : '80px 0 56px' }}
        >
          <span className="section-eyebrow">04_ROOT_ACCESS</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              letterSpacing: 3,
              color: '#fff',
            }}
          >
            CONTACT
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: 2,
              marginTop: 12,
            }}
          >
            AUTHENTICATE TO ESTABLISH CONNECTION
          </p>
        </header>

        <div
          className="reveal-up"
          style={{
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            gap: isSmall ? 40 : 20,
            maxWidth: 1100,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          <div style={{ width: '100%', overflow: 'hidden', flex: isSmall ? 'none' : '1' }}>
            <Terminal />
          </div>

          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              width: isSmall ? '100%' : '400px',
              flexShrink: 0,
            }}
          >
            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'var(--red)',
                  marginBottom: 10,
                }}
              >
                {'// EMAIL'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <SiGmail style={{ fontSize: 18, color: 'var(--red)' }} />
                <a
                  href="mailto:yohanness1621@gmail.com"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? 11 : 13,
                    color: 'var(--text)',
                    textDecoration: 'none',
                    wordBreak: 'break-all',
                  }}
                >
                  yohanness1621@gmail.com
                </a>
              </div>
            </div>

            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'var(--red)',
                  marginBottom: 10,
                }}
              >
                {'// LOCATION'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <HiLocationMarker style={{ fontSize: 18, color: 'var(--red)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#888' }}>
                  Addis Ababa, Ethiopia
                </span>
              </div>
            </div>

            <div className="cyber-card" style={{ padding: '20px 22px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'var(--red)',
                  marginBottom: 10,
                }}
              >
                {'// AVAILABILITY'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MdOutlineWorkOutline style={{ fontSize: 18, color: 'var(--red)' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#00cc55',
                        boxShadow: '0 0 8px #00cc55',
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00cc55' }}>
                      OPEN TO OPPORTUNITIES
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: 'var(--text-dim)',
                      marginTop: 4,
                    }}
                  >
                    Freelance · Full-time · Remote
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 10,
              }}
            >
              {SOCIALS.map(({ icon: Icon, label, sub, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card social-link"
                  style={{
                    padding: '16px 12px',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    alignItems: 'center',
                    gap: isMobile ? 15 : 8,
                    textAlign: isMobile ? 'left' : 'center',
                  }}
                >
                  <Icon style={{ fontSize: 20, color: 'var(--red)' }} />
                  <div style={{ flex: isMobile ? 1 : 'none' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: 2,
                        color: 'var(--text)',
                      }}
                    >
                      {label}
                    </div>
                    {!isMobile && (
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 8,
                          color: 'var(--text-dim)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                      >
                        {sub}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            <a
              href="#"
              className="btn-neon"
              style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '16px', marginTop: 10 }}
            >
              DOWNLOAD_CV
            </a>
          </aside>
        </div>
      </section>
  )
}
