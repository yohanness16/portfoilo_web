'use client'

import { useEffect, useRef, useState } from 'react'

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '150px' }
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

    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'
    const COL_W = 44

    let cols: { x: number; y: number; speed: number; len: number; buffer: string[] }[] = []

    const initCols = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      const n = Math.floor(W / COL_W)
      cols = Array.from({ length: n }, (_, i) => ({
        x: i * COL_W + COL_W / 2,
        y: Math.random() * -H,
        speed: 0.3 + Math.random() * 0.5,
        len: 3 + Math.floor(Math.random() * 6),
        buffer: Array.from(
          { length: 20 },
          () => CHARS[Math.floor(Math.random() * CHARS.length)]
        ),
      }))
    }
    initCols()

    let raf: number
    let lastTime = 0
    const FRAME_INTERVAL = 1000 / 16 // 16fps

    const draw = (time: number) => {
      if (time - lastTime < FRAME_INTERVAL) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastTime = time
      ctx.clearRect(0, 0, W, H)

      ctx.font = `8px 'Share Tech Mono', monospace`
      for (const col of cols) {
        col.y += col.speed
        if (col.y > H + col.len * 14) {
          col.y = -col.len * 14
          col.speed = 0.3 + Math.random() * 0.5
          for (let b = 0; b < col.buffer.length; b++) {
            col.buffer[b] = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        for (let i = 0; i < col.len; i++) {
          const y = col.y + i * 14
          if (y < -14 || y > H + 14) continue
          const frac = i / col.len
          const isHead = i === col.len - 1
          const char = col.buffer[i % col.buffer.length]
          const alpha = isHead ? 0.45 : frac * 0.1
          ctx.fillStyle = `rgba(255,0,51,${alpha})`
          ctx.fillText(char, col.x, y)
        }
      }

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
        opacity: visible ? 0.25 : 0,
        transition: 'opacity 0.5s',
      }}
    />
  )
}
