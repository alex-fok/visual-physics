import amplitude from './amplitude'
import displacement from './displacement'

import type { Equation, EquationName, Value } from '@/types/equations'

type EqSetting = () => [Value[], Equation]

const equationList: Record<EquationName, EqSetting> = {
    'amplitude': amplitude,
    'displacement': displacement
}

export default equationList
