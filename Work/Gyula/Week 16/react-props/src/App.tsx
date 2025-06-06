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

interface RoundBorderProps {
  children: React.ReactNode;
}

function App() {
  const todoItems: Array<TodoItem> = [
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
      <TodoList items={todoItems} />
      <RoundBorder>
         <img src="https://picsum.photos/200/300" alt="Random" />
      </RoundBorder>
      <RoundBorder>
          <div>
            <h1>Hello World!</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi exercitationem cupiditate quaerat, saepe adipisci accusamus, est sed fuga veniam quo unde quidem laborum beatae. Ipsam obcaecati corporis suscipit soluta, amet cum impedit possimus, fugiat unde aliquam error velit consequuntur vero.</p>
          </div>
      </RoundBorder>
      <RoundBorder>
        <NameForm name="Diana" />
      </RoundBorder>

    </>
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

// Use event handler as prop
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


// Use array as prop !!! Don' forget to use KEY in map
function TodoList(props: TodoListProps) {
  return (
    <div style={{ 
      marginTop: '20px', 
      display: 'flex', 
      gap: '4px', 
      flexWrap: 'wrap' 
      }}>
      {
        props.items.map((item, index) => (
          <TodoItem 
            key={index} 
            text={item.text} 
            priority={item.priority} 
            completed={item.completed} 
            dueDate={item.dueDate}
          />
        ))
      }
    </div>
  )
}

function TodoItem(props: TodoItem) {
  const priorityColors: Record<'low' | 'medium' | 'high', string> = {
    low: '#ddffdd',
    medium: '#fff',
    high: '#ffdddd'
  };

  return (
    <div style={{ 
        border: props.completed ? '1px solid #ddd' : '2px solid #aaa',
        backgroundColor: priorityColors[props.priority], 
        padding: '10px', 
        borderRadius: '5px', 
        width: '200px' }}>
      <h3>{props.text}</h3>
      <p>Due : {props.dueDate.toLocaleDateString('ca-ES',  { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  )
}


// Use children as prop (child elments of the component)
function RoundBorder(props: RoundBorderProps) {
  return (
    <div className='circle'>
      {props.children}
    </div>
  )
}

export default App
