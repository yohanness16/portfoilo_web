import * as THREE from 'three'

/**
 * Recursively traverse a Three.js Object3D and dispose all geometries,
 * materials, and textures. Call this in cleanup/unmount to prevent GPU memory leaks.
 */
export function disposeScene(object: THREE.Object3D): void {
  object.traverse((child) => {
    // Dispose geometry
    if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments) {
      if (child.geometry) {
        child.geometry.dispose()
      }
    }

    // Dispose material(s)
    const disposeMaterial = (material: THREE.Material) => {
      material.dispose()

      // Dispose textures in material maps
      const matWithMaps = material as THREE.MeshStandardMaterial
      const maps: (THREE.Texture | null)[] = [
        matWithMaps.map,
        matWithMaps.normalMap,
        matWithMaps.roughnessMap,
        matWithMaps.metalnessMap,
        matWithMaps.emissiveMap,
        matWithMaps.aoMap,
        matWithMaps.envMap,
        matWithMaps.alphaMap,
        matWithMaps.bumpMap,
        matWithMaps.displacementMap,
        matWithMaps.lightMap,
        // matWithMaps.specularMap, // removed in newer Three.js
      ]

      // MeshTransmissionMaterial and other special materials
      const transmissionMat = material as unknown as { transmissionMap?: THREE.Texture; thicknessMap?: THREE.Texture }
      if (transmissionMat.transmissionMap) maps.push(transmissionMat.transmissionMap)
      if (transmissionMat.thicknessMap) maps.push(transmissionMat.thicknessMap)

      maps.forEach((tex) => {
        if (tex) tex.dispose()
      })
    }

    if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments) {
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(disposeMaterial)
        } else {
          disposeMaterial(child.material)
        }
      }
    }
  })
}

/**
 * Dispose a single Three.js scene completely.
 * Use as cleanup in useEffect for R3F components.
 */
export function disposeThreeScene(scene: THREE.Scene): void {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      child.geometry?.dispose()
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m) => {
          // Dispose all possible texture slots
          Object.values(m).forEach((value) => {
            if (value instanceof THREE.Texture) {
              value.dispose()
            }
          })
          m.dispose()
        })
      }
    }
  })
}
