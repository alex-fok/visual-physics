import * as amplitude from './amplitude'
import * as displacement from './displacement'
import * as elasticCollision from './elasticCollision'

import type { EquationName } from '@/types/equations'
import type { StageActions } from '@/types/stages'

const stages: Record<EquationName, StageActions> = {
  'displacement': {
    init: displacement.init,
    start: displacement.startAnimation,
    stop: displacement.stopAnimation
  },
  'amplitude': {
    init: amplitude.init,
    start: amplitude.startAnimation,
    stop: amplitude.stopAnimation
  },
  'elasticCollision': {
    init: elasticCollision.init,
    start: elasticCollision.startAnimation,
    stop: elasticCollision.stopAnimation
  }
}

export default (type: EquationName): StageActions => {
  return stages[type]
}
