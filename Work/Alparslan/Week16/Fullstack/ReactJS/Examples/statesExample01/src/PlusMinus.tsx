
import { useState } from 'react'

function PlusButton() {
    const [countPlus, setCountPlus] = useState<number>(0)

    return(
        <div>
            <p>Current Value is {countPlus}</p>
            <button onClick={() => setCountPlus (countPlus + 1)}>
                Plus
            </button>
        </div>
    )
}

function MinusButton() {
    const [countMinus, setCountMinus] = useState<number>(0)

    return(
        <div>
            <p>Current Value is {countMinus}</p>
            <button onClick={() => setCountMinus (countMinus - 1)}>
                Minus
            </button>
        </div>
    )
}

function PlusMinus() {
    const [count, setCount] = useState<number>(0)
    
    return(
        <div>
            <p>Current Value is {count}</p>
            <button onClick={() => setCount (count + 1)}>
                +
            </button>
            <button onClick={() => setCount (count - 1)}>
                -
            </button>
        </div>
    )
}

function OnOff() {
    const[toggle, setToggle] = useState<boolean>(false)

    return(
        <div>
            <p>{toggle ? 'ON' : 'OFF'}</p>
            <button onClick = {() => setToggle(true)}>
                ON
            </button>
            <button onClick = {() => setToggle(false)}>
                OFF
            </button>
        </div>
    )
}

export {PlusButton}
export {MinusButton}
export {PlusMinus}
export {OnOff}