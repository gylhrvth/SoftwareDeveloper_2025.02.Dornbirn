// =======================
// DOM Elemente sammeln
// =======================
let allTodos = [];


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
    }
  };
  
  const API_URL = 'http://192.168.0.67:3000/api/todo';
  
  // =======================
  // Hilfsfunktionen
  // =======================
  
  function createPStrong(parent, title, text){
    let pElement = document.createElement("p")
    let strongElement = document.createElement("strong")
    strongElement.textContent = title
    pElement.appendChild(strongElement)
    pElement.textContent = text
    parent.appendChild(pElement)
  }

  /* Erzeugt das HTML für die Details-Ansicht eines Todos */
  function renderDetails(todo) {
    const div = document.createElement('div');
    div.classList.add('todo-details', 'hidden');
    createPStrong(div, "Details:", todo.details || 'Keine Details verfügbar')
    createPStrong(div, "Fällig am:", todo.dueDate || 'Kein Datum gesetzt')
    createPStrong(div, "Verantwortlich:", todo.responsible || 'Niemand zugewiesen')
    createPStrong(div, "Erstellt von:", todo.createdBy || 'Unbekannt')
    return div;
  }
  
  /* Zeigt eine temporäre Erfolgsmeldung an */
  function showSuccess(message) {
    elements.success.textContent = message;
    elements.success.classList.remove('hidden');
    setTimeout(() => elements.success.classList.add('hidden'), 2000);
  }
  
  /* Leert alle Eingabefelder im neuen Todo-Formular */
  function clearFormInputs() {
    Object.values(elements.inputs).forEach(input => input.value = '');
  }
  
  // =======================
  // API Funktionen
  // =======================
  
  /* Lädt alle Todos vom Server und zeigt sie an */
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
  
  /* Erstellt ein neues Todo auf dem Server */
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
  
  /* Aktualisiert ein bestehendes Todo auf dem Server (z.B. Status abgeschlossen) */
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
  
  /* Löscht ein Todo vom Server */
  async function deleteTodoAPI(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Fehler beim Löschen des Todos:', error);
    }
  }
  
  // =======================
  // Rendering Funktionen
  // =======================
  
  /* Zeichnet die Todo-Liste im DOM basierend auf den geladenen Daten */
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
  
      const detailsDiv = renderDetails(todo);
  
      infoIcon.addEventListener('click', (e) => {
        e.stopPropagation();
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
  
  /* Öffnet das Formular zum Hinzufügen eines neuen Todos */
  elements.newBtn.addEventListener('click', () => {
    elements.form.style.display = 'block';
  });
  
  /* Schließt das Formular ohne zu speichern */
  elements.cancelBtn.addEventListener('click', () => {
    elements.form.style.display = 'none';
  });
  
  /* Speichert ein neues Todo über die API */
  elements.saveBtn.addEventListener('click', async () => {
    const { title, details, dueDate, responsible } = elements.inputs;
  
    const newTodo = {
      title: title.value,
      details: details.value,
      dueDate: dueDate.value,
      responsible: responsible.value,
      complete: false,
      createdBy: "Alp"
    };
  
    await createTodoAPI(newTodo);
    await loadTodosFromAPI();
    elements.form.style.display = 'none';
    clearFormInputs();
    showSuccess('Todo erfolgreich erstellt! ✅');
  });
  
  /* Schaltet zwischen Dark Mode und Light Mode um */
  elements.themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    elements.themeBtn.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  });
  
/* Filtert Todos live beim Tippen im Suchfeld */
elements.search.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredTodos = allTodos.filter(todo => 
    todo.title.toLowerCase().includes(searchText)
  );
  renderTodoList(filteredTodos);
});


  // =======================
  // Startpunkt: Todos laden beim Seitenstart
  // =======================
  loadTodosFromAPI();
  
  
