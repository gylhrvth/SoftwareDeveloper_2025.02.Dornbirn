
import './App.css'
import Counter from './Counter.tsx'
import NameInput from './NameInput.tsx'
import {PlusButton, MinusButton, PlusMinus, OnOff} from './PlusMinus.tsx'

function App() {
    return (
        <div>
        <Counter />
        <br />
        <NameInput />
        <br />
        <PlusButton />
        <MinusButton />
        <br />
        <PlusMinus />
        <br />
        <OnOff />
        </div>
    )
}

export default App
