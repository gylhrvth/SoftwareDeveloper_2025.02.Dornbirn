import { useState } from "react";

type Props = {
    onAddTodo: (text: string) => void;
};

const TodoForm = ({ onAddTodo }: Props) => {
    const [input, setInput] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === "") return;
        onAddTodo(input);
        setInput("");
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Neues Todo..."
            />
            <button type="submit">Hinzufügen</button>
        </form>
    );
};

export default TodoForm;