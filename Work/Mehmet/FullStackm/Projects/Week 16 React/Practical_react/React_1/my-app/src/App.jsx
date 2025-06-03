import './App.css'; // Importiere CSS-Stile
import meme from './assets/typeScriptMeme.jpg'; // Importiere ein Bild


//note that everthing in reaact is a component, that means a // function that returns JSX (JavaScript XML) code.
// to be dsiplayed in the front end it has to be in th efunction APP
// so every function here is also embeded in the App function r must be to be displayed

export function App() {
  return (
<>
    <div className="app">
      <h1>Welcome to my app</h1>
      <MyButton />
     <Hallo />
    </div>
    <div className="footer">
      <p>Made with ❤️ by Mehmet</p>
    </div>
    <Proping />
    <TodoList />
     </>
  );
}





// here we create a simple button component
function MyButton() {
  return (
    <button className="buttonr" onClick={() => alert('Button clicked!')}>
      I'm a button
    </button>
  );
}

// here we create a simple component that returns a header
const Hallo = () => { return( 
  <h1 className='test'>hallo welt</h1>);
}

// here we create a simple component that takes props, and the Function Proping
// receives a number prop and displays it in a header<h2/>
function PropTest(props) {
  return (
    <div>
      <h2>Props Test, nr {props.num}</h2>
      <p>This is a simple component to test props.</p>
    </div>
  );
}

// here we create a component that uses the PropTest component multiple times
function Proping() {
  return (
    <div className='propings'>
      <PropTest num={5} />
      <PropTest num={10} />
      <PropTest num={15} />
      <PropTest num={20} />
    </div>
  );
}  


const PERSON = { 
  name: 'Kendricka Lamar',
  age: 30,
  hobbies: ['Coding', 'Reading', 'Gaming'],
  theme:{
    backgroundColor: 'lightblue',
    color: 'darkblue',
  }
};


function TodoList() {
  const todos = ['Learn React', 'Build a project', 'Share with friends,', 'Complete the Course'];
  return (
    <div style={PERSON.theme} className="todo-list">
      <h2>{PERSON.name}´s Todo List</h2>
      <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="Kendricka lamar"/>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
      <p>Todo list is a simple list of tasks to complete.</p>
    </div>
  );
}





