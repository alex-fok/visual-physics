import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { DisplacementEq } from '@/types/equations'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let setTime: (t: number) => void

let sphere: THREE.Mesh
let plane: THREE.Mesh

let labelGroup: THREE.Group

let xLabel: CSS2DObject
let yLabel: CSS2DObject
let zLabel: CSS2DObject

let rendererId: number
let equationId: number

const assignOrbitControl = (
  r: THREE.WebGLRenderer,
  s: THREE.Scene,
  c: THREE.PerspectiveCamera,
  o: OrbitControls,
  l?: CSS2DRenderer
) => {
  if (rendererId) {
    cancelAnimationFrame(rendererId)
    rendererId = 0
  }
  const enableOrbitControl = () => {
    rendererId = requestAnimationFrame(() => enableOrbitControl())
    o.update()
    r.render(s, c)
    l?.render(s, c)
  }
  return enableOrbitControl
}

export function init(renderer: THREE.WebGLRenderer, setT: (t: number) => void, labelRenderer?: CSS2DRenderer): [THREE.Scene, THREE.PerspectiveCamera, () => void] {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()
  setTime = setT

  const axesHelper = new THREE.AxesHelper(50);

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(10, 20, 20),
    new THREE.MeshBasicMaterial({color: 0xFF4545})
  )

  labelGroup = new THREE.Group();

  const xLabelDOM = document.createElement('div')
  xLabelDOM.className = 'label'
  xLabelDOM.textContent = 'x'

  const yLabelDOM = document.createElement('div')
  yLabelDOM.className = 'label'
  yLabelDOM.textContent = 'y'

  const zLabelDOM = document.createElement('div')
  zLabelDOM.className = 'label'
  zLabelDOM.textContent = 'z'

  xLabel = new CSS2DObject(xLabelDOM)
  xLabel.position.copy(sphere.position)
  xLabel.position.setX(sphere.position.x + 15)
  xLabel.position.setY(sphere.position.y + 5)

  yLabel = new CSS2DObject(yLabelDOM)
  yLabel.position.copy(sphere.position)
  yLabel.position.setX(sphere.position.x + 5)
  yLabel.position.setY(sphere.position.y + 15)

  zLabel = new CSS2DObject(zLabelDOM)
  zLabel.position.copy(sphere.position)
  zLabel.position.setY(sphere.position.y + 5)
  zLabel.position.setZ(sphere.position.z + 15)

  labelGroup.add(xLabel)
  labelGroup.add(yLabel)
  labelGroup.add(zLabel)

  plane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 50, 50),
    new THREE.MeshBasicMaterial({ color:0x6C6C6C, side: THREE.DoubleSide, wireframe: true})
  )

  plane.position.y = -10
  plane.rotation.x = Math.PI / 2

  scene.add(sphere, plane, labelGroup, axesHelper)

  camera.position.setY(75)
  camera.position.setZ(100)

  const control = assignOrbitControl(renderer, scene, camera, new OrbitControls(camera, renderer.domElement), labelRenderer)
  
  return [scene, camera, control]
}

const setItemPositions = (t: number, equation: DisplacementEq) => {
  const {x, y, z} = equation(t)
  sphere.position.x = x
  sphere.position.y = y
  sphere.position.z = z
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: DisplacementEq,
  onEnd: () => void,
  labelRenderer?: CSS2DRenderer
) => {
  const clock = new THREE.Clock()
  const moveObj = (
    equation: DisplacementEq,
    t: number
  ) => {
    if (t > 5) {
      onEnd()
      return
    }
    setTime(t)
    setItemPositions(t, equation)
    renderer.render(scene, camera)
    labelRenderer?.render(scene, camera)

    equationId = requestAnimationFrame(() => moveObj(equation, t + clock.getDelta()))
  }
  // Start Animation  
  clock.start()
  moveObj(equation, 0)
}

export const cleanup = () => {
  labelGroup.remove(xLabel)
  labelGroup.remove(yLabel)
  labelGroup.remove(zLabel)
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
  equation: DisplacementEq,
  labelRenderer?: CSS2DRenderer
  ) => {
  setItemPositions(t, equation)
  renderer.render(scene, camera)
  labelRenderer?.render(scene, camera)
}
