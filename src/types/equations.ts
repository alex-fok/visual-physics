import { Accessor, Setter } from 'solid-js'

/* Needed for satisfying type check. Used along with Array.find to convert variables from string to EquationName */
export const EqNames = ['amplitude', 'displacement', 'elasticCollision', 'inelasticCollision'] as const

export type EquationName = typeof EqNames[number]

export type Equation = (t:number) => any

export type Value = {
    id: string,
    name: string,
    unit: string,
    var: Accessor<number>,
    setter: Setter<number>,
    note: string
    min?: number,
    max?: number,
    step?: number
}

export type DisplacementEq = (t:number) => {
    x: number,
    y:number,
    z:number
}

export type AmplitudeEq = (t:number) => {
    linePoints: number[][],
    obj: {
        x: number,
        y: number
    }
}

export type ElasticCollisionEq = (t:number) => {
    x1: number,
    x2: number
}

export type InelasticCollisionEq = (t:number) => {
    x1: number,
    x2: number
}

export type EquationVar = {equationString: string, values: Value[], equation: Equation}
