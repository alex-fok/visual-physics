import * as THREE from 'three'

import type { ElasticCollisionEq } from '@/types/equations'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

let object1: THREE.Mesh
let object2: THREE.Mesh

let rendererId = 0
let equationId = 0

export const init = (renderer: THREE.WebGLRenderer): [THREE.Scene, THREE.PerspectiveCamera, () => void] => {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()

  object1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )
  object1.position.x = -2.5
  
  object2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x4545FF})
  )
  object2.position.x = 2.5

  scene.add(object1, object2)

  camera.position.setY(0)
  camera.position.setZ(8)

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
  equation: ElasticCollisionEq
) => {
  if (equationId) {
    cancelAnimationFrame(equationId)
    equationId = 0
  }
  const clock = new THREE.Clock()
  const moveObj = (
    equation: ElasticCollisionEq,
    t: number
  ) => {
    if (t > 5) return
    const {x1, x2} = equation(t)
    object1.position.x = x1
    object2.position.x = x2
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
