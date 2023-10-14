import { Component, createEffect, onMount } from 'solid-js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createStageSetup from './stage'

import './StageRenderer.css'

const getWindowWidth = () => window.innerWidth - 1
const getWindowHeight = () => window.innerHeight


let renderer: THREE.WebGLRenderer | undefined
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera

let currOrbit: number

const onWindowResize = () => {
  const [ width, height ] = [getWindowWidth(), getWindowHeight()]
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer?.setSize(width, Math.floor(height))
  renderer?.render(scene, camera)
}

const assignOrbitControl = (
  renderer: THREE.WebGLRenderer,
  s: THREE.Scene,
  c: THREE.PerspectiveCamera,
  o: OrbitControls
) => {
  if (currOrbit)
    cancelAnimationFrame(currOrbit)
  
  const enableOrbitControl = () => {
    currOrbit = requestAnimationFrame(() => enableOrbitControl())
    
    o.update()
    renderer.render(s, c)
  }
  enableOrbitControl()
}

type StageProps = {
  type: string,
  equation: ((t: number) => any) | undefined
  test: (a: number, b: number) => number
}

const Stage: Component<StageProps> = (props) => {
  let canvasRef: HTMLCanvasElement | undefined
  
  const [currStage, setStageType] = createStageSetup(props.type)
  
  const setCameraAndScene = () => {
    const [s, c] = currStage.init()
    c.aspect = getWindowWidth() / getWindowHeight()
    c.updateProjectionMatrix()
    
    scene = s
    camera = c

    if (renderer)
      assignOrbitControl(renderer, s, c, new OrbitControls(c, renderer.domElement))
  }

  onMount(() => {
    renderer = new THREE.WebGLRenderer({canvas: canvasRef})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(getWindowWidth(), getWindowHeight())
    setCameraAndScene()
    
    window.addEventListener('resize', onWindowResize)

    // Effect: Type
    createEffect(() => {
      currStage.stop()
      setStageType(props.type)
      setCameraAndScene()
    })
    // Effect: Equation
    createEffect(() => {
      if (renderer && props.equation) {
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
