'use client'

import { useEffect, useRef } from 'react'

interface BackgroundEffectsProps {
  scrollProgress?: number
}

export default function BackgroundEffects({ scrollProgress = 0 }: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const scrollRef = useRef<number>(0)

  // Keep scroll ref in sync (avoids re-init of the effect)
  useEffect(() => {
    scrollRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3 + 0.5,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    }))

    const nodes = Array.from({ length: 5 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 60 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    let frameCount = 0
    let lastTime = 0
    const FRAME_INTERVAL = 1000 / 30 // Throttled to 30fps

    const draw = (time: number) => {
      if (time - lastTime < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      lastTime = time
      frameCount++
      ctx.clearRect(0, 0, w, h)

      // Modulate node opacity with scroll progress
      // Base pulse ~0.06, peaks at ~0.10 when scroll is active
      const scrollBoost = scrollRef.current * 0.04

      // Red nebula blobs
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        n.phase += 0.003
        if (n.x < -n.r) n.x = w + n.r
        if (n.x > w + n.r) n.x = -n.r
        if (n.y < -n.r) n.y = h + n.r
        if (n.y > h + n.r) n.y = -n.r

        const pulse = 0.35 + 0.25 * Math.sin(n.phase)
        const opacity = (pulse * 0.06) + scrollBoost
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        grad.addColorStop(0, `rgba(230,46,77,${opacity})`)
        grad.addColorStop(0.5, `rgba(230,30,48,${opacity * 0.5})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Particles with depth-based opacity
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.phase += 0.008 + p.z * 0.002
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const depthScale = 1 / p.z
        const depthOpacity = (0.1 + 0.35 * Math.abs(Math.sin(p.phase))) * depthScale
        const displayR = p.r * depthScale

        ctx.beginPath()
        ctx.arc(p.x, p.y, displayR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230,46,77,${depthOpacity})`
        ctx.fill()
      })

      // Connecting lines — every 3rd frame for reduced load
      if (frameCount % 3 === 0) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]
          if (a.z > 1.8) continue
          for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
            const b = particles[j]
            if (b.z > 1.8) continue
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 100) {
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(230,46,77,${(1 - dist / 100) * 0.03})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // IntersectionObserver: pause when off-screen
    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(draw)
        }
      },
      { rootMargin: '100px' },
    )
    observer.observe(canvas)

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          contain: 'strict',
        }}
      />
      <div className="bg-overlay" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </>
  )
}
