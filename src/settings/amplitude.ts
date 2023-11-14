import { createSignal } from 'solid-js'

import type { AmplitudeEq, Value } from '@/types/equations'

export default ():{ equationString:string, values: Value[], equation: () => AmplitudeEq } => {
  const [amplitude, setAmplitude] = createSignal<number>(0)
  const [angularFrequency, setAngularFrequency] = createSignal<number>(0)
  const [phase, setPhase] = createSignal<number>(0)
  
  const equationString = 'y = A sin(ωt + ϕ)'

  const values = [
    {id: 'amplitude', name:'A', unit: '', var: amplitude, setter: setAmplitude, note:''},
    {id: 'angularFrequency', name: 'ω', unit: 'rad/s', var: angularFrequency, setter: setAngularFrequency, note: ''},
    {id: 'phase', name: 'ϕ', unit: '', var: phase, setter: setPhase, note: ''}
  ]
  const equation = () => {
    const amplitude_num = amplitude()
    const angularFrequency_num = angularFrequency()
    const phase_num = phase()
    
    return (t:number) => {
      const x =  amplitude_num * Math.sin(angularFrequency_num * t + phase_num)
      const y = (50 ** 2 - (amplitude_num * Math.sin(angularFrequency_num * t + phase_num)) ** 2) ** .5 * -1
      return {
        linePoints: [[0, 0, 0], [x, y, 0]],
        obj: { x, y }
      }
    }
  }
  return {equationString, values, equation}
}
