import { useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css'

export type Todo = {
  id: number;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const AddTodo = (text: string) => {
    const NewTodo: Todo = { id: Date.now(), text };
    setTodos([... todos, NewTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className='App'>
      <h1>Meine ToDo's</h1>
      <TodoForm onAddTodo={AddTodo} />
      <TodoList todos={todos} onRemoveTodo={removeTodo} />
    </div>
  );
}

export default App;

