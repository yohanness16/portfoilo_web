'use client'

import { useEffect, useState } from 'react'
import { SiGithub } from 'react-icons/si'

const links = [
  { label: 'HOME', href: '#hero' },
  { label: 'STACK', href: '#stack' },
  { label: 'WORKS', href: '#works' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    const onScroll = () => setScrolled(window.scrollY > 40)
    
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', onScroll)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '15px 20px' : '20px 48px',
        borderBottom: scrolled ? '1px solid rgba(255,0,51,0.12)' : '1px solid transparent',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.4s ease-in-out',
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 11 : 13,
          fontWeight: 900,
          color: 'var(--red)',
          letterSpacing: isMobile ? 3 : 5,
          textDecoration: 'none',
          textShadow: '0 0 20px rgba(255,0,51,0.5)',
          cursor: 'none',
        }}
      >
        YOH_OS<span style={{ color: '#444' }}> DEV</span>
      </a>

      {!isMobile && (
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: 3,
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s, text-shadow 0.2s',
                  cursor: 'none',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--red)'
                  ;(e.currentTarget as HTMLElement).style.textShadow = '0 0 12px rgba(255,0,51,0.6)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'
                  ;(e.currentTarget as HTMLElement).style.textShadow = 'none'
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="status-dot" />
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: 9, 
          letterSpacing: 1, 
          color: 'var(--text-dim)',
          display: isMobile ? 'none' : 'block' 
        }}>
          connecting ....
        </span>
        {isMobile && <SiGithub style={{ color: 'var(--text-dim)', fontSize: 18 }} />}
      </div>
    </nav>
  )
}