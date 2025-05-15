// =======================
// DOM Elemente sammeln
// =======================
let allTodos = [];
let currentlyEditingId = null; // Merkt, ob wir gerade ein Todo bearbeiten

// =======================
// Mapping: Zahlen <-> Prioritätsnamen
// =======================
const priorityMap = {
  3: 'low',
  2: 'middle',
  1: 'high'
};

const priorityNameToNumber = {
  'low': 3,
  'middle': 2,
  'high': 1
};

const elements = {
  list: document.getElementById('todo-list'),
  search: document.getElementById('search-todo'),
  form: document.getElementById('new-todo-form'),
  newBtn: document.getElementById('new-todo-button'),
  saveBtn: document.getElementById('save-todo-button'),
  cancelBtn: document.getElementById('cancel-todo-button'),
  themeBtn: document.getElementById('toggle-theme-button'),
  spinner: document.getElementById('loading-spinner'),
  success: document.getElementById('success-message'),
  inputs: {
    title: document.getElementById('new-todo-title'),
    details: document.getElementById('new-todo-details'),
    dueDate: document.getElementById('new-todo-dueDate'),
    responsible: document.getElementById('new-todo-responsible'),
    priority: document.getElementById('new-todo-priority'),
  }
};

const API_URL = '/api/todo';

// =======================
// Hilfsfunktionen
// =======================

function createPStrong(parent, title, text) {
  let pElement = document.createElement("p")
  let strongElement = document.createElement("strong")
  strongElement.textContent = title
  pElement.appendChild(strongElement)
  pElement.append(text)
  parent.appendChild(pElement)
}

function renderDetails(todo) {
  const div = document.createElement('div');
  div.classList.add('todo-details', 'hidden');

  // Beschreibung
  createPStrong(div, 'Beschreibung:', '');
  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = todo.description || '';
  div.appendChild(descriptionInput);

// Fällig am
createPStrong(div, 'Fällig am:', '');

const dueDateInput = document.createElement('input');
dueDateInput.type = 'date';

// Wenn Datum vorhanden → anzeigen
if (todo.due_date) {
  dueDateInput.value = new Date(todo.due_date).toISOString().split('T')[0];
} else {
  dueDateInput.classList.add('missing-date');

  // Hinweis-Text, wenn kein Datum vorhanden ist
  const hint = document.createElement('div');
  hint.textContent = '📌 Bitte Fälligkeitsdatum angegeben';
  hint.classList.add('no-date-hint');
  div.appendChild(hint);
}

div.appendChild(dueDateInput);


  // Verantwortlicher
  createPStrong(div, 'Verantwortlicher:', '');
  const responsibleInput = document.createElement('input');
  responsibleInput.type = 'text';
  responsibleInput.value = todo.responsible || '';
  div.appendChild(responsibleInput);

  // Priorität
  createPStrong(div, 'Priorität:', '');
  const prioritySelect = document.createElement('select');
  ['low', 'middle', 'high'].forEach(p => {
    const option = document.createElement('option');
    option.value = p;
    option.textContent = p;
    if (p === priorityMap[todo.priority]) option.selected = true;
    prioritySelect.appendChild(option);
  });
  div.appendChild(prioritySelect);

  // Speichern-Button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 Änderungen speichern';
  saveBtn.addEventListener('click', async () => {
    const updatedTodo = {
      description: descriptionInput.value,
      dueDate: dueDateInput.value || null,
      responsible: responsibleInput.value,
      priority: priorityNameToNumber[prioritySelect.value],
      createdBy: "Alp"
    };
    await updateTodoAPI(todo.id, updatedTodo);
    showSuccess('Todo aktualisiert ✅');
    await loadTodosFromAPI();
  });

  div.appendChild(saveBtn);

  return div;
}


function showSuccess(message) {
  elements.success.textContent = message;
  elements.success.classList.remove('hidden');
  setTimeout(() => elements.success.classList.add('hidden'), 2000);
}

function clearFormInputs() {
  Object.values(elements.inputs).forEach(input => input.value = '');
}

// =======================
// API Funktionen
// =======================

async function loadTodosFromAPI() {
  elements.spinner.classList.remove('hidden');
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allTodos = data;
    renderTodoList(data);
  } catch (error) {
    console.error('Fehler beim Laden der Todos:', error);
  } finally {
    elements.spinner.classList.add('hidden');
  }
}

async function createTodoAPI(todo) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
  } catch (error) {
    console.error('Fehler beim Erstellen eines Todos:', error);
  }
}

async function updateTodoAPI(id, updates) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Todos:', error);
  }
}

async function deleteTodoAPI(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Todos:', error);
  }
}

async function fetchTodoById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Todo nicht gefunden");
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.error('Fehler beim Laden des Todo-Details:', error);
    return null;
  }
}

// =======================
// Rendering Funktionen
// =======================
/**
 * Rendert die komplette ToDo-Liste im DOM basierend auf den übergebenen Todos.
 * Jedes Todo wird als eigenes <div> dargestellt mit Checkbox, Titel, Prioritätsanzeige,
 * Info-Icon (für Details), Lösch-Icon und (falls nötig) Überfälligkeitswarnung.
 */
