import * as THREE from 'three'
import type { AmplitudeEq } from '@/types/equations'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

let sphere: THREE.Mesh

let rendererId: number
let equationId: number

export function init(renderer: THREE.WebGLRenderer): [THREE.Scene, THREE.PerspectiveCamera, () => void] {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 20, 20),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )
  scene.add(sphere)

  camera.position.setY(0)
  camera.position.setZ(200)

  const assignRendererAnimation = (
    r: THREE.WebGLRenderer,
    s: THREE.Scene,
    c: THREE.PerspectiveCamera,
  ) => {
    
    const animation = () => {
      rendererId = requestAnimationFrame(() => animation())
      r.render(s, c)
    }
      return animation
    }
  return [scene, camera, assignRendererAnimation(renderer, scene, camera)]
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: AmplitudeEq
) => {
  if (equationId) {
    cancelAnimationFrame(equationId)
    equationId = 0
  }
  const clock = new THREE.Clock()
  const moveObj = (
    equation: AmplitudeEq,
    t: number
  ) => {
    if (t > 5) return
    const {x, y} = equation(t)
    sphere.position.x = x
    sphere.position.y = y
    renderer.render(scene, camera)

    equationId = requestAnimationFrame(() => moveObj(equation, t + clock.getDelta()))
  }
  // Start Animation  
  clock.start()
  moveObj(equation, 0)
}

export const stopAnimation = () => {
  if (rendererId) {
    cancelAnimationFrame(rendererId)
    rendererId = 0
  }
  if (equationId) {
    cancelAnimationFrame(equationId)
    equationId = 0
  } 
}
