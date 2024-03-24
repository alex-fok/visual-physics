import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

type StageSetup = (renderer: THREE.WebGLRenderer, setTime: (t: number) => void, labelRenderer?: CSS2DRenderer) => [
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  enableControl: () => void
]

type StartAnimation = (renderer: THREE.WebGLRenderer, equation: any, onEnd: () => void, labelRenderer?: CSS2DRenderer) => void

type StopAnimation = () => void

type SetFrame = (t: number, renderer: THREE.WebGLRenderer, equation: any, labelRenderer?: CSS2DRenderer) => void

type Clear = () => void

export type StageActions = {
  init: StageSetup,
  start: StartAnimation,
  stop: StopAnimation,
  setFrame?: SetFrame,
  clear?: Clear
}
