// ---------------------------------------------------Exam JS---------------------------------------------------------------------------------
const SERVER = "http://localhost:3000"
//Elemente 
function createHTMLElement(parent, elementName, className, textContent) {
    const element = document.createElement(elementName);
    element.className = className;
    element.textContent = textContent
    parent.appendChild(element)

    return element;
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//gesamte Liste erstellen
function buildToDos(data) {

    //Bestehende ToDos zuerst löschen
    const container = document.getElementById("ToDo-Container");
    container.innerHTML = ""; // Leert den Container vollständig

    //durch ToDos iterieren aus der API
    data.forEach(todo => {
        const todoWrapper = document.createElement("div");
        todoWrapper.className = "ToDo-Wrapper";

        const todoDiv = document.createElement("div");
        todoDiv.className = "ToDo-Container";
        //Checkbox 
        const checkBox = createHTMLElement(todoDiv, "input", "checkbox", "")
        checkBox.type = "checkbox";
        checkBox.checked = todo.complete; // Status setzen (complete oder nicht)
        //Status ändern bei checkbox klick
        checkBox.addEventListener("change", async () => {
            try {
                const updatedStatus = checkBox.checked;

                const response = await fetch(`${SERVER}/api/todo/${todo.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ complete: updatedStatus })
                });

                if (!response.ok) throw new Error("Status konnte nicht aktualisiert werden");

                const statusDiv = todoDiv.querySelector(".complete");
                statusDiv.textContent = updatedStatus ? "Completed" : "Not Completed ";

            } catch (error) {
                console.error("Fehler beim Aktualisieren des Status", error);
                checkBox.checked = !checkBox.checked;
            }
        });
        //Titel erstellen
        createHTMLElement(todoDiv, "div", "title", todo.title);
        //Status 
        createHTMLElement(todoDiv, "div", "complete", todo.complete ? "Completed" : "Not Completed🐛");
        //Detail-Button erstellen 
        const detailButton = createHTMLElement(todoDiv, "button", "detailButton", "📋");
        //Edit-Button
        const editButton = createHTMLElement(todoDiv, "button", "editButton", "✏️");
        editButton.addEventListener("click", () => {
            enableEditMode(todo, todoDiv, todoWrapper);
        });
        //Detail-Event-Listener
        detailButton.addEventListener("click", function () {
            //Details des ToDos laden und anzeigen
            loadToDoDetailsFromAPI(todo.id, todoWrapper); // TODO: Hier ToDo-Id übergeben
        });
        //---------------------
        //Delete-Button erstellen
        const deleteButton = createHTMLElement(todoDiv, "button", "deleteButton", "🗑️");
        // Eventlistener zum Löschen
        deleteButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`${SERVER}/api/todo/${todo.id}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    throw new Error("Fehler beim Löschen");
                }
                // Entferne nur das entsprechende ToDo aus dem DOM
                todoWrapper.remove(); // <<< übergeordneter Wrapper

            } catch (error) {
                console.error("Fehler beim Löschen", error);
            }
        });
        todoWrapper.appendChild(todoDiv);
        container.appendChild(todoWrapper);
    });
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//API ToDos hollen 
async function loadToDosFromAPI() {
    try {
        //alle ToDos hollen von API
        const response = await fetch(SERVER + "/api/todo");
        const data = await response.json();
        console.log(data);

        //ToDos mit buildToDos anzeigen
        buildToDos(data);
    } catch (error) {
        console.error("Fehler beim Laden der ToDos", error);
    }
}
loadToDosFromAPI();
//ToDo's alle 30sek. aktualisieren 
setInterval(() => {
    loadToDosFromAPI();
}, 30000);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//API Details hollen
async function loadToDoDetailsFromAPI(todoId, parentDiv) {
    try {
        //Details hollen von API
        const response = await fetch(`${SERVER}/api/todo/${todoId}`);
        if (!response.ok) {
            throw new Error("Fehler vom Server: " + (await response.text()));
        }
        const data = await response.json();
        console.log(data);

        //Details in HTML Elemente einfügen
        buildDetails(data, parentDiv);
    } catch (error) {
        console.error("Fehler beim Ladern der Details", error);
    }
}
//-------------------------
//DIV für Details erstellen 
function buildDetails(todo, parentDiv) {

    // Prüfen ob Details bereits existieren
    const existingDetails = parentDiv.querySelector(".ToDo-Details");
    if (existingDetails) {
        existingDetails.remove(); // Falls ja, dann löschen
        return; // Direkt stoppen (also klappbar machen)
    }
    document.querySelectorAll(".ToDo-Details").forEach(detail => detail.remove());

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "ToDo-Details";

    //parent, elementName, className, textContent -- createHTMLElement
    createHTMLElement(detailsDiv, "div", "detailTitle", `Title: ${todo.title}`);
    createHTMLElement(detailsDiv, "div", "detailDescription", `Description: ${todo.description || "Keine Beschreibung vorhanden"}`);
    createHTMLElement(detailsDiv, "div", "detailDueDate", `DueDate: ${todo.dueDate}`);
    createHTMLElement(detailsDiv, "div", "detailResponsible", `responsible: ${todo.responsible}`);
    createHTMLElement(detailsDiv, "div", "detailCreatetBy", `CreatedBy: ${todo.createdBy}`);
    createHTMLElement(detailsDiv, "div", "detailCreatetAt", `CreatetAt: ${new Date(todo.createdAt).toLocaleDateString()}`);
    createHTMLElement(detailsDiv, "div", "detailUpdatedAt", `UpdatetAt: ${new Date(todo.updatedAt).toLocaleDateString()}`);

    parentDiv.appendChild(detailsDiv);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
function createHTMLForm(parent, elementName, className, contentOrPlaceholder, options = {}) {
    const element = document.createElement(elementName);
    if (className) element.className = className;

    // Inhalte setzen je nach Typ
    if (elementName === "input") {
        element.placeholder = contentOrPlaceholder || "";
        Object.assign(element, options); // z. B. type, required, id
    } else {
        element.textContent = contentOrPlaceholder || "";
        Object.assign(element, options); // z. B. id
    }
    parent.appendChild(element);
    return element;
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
function createAddTodoButton() {
    const button = document.createElement("button");
    button.id = "createNewTodo-Button";
    button.textContent = "➕ Add";
    button.className = "create-button"; // optional für Styling
    // Klick-Event hinzufügen
    button.addEventListener("click", () => {
        document.getElementById("new-todo-form").style.display = "block";
    });
    document.body.insertBefore(button, document.getElementById("ToDo-Container"));
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
function createTodoForm() {
    const formContainer = document.createElement("div");
    formContainer.id = "new-todo-form";
    formContainer.style.display = "none";
    formContainer.style.marginTop = "1em";

    createHTMLForm(formContainer, "input", "", "Titel*", { id: "form-title", required: true });
    createHTMLForm(formContainer, "input", "", "Beschreibung", { id: "form-description" });
    createHTMLForm(formContainer, "input", "", "", { id: "form-dueDate", type: "date" });
    createHTMLForm(formContainer, "input", "", "Verantwortlicher*", { id: "form-responsible", required: true });
    createHTMLForm(formContainer, "input", "", "Status*", { id: "form-complete" });
    createHTMLForm(formContainer, "input", "", "Ersteller*", { id: "form-createdBy" });
    createHTMLForm(formContainer, "button", "", "💾", { id: "saveForm", type: "button" });
    createHTMLForm(formContainer, "button", "", "❌", { id: "cancelForm", type: "button" });
    // Füge das Formular dem Body hinzu
    document.body.insertBefore(formContainer, document.getElementById("ToDo-Container"));
}
createAddTodoButton();
createTodoForm();

// Formular und Events für Speichern und Abbrechen
document.getElementById("saveForm").addEventListener("click", async () => {
    const title = document.getElementById("form-title").value.trim();
    const description = document.getElementById("form-description").value.trim();
    const dueDate = document.getElementById("form-dueDate").value;
    const complete = document.getElementById("form-complete").value.trim().toLowerCase() === "true"; //Text zu Boolean
    const responsible = document.getElementById("form-responsible").value.trim();
    const createdBy = document.getElementById("form-createdBy").value.trim();

    if (!title || !responsible) {
        alert("Titel und Verantwortlicher sind Pflicht!");
        return;
    }
    const newTodo = {
        title,
        description,
        dueDate: dueDate || null,
        responsible,
        complete: complete,  // Optional: in boolean umwandeln
        createdBy
    };
    try {
        const response = await fetch(SERVER + "/api/todo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo)
        });

        if (!response.ok) throw new Error("Fehler beim Erstellen");

        // Formular ausblenden und ToDos neu laden
        document.getElementById("new-todo-form").style.display = "none";
        await loadToDosFromAPI();

        // Felder leeren:
        document.getElementById("form-title").value = "";
        document.getElementById("form-description").value = "";
        document.getElementById("form-dueDate").value = "";
        document.getElementById("form-responsible").value = "";
        document.getElementById("form-complete").value = "";
        document.getElementById("form-createdBy").value = "";

    } catch (error) {
        console.error("Fehler:", error);
    }
});
// AbbrechencreateTodoForm habe ist es dann sinnvoller das:
document.getElementById("cancelForm").addEventListener("click", () => {
    document.getElementById("new-todo-form").style.display = "none";
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
function enableEditMode(todo, containerDiv, wrapperDiv) {
    // Aktuelle Infos holen (optional für Reset)
    const originalTitle = todo.title;
    const originalResponsible = todo.responsible;
    const originalComplete = todo.complete;

    // Vorherige Kinder löschen
    containerDiv.innerHTML = "";

    // Eingabefelder einfügen
    const completeCheckbox = createHTMLForm(containerDiv, "input", "editCheckbox", "", {
        type: "checkbox",
        id: `edit-complete-${todo.id}`,
        checked: todo.complete
    });
    const titleInput = createHTMLForm(containerDiv, "input", "editInput", "Titel", {
        id: `edit-title-${todo.id}`,
        value: todo.title,
    });
    const responsibleInput = createHTMLForm(containerDiv, "input", "editInput", "Ersteller", {
        id: `edit-responsible-${todo.id}`,
        value: todo.responsible || "",
    });
    const descriptionInput = createHTMLForm(containerDiv, "input", "editInput", "Beschreibung", {
        id: `edit-description-${todo.id}`,
        value: todo.description || "",
    });
    const updatedAtInput = createHTMLForm(containerDiv, "input", "editInput", "updatedAt", {
        id: `edit-update-${todo.id}`,
        value: todo.updatedAt || "",
        type: "date",
    });
    // Button: Speichern
    const saveBtn = createHTMLElement(containerDiv, "button", "saveEditButton", "💾");

    saveBtn.addEventListener("click", async () => {
        const updatedTodo = {
            complete: completeCheckbox.checked,
            title: titleInput.value.trim(),
            responsible: responsibleInput.value.trim(),
            dueDate: todo.dueDate,
            createdBy: todo.createdBy,
            description: todo.description || "" // Nullwert für Description vermeiden
        };
        try {
            const response = await fetch(`${SERVER}/api/todo/${todo.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo)
            });
            if (!response.ok && response.status !== 202) {
                throw new Error(`Fehler beim Speichern: ${response.status}`);
            }
            // Nach erfolgreichem Speichern neu laden
            await loadToDosFromAPI();
        } catch (error) {
            console.error("Fehler beim Aktualisieren", error);
            alert("Es gab ein Problem beim Speichern der Aufgabe. Bitte versuche es erneut.");
        }
    });
    // Button: Abbrechen
    const cancelBtn = createHTMLElement(containerDiv, "button", "cancelEditButton", "❌");
    cancelBtn.addEventListener("click", () => {
        // Neu rendern, ohne Änderung
        loadToDosFromAPI();
    });
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------





