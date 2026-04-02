'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px'
        dotRef.current.style.top = mouse.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Hover expand
    const addHover = () => {
      if (dotRef.current) { dotRef.current.style.width = '20px'; dotRef.current.style.height = '20px' }
      if (ringRef.current) { ringRef.current.style.width = '50px'; ringRef.current.style.height = '50px' }
    }
    const removeHover = () => {
      if (dotRef.current) { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px' }
      if (ringRef.current) { ringRef.current.style.width = '34px'; ringRef.current.style.height = '34px' }
    }
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', zIndex: 99999, pointerEvents: 'none', transform: 'translate(-50%,-50%)', width: 10, height: 10, background: 'var(--red)', borderRadius: '50%', boxShadow: '0 0 10px var(--red), 0 0 30px rgba(255,0,51,0.4)', transition: 'width 0.2s, height 0.2s' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', zIndex: 99998, pointerEvents: 'none', transform: 'translate(-50%,-50%)', width: 34, height: 34, border: '1px solid var(--red)', borderRadius: '50%', opacity: 0.5, transition: 'width 0.2s, height 0.2s' }} />
    </>
  )
}
