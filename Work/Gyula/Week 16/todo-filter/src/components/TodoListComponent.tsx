import { type TodoItem } from '../App.tsx';
import { TodoComponent } from './TodoComponent';

export interface TodoListProps {
  todos: TodoItem[];
  toggleComplete: (id: number) => void;
}

export function TodoListComponent(props: TodoListProps): JSX.Element {
  return (
    <div>
      <h2>Todo List</h2>
      {
        props.todos.map((todo, index) => (
          <TodoComponent 
            key={index} 
            todoItem={todo}
            toggleComplete={props.toggleComplete}
          />
        ))
      }
    </div>
  )
}
