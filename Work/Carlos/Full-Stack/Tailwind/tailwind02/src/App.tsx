import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState<{text: string; completed: boolean }[]>([]); // Array of strings with initial value of an empty array 
  const [input, setInput] = useState<string>(""); // String with initial value of an empty string

  const addTask = () => {
    if (input.trim() !== "") { // Check if input is not empty or just spaces
      setTasks([...tasks, { text: input.trim(), completed: false }]); // Add the new task to the tasks array
      setInput(""); // Clear the input field
      console.log("Task added"); // Log message when a task is added
    }
  }

  const toggleTask = (index:number) => {
    setTasks(tasks.map((task, i) =>
    i === index ? { ...task, completed: !task.completed } : task
  ));
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((__, i) => i !== index));
  }

//style Variables
const mainStyle = "font-jetBrains min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-700";
const mainContainer = "bg-gradient-to-br from-gray-800 via-gray-900 to-purple-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700";
const headerStyle = "text-3xl font-extrabold mb-4 text-emerald-300 drop-shadow";
const inputContainer = "flex mb-6";
const inputStyle = "flex-1 bg-gray-700 border-none rounded-l px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400";
const buttonStyle = "cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-5 py-2 rounded-r font-semibold hover:from-cyan-400 hover:to-purple-400 transition-colors";
const taskStyle = "flex justify-between items-center border-b border-gray-700 py-3 text-white";
const deleteButton = "text-pink-400 hover:text-emerald-300 transition-colors cursor-pointer";
const emptyTask = "text-gray-400 text-center py-6";
const pStyle = "text-gray-400 text-left mb-4 italic";
  
//return value
  return (
  <div className={mainStyle}>
    <div className={mainContainer}>
      <h1 className={headerStyle}>Todo List</h1>
      <p className={pStyle}>Made with Tailwind, forget CSS</p>
      <br />
      <div className={inputContainer}>
        <input
          className={inputStyle}
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button
          className={buttonStyle}
          onClick={addTask}
        >Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={taskStyle}>
            <span
              className={task.completed ? "line-through opacity-60" : ""}
              onClick={() => toggleTask(index)}
              style={{ cursor: "pointer" }}
            >
              {task.text}
            </span>
            <button
              className={deleteButton}
              onClick={() => deleteTask(index)}
              >
              Delete
            </button>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className={emptyTask}>No Tasks yet</li>
        )}
      </ul>
      </div>
    </div>
  
)

}

