import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import type { InelasticCollisionEq } from '@/types/equations'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let setTime: (t: number) => void

let controls : TrackballControls;

let group1: THREE.Group
let group2: THREE.Group
let object1: THREE.Mesh
let object1Label: CSS2DObject
let object2: THREE.Mesh
let object2Label: CSS2DObject

let rendererId = 0
let equationId = 0

const controlAnimate = () => {
  requestAnimationFrame(controlAnimate);
  controls.update();

}

export const init = (renderer: THREE.WebGLRenderer, setT: (t: number) => void, labelRenderer?: CSS2DRenderer): [THREE.Scene, THREE.PerspectiveCamera, () => void] => {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()
  setTime = setT

  group1 = new THREE.Group();
  
  object1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )
  object1.position.x = -2.5
  group1.add(object1)

  const object1LabelDOM = document.createElement('div')
  object1LabelDOM.className = 'label'
  object1LabelDOM.textContent = 'm1';
  
  object1Label = new CSS2DObject(object1LabelDOM)
  object1Label.position.copy(object1.position)
  object1Label.position.setY(object1.position.y + 1)
  group1.add(object1Label);

  group2 = new THREE.Group();

  object2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x4545FF})
  )
  object2.position.x = 2.5
  group2.add(object2)

  const object2LabelDOM = document.createElement('div')
  object2LabelDOM.className = 'label'
  object2LabelDOM.textContent = 'm2'

  object2Label = new CSS2DObject(object2LabelDOM)
  object2Label.position.copy(object2.position)
  object2Label.position.setY(object2.position.y + 1)
  group2.add(object2Label)

  scene.add(group1, group2)

  camera.position.setY(0)
  camera.position.setZ(8)

  const assignRendererAnimation = (
    r: THREE.WebGLRenderer,
    s: THREE.Scene,
    c: THREE.PerspectiveCamera,
    l?: CSS2DRenderer
  ) => {
    const animation = () => {
      rendererId = requestAnimationFrame(() => animation())
      r.render(s, c)
      l?.render(s, c)
    }
    return animation
  }
  
  controls = new TrackballControls( camera, renderer.domElement );
  controls.minDistance = 0;
  controls.maxDistance = 30;
  
  controlAnimate();
  return [scene, camera, assignRendererAnimation(renderer, scene, camera, labelRenderer)]
}

const setItemPositions = (t: number, equation: InelasticCollisionEq) => {
  const {x1, x2} = equation(t)
  object1.position.x = x1
  object1Label.position.x = x1
  object2.position.x = x2
  object2Label.position.x = x2
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: InelasticCollisionEq,
  duration: number,
  onEnd: () => void,
  labelRenderer?: CSS2DRenderer
) => {
  if (equationId) {
    cancelAnimationFrame(equationId)
    equationId = 0
  }
  const clock = new THREE.Clock()
  const moveObj = (
    equation: InelasticCollisionEq,
    t: number
  ) => {
    setTime(t)
    setItemPositions(t, equation)
    renderer.render(scene, camera)
    labelRenderer?.render(scene, camera)
    t < duration ?
      equationId = requestAnimationFrame(() => moveObj(equation, Math.min(t + clock.getDelta(), duration))) :
      onEnd()
  }
  // Start Animation  
  clock.start()
  moveObj(equation, 0)
}

export const cleanup = () => {
  group1.remove(object1Label)
  group2.remove(object2Label)
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

export const setFrame = (
  t: number,
  renderer: THREE.WebGLRenderer,
  equation: InelasticCollisionEq,
  labelRenderer?: CSS2DRenderer
  ) => {
  setItemPositions(t, equation)
  renderer.render(scene, camera)
  labelRenderer?.render(scene, camera)
}
