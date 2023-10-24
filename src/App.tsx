import { createSignal } from 'solid-js'

import StageRenderer from '@/components/StageRenderer'
import EquationSetting from '@/components/EquationSetting'

import type { Equation, EquationName } from '@/types/equations'

function App() {
  const [equation, setEquation] = createSignal<Equation>()
  const [eqName, setEqName] = createSignal<EquationName>('amplitude')
  return (
    <>
      <StageRenderer
        eqName={eqName()}
        equation={equation()}
      />
      <EquationSetting
        eqName={eqName()}
        setEqName={setEqName}
        setEquation={setEquation}
      />
    </>
  )
}

export default App
