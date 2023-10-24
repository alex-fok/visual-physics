type StageSetup = (renderer: THREE.WebGLRenderer) => [
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  enableControl: () => void
]

type StartAnimation = (renderer: THREE.WebGLRenderer, equation: any) => void

type StopAnimation = () => void

export type StageActions = {
  init: StageSetup,
  start: StartAnimation,
  stop: StopAnimation
}
