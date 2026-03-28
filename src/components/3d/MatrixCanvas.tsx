'use client'

import { useEffect, useRef } from 'react'

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ♦◆▲△▼▽◇□■░▒▓'
    const COL_W = 18
    let cols: { x: number; y: number; speed: number; len: number }[] = []

    const initCols = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      const n = Math.floor(W / COL_W)
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * COL_W + 9,
        y: Math.random() * -H,
        speed: 0.4 + Math.random() * 1.2,
        len: 6 + Math.floor(Math.random() * 16),
      }))
    }
    initCols()

    // Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.015,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Stars
      stars.forEach((s) => {
        s.phase += s.speed
        const opacity = 0.05 + 0.1 * Math.abs(Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()
      })

      // Matrix rain
      ctx.font = `11px 'Share Tech Mono', monospace`
      cols.forEach((col) => {
        col.y += col.speed
        if (col.y > H + col.len * 16) {
          col.y = -col.len * 16 - Math.random() * 200
          col.speed = 0.4 + Math.random() * 1.2
        }
        for (let i = 0; i < col.len; i++) {
          const y = col.y + i * 16
          if (y < -16 || y > H + 16) continue
          const frac = i / col.len
          const isHead = i === col.len - 1
          const alpha = isHead ? 0.7 : frac * 0.18
          ctx.fillStyle = isHead
            ? `rgba(255,0,51,${alpha})`
            : `rgba(255,0,51,${alpha})`
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          ctx.fillText(char, col.x, y)
        }
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => initCols()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}
