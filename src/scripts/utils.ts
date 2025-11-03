import { add as _add, subtract as _sub, multiply as _mul, divide as _div } from 'lodash-es'

export const add = (x: number, y: number) => {
    return _add(x, y)
}

export const subt = (x: number, y: number) => {
    return _sub(x, y)
}

export const mul = (x: number, y: number) => {
    return _mul(x, y)
}

export const div = (x: number, y: number) => {
    return _div(x, y)
}