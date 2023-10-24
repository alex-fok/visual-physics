import { Component, createEffect, createMemo, onMount } from 'solid-js'
import * as THREE from 'three'
import dimensions from '@/utils/dimensions'

import './StageRenderer.css'

import createStageActions from '@/stages'

import type { StageActions } from '@/types/stages'
import type { Equation, EquationName } from '@/types/equations'

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

const onWindowResize = (renderer: THREE.WebGLRenderer) => {
  const { width, height } = dimensions()
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, Math.floor(height))
  renderer.render(scene, camera)
}

type StageProps = {
  eqName: EquationName,
  equation: Equation | undefined
}

const Stage: Component<StageProps> = (props) => {
  let canvasRef: HTMLCanvasElement | undefined
  const actions = createMemo<StageActions>(prev => {
    prev?.stop()
    return createStageActions(props.eqName)
  })

  const setCameraAndScene = (s: THREE.Scene, c: THREE.PerspectiveCamera, control: () => void) => {
    const {width, height} = dimensions()
    c.aspect = width / height
    c.updateProjectionMatrix()
    scene = s
    camera = c
    control()
  }

  onMount(() => { 
    const r = new THREE.WebGLRenderer({canvas: canvasRef})
    r.setPixelRatio(window.devicePixelRatio)
    const { width, height } = dimensions()
    r.setSize(width, height)
    renderer = r
    renderer.autoClear = true;
    // Effect: Type
    createEffect(() => {
      window.addEventListener('resize', () => { onWindowResize(r) })
      setCameraAndScene(...actions().init(renderer))
    })
  })

  createEffect(() => {
    if (props.equation)
      actions().start(renderer, props.equation)
  })
  return (
    <div class='render-space'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Stage
