
import './App.css'
import FavoriteColor from './FavoriteColor';
import Greeting from './Greeting';

function App() {

  return (
    <div>
      <h1>Hello, React!</h1>
      <p>This is a simple React application.</p>
      <Greeting name="Carlos" age={36} />
      <Greeting name="Ernesto" age={99} />
      <FavoriteColor name="Francisca" color="green" />
      <FavoriteColor name="Armando" color="blue" />
    </div>
  )
}

export default App;
