import { createSignal } from 'solid-js'

import type { ElasticCollisionEq, Value } from '@/types/equations'

// Default width for Object 1 & 2
const [w1, w2] = [1, 1]
const [x1, x2] = [-2.5, 2.5]
export default ():{ equationString:string, values: Value[], equation: () => ElasticCollisionEq } => {
  const [m1, setM1] = createSignal<number>(2)
  const [v1, setV1] = createSignal<number>(1)
  // const [x1, setX1] = createSignal<number>(-2.5)
  const [m2, setM2] = createSignal<number>(1)
  const [v2, setV2] = createSignal<number>(-2)
  // const [x2, setX2] = createSignal<number>(2.5)
  
  const equationString = 'm₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\''

  const values = [
    {id: 'm1', name:'m₁', unit: 'kg', var: m1, setter: setM1, note:'', min: 0},
    {id: 'v1', name: 'v₁', unit: 'm/s', var: v1, setter: setV1, note: ''},
    // {id: 'x1', name: 'x₁', unit: 'm', var: x1, setter: setX1, note: 'Object 1 Starting Position'},
    {id: 'm2', name: 'm₂', unit: 'kg', var: m2, setter: setM2, note: '', min: 0},
    {id: 'v2', name: 'v₂', unit: 'm/s', var: v2, setter: setV2, note: ''},
    // {id: 'x2', name: 'x₂', unit: 'm', var: x2, setter: setX2, note: 'Object 2 Starting Position'}
  ]
  const equation = () => {
    const m1_num = m1()
    const v1_num = v1()
    // const x1_num = x1()
    const m2_num = m2()
    const v2_num = v2()
    // const x2_num = x2()

    // Velocity after collision
    const v2p = (m1_num * (v1_num - v2_num) + m1_num * v1_num + m2_num * v2_num) / (m1_num + m2_num)
    const v1p = v2p + v2_num - v1_num

    // The point where Object 1 and 2 contact.
    // Assuming Object1 locates at the left, and Object2 locates at the right
    const x1_contactP = x1 + w1 / 2
    const x2_contactP = x2 - w2 / 2
    
    // The time when the collision happens
    const collisionTime = (x1_contactP - x2_contactP) / (v2_num - v1_num) > 0 ? (x1_contactP - x2_contactP) / (v2_num - v1_num) : Infinity
    console.log(collisionTime)
    return (t:number) => ( 
      t <= collisionTime ? {
        x1: x1 + v1_num * t,
        x2: x2 + v2_num * t
      } : {
        x1: x1 + v1_num * collisionTime + v1p * (t - collisionTime),
        x2: x2 + v2_num * collisionTime + v2p * (t - collisionTime)
      })
  }
  return {equationString, values, equation}
}
