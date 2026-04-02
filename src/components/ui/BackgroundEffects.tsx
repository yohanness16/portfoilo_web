'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    handleResize()
    window.addEventListener('resize', handleResize)

    // Deep 3D-ish particles with parallax depth
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3 + 0.5,       // depth layer: 0.5 = close, 3 = far
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    }))

    // Floating red nodes (fewer, bigger, slower — depth feel)
    const nodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 60 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

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
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        grad.addColorStop(0, `rgba(255,0,51,${pulse * 0.06})`)
        grad.addColorStop(0.5, `rgba(255,0,30,${pulse * 0.03})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      // Particles with depth-based opacity and parallax
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
        ctx.fillStyle = `rgba(255,0,51,${depthOpacity})`
        ctx.fill()

        // Glow ring on closer particles
        if (p.z < 1.5) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, displayR + 2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255,0,51,${depthOpacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      // Connecting lines between nearby close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          if (a.z > 1.5 || b.z > 1.5) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,0,51,${(1 - dist / 120) * 0.04})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <style>{`
        .bg-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(rgba(255,0,51,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,51,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }

        .bg-vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.7) 100%);
        }

        .bg-grain {
          position: fixed;
          inset: -100%;
          z-index: 3;
          pointer-events: none;
          background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Noise_Texture.png");
          opacity: 0.03;
          animation: grain 0.3s steps(3) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          33% { transform: translate(-1%,-1%); }
          66% { transform: translate(1%,1%); }
        }

        @media (max-width: 768px) {
          .bg-overlay { background-size: 25px 25px; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div className="bg-overlay" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </>
  )
}
