import { Component, For, Setter, Show, onMount } from 'solid-js'
import './EquationSetting.css'
import equationList from '@/settings'
import { EquationName, Equation } from '@/types/equations'

export type EquationProps = {
  type: EquationName,
  setType: Setter<EquationName>,
  setEquation: Setter<Equation | undefined>
}

const EquationSetting: Component<EquationProps> = (props) => {
  let submitRef : HTMLButtonElement | undefined
  const [values, getEquation] = equationList[props.type]()

  onMount(() => {
    submitRef?.addEventListener('click', () => {
      props.setEquation(getEquation)
    })
  })

  const setValue = (event: Event, setter: Setter<number>) => {
    const {value} = (event.target as HTMLInputElement)
    setter(parseFloat(value) || 0)
  }

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
