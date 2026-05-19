'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import type { Project } from '@/data/projects'
import { disposeScene } from '@/lib/webgl'

interface ProjectNodeProps {
  project: Project
  position: [number, number, number]
  isActive: boolean
  scrollProgress: number
  onSelect: (id: string) => void
  onPreview: (slug: string) => void
}

function ProjectNode({ project, position, isActive, scrollProgress, onSelect, onPreview }: ProjectNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + position[0] * 0.5
    const targetScale = hovered ? 1.2 : isActive ? 1.05 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
  })

  const color = project.field === 'frontend' ? '#e62e4d' : project.field === 'backend' ? '#b3263d' : '#cc2a00'

  // Modulate emissive intensity with scroll progress
  const baseEmissive = hovered ? 2.0 : isActive ? 1.5 : 0.6
  const scrollEmissive = baseEmissive + scrollProgress * 1.2

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          onSelect(project.id)
          onPreview(project.slug)
        }}
      >
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={scrollEmissive}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[0.53, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.7 : 0.25} />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        font="https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEFA87Heg.woff2"
        maxWidth={2}
      >
        {project.name.toUpperCase()}
      </Text>
    </group>
  )
}

function LaserLines({ positions }: { positions: [number, number, number][] }) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const { geometry } = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < Math.min(i + 4, positions.length); j++) {
        const pi = positions[i]
        const pj = positions[j]
        const dx = pi[0] - pj[0]
        const dy = pi[1] - pj[1]
        const dz = pi[2] - pj[2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 5.5) {
          points.push(...pi, ...pj)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return { geometry: geo }
  }, [positions])
  return <lineSegments ref={linesRef} geometry={geometry}><lineBasicMaterial color="#e62e4d" transparent opacity={0.06} /></lineSegments>
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })
  return null
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

// Bloom wrapper that accepts scrollProgress
function DynamicBloom({ intensity }: { intensity: number }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={intensity}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.95}
        blendFunction={BlendFunction.ADD}
      />
    </EffectComposer>
  )
}

interface Props {
  projects: Project[]
  activeField: string
  onPreview: (slug: string) => void
  scrollProgress?: number
}

export default function ProjectsScene({ projects, activeField, onPreview, scrollProgress = 0 }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafThrottleRef = useRef<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    const el = containerRef.current
    if (!el) return
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = activeField === 'all' ? projects : projects.filter((p) => p.field === activeField)

  const positions = useMemo<[number, number, number][]>(() => {
    const cols = 3
    return filtered.map((_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      return [(col - 1) * 3.5, -row * 2.8, 0]
    })
  }, [filtered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafThrottleRef.current)
    rafThrottleRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect()
      setMouseX((e.clientX - rect.left - rect.width / 2) / rect.width)
      setMouseY((e.clientY - rect.top - rect.height / 2) / rect.height)
    })
  }

  // Modulate bloom intensity with scroll progress: 0.5 → 0.9
  const bloomIntensity = 0.5 + scrollProgress * 0.4

  return (
    <div ref={containerRef} className="canvas-boundary" style={{ width: '100%', height: '100%', minHeight: 300 }}>
      {isVisible ? (
        <div
          style={{ width: '100%', height: '100%' }}
          onMouseMove={handleMouseMove}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 55 }} frameloop="demand">
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.2 + scrollProgress * 0.15} />
            <pointLight position={[0, 6, 6]} color="#e62e4d" intensity={8} />
            <CameraRig mouseX={mouseX} mouseY={mouseY} />
            <LaserLines positions={positions} />
            {filtered.map((project, i) => (
              <ProjectNode
                key={project.id}
                project={project}
                position={positions[i]}
                isActive={selectedId === project.id}
                scrollProgress={scrollProgress}
                onSelect={setSelectedId}
                onPreview={onPreview}
              />
            ))}
            <SceneDisposer />
            <DynamicBloom intensity={bloomIntensity} />
          </Canvas>
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(230,46,77,0.3)', letterSpacing: 2 }}>
          SCROLL_TO_RENDER
        </div>
      )}
    </div>
  )
}
