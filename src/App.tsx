import { createSignal } from 'solid-js'
import StageRenderer from './StageRenderer'
import EquationSetting from './EquationSetting'
import './App.css'

function App() {
  const [equation, setEquation] = createSignal<(t: number) => any>()
  const [type, setType] = createSignal('displacement')
  return (
    <>
      <StageRenderer
        type={type()}
        equation={equation()}
        test={(a: number, b: number) => a + b}
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
