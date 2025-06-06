import './App.css'; // Importiere CSS-Stile
import meme from './assets/typeScriptMeme.jpg'; // Importiere ein Bild
import {people} from './data'; // Importiere die Daten von Personen
import { useState } from 'react'; 
import { ButtonImport, ButtonImportSync } from './ButtonSep';

// note that everthing in reaact is a component, that means a // function that returns JSX (JavaScript XML) code.
// to be dsiplayed in the front end it has to be in th efunction APP
// so every function here is also embeded in the App function r must be to be displayed

export function App() {
  return (
<>
    <div className="app">
      <h1>Welcome to my app</h1>
      <MyButton />
      <div>
      <ClickButton />
      </div>
     <Hallo />
    </div>
    <div className="footer">
      <p>Made with ❤️ by Mehmet</p>
    </div>
    <Proping />
    <TodoList />
    <Card>
      <Avatar size={200}
        
        person={{ imageId: 'YfeOqp2', name: 'Katsuko Saruhashi' }} // Example person object      
      />****
      <img src={meme} height={200} />
      
      <BildAlt alt={"Katsuko!!!Saruhashi"} />**** 
    </Card>
    <h1 className="meme-header">Packing List Space Expedition</h1>
    <Items name="Space Armor" isPacked={true} />
    <Items name="Lightsaber" isPacked={false} />
    <Items name="Picture of the Earth" isPacked={true} />
    <List />
    <TeaSet />
   <ButtonImport />
   <ButtonImport />
   <ButtonImportSync />
</>
  );

}


// The ButtonImport component is a simple button that uses the useState hook to manage its click count.
// ButtonImportSync is a seperate component that can be imported and used in other files.


function ClickButton() {
    const [count, setCount] = useState(0); // useState hook to manage count state
    
    function handleClick() {
        setCount(count + 1); // Increment count by 1 on button click
    }
  return ( 
    <button onClick={handleClick} className="button">
      The Button is this {count} many times clicked got clicked!
    </button>
  );
    }
  
// The Cup component receives a person object and a count. this is a Pure Compnent it does not take anthng gloabally
function Cup({ person, count }) {
  return (
    <h2>Tea Cup #{count} for {person.name}</h2>
  );
}

// This is also a functional component that renders a list of tea cups. automaticly
// the Cup component is used to display each person's tea cup. it takes the Cup Function on gloabal and does a map on const people array.
function TeaSet() {
  const people = [
    { name: 'Mehmet' },
    { name: 'Ali' },
    { name: 'Yasin' }
  ];

  return (
    <div>
      {people.map((person, index) => (
        <Cup
          key={index}
          person={person}
          count={index + 1}
        />
      ))}
    </div>
  );
}

// The List component displays a list of scientists using the 'people' array.
// It maps over each person object in 'people' and creates a card with their image and info.
// Each person card has a unique 'key' (person.id) to help React identify items efficiently.
function List() {
  // Create an array of JSX elements by mapping over 'people'.
  // For each 'person', return a 'div' containing an image and a list item.
  const listItems = people.map(person => (
    <div key={person.id} className="person-card">
      {/* Display the person's avatar image */}
      <img
        className="avatar"
        src={getImageUrl(person)}    // Use getImageUrl to get the image URL based on person's imageId
        alt={person.name}            // Accessibility: show person's name if image doesn't load
        width={100}
        height={100}
      />
      {/* Show person's name, profession, and accomplishment inside a list item */}
      <li>
        <b>{person.name}:</b>         {/* Person's name in bold */}
        {' ' + person.profession + ' '} {/* Person's profession with spaces */}
        known for {person.accomplishment} {/* What person is known for */}
      </li>
    </div>
  ));

  // Render the article containing a heading and a list of all person cards
  return (
    <article>
      <h1>Scientists</h1>       {/* Title of the list */}
      <ul>{listItems}</ul>      {/* Render all the generated person cards inside a <ul> */}
    </article>
  );
}



// This Items component receives a name and isPacked boolean.
// It displays the name and a checkmark or cross based on isPacked.
// If isPacked is true, it shows a checkmark (✅), otherwise a cross (❌).
function Items({name, isPacked}){
  return (
    
    <li>
      {name} {isPacked && '✅'} {/* If isPacked is true, show a checkmark */}
      {!isPacked && '❌'} {/* If isPacked is false, show a cross */}
      {/* The && operator is a shorthand for conditional rendering in React */}
      {/* If isPacked is true, it renders the checkmark, otherwise it renders the cross */}
      {/* This is a simple way to conditionally render content based on a boolean value */}
    </li>
  );
}


// This function generates a full image URL from a person's image ID.
// `size` is optional and defaults to 's' (small).
function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +    // Base URL
    person.imageId +            // Image ID from the person object
    size +                      // Size string (e.g. 's' for small, 'l' for large)
    '.jpg'                      // File extension
  );
}


// This Avatar component receives a `person` object and a `size`.
// It uses getImageUrl() to build the image URL and renders an <img> tag.
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}  // Use the getImageUrl function to get image path
      alt={person.name}          // Use the person's name for accessibility (alt text)
      width={size}               // Width and height come from the size prop
      height={size}
    />
  );
}

function BildAlt({ alt }) {
  return (
  'alt:' + alt + ' ' // This component simply displays the alt text passed to it (OLIVER TESTING ALT!!)
  )
}


// The Card component acts like a wrapper or container.
// It receives children and displays them inside a styled <div>.
function Card({ children }) {
  return (
    <div className="card">
      {children}                
    </div>
  );
}

// here we create a simple button component
function MyButton() {
  return (
    <button className="buttonr" onClick={() => alert('you forgot the lightsaber!')}>
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





