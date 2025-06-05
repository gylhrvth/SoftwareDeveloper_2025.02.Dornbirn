import { type TodoItem } from '../App.tsx';


export interface TodoProps {
  todoItem: TodoItem;
  toggleComplete: (id: number) => void;
}


export function TodoComponent({todoItem, toggleComplete}: TodoProps): JSX.Element {
  const handleClick = () => {
    toggleComplete(todoItem.id);
  }

  return (
    <div onClick={handleClick} className={`todo ${todoItem.complete ? 'completed' : ''} `}>
      <h3><span className={`bullet ${todoItem.priority}`}>●</span>{todoItem.title}</h3>
      <p>{todoItem.description}</p>
      <p>Priority: {todoItem.priority}</p>
    </div>
  )
}