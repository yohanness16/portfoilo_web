'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { disposeScene } from '@/lib/webgl'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const COUNT = 400

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
        color="#e62e4d"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.5}
        fog={false}
      />
    </points>
  )
}

function RedNebula() {
  const torusRef = useRef<THREE.Mesh>(null)
  const torus2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (torusRef.current) {
      torusRef.current.rotation.z = t * 0.04
      const mat = torusRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.03 + 0.02 * Math.sin(t * 0.5)
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = t * 0.025
      torus2Ref.current.rotation.y = t * 0.015
      const mat = torus2Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.02 + 0.015 * Math.sin(t * 0.3)
    }
  })

  return (
    <>
      <mesh ref={torusRef} position={[0, 0, -20]}>
        <torusGeometry args={[8, 3, 8, 32]} />
        <meshBasicMaterial color="#e62e4d" transparent opacity={0.04} wireframe />
      </mesh>
      <mesh ref={torus2Ref} position={[0, 0, -25]}>
        <torusGeometry args={[12, 2, 6, 24]} />
        <meshBasicMaterial color="#e62e4d" transparent opacity={0.025} wireframe />
      </mesh>
    </>
  )
}

/**
 * Handles WebGL context loss gracefully and disposes all GPU resources on unmount.
 */
function SceneDisposer() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const canvas = gl.domElement

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      console.warn('WebGL context lost — disposing resources')
    }

    const handleContextRestored = () => {
      console.info('WebGL context restored')
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)

      // Dispose all GPU resources
      disposeScene(scene)
      gl.dispose()
    }
  }, [gl, scene])

  return null
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { rootMargin: '300px' },
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
          <color attach="background" args={['#0a0a0a']} />
          <Particles />
          <RedNebula />
          <SceneDisposer />
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.3}
              luminanceSmoothing={0.95}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Canvas>
      ) : null}
    </div>
  )
}
