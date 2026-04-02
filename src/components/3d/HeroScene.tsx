'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const COUNT = 800

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10
      sizes[i] = Math.random() * 2 + 0.5
    }
    return { positions, sizes }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.01
    const s = 1 + 0.01 * Math.sin(t * 0.3)
    meshRef.current.scale.setScalar(s)
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        color="#ff0033"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.5}
        fog={false}
      />
    </points>
  )
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { rootMargin: '300px' }
    )
    const el = sectionRef.current
    if (!el) return
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {mounted ? (
        <Canvas camera={{ position: [0, 0, 8], fov: 70 }} frameloop="demand">
          <color attach="background" args={['#000000']} />
          <Particles />
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Canvas>
      ) : null}
    </div>
  )
}
