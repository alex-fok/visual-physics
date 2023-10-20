
import { createEffect, createSignal, Setter } from 'solid-js'
import { createStore } from 'solid-js/store'
import * as displacement from './displacement'
import { EquationName } from '@/types/equations'

type StageSetup = () => [
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
]

type StartAnimation = (renderer: THREE.WebGLRenderer, equation: any) => void

type StopAnimation = () => void

type Stage = {
  init: StageSetup,
  start: StartAnimation,
  stop: StopAnimation
}

const stages : Record<EquationName, Stage> = {
  'displacement': {
    init: displacement.init,
    start: displacement.startAnimation,
    stop: displacement.stopAnimation
  }
}

export default (
  type: EquationName 
): [Stage, Setter<EquationName>] => {
  const [stageType, setStageType] = createSignal<EquationName>(type)
  const [stage, setStageInit] = createStore<Stage>(stages[type])

  createEffect(() => { setStageInit(stages[stageType()]) })
  
  return [stage, setStageType]
}
