import { useState } from 'react'
// import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {

  return (
   <div>
       <h1>Hello World!</h1>
       <Button />
       <Counter />
   </div>
  )
}

export default App


function Button() {
    return (
        <button>Click Me!</button>
    )
}
function Counter() {
    // Erstelle eine State-Variable 'count' mit Startwert 0
    // und eine Funktion 'setCount' zum Ändern des Wertes
    const [count, setCount] = useState(0)

    // Funktion die aufgerufen wird, wenn der Button geklickt wird
    const handleClick = () => {
        // Erhöhe den count-Wert um 1
        setCount(count + 1)
    }

    // Gebe die visuellen Elemente zurück
    return (
        <div>
            {/* Zeige den aktuellen Zählerstand an */}
            <p>Count: {count}</p>

            {/* Button mit Click-Handler */}
            <button onClick={handleClick}>
                Increment
                ({count})
            </button>
        </div>
    )
}