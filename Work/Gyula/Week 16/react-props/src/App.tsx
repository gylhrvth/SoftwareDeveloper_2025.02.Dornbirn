import { useState } from 'react';
import './App.css'

interface GreetingProps {
  name: string;
  language?: string; // Optional prop
}

interface NameFormProps {
  name?: string;
  onNameChange?: (name: string) => void;
}

interface TodoItem {
    text: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
    dueDate: Date;
}

interface TodoListProps {
  items: Array<TodoItem>;
}

function App() {
  const todoItems = [
    { text: 'Learn React', priority: 'high', completed: false, dueDate: new Date('2023-10-01') },
    { text: 'Write TypeScript types', priority: 'medium', completed: false, dueDate: new Date('2023-10-05') },
    { text: 'Review pull requests', priority: 'low', completed: true, dueDate: new Date('2023-09-28') },
    { text: 'Update documentation', priority: 'medium', completed: false, dueDate: new Date('2023-10-10') },
    { text: 'Fix UI bugs', priority: 'high', completed: false, dueDate: new Date('2023-10-03') },
    { text: 'Deploy to production', priority: 'high', completed: false, dueDate: new Date('2023-10-15') },
  ];

  const handleNameChange = (name: string) => {
    window.alert(`Name changed to: ${name}`);
  }

  return (
    <>
      <h1>Hello World!</h1>
      <Greeting name="Carlos" language="CAT" />
      <Greeting name="Alice" />
      <NameForm name="Bob"/>
      <NameForm name="Charlie" onNameChange={handleNameChange} />
    </>
  )
}

function NameForm(props: NameFormProps) {
  const [name, setName] = useState(props.name || '');
  
  const onButtonClick = () => {
      if (props.onNameChange) {
        props.onNameChange(name);
      } else {
        console.log('No event handler is defined to handle name chage...');
      }
  }

  return (
    <div>
      <h2>Hola, {name}!</h2>
      <div>
      <span>Name: </span>
      <input 
          onChange={(event) => setName(event.target.value) } 
          type="text" 
          name="name" 
          id="name" 
          value={name}/>
      <button onClick={onButtonClick}>Submit</button>
      </div>
    </div>
  )
}

// Use a simple string as prop
function Greeting(props: GreetingProps) {
    if (props.language === 'CAT') {
      return (
        <div>
          <h2>Bon dia, {props.name}!</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Hello, {props.name}!</h2>
        </div>
      )
    }
  
}

function TodoList(props: TodoListProps) {
  return (
    <div>

    </div>
  )
}

export default App
