import './App.css'
import { Button } from './Button.tsx'
import { Greeting } from './Greeting.tsx'
import { useState } from 'react'


export function App() {
  const [count, setCount] = useState(0)
  const myEventHandler = (message: string) => {
    console.log(`You clicked the button: ${message}`)
  }

  return (
    <>
      <h1>Hello World!</h1>


      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}> {i + 1}. Es ist schön dich zu begrüßen!</div>
      ))}
      <Button title="Don't touch!" />
      <Button title="Ich mag die Welt!" color="green" eventHandler={myEventHandler} />

      <Greeting name="Görkem" />

      <div className="counter-row">
        <Button
          title="Click me!"
          color="royalblue"
          eventHandler={() => setCount(count + 1)}
        />
        <span>You clicked {count} times</span>
      </div>
    </>
  )
}


