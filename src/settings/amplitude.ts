import { createSignal } from 'solid-js'

import type { AmplitudeEq, Value } from '@/types/equations'

export default ():[Value[], () => AmplitudeEq] => {
    const [amplitude, setAmplitude] = createSignal<number>(0)
    const [angularFrequency, setAngularFrequency] = createSignal<number>(0)
    const [phase, setPhase] = createSignal<number>(0)
    
    const values = [
        {id: 'amplitude', name:'amplitude', unit: '', var: amplitude, setter: setAmplitude, note:''},
        {id: 'angularFrequency', name: 'ω', unit: 'rad/s', var: angularFrequency, setter: setAngularFrequency, note: ''},
        {id: 'phase', name: 'ϕ', unit: '', var: phase, setter: setPhase, note: ''}
    ]
    const equation = () => {
        const amplitude_num = amplitude()
        const angularFrequency_num = angularFrequency()
        const phase_num = phase()

        return (t:number) => ({
            y: amplitude_num * Math.sin(angularFrequency_num * t + phase_num)
        })
    }
    return [values, equation]
}
