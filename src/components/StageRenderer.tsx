import { Component, createEffect, createMemo, onMount } from 'solid-js'
import * as THREE from 'three'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import dimensions from '@/utils/dimensions'

import './StageRenderer.css'

import createStageActions from '@/stages'

import type { StageActions } from '@/types/stages'
import type { Equation, EquationName } from '@/types/equations'

let renderer: THREE.WebGLRenderer
let labelRenderer: CSS2DRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

const onWindowResize = (renderer: THREE.WebGLRenderer, labelRenderer: CSS2DRenderer) => {
  const { width, height } = dimensions()
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, Math.floor(height))
  renderer.render(scene, camera)
  labelRenderer.setSize(width, Math.floor(height))
  labelRenderer.render(scene, camera)
}

type StageProps = {
  eqName: EquationName,
  equation: Equation | undefined,
  isPlayAnimation: boolean,
  setIsPlayAnimation: (b: boolean) => void,
  time: number,
  setTime: (t: number) => void
}

const Stage: Component<StageProps> = (props) => {
  let canvasRef: HTMLCanvasElement | undefined
  const actions = createMemo<StageActions>(prev => {
    prev?.stop()
    prev?.clear?.()
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
    const l = new CSS2DRenderer();

    document.getElementById('renderingSpace')?.appendChild(l.domElement)
    r.setPixelRatio(window.devicePixelRatio)
    
    const { width, height } = dimensions()

    r.setSize(width, height)
    l.setSize(width, height)
    renderer = r
    renderer.autoClear = true
    labelRenderer = l

    l.domElement.style.position= 'absolute'
    l.domElement.style.top = '0px'
    l.domElement.style.pointerEvents = 'none'
    l.setSize(width, height)
    
    // Effect: Type
    createEffect(() => {
      window.addEventListener('resize', () => { onWindowResize(r, l) })
      setCameraAndScene(...actions().init(renderer, props.setTime, labelRenderer))
    })
  })

  createEffect(() => {
    if (props.equation && props.isPlayAnimation)
      actions().start(renderer, props.equation, () => { props.setIsPlayAnimation(false) }, labelRenderer)
  })

  createEffect((prevTime) => {
    if (props.time !== prevTime) {
      actions().setFrame?.(props.time, renderer, props.equation, labelRenderer)
      return props.time
    }
  }, props.time)
  return (
    <div id='renderingSpace' class='render-space'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Stage
