import { Component, For, Setter, Show, createSignal, onMount } from 'solid-js'
import "./EquationSetting.css"

export type EquationProps = {
    type: string,
    setType: Setter<string>,
    setEquation: Setter<any>
}

const getEquation = (
  x0: number, x_v0: number, x_acc: number,
  y0: number, y_v0: number, y_acc: number,
  z0: number, z_v0: number, z_acc: number
) => {
  return (t: number) => ({
    x: x0 + x_v0 * t + .5 * x_acc * t ** 2,
    y: Math.max(0, y0 + y_v0 * t + .5 * y_acc * t ** 2),
		z: z0 + z_v0 * t + .5 * z_acc * t ** 2
  })
}

const EquationSetting: Component<EquationProps> = (props) => {
  let submitRef : HTMLButtonElement | undefined
  const [x0, set_x0] = createSignal(0)
  const [y0, set_y0] = createSignal(0)
  const [z0, set_z0] = createSignal(0)

  const [x_v0, set_x_v0] = createSignal(0)
  const [y_v0, set_y_v0] = createSignal(0)
  const [z_v0, set_z_v0] = createSignal(0)

  const [x_acc, set_x_acc] = createSignal(0)
  const [y_acc, set_y_acc] = createSignal(-9.8)
  const [z_acc, set_z_acc] = createSignal(0)

  onMount(() => {
    submitRef?.addEventListener('click', () => {
      const equation = getEquation(
        x0(), x_v0(), x_acc(),
        y0(), y_v0(), y_acc(),
        z0(), z_v0(), z_acc(),
      )
      props.setEquation(() => equation)
    })
  })

  const setValue = (event: Event, setter: Setter<number>) => {
    const {value} = (event.target as HTMLInputElement)
    setter(parseFloat(value) || 0)
  }

  const values = [
    {id: 'x0', name: 'x₀', unit: 'm', var: x0, setter: set_x0, note: ''},
    {id: 'x_v0', name: 'x_v₀', unit: 'm/s', var: x_v0, setter: set_x_v0, note: ''},
    {id: 'x_acc', name: 'x_acceleration', unit: 'm²/s', var: x_acc, setter: set_x_acc, note: ''},
    {id: 'y0', name: 'y₀', unit: 'm', var: y0, setter: set_y0, note: ''},
    {id: 'y_v0', name: 'y_v₀', unit: 'm/s', var: y_v0, setter: set_y_v0, note:''},
    {id: 'y_acc', name: 'y_acceleration', unit: 'm²/s', var: y_acc, setter: set_y_acc, note: '*Gravity = -9.8m²/s'},
    {id: 'z0', name: 'z₀', unit: 'm', var: z0, setter: set_z0, note: ''},
    {id: 'z_v0', name: 'z_v₀', unit: 'm/s', var: z_v0, setter: set_z_v0, note: ''},
    {id: 'z_acc', name: 'z_acceleration', unit: 'm²/s', var: z_acc, setter: set_z_acc, note: ''} 
  ]

  return (
    <div class='setting'>
      <For each={values}>{ (value) => 
        <div class='setting-item'>
          <label for={value.id}>{value.name}</label>
          <input
            id={value.id}
            type='number'
            value={value.var()}
            onInput={event => setValue(event, value.setter)}
          />
          <span>{value.unit}</span>
          <Show when={value.note !== ''}>
            <div class='note'>{value.note}</div>
          </Show>
        </div>
      }</For>
        <button ref={submitRef} id='submit'>Run</button>
      </div>
    )
}

export default EquationSetting
