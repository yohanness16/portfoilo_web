'use client'

import { useEffect, useRef, useState } from 'react'

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(true)

  // Only render when near hero section
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ♦◆▲△▼▽◇□■░▒▓'
    const COL_W = 22
    let cols: { x: number; y: number; speed: number; len: number }[] = []

    const initCols = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      const n = Math.floor(W / COL_W)
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * COL_W + 11,
        y: Math.random() * -H,
        speed: 0.3 + Math.random() * 0.8,
        len: 4 + Math.floor(Math.random() * 10),
      }))
    }
    initCols()

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.005 + Math.random() * 0.012,
    }))

    let raf: number
    let lastTime = 0
    const TARGET_FPS = 24
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    const draw = (time: number) => {
      if (time - lastTime < FRAME_INTERVAL) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastTime = time
      ctx.clearRect(0, 0, W, H)

      stars.forEach((s) => {
        s.phase += s.speed
        const opacity = 0.03 + 0.07 * Math.abs(Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()
      })

      ctx.font = `10px 'Share Tech Mono', monospace`
      cols.forEach((col) => {
        col.y += col.speed
        if (col.y > H + col.len * 16) {
          col.y = -col.len * 16 - Math.random() * 200
          col.speed = 0.3 + Math.random() * 0.8
        }
        for (let i = 0; i < col.len; i++) {
          const y = col.y + i * 16
          if (y < -16 || y > H + 16) continue
          const frac = i / col.len
          const isHead = i === col.len - 1
          const alpha = isHead ? 0.5 : frac * 0.12
          ctx.fillStyle = isHead
            ? `rgba(255,0,51,${alpha})`
            : `rgba(255,0,51,${alpha})`
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          ctx.fillText(char, col.x, y)
        }
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => initCols()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [visible])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: visible ? 0.4 : 0,
        transition: 'opacity 0.5s',
      }}
    />
  )
}
