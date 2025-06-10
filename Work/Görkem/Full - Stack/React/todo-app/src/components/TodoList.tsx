import React from 'react';
import type { Todo } from '../App';

type Props = {
    todos: Todo[];
    onRemoveTodo: (id: number) => void;
};

const TodoList: React.FC<Props> = ({ todos, onRemoveTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <span>{todo.text}</span>
                    <button
                        onClick={() => onRemoveTodo(todo.id)}
                        className="todo-delete"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
