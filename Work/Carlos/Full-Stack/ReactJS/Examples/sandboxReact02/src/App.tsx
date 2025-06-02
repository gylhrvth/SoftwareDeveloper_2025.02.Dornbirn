

import './App.css'
import ClickMeButton from './clickMeButton'

function App() {
  function handleClick(name: string) {
    alert("Damn it " + name + ", that was a helluva click!");
  }

  return (
    <div className="center-content">
      <h1>Hello, React!</h1>
      <p>This is a simple React application.</p>
      <ClickMeButton clickEvent={handleClick} name="Charles" />
    
    </div>
  )

}

export default App
