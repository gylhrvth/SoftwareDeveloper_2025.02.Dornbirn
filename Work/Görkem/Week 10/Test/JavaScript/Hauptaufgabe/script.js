document.addEventListener("DOMContentLoaded", async function () {
    await get_Todos();
    display_Todos(todoArray);
});

const todoContainer = document.querySelector(".todo-container");
if (!todoContainer){
    console.error("Das Element '.todo-container' wurde nicht gefunden.");
}
const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");

let todoArray = [];
const URL = "http://192.168.0.67:3000/api/todo";

async function get_Todos() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log("API-Daten:", data); 

        todoArray.push(...data); 
    } catch (error) {
        console.error("Fehler beim Abrufen der API-Daten:", error);
    }
}

function display_Todos(todoArr){
    todoContainer.innerHTML = ""; // Container leeren
    todoArr.forEach((todoElem) => {
        console.log("Todo-Element:", todoElem);

        // Parent
        let todo = document.createElement("div");
        todo.classList.add("todo");

        // Children
        let todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");
        let todoBtn = document.createElement("form");
        todoBtn.classList.add("todo-btn");

        // Grand Children
        let todoCompleted = document.createElement ("input");
        todoCompleted.classList.add("todo-completed");
        todoCompleted.setAttribute("type", "checkbox");
        todoCompleted.checked = todoElem.completed;
        let todoName = document.createElement("p");
        todoName.classList.add("todo-name");
        todoName.innerHTML = todoElem.title || todoElem.name || "Unbenannt";

        // Edit Button
        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todo-edit");
        todoEdit.innerHTML = "Edit";
        todoEdit.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Open modal");
        });

        // Delete Button
        let todoDel = document.createElement("button");
        todoDel.classList.add("todo-delete");
        todoDel.textContent = "Delete";
        todoDel.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Delete Todo", todoElem);
        });

        // Info Button
        let todoInfoBtn = document.createElement("button");
        todoInfoBtn.classList.add("todo-info-btn");
        todoInfoBtn.textContent = "i"; 
        todoInfoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showInfoDetails(todoElem);
        });

        todoInfo.appendChild(todoCompleted);
        todoInfo.appendChild(todoName);
        todoBtn.appendChild(todoEdit);
        todoBtn.appendChild(todoDel);
        todoBtn.appendChild(todoInfoBtn);

        todo.appendChild(todoInfo);
        todo.appendChild(todoBtn);

        todoContainer.appendChild(todo);
    });
}

// Funktion zum Anzeigen der Details
function showInfoDetails(todoElem) {
    const infoDetails = document.getElementById("info-details");
    const infoId = document.getElementById("info-id");
    const infoTitle = document.getElementById("info-title");
    const infoCompleted = document.getElementById("info-completed");

 
    // Fülle die Details
    infoId.textContent = `ID: ${todoElem.id}`;
    infoTitle.textContent = `Title: ${todoElem.title || todoElem.name || "Unbenannt"}`;
    infoCompleted.textContent = `Completed: ${todoElem.completed === true ? "True" : "False"}`;

    // Zeige den Detailbereich an
    infoDetails.classList.remove("hidden");

    // Event-Listener für das Schließen des Detailbereichs
    const closeInfo = document.getElementById("close-info");
    closeInfo.addEventListener("click", (e) => {
        infoDetails.classList.add("hidden");
    });
}




  
