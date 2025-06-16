import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Menu } from './Menu'
import './App.css'
import { ContextProvider } from './ContextProvider'
import { MyContext } from './ContextProvider'


function App() {
  const [count, setCount] = useState(0)

  return (
    <ContextProvider>
      <Menu />
      <InnerApp count={count} setCount={setCount} />
    </ContextProvider>
  )
}

function InnerApp({ count, setCount }: { count: number, setCount: React.Dispatch<React.SetStateAction<number>> }) {
  const { value, setValue } = useContext(MyContext);

  function changeColor() {
    if (value === 'blue') {
      setValue('red');
    }
    else if (value === 'red') {
      setValue('green');
    }
    else {
      setValue('blue');
    }
  }

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 onClick={changeColor}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App
