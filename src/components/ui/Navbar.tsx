'use client'

import { useEffect, useState, memo } from 'react'
import { SiGithub } from 'react-icons/si'

const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'STACK', href: '#stack' },
  { label: 'WORKS', href: '#works' },
  { label: 'CONTACT', href: '#contact' },
] as const

function NavbarInner() {
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
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400"
      style={{
        padding: isMobile ? '15px 20px' : '20px 48px',
        borderBottom: scrolled ? '1px solid rgba(230,46,77,0.12)' : '1px solid transparent',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <a
        href="#hero"
        className="no-underline"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: isMobile ? 11 : 13,
          fontWeight: 900,
          color: 'var(--red)',
          letterSpacing: isMobile ? 3 : 5,
          textShadow: '0 0 20px rgba(230,46,77,0.5)',
        }}
      >
        YOH_OS<span style={{ color: '#444' }}> DEV</span>
      </a>

      {!isMobile && (
        <ul className="flex gap-9 list-none m-0 p-0">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: 3,
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s, text-shadow 0.2s',
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-2.5">
        <div className="status-dot" />
        <span
          className="hidden md:block"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: 1,
            color: 'var(--text-dim)',
          }}
        >
          connecting ....
        </span>
        {isMobile && <SiGithub style={{ color: 'var(--text-dim)', fontSize: 18 }} />}
      </div>
    </nav>
  )
}

export default memo(NavbarInner)
