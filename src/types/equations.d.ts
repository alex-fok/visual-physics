import { Accessor, Setter } from 'solid-js'

export type EquationName = 'amplitude' | 'displacement'

export type Equation = (t:number) => any

export type Value = {
    id: string,
    name: string,
    unit: string,
    var: Accessor<number>,
    setter: Setter<number>,
    note: string
}
export type DisplacementEq = (t:number) => {x: number, y:number, z:number}
export type AmplitudeEq = (t:number) => {y: number}
