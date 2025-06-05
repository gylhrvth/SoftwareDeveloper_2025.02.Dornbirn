import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { TodoListComponent } from './components/TodoListComponent';
import { initialTodos } from './initData';
import './App.css'

export interface TodoItem{
  id: number
  title: string;
  complete: boolean;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
}



function App() {
  const [myCurrentTodos, setMyCurrentTodos] = useState<TodoItem[]>(initialTodos);
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
        }).sort((a, b) => {
          return a.dueDate.getTime() - b.dueDate.getTime();
        })
      } toggleComplete={toggleComplete}  />
    </>
  )
}




export default App
