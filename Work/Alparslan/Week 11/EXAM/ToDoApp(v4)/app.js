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

const API_URL = 'http://192.168.0.53:3000/api/todo';

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

  const descriptionInput = document.createElement('textarea');
  descriptionInput.value = todo.description || '';

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.value = todo.dueDate || '';

  const responsibleInput = document.createElement('input');
  responsibleInput.type = 'text';
  responsibleInput.value = todo.responsible || '';

  const prioritySelect = document.createElement('select');
  ['low', 'middle', 'high'].forEach(p => {
    const option = document.createElement('option');
    option.value = p;
    option.textContent = p;
    if (p === priorityMap[todo.priority]) option.selected = true;
    prioritySelect.appendChild(option);
  });

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 Änderungen speichern';
  saveBtn.addEventListener('click', async () => {
    const updatedTodo = {
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      responsible: responsibleInput.value,
      priority: priorityNameToNumber[prioritySelect.value]
    };
    await updateTodoAPI(todo.id, updatedTodo);
    showSuccess('Todo aktualisiert ✅');
    await loadTodosFromAPI();
  });

  div.appendChild(descriptionInput);
  div.appendChild(dueDateInput);
  div.appendChild(responsibleInput);
  div.appendChild(prioritySelect);
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

function renderTodoList(todos) {
  elements.list.innerHTML = '';
  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (todo.complete) todoDiv.classList.add('completed');

    const topLine = document.createElement('div');
    topLine.classList.add('todo-topline');

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

    const title = document.createElement('span');
    title.textContent = todo.title;

    left.append(checkbox, title);
    topLine.appendChild(left);

    const right = document.createElement('div');
    right.classList.add('right-section');

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

    right.append(infoIcon, deleteIcon);
    topLine.appendChild(right);
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
    details: details.value,
    dueDate: dueDate.value,
    responsible: responsible.value,
    priority: priorityNameToNumber[priority.value],
    complete: currentlyEditingId
      ? allTodos.find(t => t.id === currentlyEditingId)?.complete || false
      : false,
    createdBy: "Alp"
  };

  if (currentlyEditingId) {
    await updateTodoAPI(currentlyEditingId, todoData);
    currentlyEditingId = null;
  } else {
    await createTodoAPI(todoData);
  }

  await loadTodosFromAPI();
  elements.form.style.display = 'none';
  clearFormInputs();
  showSuccess('Todo erfolgreich gespeichert ✅');
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


  
  
