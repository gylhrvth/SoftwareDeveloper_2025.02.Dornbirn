// Testen ob unser Code funktioniert
/*alert("Test");
*/
//--------------------------------
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
if (allTodos.length === 0) {
    allTodos.push({ text: "Gym Workout", completed: true }); // Standard-Todo
    saveTodos(); // Speichere das Standard-Todo
}
updateTodoList();

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }

        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
        console.log(allTodos);
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <span class="material-icons">done</span>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button" aria-label="Delete">
            <span class="material-symbols-outlined">delete</span>
        </button>
    `;
    
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos); // Konvertiere das Array in JSON
    localStorage.setItem("todos", todosJson); // Speichere die JSON-Daten im Local Storage
}

function getTodos() {
    try {
        const todos = localStorage.getItem("todos") || "[]"; // Hole die Daten oder setze Standardwert
        return JSON.parse(todos); // Konvertiere die JSON-Daten zurück in ein Array
    } catch (error) {
        console.error("Fehler beim Parsen der Todos:", error);
        return []; // Gib ein leeres Array zurück, falls ein Fehler auftritt
    }
}
