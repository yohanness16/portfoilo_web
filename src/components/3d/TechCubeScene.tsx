'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

const FACES = [
  { rotation: [0, 0, 0], label: 'PYTHON', color: '#ff0033' },
  { rotation: [0, Math.PI, 0], label: 'RUST', color: '#ff3300' },
  { rotation: [0, Math.PI / 2, 0], label: 'REACT', color: '#ff0044' },
  { rotation: [0, -Math.PI / 2, 0], label: 'FASTAPI', color: '#cc0022' },
  { rotation: [Math.PI / 2, 0, 0], label: 'ML / AI', color: '#ff0055' },
  { rotation: [-Math.PI / 2, 0, 0], label: 'DEVOPS', color: '#dd0033' },
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
        {/* Glass cube */}
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
            color="#ff0033"
            opacity={0.12}
            transparent
          />
        </mesh>

        {/* Red wireframe edges */}
        <lineSegments ref={edgesRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 2.2, 2.2)]} />
          <lineBasicMaterial color="#ff0033" transparent opacity={0.9} />
        </lineSegments>

        {/* Face labels */}
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

        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#ff0033"
            emissive="#ff0033"
            emissiveIntensity={3}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function TechCubeScene() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: 360, height: 360, cursor: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} color="#ff0033" intensity={8} />
        <pointLight position={[-4, -4, -4]} color="#ff0033" intensity={4} />
        <spotLight
          position={[0, 8, 0]}
          color="#ff0033"
          intensity={6}
          angle={0.4}
          penumbra={1}
        />
        <TechCube hovered={hovered} />
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
