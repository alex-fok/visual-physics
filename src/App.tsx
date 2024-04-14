import { createSignal } from 'solid-js'

import { duration as DefaultDuration } from './stages/defaultValues'
import StageRenderer from '@/components/StageRenderer'
import EquationSetting from '@/components/EquationSetting'
import Controller from '@/components/Controller'

import type { Equation, EquationName } from '@/types/equations'

function App() {
  const [equation, setEquation] = createSignal<Equation>()
  const [eqName, setEqName] = createSignal<EquationName>('amplitude')
  const [currTime, setTime] = createSignal<number>(0)
  const [currDuration, setDuration] = createSignal<number>(DefaultDuration)
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
        duration={currDuration()}
        setDuration={setDuration}
      />
      
      <EquationSetting
        eqName={eqName()}
        setEqName={setEqName}
        setEquation={setEquation}
        setIsPlayAnimation={setIsPlayAnimation}
      />
      <Controller
        time={currTime()}
        setTime={setTime}
        duration={currDuration()}
        setDuration={setDuration}
        setIsPlayAnimation={setIsPlayAnimation}
      />
    </>
  )
}

export default App
