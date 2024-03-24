import * as amplitude from './amplitude'
import * as displacement from './displacement'
import * as elasticCollision from './elasticCollision'
import * as inelasticCollision from './inelasticCollision'

import type { EquationName } from '@/types/equations'
import type { StageActions } from '@/types/stages'

const stages: Record<EquationName, StageActions> = {
  'displacement': {
    init: displacement.init,
    start: displacement.startAnimation,
    stop: displacement.stopAnimation,
    setFrame: displacement.setFrame,
    clear: displacement.cleanup
  },
  'amplitude': {
    init: amplitude.init,
    start: amplitude.startAnimation,
    stop: amplitude.stopAnimation,
    setFrame: amplitude.setFrame
  },
  'elasticCollision': {
    init: elasticCollision.init,
    start: elasticCollision.startAnimation,
    stop: elasticCollision.stopAnimation,
    setFrame: elasticCollision.setFrame
  },
  'inelasticCollision': {
    init: inelasticCollision.init,
    start: inelasticCollision.startAnimation,
    stop: inelasticCollision.stopAnimation,
    setFrame: inelasticCollision.setFrame,
    clear: inelasticCollision.cleanup
  }
}

export default (type: EquationName): StageActions => {
  return stages[type]
}
