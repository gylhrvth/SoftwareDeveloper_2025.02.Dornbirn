// =======================
// Variablen / HTML Elemente holen
// =======================

//let todos = []; // Todos aus API

const todoList = document.getElementById('todo-list');
const todoDetails = document.getElementById('todo-details');
const newTodoButton = document.getElementById('new-todo-button');
const newTodoForm = document.getElementById('new-todo-form');
const saveTodoButton = document.getElementById('save-todo-button');
const cancelTodoButton = document.getElementById('cancel-todo-button');
const toggleThemeButton = document.getElementById('toggle-theme-button');


// =======================
// API Funktionen
// =======================

// Holt alle Todos vom Server
async function loadTodosFromAPI() {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.remove('hidden'); // Spinner zeigen

    try {
        const response = await fetch('http://192.168.0.53:3000/api/todo');
        const data = await response.json();
        renderTodoList(data);
    } catch (error) {
        console.error('Fehler beim Laden der Todos:', error);
    } finally {
        spinner.classList.add('hidden'); // Spinner ausblenden
    }
}

// Erstellt ein neues Todo auf dem Server
async function createTodoAPI(todo) {
    try {
        await fetch('http://192.168.0.53:3000/api/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
    } catch (error) {
        console.error('Fehler beim Erstellen eines Todos:', error);
    }
}

// Aktualisiert ein bestehendes Todo auf dem Server
async function updateTodoAPI(id, updates) {
    try {
        await fetch(`http://192.168.0.53:3000/api/todo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Todos:', error);
    }
}

// Löscht ein Todo vom Server
async function deleteTodoAPI(id) {
    try {
        await fetch(`http://192.168.0.53:3000/api/todo/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Fehler beim Löschen des Todos:', error);
    }
}


// =======================
// Rendering Funktionen
// =======================

// Zeichnet die Todo-Liste
function renderTodoList(todos) {
    todoList.innerHTML = ''; // Liste leeren

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const topLine = document.createElement('div');
        topLine.classList.add('todo-topline');
        topLine.style.display = 'flex';                         //TODO: Style in CSS auslagern     
        topLine.style.alignItems = 'center';
        topLine.style.justifyContent = 'space-between';

        const leftSection = document.createElement('div');
        leftSection.style.display = 'flex';
        leftSection.style.alignItems = 'center';
        leftSection.style.gap = '10px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('change', async (e) => {
            todo.complete = e.target.checked;
            todoDiv.classList.toggle('completed', todo.complete);
            await updateTodoAPI(todo.id, { complete: todo.complete });
        });

        const title = document.createElement('span');
        title.textContent = todo.title;

        leftSection.appendChild(checkbox);
        leftSection.appendChild(title);
        topLine.appendChild(leftSection);

        const rightSection = document.createElement('div');
        rightSection.style.display = 'flex';
        rightSection.style.alignItems = 'center';
        rightSection.style.gap = '10px';

        const infoIcon = document.createElement('span');
        infoIcon.textContent = 'ℹ️';
        infoIcon.style.cursor = 'pointer';
        infoIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            detailsDiv.classList.toggle('hidden');
        });
        rightSection.appendChild(infoIcon);

        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '🗑️';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', async (e) => {
            e.stopPropagation();
            await deleteTodoAPI(todo.id);
            await loadTodosFromAPI();
        });
        rightSection.appendChild(deleteIcon);
        topLine.appendChild(rightSection);

        // TODO: Funktion daraus machen
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('todo-details', 'hidden');
        detailsDiv.innerHTML = `
            <p><strong>Details:</strong> ${todo.details || 'Keine Details verfügbar'}</p>
            <p><strong>Fällig am:</strong> ${todo.dueDate || 'Kein Datum gesetzt'}</p>
            <p><strong>Verantwortlich:</strong> ${todo.responsible || 'Niemand zugewiesen'}</p>
            <p><strong>Erstellt von:</strong> ${todo.createdBy || 'Unbekannt'}</p>
        `;



        todoDiv.appendChild(topLine);
        todoDiv.appendChild(detailsDiv);
        todoList.appendChild(todoDiv);
    });
}


// =======================
// Event-Listener
// =======================

// Neues Todo-Formular öffnen
newTodoButton.addEventListener('click', () => {
    newTodoForm.style.display = 'block'; // Formular einblenden
});

// Formular schließen (Abbrechen)
cancelTodoButton.addEventListener('click', () => {
    newTodoForm.style.display = 'none'; // Formular ausblenden
});

// Neues Todo speichern
saveTodoButton.addEventListener('click', async () => {
    const title = document.getElementById('new-todo-title').value;
    const details = document.getElementById('new-todo-details').value;
    const dueDate = document.getElementById('new-todo-dueDate').value;
    const responsible = document.getElementById('new-todo-responsible').value;

    const newTodo = {
        title,
        details,
        dueDate,
        responsible,
        complete: false,
        createdBy: "Alp"
    };

    await createTodoAPI(newTodo);
    await loadTodosFromAPI();

    // Formular ausblenden nach Speichern
    newTodoForm.style.display = 'none';

    // Eingabefelder leeren
    document.getElementById('new-todo-title').value = '';
    document.getElementById('new-todo-details').value = '';
    document.getElementById('new-todo-dueDate').value = '';
    document.getElementById('new-todo-responsible').value = '';

    // TODO: Funktion daraus
    // Erfolgsmeldung anzeigen
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = 'Todo erfolgreich erstellt! ✅';
    successMessage.classList.remove('hidden');

    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 2000);
});

// Dark Mode Umschalten
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleThemeButton.textContent = '☀️ Light Mode';
    } else {
        toggleThemeButton.textContent = '🌙 Dark Mode';
    }
});


// =======================
// Startpunkt
// =======================
loadTodosFromAPI();
