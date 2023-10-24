import amplitude from './amplitude'
import displacement from './displacement'

import type { EquationName, EquationVar } from '@/types/equations'

const equationList: Record<EquationName, () => EquationVar> = {
    'amplitude': amplitude,
    'displacement': displacement
}

export default equationList
