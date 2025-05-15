
async function loadAPI_Data(){
    let result = await fetch('/API/todoapp');
    if (result.ok){
        let data = await result.json();
        console.log('Liste geladen', data);
        renderTodos(data)
    } else {
        console.error('Cannot load /API/todoapp');
    }
}

// Todos darstellen
function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Liste leeren

    todos.forEach(todo => {
        // Listenelement erstellen
        const todoItem = document.createElement('li');
        todoItem.className = 'todo';

        // Checkbox erstellen
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `todo-${todo.todo_id}`;
        checkbox.checked = todo.todo_completed === 1;

        // Checkbox-Event-Listener HIER einfügen!
        checkbox.addEventListener('change', async function() {
            await fetch(`/API/todoapp/${todo.todo_id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: this.checked })
            });
            loadAPI_Data();
        });

        // Label für Checkbox erstellen
        const customCheckboxLabel = document.createElement('label');
        customCheckboxLabel.className = 'custom-checkbox';
        customCheckboxLabel.htmlFor = `todo-${todo.todo_id}`;

        const checkboxIcon = document.createElement('span');
        checkboxIcon.className = 'material-icons';
        checkboxIcon.textContent = 'done';
        customCheckboxLabel.appendChild(checkboxIcon);

        // Label für den Todo-Text erstellen
        const todoTextLabel = document.createElement('label');
        todoTextLabel.htmlFor = `todo-${todo.todo_id}`;
        todoTextLabel.className = 'todo-text';
        todoTextLabel.textContent = todo.todo_title;

        // Priorität anzeigen
        const prioritySpan = document.createElement('span');
        prioritySpan.className = `priority-icon ${todo.todo_priority.toLowerCase()}`;
        prioritySpan.textContent = 'notification_important';
        prioritySpan.classList.add('material-symbols-outlined');

        // Tooltip hinzufügen
        prioritySpan.setAttribute('title', todo.todo_priority);

         // --- PRIORITY-ICON CLICK: Priorität ändern ---
        const priorities = ['low', 'medium', 'high'];
        let currentPriorityIndex = priorities.indexOf(todo.todo_priority);

        prioritySpan.addEventListener('click', async () => {
            currentPriorityIndex = (currentPriorityIndex + 1) % priorities.length;
            const newPriority = priorities[currentPriorityIndex];
            await fetch(`/API/todoapp/${todo.todo_id}/priority`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority: newPriority })
            });
            loadAPI_Data();
        });

        // Erstellungsdatum anzeigen
        const createdSpan = document.createElement('span');
        createdSpan.className = 'created';
        createdSpan.textContent = `Created: ${new Date(todo.todo_created).toLocaleString()}`;

        // Delete-Button erstellen
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.setAttribute('aria-label', 'Delete');

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'material-symbols-outlined';
        deleteIcon.textContent = 'delete';
        deleteButton.appendChild(deleteIcon);

        // Info-Button erstellen
        const infoButton = document.createElement('button');
        infoButton.className = 'info-button';
        infoButton.setAttribute('aria-label', 'Info');

        const infoIcon = document.createElement('span');
        infoIcon.className = 'material-symbols-outlined';
        infoIcon.textContent = 'info';
        infoButton.appendChild(infoIcon);

        // Event-Listener für den Info-Button
        infoButton.addEventListener('click', () => {
            showTodoInfo(todo); // Funktion aufrufen, um die Todo-Details anzuzeigen
        });

        // Event-Listener für den Delete-Button
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(todo.todo_id);
        });

        // Elemente zum Listenelement hinzufügen
        todoItem.appendChild(checkbox);
        todoItem.appendChild(customCheckboxLabel);
        todoItem.appendChild(todoTextLabel);
        todoItem.appendChild(prioritySpan);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(infoButton);
        
        todoList.appendChild(todoItem);
    });
}

// Todo Details
function showTodoInfo(todo){
    const modal = document.getElementById('todo-info-modal');
    document.getElementById('todo-info-id').textContent = todo.todo_id;
    document.getElementById('todo-info-title').value = todo.todo_title;
    document.getElementById('todo-info-description').value = todo.todo_description || "";
    document.getElementById('todo-info-created').textContent = new Date(todo.todo_created).toLocaleString();

    const saveBtn = document.getElementById('save-todo-edit');
    if (saveBtn) {
        saveBtn.onclick = async function() {
            const newTitle = document.getElementById('todo-info-title').value.trim();
            const newDesc = document.getElementById('todo-info-description').value.trim();
            if (!newTitle) return alert("Titel darf nicht leer sein!");

            await fetch(`/API/todoapp/${todo.todo_id}/edit`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, description: newDesc })
            });
            modal.style.display = 'none';
            loadAPI_Data();
        };
    }

    modal.style.display = 'flex';
}
    document.getElementById('close-modal-button').addEventListener('click', () => {
    const modal = document.getElementById('todo-info-modal');
    modal.style.display = 'none'; // Modal ausblenden
});

// Todo löschen
async function deleteTodoItem(todoId){
    let result = await fetch('/API/todoapp', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo_id: todoId })
    });
    if (result.ok) {
        loadAPI_Data(); // Liste neu laden
    }
}

async function clearCompletedTodos() {
    let result = await fetch('/API/todoapp/completed', {
        method: 'DELETE'
    });
    if (result.ok) {
        loadAPI_Data(); // Liste neu laden
    }
}
document.getElementById('clear-completed-button').addEventListener('click', clearCompletedTodos);

async function clearAllTodos(){
    let result = await fetch('/API/todoapp/all', {
        method: 'DELETE'
    });
    if (result.ok) {
        loadAPI_Data(); // Liste neu laden
    }
}
document.getElementById('clear-all-button').addEventListener('click', function(e) {
    e.preventDefault();
    clearAllTodos();
});

// Todo hinzufügen
async function addTodoItem() {
    const input = document.getElementById('todo-input');
    const title = input.value.trim();
    if (!title) return;

    let result = await fetch('/API/todoapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title }) 
    });
    if (result.ok) {
        input.value = '';
        loadAPI_Data(); // Liste neu laden
    }
}
document.getElementById('add-button').addEventListener('click', function(e) {
        e.preventDefault();
        addTodoItem();
});

document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('todo-info-modal');
        if (modal) modal.style.display = 'none';
        loadAPI_Data();
});
