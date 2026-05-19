'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { disposeScene } from '@/lib/webgl'

const FACES = [
  { rotation: [0, 0, 0], label: 'PYTHON', color: '#e62e4d' },
  { rotation: [0, Math.PI, 0], label: 'RUST', color: '#cc2a00' },
  { rotation: [0, Math.PI / 2, 0], label: 'REACT', color: '#e62e4d' },
  { rotation: [0, -Math.PI / 2, 0], label: 'FASTAPI', color: '#b3263d' },
  { rotation: [Math.PI / 2, 0, 0], label: 'ML / AI', color: '#e62e4d' },
  { rotation: [-Math.PI / 2, 0, 0], label: 'DEVOPS', color: '#b3263d' },
]

function TechCube({ hovered }: { hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !edgesRef.current) return
    const targetSpeed = hovered ? 0.15 : 0.35
    meshRef.current.rotation.y += delta * targetSpeed
    meshRef.current.rotation.x += delta * 0.12
    edgesRef.current.rotation.y = meshRef.current.rotation.y
    edgesRef.current.rotation.x = meshRef.current.rotation.x
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group>
        <mesh ref={meshRef}>
          <boxGeometry args={[2.2, 2.2, 2.2]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.3}
            roughness={0.05}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.08}
            color="#e62e4d"
            opacity={0.12}
            transparent
          />
        </mesh>

        <lineSegments ref={edgesRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 2.2, 2.2)]} />
          <lineBasicMaterial color="#e62e4d" transparent opacity={0.9} />
        </lineSegments>

        {FACES.map((face, i) => {
          const dist = 1.15
          const pos: [number, number, number] =
            i === 0 ? [0, 0, dist]
            : i === 1 ? [0, 0, -dist]
            : i === 2 ? [dist, 0, 0]
            : i === 3 ? [-dist, 0, 0]
            : i === 4 ? [0, dist, 0]
            : [0, -dist, 0]
          const rot: [number, number, number] =
            i === 0 ? [0, 0, 0]
            : i === 1 ? [0, Math.PI, 0]
            : i === 2 ? [0, Math.PI / 2, 0]
            : i === 3 ? [0, -Math.PI / 2, 0]
            : i === 4 ? [-Math.PI / 2, 0, 0]
            : [Math.PI / 2, 0, 0]
          return (
            <Text
              key={i}
              position={pos}
              rotation={rot}
              fontSize={0.22}
              color={face.color}
              font="https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny.woff"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
            >
              {face.label}
            </Text>
          )
        })}

        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#e62e4d"
            emissive="#e62e4d"
            emissiveIntensity={3}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  )
}

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
      disposeScene(scene)
      gl.dispose()
    }
  }, [gl, scene])

  return null
}

export default function TechCubeScene() {
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    const el = containerRef.current
    if (!el) return
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: 360, height: 360, cursor: 'auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isVisible ? (
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[4, 4, 4]} color="#e62e4d" intensity={8} />
          <pointLight position={[-4, -4, -4]} color="#e62e4d" intensity={4} />
          <spotLight
            position={[0, 8, 0]}
            color="#e62e4d"
            intensity={6}
            angle={0.4}
            penumbra={1}
          />
          <TechCube hovered={hovered} />
          <SceneDisposer />
          <EffectComposer>
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        </Canvas>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(230,46,77,0.3)', letterSpacing: 2 }}>
          SCROLL_TO_RENDER
        </div>
      )}
    </div>
  )
}
