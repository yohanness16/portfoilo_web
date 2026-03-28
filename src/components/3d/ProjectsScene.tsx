'use client'

import { useRef, useMemo, useState } from 'react'
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
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y += 0.005
    meshRef.current.rotation.x = Math.sin(t * 0.4 + position[0]) * 0.08
    const targetScale = hovered ? 1.25 : isActive ? 1.1 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)
  })

  const fieldColors: Record<string, string> = {
    ml: '#ff0033',
    frontend: '#ff0055',
    backend: '#cc0022',
    systems: '#ff3300',
  }
  const color = fieldColors[project.field] || '#ff0033'

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(project.id)}
      >
        {/* Hexagon-ish: dodecahedron */}
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.5 : isActive ? 1.8 : 0.8}
          transparent
          opacity={hovered ? 0.35 : 0.18}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh>
        <dodecahedronGeometry args={[0.58, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.9 : 0.35} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.9, 0]}
        fontSize={0.13}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        font="https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEFA87Heg.woff2"
        maxWidth={2.5}
      >
        {project.name.toUpperCase()}
      </Text>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0.8, 0.8, 0]}
          style={{
            background: 'rgba(0,0,0,0.92)',
            border: '1px solid rgba(255,0,51,0.5)',
            padding: '12px 16px',
            minWidth: 200,
            pointerEvents: 'none',
            fontFamily: 'Share Tech Mono, monospace',
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: 3, color: '#ff0033', marginBottom: 6 }}>
            [{project.id}]
          </div>
          <div style={{ fontSize: 11, color: '#fff', marginBottom: 6 }}>{project.name}</div>
          <div style={{ fontSize: 10, color: '#666', lineHeight: 1.5 }}>{project.desc}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
            {project.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 8, letterSpacing: 1, padding: '2px 6px',
                  border: '1px solid rgba(255,0,51,0.3)', color: '#ff0033',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </Html>
      )}
    </group>
  )
}

function LaserLines({ positions }: { positions: [number, number, number][] }) {
  const linesRef = useRef<THREE.LineSegments>(null)

  const { geometry } = useMemo(() => {
    const points: number[] = []
    const threshold = 4.5
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = new THREE.Vector3(...positions[i])
        const b = new THREE.Vector3(...positions[j])
        if (a.distanceTo(b) < threshold) {
          points.push(...positions[i], ...positions[j])
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return { geometry: geo }
  }, [positions])

  useFrame((state) => {
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.08 + 0.05 * Math.sin(state.clock.getElapsedTime() * 0.7)
    }
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#ff0033" transparent opacity={0.1} />
    </lineSegments>
  )
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03
    camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.03
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
    <div
      style={{ width: '100%', height: 460 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMouseX((e.clientX - rect.left - rect.width / 2) / rect.width)
        setMouseY((e.clientY - rect.top - rect.height / 2) / rect.height)
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 6, 6]} color="#ff0033" intensity={10} />
        <pointLight position={[0, -6, 6]} color="#ff0033" intensity={5} />

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
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.85}
            blendFunction={BlendFunction.ADD}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
