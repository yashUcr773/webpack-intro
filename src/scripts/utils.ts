import { add as _add, multiply as _mul } from 'lodash'

export function add(x: number, y: number): number {
    return _add(x, y)
}

export function subtract(x: number, y: number): number {
    return x - y
}

export function multiply(x: number, y: number): number {
    return _mul(x, y)
}

export function divide(x: number, y: number): number {
    return x / y
}