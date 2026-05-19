'use client'

import { useEffect, useRef, useState } from 'react'

interface TechBarProps {
  label: string
  level: number
  delay?: number
}

export default function TechBar({ label, level, delay = 0 }: TechBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clampedLevel = Math.min(100, Math.max(0, level))

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <span
          className="text-[11px] tracking-[2px] uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}
        >
          {label}
        </span>
        <span
          className="text-[10px] tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}
        >
          {clampedLevel}%
        </span>
      </div>
      <div className="tech-bar-bg">
        <div
          className={`tech-bar-fill${visible ? ' animate' : ''}`}
          style={{
            width: `${clampedLevel}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}
