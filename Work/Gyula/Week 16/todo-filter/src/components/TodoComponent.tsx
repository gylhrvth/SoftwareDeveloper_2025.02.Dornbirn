import { type TodoItem } from '../App.tsx';
import './TodoComponent.css'


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
      <div className={`bullet ${todoItem.priority}`}>●</div>
      <h3>{todoItem.title}</h3>
      <div className='description'>{todoItem.description}</div>
      <div className="due">Due: {todoItem.dueDate.toLocaleDateString('de-AT', {month: 'long', day: 'numeric', year: 'numeric'})}</div>
    </div>
  )
}