function renderTodoList(todos) {
  elements.list.innerHTML = ''; // Bestehende Liste leeren

  todos.forEach(todo => {
    // Hauptcontainer für ein einzelnes Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (todo.complete) todoDiv.classList.add('completed');

    // Obere Zeile mit Checkbox, Titel und Icons
    const topLine = document.createElement('div');
    topLine.classList.add('todo-topline');

    // Linker Bereich: Checkbox + Titel + evtl. Warnung
    const left = document.createElement('div');
    left.classList.add('left-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.complete;

    checkbox.addEventListener('change', async (e) => {
      todo.complete = e.target.checked;
      todoDiv.classList.toggle('completed', todo.complete);
      await updateTodoAPI(todo.id, { complete: todo.complete });
    });

// Wrapper für Titel + Fälligkeitshinweis
const titleWrapper = document.createElement('div');
titleWrapper.classList.add('title-warning-container');

// Titel
const title = document.createElement('span');
title.textContent = todo.title;
title.classList.add('todo-title'); // 🆕 Schrift fett machen
titleWrapper.appendChild(title);

// Fälligkeitshinweis
if (todo.due_date) {
  const dueDate = new Date(todo.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  let message = '';
  let className = 'due-soon';

  if (daysDiff < 0) {
    message = '⚠️ Überfällig';
    className = 'overdue-warning';
  } else if (daysDiff === 0) {
    message = '📅 Heute fällig';
  } else if (daysDiff === 1) {
    message = '📅 Morgen fällig';
  } else if (daysDiff < 7) {
    message = `📅 In ${daysDiff} Tagen`;
  } else {
    const weeks = Math.floor(daysDiff / 7);
    message = `📅 In ${weeks} Woche${weeks > 1 ? 'n' : ''}`;
  }

  const dueInfo = document.createElement('span');
  dueInfo.textContent = message;
  dueInfo.classList.add(className);
  titleWrapper.appendChild(dueInfo);
}

// Zusammenbauen
left.appendChild(checkbox);
left.appendChild(titleWrapper);
topLine.appendChild(left);




    // Rechter Bereich: Prioritätsanzeige + Info + Löschen
    const right = document.createElement('div');
    right.classList.add('right-section');

    const priorityDot = document.createElement('span');
    priorityDot.classList.add('priority-dot', priorityMap[todo.priority]); // Farbe über CSS

    const infoIcon = document.createElement('span');
    infoIcon.textContent = 'ℹ️';
    infoIcon.classList.add('icon-info');

    let detailsDiv = renderDetails(todo);
    infoIcon.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (detailsDiv.classList.contains('hidden')) {
        const fullTodo = await fetchTodoById(todo.id);
        if (fullTodo) {
          const newDetails = renderDetails(fullTodo);
          todoDiv.replaceChild(newDetails, detailsDiv);
          detailsDiv = newDetails;
        }
      }
      detailsDiv.classList.toggle('hidden');
    });

    const deleteIcon = document.createElement('span');
    deleteIcon.textContent = '🗑️';
    deleteIcon.classList.add('icon-delete');

    deleteIcon.addEventListener('click', async (e) => {
      e.stopPropagation();
      await deleteTodoAPI(todo.id);
      await loadTodosFromAPI();
    });

    right.append(priorityDot, infoIcon, deleteIcon);
    topLine.appendChild(right);

    // Todo zusammensetzen und anhängen
    todoDiv.append(topLine, detailsDiv);
    elements.list.appendChild(todoDiv);
  });
}


// =======================
// Event-Listener
// =======================

elements.newBtn.addEventListener('click', () => {
  elements.form.style.display = 'block';
});

elements.cancelBtn.addEventListener('click', () => {
  elements.form.style.display = 'none';
  clearFormInputs();
  currentlyEditingId = null;
});

elements.saveBtn.addEventListener('click', async () => {
  const { title, details, dueDate, responsible, priority } = elements.inputs;
  const todoData = {
  title: title.value,
  description: details.value,
  due_date: dueDate.value || null,
  responsible: responsible.value,
  priority: priorityNameToNumber[priority.value],
  complete: currentlyEditingId
    ? allTodos.find(t => t.id === currentlyEditingId)?.complete || false
    : false,
  created_by: "Alp"
};


  if (currentlyEditingId) {
    await updateTodoAPI(currentlyEditingId, todoData);
    currentlyEditingId = null;
  } else {
    await createTodoAPI(todoData);
  }

  elements.form.style.display = 'none';
  clearFormInputs();
  showSuccess('Todo erfolgreich gespeichert ✅');

  // Nach 1.5 Sekunden Seite neu laden
  setTimeout(() => {
    location.reload();
  }, 1500);
});

elements.themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  elements.themeBtn.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

elements.search.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredTodos = allTodos.filter(todo =>
    todo.title.toLowerCase().includes(searchText)
  );
  renderTodoList(filteredTodos);
});

loadTodosFromAPI();
elements.form.style.display = 'none'; // Formular anfangs verstecken


  
  
