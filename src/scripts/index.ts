import { add, div, mul, subt } from './utils'

const fun = (x: number, y: number) => {
    console.log(add(x, y))
    console.log(div(x, y))
    console.log(mul(x, y))
    console.log(subt(x, y))
}

fun(21,7)