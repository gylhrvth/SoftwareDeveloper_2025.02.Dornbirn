// Todo-Daten (zunächst Dummy-Daten, später API-Daten)
const todos = [
    {
        id: '1',
        title: 'Hausaufgaben machen',
        details: 'Mathe und Deutsch bis Freitag erledigen',
        dueDate: '2025-05-20',
        responsible: 'Max',
        complete: false
    },
    {
        id: '2',
        title: 'Einkaufen',
        details: 'Milch, Brot, Eier',
        dueDate: '2025-05-21',
        responsible: 'Anna',
        complete: false
    }
];

const todoList = document.getElementById('todo-list');
const todoDetails = document.getElementById('todo-details');
const newTodoButton = document.getElementById('new-todo-button');
const newTodoForm = document.getElementById('new-todo-form');
const saveTodoButton = document.getElementById('save-todo-button');
const cancelTodoButton = document.getElementById('cancel-todo-button');

function renderTodoList() {
    todoList.innerHTML = ''; // Liste leeren
    todos.forEach(todo => {
        // Todo-DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Oberes Flex: Checkbox, Titel, Icons
        const topLine = document.createElement('div');
        topLine.classList.add('todo-topline');
        topLine.style.display = 'flex';
        topLine.style.alignItems = 'center';
        topLine.style.justifyContent = 'space-between';

        // Links: Checkbox + Titel
        const leftSection = document.createElement('div');
        leftSection.style.display = 'flex';
        leftSection.style.alignItems = 'center';
        leftSection.style.gap = '10px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.complete;
        checkbox.addEventListener('change', (e) => {
            todo.complete = e.target.checked;
            todoDiv.classList.toggle('completed', todo.complete);
        });

        const title = document.createElement('span');
        title.textContent = todo.title;

        leftSection.appendChild(checkbox);
        leftSection.appendChild(title);

        // Rechts: Info-Icon + Mülleimer
        const rightSection = document.createElement('div');
        rightSection.style.display = 'flex';
        rightSection.style.alignItems = 'center';
        rightSection.style.gap = '10px';

        const infoIcon = document.createElement('span');
        infoIcon.textContent = 'ℹ️';
        infoIcon.style.cursor = 'pointer';

        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = '🗑️';
        deleteIcon.style.cursor = 'pointer';

        deleteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            todos.splice(todos.indexOf(todo), 1);
            renderTodoList();
        });

        rightSection.appendChild(infoIcon);
        rightSection.appendChild(deleteIcon);

        topLine.appendChild(leftSection);
        topLine.appendChild(rightSection);

        // Details-DIV (nur zum ein-/ausklappen)
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('todo-details', 'hidden');
        detailsDiv.innerHTML = `
            <p><strong>Details:</strong> ${todo.details || 'Keine Details verfügbar'}</p>
            <p><strong>Fällig am:</strong> ${todo.dueDate || 'Kein Datum gesetzt'}</p>
            <p><strong>Verantwortlich:</strong> ${todo.responsible || 'Niemand zugewiesen'}</p>
            <p><strong>Erstellt von:</strong> ${todo.createdBy || 'Unbekannt'}</p>
        `;

        // Info-Icon klickbar zum Details zeigen/verstecken
        infoIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            detailsDiv.classList.toggle('hidden');
        });

        // Aufbau
        todoDiv.appendChild(topLine); // Kopfzeile
        todoDiv.appendChild(detailsDiv); // Details innerhalb des Todo-Elements

        todoList.appendChild(todoDiv); // Alles zusammen zur Liste
    });
}




function toggleTodoDetails(todo, detailsDiv) {
    if (!detailsDiv.classList.contains('hidden')) {
        // Wenn schon sichtbar, wieder ausblenden
        detailsDiv.classList.add('hidden');
        detailsDiv.innerHTML = '';
    } else {
        // Ansonsten Details anzeigen
        detailsDiv.innerHTML = `
            <h4>${todo.title}</h4>
            <p><strong>Details:</strong> ${todo.details || 'Keine Details verfügbar'}</p>
            <p><strong>Fällig am:</strong> ${todo.dueDate || 'Kein Datum gesetzt'}</p>
            <p><strong>Verantwortlich:</strong> ${todo.responsible || 'Niemand zugewiesen'}</p>
            <p><strong>Erstellt von:</strong> ${todo.createdBy || 'Unbekannt'}</p>
        `;
        detailsDiv.classList.remove('hidden');
    }
}

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1); // Entfernt das Todo
        renderTodoList();       // Zeichnet die Liste neu
    }
}



// Neue Todo anzeigen lassen
newTodoButton.addEventListener('click', () => {
    newTodoForm.style.display= 'block';
});

// Abbrechen
cancelTodoButton.addEventListener('click', () => {
    newTodoForm.classList.add('hidden');
});

// Neues Todo speichern 
saveTodoButton.addEventListener('click', () => {
    const title = document.getElementById('new-todo-title').value;
    const details = document.getElementById('new-todo-details').value;
    const dueDate = document.getElementById('new-todo-dueDate').value;
    const responsible = document.getElementById('new-todo-responsible').value;

    const newTodo = {
        id: Date.now().toString(),
        title,
        details,
        dueDate,
        responsible,
        complete: false
    };

    todos.push(newTodo); // ⬅️ Sofort speichern
    renderTodoList();    // ⬅️ Sofort Liste aktualisieren
    newTodoForm.style.display= 'none'; // ⬅️ Formular ausblenden nach dem speichern

    // Eingabefelder leeren
    document.getElementById('new-todo-title').value = '';
    document.getElementById('new-todo-details').value = '';
    document.getElementById('new-todo-dueDate').value = '';
    document.getElementById('new-todo-responsible').value = '';

    // NACHDEM alles erledigt wurde, schöne Info anzeigen
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = 'Todo erfolgreich erstellt! ✅'; // Text setzen
    successMessage.classList.remove('hidden'); // Anzeigen

    // Nach 2 Sekunden wieder ausblenden
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 2000);

});






// Seite laden = Todos anzeigen
renderTodoList();

// Dark Mode / Light Mode Umschalter
const toggleThemeButton = document.getElementById('toggle-theme-button');

toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        toggleThemeButton.textContent = '☀️ Light Mode';
    } else {
        toggleThemeButton.textContent = '🌙 Dark Mode';
    }
});
