'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

interface Project {
  id: string
  name: string
  field: string
  tags: string[]
  desc: string
  link?: string
}

interface ProjectNodeProps {
  project: Project
  position: [number, number, number]
  isActive: boolean
  onSelect: (id: string) => void
}

function ProjectNode({ project, position, isActive, onSelect }: ProjectNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + position[0] * 0.5
    const targetScale = hovered ? 1.2 : isActive ? 1.05 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
  })

  const color = project.field === 'ml' ? '#ff0033' : project.field === 'frontend' ? '#ff0055' : project.field === 'backend' ? '#cc0022' : '#ff3300'

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(project.id)}
      >
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : isActive ? 1.5 : 0.6}
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
      {hovered && project.link && (
        <Html
          position={[0, 0.8, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.95)',
              border: '1px solid rgba(255,0,51,0.6)',
              padding: '10px 18px',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: 10,
              color: '#ff0033',
              textDecoration: 'none',
              letterSpacing: 2,
              cursor: 'pointer',
            }}
          >
            VIEW_SOURCE →
          </a>
        </Html>
      )}
    </group>
  )
}

function LaserLines({ positions }: { positions: [number, number, number][] }) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const { geometry } = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (new THREE.Vector3(...positions[i]).distanceTo(new THREE.Vector3(...positions[j])) < 5) {
          points.push(...positions[i], ...positions[j])
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return { geometry: geo }
  }, [positions])
  return <lineSegments ref={linesRef} geometry={geometry}><lineBasicMaterial color="#ff0033" transparent opacity={0.06} /></lineSegments>
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

interface Props {
  projects: Project[]
  activeField: string
}

export default function ProjectsScene({ projects, activeField }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
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

  return (
    <div ref={containerRef} style={{ width: '100%', height: 400 }}>
      {isVisible ? (
        <div style={{ width: '100%', height: '100%' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setMouseX((e.clientX - rect.left - rect.width / 2) / rect.width)
            setMouseY((e.clientY - rect.top - rect.height / 2) / rect.height)
          }}
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 55 }} frameloop="demand">
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 6, 6]} color="#ff0033" intensity={8} />
            <CameraRig mouseX={mouseX} mouseY={mouseY} />
            <LaserLines positions={positions} />
            {filtered.map((project, i) => (
              <ProjectNode
                key={project.id}
                project={project}
                position={positions[i]}
                isActive={selectedId === project.id}
                onSelect={setSelectedId}
              />
            ))}
            <EffectComposer>
              <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} blendFunction={BlendFunction.ADD} />
            </EffectComposer>
          </Canvas>
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,0,51,0.3)', letterSpacing: 2 }}>
          SCROLL_TO_RENDER
        </div>
      )}
    </div>
  )
}
