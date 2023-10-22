import * as THREE from 'three'

import type { AmplitudeEq } from '@/types/equations'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

let sphere: THREE.Mesh

let animationId: number

export function init(): [THREE.Scene, THREE.PerspectiveCamera] {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 20, 20),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )

  scene.add(sphere)

  camera.position.setY(75)
  camera.position.setZ(100)
  return [scene, camera]
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: AmplitudeEq
) => {
  const clock = new THREE.Clock()
  const moveObj = (
    equation: AmplitudeEq,
    t: number
  ) => {
    if (t > 10) return

    const {y} = equation(t)
    sphere.position.y = y
    renderer.render(scene, camera)
    if (y === 0) return

    animationId = requestAnimationFrame(() => moveObj(equation, t + clock.getDelta()))
  }
  // Start Animation  
  clock.start()
  moveObj(equation, 0)
}


export const stopAnimation = () => {
  if (animationId)
    cancelAnimationFrame(animationId)
}
