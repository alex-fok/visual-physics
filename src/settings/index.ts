import amplitude from './amplitude'
import displacement from './displacement'
import elasticCollision from './elasticCollision'

import type { EquationName, EquationVar } from '@/types/equations'

const equationList: Record<EquationName, () => EquationVar> = {
    'amplitude': amplitude,
    'displacement': displacement,
    'elasticCollision': elasticCollision
}

export default equationList
