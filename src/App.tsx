import { createSignal } from 'solid-js'

import StageRenderer from '@/components/StageRenderer'
import EquationSetting from '@/components/EquationSetting'
import TimeSlider from '@/components/TimeSlider'

import type { Equation, EquationName } from '@/types/equations'

function App() {
  const [equation, setEquation] = createSignal<Equation>()
  const [eqName, setEqName] = createSignal<EquationName>('amplitude')
  const [currTime, setTime] = createSignal<number>(0)
  const [isPlayAnimation, setIsPlayAnimation] = createSignal<boolean>(false)

  return (
    <>
      <StageRenderer
        eqName={eqName()}
        equation={equation()}
        time={currTime()}
        setTime={setTime}
        isPlayAnimation={isPlayAnimation()}
        setIsPlayAnimation={setIsPlayAnimation}
      />
      <EquationSetting
        eqName={eqName()}
        setEqName={setEqName}
        setEquation={setEquation}
        setIsPlayAnimation={setIsPlayAnimation}
      />
      <TimeSlider
        time={currTime()}
        setTime={setTime}
      />
    </>
  )
}

export default App
