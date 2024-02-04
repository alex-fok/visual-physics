import { Component, For, Setter, Show, createMemo, createSignal, onMount } from 'solid-js'

import './EquationSetting.css'

import equationList from '@/settings'
import { EqNames } from '@/types/equations'

import type { Equation, EquationName, EquationVar } from '@/types/equations'

export type EquationProps = {
  eqName: EquationName,
  setEqName: Setter<EquationName>,
  setEquation: Setter<Equation | undefined>
}

const EquationSetting: Component<EquationProps> = (props) => {
  let submitRef : HTMLButtonElement | undefined
  const [eqSetting, setEqSetting] = createSignal<EquationVar>(equationList[props.eqName]())
  const eqVals = createMemo(eqSetting)

  onMount(() => {
    submitRef?.addEventListener('click', () => {
      const invalidValues = [];
      for (const value of eqVals().values)
        if (
          (value.max !== undefined && value.var() > value.max) ||
          (value.min !== undefined && value.var() < value.min)
        )
          invalidValues.push(value.name);
      
      invalidValues.length ? alert(`Invalid Values: ${invalidValues.join(", ")}`) : props.setEquation(eqVals().equation)
    })
  })

  const setSelectedEquation = (selection: string) => {
    const eqName = EqNames.find(name => name === selection)
    if (eqName === undefined) return;

    props.setEquation(undefined)
    props.setEqName(eqName)
    setEqSetting(equationList[props.eqName]())    
  } 

  const setValue = (event: Event, setter: Setter<number>) => {
    const {value} = (event.target as HTMLInputElement)
    setter(parseFloat(value) || 0)
  }

  return (
    <div class='setting'>
      <div>{eqVals().equationString}</div>
      <label class='select-eq' for='equations'>Choose a equation:</label>
      <select
        class='select-eq'
        id='equations'
        name='equations'
        onChange={event => {
          setSelectedEquation((event.target as HTMLSelectElement).value)
        }}
      >
        <option selected={props.eqName == 'displacement'} value='displacement'>Displacement</option>
        <option selected={props.eqName == 'amplitude'} value='amplitude'>Amplitude</option>
        <option selected={props.eqName == 'elasticCollision'} value='elasticCollision'>Elastic Collision</option>
      </select>
      <For each={eqVals().values}>{ (value) => 
        <div class='setting-item'>
          <label for={value.id}>{value.name}</label>
          <input
            id={value.id}
            type='number'
            value={value.var()}
            onInput={event => setValue(event, value.setter)}
            min={value.min !== undefined ? value.min : Number.NEGATIVE_INFINITY}
            max={value.max !== undefined ? value.max : Number.POSITIVE_INFINITY}
            step={value.step !== undefined ? value.step : .1}
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
