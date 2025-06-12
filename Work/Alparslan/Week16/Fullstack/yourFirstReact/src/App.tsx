import './App.css'
import { Button } from './Button.tsx'


export function App() {
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
    </>
  )
}


