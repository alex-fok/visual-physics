import { Component, createEffect, onMount } from 'solid-js'
import * as THREE from 'three'

import './StageRenderer.css'
import createStageSetup from '@/stages'

import type { Equation, EquationName } from '@/types/equations'

const getWindowWidth = () => window.innerWidth - 1
const getWindowHeight = () => window.innerHeight

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

const onWindowResize = (renderer: THREE.WebGLRenderer) => {
  const [ width, height ] = [getWindowWidth(), getWindowHeight()]
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, Math.floor(height))
  renderer.render(scene, camera)
}

type StageProps = {
  type: EquationName,
  equation: Equation | undefined
}

const Stage: Component<StageProps> = (props) => {
  let canvasRef: HTMLCanvasElement | undefined
  
  const [currStage, setStageType] = createStageSetup(props.type)
  
  const setCameraAndScene = (renderer: THREE.WebGLRenderer) => {
    const [s, c] = currStage.init(renderer)
    c.aspect = getWindowWidth() / getWindowHeight()
    c.updateProjectionMatrix()
    
    scene = s
    camera = c
  }

  onMount(() => {
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(getWindowWidth(), getWindowHeight())
    setCameraAndScene(renderer)
    
    window.addEventListener('resize', () => { onWindowResize(renderer) })

    // Effect: Type
    createEffect(() => {
      currStage.stop()
      setStageType(props.type)
      setCameraAndScene(renderer)
    })
    // Effect: Equation
    createEffect(() => {
      if (props.equation) {
        currStage.stop()
        currStage.start(renderer, props.equation)
      }
    })
  })
  return (
    <div class='render-space'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Stage
