'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          background: '#0a0a0a',
          color: '#c8c0b8',
          fontFamily: "'Space Mono', monospace",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          margin: 0,
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              color: '#e62e4d',
              marginBottom: '1.5rem',
              letterSpacing: 3,
            }}
          >
            SYSTEM_FAULT
          </div>
          <p
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
              lineHeight: 1.8,
              color: '#6b6358',
              marginBottom: '2rem',
            }}
          >
            An unexpected error occurred. The system encountered a critical
            failure and could not recover.
          </p>
          <button
            onClick={reset}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '11px',
              letterSpacing: 3,
              textTransform: 'uppercase',
              padding: '14px 32px',
              border: '1px solid #e62e4d',
              background: 'transparent',
              color: '#e62e4d',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e62e4d'
              e.currentTarget.style.color = '#0a0a0a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#e62e4d'
            }}
          >
            REBOOT_SYSTEM
          </button>
        </div>
      </body>
    </html>
  )
}
