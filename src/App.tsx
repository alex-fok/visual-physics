import { createSignal } from 'solid-js'
import StageRenderer from './components/StageRenderer'
import EquationSetting from './components/EquationSetting'
import './App.css'

import type { EquationName, Equation } from '@/types/equations'

function App() {
  const [equation, setEquation] = createSignal<Equation>()
  const [type, setType] = createSignal<EquationName>('displacement')
  return (
    <>
      <StageRenderer
        type={type()}
        equation={equation()}
      />
      <EquationSetting
        type={type()}
        setType={setType}
        setEquation={setEquation}
      />
    </>
  )
}

export default App
