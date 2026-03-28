'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const COUNT = 2800

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10
      sizes[i] = Math.random() * 2.5 + 0.5
    }
    return { positions, sizes }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.015
    meshRef.current.rotation.x = t * 0.008
    // Subtle breathing
    const s = 1 + 0.015 * Math.sin(t * 0.3)
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
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.7}
        fog={false}
      />
    </points>
  )
}

function RedNebula() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = t * 0.04
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.03 + 0.015 * Math.sin(t * 0.5)
  })
  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <torusGeometry args={[8, 3, 8, 32]} />
      <meshBasicMaterial color="#ff0033" transparent opacity={0.04} wireframe />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
        <color attach="background" args={['#000000']} />
        <Particles />
        <RedNebula />
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
