import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { TodoListComponent } from './components/TodoListComponent';
import './App.css'

export interface TodoItem{
  id: number
  title: string;
  complete: boolean;
  description: string;
  priority: 'high' | 'medium' | 'low';
}



function App() {
  const [myCurrentTodos, setMyCurrentTodos] = useState<TodoItem[]>([
    {
      id: 1,
      title: 'Buy groceries',
      complete: false,
      description: 'Milk, Bread, Eggs, Cheese',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Read a book',
      complete: true,
      description: 'Finish reading React documentation',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Workout',
      complete: false,
      description: '30 minutes of cardio',
      priority: 'low'
    }
  ]);
  const [filterText, setFilterText] = useState<string>('');

  const toggleComplete = (id: number) => {
    setMyCurrentTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = event.target.value;
    setFilterText(selectedPriority);
  }

  return (
    <>
      <AppHeader handleFilterChange={handleFilterChange} />
      <TodoListComponent todos={
        myCurrentTodos.filter(todo => {
          if (filterText === '') return true;
          return todo.priority === filterText;
        })
      } toggleComplete={toggleComplete}  />
    </>
  )
}




export default App
