import { createSignal } from 'solid-js'

import type { DisplacementEq, Value } from '@/types/equations'

export default ():{values: Value[], equation: () => DisplacementEq} => {
  const [x0, set_x0] = createSignal(0)
  const [y0, set_y0] = createSignal(0)
  const [z0, set_z0] = createSignal(0)

  const [x_v0, set_x_v0] = createSignal(0)
  const [y_v0, set_y_v0] = createSignal(0)
  const [z_v0, set_z_v0] = createSignal(0)

  const [x_acc, set_x_acc] = createSignal(0)
  const [y_acc, set_y_acc] = createSignal(-9.8)
  const [z_acc, set_z_acc] = createSignal(0)

  const values:Value[] = [
    {id: 'x0', name: 'x₀', unit: 'm', var: x0, setter: set_x0, note: ''},
    {id: 'x_v0', name: 'x_v₀', unit: 'm/s', var: x_v0, setter: set_x_v0, note: ''},
    {id: 'x_acc', name: 'x_acceleration', unit: 'm/s²', var: x_acc, setter: set_x_acc, note: ''},
    {id: 'y0', name: 'y₀', unit: 'm', var: y0, setter: set_y0, note: ''},
    {id: 'y_v0', name: 'y_v₀', unit: 'm/s', var: y_v0, setter: set_y_v0, note:''},
    {id: 'y_acc', name: 'y_acceleration', unit: 'm/s²', var: y_acc, setter: set_y_acc, note: '*Gravity = -9.8m/s²'},
    {id: 'z0', name: 'z₀', unit: 'm', var: z0, setter: set_z0, note: ''},
    {id: 'z_v0', name: 'z_v₀', unit: 'm/s', var: z_v0, setter: set_z_v0, note: ''},
    {id: 'z_acc', name: 'z_acceleration', unit: 'm/s²', var: z_acc, setter: set_z_acc, note: ''} 
  ]
  const equation = () => {
    const x0_num = x0()
    const x_v0_num = x_v0();
    const x_acc_num = x_acc();
    const y0_num = y0()
    const y_v0_num = y_v0();
    const y_acc_num = y_acc();
    const z0_num = z0()
    const z_v0_num = z_v0();
    const z_acc_num = z_acc();

    return (t: number) => ({
      x: x0_num + x_v0_num * t + .5 * x_acc_num * t ** 2,
      y: Math.max(0, y0_num + y_v0_num * t + .5 * y_acc_num * t ** 2),
      z: z0_num + z_v0_num * t + .5 * z_acc_num * t ** 2
    })
  }
  return {values, equation}
}
