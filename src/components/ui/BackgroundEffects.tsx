'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const points: { x: number; y: number; r: number; opacity: number; speed: number }[] = []
    for (let i = 0; i < 20; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        opacity: Math.random(),
        speed: 0.005 + Math.random() * 0.01
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      points.forEach(p => {
        p.opacity += p.speed
        if (p.opacity > 1 || p.opacity < 0) p.speed *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 0, 51, ${p.opacity * 0.15})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
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
            linear-gradient(rgba(255, 0, 51, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 51, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }

        .bg-vignette {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.7) 100%);
        }

        .bg-grain {
          position: fixed;
          inset: -100%;
          z-index: 3;
          pointer-events: none;
          background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Noise_Texture.png");
          opacity: 0.04;
          animation: noise 0.2s infinite;
        }

        @keyframes noise {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-1%,-1%); }
          30% { transform: translate(1%,1%); }
          50% { transform: translate(-2%,1%); }
          80% { transform: translate(2%,-2%); }
        }

        @media (max-width: 768px) {
          .bg-overlay { background-size: 25px 25px; }
        }
      `}</style>

      <div className="bg-overlay" />
      <div className="bg-vignette" />
      <div className="bg-grain" />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: '#030303'
        }}
      />
    </>
  )
}