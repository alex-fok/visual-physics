import * as THREE from 'three'
import type { AmplitudeEq } from '@/types/equations'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

let sphere: THREE.Mesh
let line: THREE.Line

let setTime: (t: number) => void

// From CG bookcase: https://www.cgbookcase.com/textures/granite-01-small
const ao = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/AO.png')
const baseColor = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/BaseColor.png')
const height = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/Height.png')
const metallic = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/Metallic.png')
const normal = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/Normal.png')
const roughness = new THREE.TextureLoader().load(import.meta.env.BASE_URL + 'assets/textures/metal/Roughness.png')

// const ambient = new THREE.AmbientLight(0xffffff)

const pointLight = new THREE.PointLight(0xFFFFFF, 100, 0, .8)
const lightHelper = new THREE.PointLightHelper(pointLight)
pointLight.position.set(-5, -35, 50)

let rendererId = 0;
let equationId = 0;

export const init = (renderer: THREE.WebGLRenderer, setT: (t: number) => void): [THREE.Scene, THREE.PerspectiveCamera, () => void] => {
  camera = new THREE.PerspectiveCamera(75, undefined, 0.01, 1000)
  scene = new THREE.Scene()
  setTime = setT 

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(12, 50, 50),
    new THREE.MeshStandardMaterial({
      aoMap: ao,
      map: baseColor,
      displacementMap: height,
      metalnessMap: metallic,
      normalMap: normal,
      roughnessMap: roughness
    })
  )
  sphere.position.y = -50
  const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff})
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -50, 0)
  ])
  line = new THREE.Line(lineGeometry, lineMaterial)
  
  scene.add(pointLight)
  scene.add(lightHelper)
  scene.add(sphere, line)

  camera.position.setY(-20)
  camera.position.setZ(100)

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

const setItemPositions = (t: number, equation: AmplitudeEq) => {
  const {linePoints, obj} = equation(t)
  line.geometry = new THREE.BufferGeometry().setFromPoints(linePoints.map(p => new THREE.Vector3(...p)))
  sphere.position.x = obj.x
  sphere.position.y = obj.y
}

export const startAnimation = (
  renderer: THREE.WebGLRenderer,
  equation: AmplitudeEq,
  duration: number,
  onEnd: () => void
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
    setTime(t)
    setItemPositions(t, equation)
    renderer.render(scene, camera)
    t < duration ?
      equationId = requestAnimationFrame(() => moveObj(equation, Math.min(t + clock.getDelta(), duration))) :
      onEnd?.()
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

export const setFrame = (
  t: number,
  renderer: THREE.WebGLRenderer,
  equation: AmplitudeEq
) => {
  setItemPositions(t, equation)
  renderer.render(scene, camera)
}
