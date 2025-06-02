

import './App.css'
import ClickMeButton from './ClickMeButton';

function App() {
  function handleClick() {
    alert('Damn, that was a click!');
  }

  return (
    <div className="center-content">
      <h1>Hello, React!</h1>
      <p>This is a simple React application.</p>
      <ClickMeButton clickEvent={handleClick} />
    
    </div>
  )

}

export default App
