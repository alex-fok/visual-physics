import * as THREE from 'three'
import type { DisplacementEq } from '@/types/equations'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene

let sphere: THREE.Mesh
let plane: THREE.Mesh

let animationId: number

export function init(): [THREE.Scene, THREE.PerspectiveCamera] {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 20, 20),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )

  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 50, 50),
    new THREE.MeshBasicMaterial({ color:0x6C6C6C, side: THREE.DoubleSide, wireframe: true})
  )

  plane.position.y = -10
  plane.rotation.x = Math.PI / 2

  scene.add(sphere, plane)

  camera.position.setY(75)
  camera.position.setZ(100)
  return [scene, camera]
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: DisplacementEq
) => {
  const clock = new THREE.Clock()
  const moveObj = (
    equation: DisplacementEq,
    t: number
  ) => {
    if (t > 10) return

    const {x, y, z} = equation(t)
    sphere.position.x = x
    sphere.position.y = y
    sphere.position.z = z
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
