import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

type StageSetup = (renderer: THREE.WebGLRenderer, labelRenderer?: CSS2DRenderer) => [
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  enableControl: () => void
]

type StartAnimation = (renderer: THREE.WebGLRenderer, equation: any, labelRenderer?: CSS2DRenderer) => void

type StopAnimation = () => void

type Clear = () => void

export type StageActions = {
  init: StageSetup,
  start: StartAnimation,
  stop: StopAnimation
  clear?: Clear
}
