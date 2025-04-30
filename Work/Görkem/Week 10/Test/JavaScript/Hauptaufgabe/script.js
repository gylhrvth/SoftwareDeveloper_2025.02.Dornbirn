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

const modalBG = document.querySelector(".modal-background");
const closeModal = document.querySelector(".close-modal");
const editTodoName = document.getElementById("edit-todo-name");
const editTodoDescription = document.getElementById("edit-todo-description");
const editTodoCompleted = document.getElementById("edit-todo-completed");
const saveTodo = document.getElementById("save-todo");
const editTodoCreatedBy = document.getElementById("edit-todo-created-by");
const editTodoCreatedAt = document.getElementById("edit-todo-created-at");

let todoArray = [];
const URL = "http://192.168.0.53:3000/api/todo";
const URL1 = "http://192.168.0.53:3000/api/todo/:id";

async function get_Todos() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const data = await response.json(); 

        todoArray.push(...data); 
    } catch (error) {
        console.error("Fehler beim Abrufen der API-Daten:", error);
    }
}

async function post_todos() {
    const newTodo = {
        title: inputTodo.value, // Korrekt: Wert aus dem Eingabefeld
        completed: false, // Standardwert
        createdBy: 'Görkem',
        createdAt: new Date().toISOString(),
    };

    // Überprüfe, ob das Eingabefeld leer ist
    if (newTodo.title.trim() === "") {
        alert("Bitte einen gültigen Titel eingeben!");
        return;
    }

    // Sende die POST-Anfrage
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo), // Konvertiere das neue Todo in JSON
    })
    if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }

    // Antwortdaten verarbeiten
    const data = await response.json();
    console.log("Neues Todo hinzugefügt:", data);

    // Füge das neue Todo zur Liste hinzu und aktualisiere die Anzeige
    todoArray.push(data);
    display_Todos(todoArray);

    // Eingabefeld leeren
    inputTodo.value = "";
}

async function del_Todo(todoElem) {
    try {
        const response = await fetch(`${URL}/${todoElem.id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        console.log(`Todo mit ID ${todoElem.id} gelöscht`);

        // Entferne das Todo aus dem Array und aktualisiere die Anzeige
        todoArray = todoArray.filter((todo) => todo.id !== todoElem.id);
        display_Todos(todoArray);
    } catch (error) {
        console.error("Fehler beim Löschen des Todos:", error);
    }
}

addTodo.addEventListener("click", async (e) => {
    e.preventDefault()
    if(inputTodo.value != ""){
        await post_todos();
    }
});

async function edit_Todos(todoElem) {
    const editTodoName = document.getElementById("edit-todo-name");
    const editTodoCompleted = document.getElementById("edit-todo-completed");
    const editTodoDescription = document.getElementById("edit-todo-description");

    // Erstelle das aktualisierte Todo-Objekt
    const updatedTodo = {
        title: editTodoName.value,
        description: editTodoDescription ? editTodoDescription.value : "No description",
        completed: editTodoCompleted.checked,
        createdBy: 'Görkem', 
        createdAt: todoElem.createdAt, 
        updatedAt: new Date().toISOString(), 
    };

    try {
        console.log("PUT URL:", `${URL}/${todoElem.id}`);
        console.log("PUT Body:", updatedTodo);

        const response = await fetch(`${URL}/${todoElem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`HTTP-Fehler! Status: ${response.status}, Nachricht: ${errorText}`);
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Todo aktualisiert:", data);

        // Aktualisiere das Todo im Array und die Anzeige
        const index = todoArray.findIndex((todo) => todo.id === todoElem.id);
        if (index !== -1) {
            todoArray[index] = data;
        }
        display_Todos(todoArray);
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Todos:", error);
    }
}

function open_modal(todoElem){
    console.log("Open Modal", todoElem);
    editTodoName.value = todoElem.title || "";
    editTodoDescription.value = todoElem.description || "";
    editTodoCompleted.checked = todoElem.completed;
    editTodoCreatedBy.value = todoElem.createdBy || "";
    editTodoCreatedAt.value = todoElem.createdAt
        ? new Date(todoElem.createdAt).toLocaleString()
        : "";

    modalBG.style.display = "block"; 
    closeModal.addEventListener("click", () => {
        modalBG.style.display = "none"; 
        console.log("Modal geschlossen");
    });
    saveTodo.addEventListener("click", () => {
        modalBG.style.display = "none";
        console.log("Wurde gespeichert");
        edit_Todos(todoElem);
    });
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

        // Hier wird das "Created By"-Element erstellt
        let todoCreatedBy = document.createElement("p");
        todoCreatedBy.classList.add("todo-created-by");
        todoCreatedBy.innerHTML = `Created By: ${todoElem.createdBy || "Unknown"}`;
        let todoCreatedAt = document.createElement("p");
        todoCreatedAt.classList.add("todo-created-at");
        todoCreatedAt.innerHTML = `Created At: ${
            todoElem.createdAt ? new Date(todoElem.createdAt).toLocaleString() : "Unknown"
        }`;


        if(todoElem.completed){
            todoName.classList.add("line-through");
        }

        todoCompleted.addEventListener("change", (e) => {
            if (todoCompleted.checked) {
                todoName.classList.add("line-through");
            } else {
                todoName.classList.remove("line-through");
            }
        });


        // Edit Button
        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todo-edit");
        todoEdit.innerHTML = "Edit";
        todoEdit.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Open modal");
            open_modal(todoElem);
        });

        // Delete Button
        let todoDel = document.createElement("button");
        todoDel.classList.add("todo-delete");
        todoDel.textContent = "Delete";
        todoDel.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Delete Todo", todoElem);
            await del_Todo(todoElem);

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
async function showInfoDetails(todoElem) {
    const infoDetails = document.getElementById("info-details");
    const infoId = document.getElementById("info-id");
    const infoTitle = document.getElementById("info-title");
    const infoDescription = document.getElementById("info-description");
    const infoCompleted = document.getElementById("info-completed");
    const infoCreatedBy = document.getElementById("info-created-by");
    const infoCreatedAt = document.getElementById("info-created-at");
    
    

    try {
        // Abrufen der vollständigen Details des Todos von der API
        const result = await fetch(`${URL}/${todoElem.id}`);
        if (!result.ok) {
            throw new Error(`HTTP-Fehler! Status: ${result.status}`);
        }

        const data = await result.json(); // Die vollständigen Details des Todos
        console.log('Details:', data); // Debugging (kann entfernt werden)
    
    // Fülle die Details
    infoTitle.textContent = `Title: ${data.title}`;
    infoDescription.textContent = `Description: ${data.description || "No description available"}`;
    infoCompleted.textContent = `Completed: ${data.completed ? "True" : "False"}`;
    infoCreatedBy.textContent = `Created By: ${data.createdBy || "Unknown"}`;
    infoCreatedAt.textContent = `Created At: ${data.createdAt ? new Date(data.createdAt).toLocaleString() : "Unknown"}`;

    // Zeige den Detailbereich an
    infoDetails.classList.remove("hidden");
} catch (error) {
    console.error("Fehler beim Abrufen der Todo-Details:", error);
}

    
    const closeInfo = document.getElementById("close-info");
    closeInfo.addEventListener("click", (e) => {
        infoDetails.classList.add("hidden");
    });
}

const refreshTodos = document.getElementById("refresh-todos");
refreshTodos.addEventListener("click", async () => {
    try {
        console.log("Refreshing Todos...");
        todoArray = [];
        await get_Todos(); 
        display_Todos(todoArray); 
        console.log("Todos refreshed!");
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Todos:", error);
    }
});




  
