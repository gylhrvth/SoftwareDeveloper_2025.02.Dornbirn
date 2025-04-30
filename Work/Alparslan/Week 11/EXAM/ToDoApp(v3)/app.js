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

// Erstellt ein P.Element mit einem fett formatierten Titel und einem darauffolgenden Text und fügt dieses Element in ein übergebenes Elternelement ein.
function createPStrong(parent, title, text) {
  let pElement = document.createElement("p")
  let strongElement = document.createElement("strong")
  strongElement.textContent = title
  pElement.appendChild(strongElement)
  pElement.append(text)
  parent.appendChild(pElement)
}

/* Erzeugt das HTML für die Details-Ansicht eines Todos */
function renderDetails(todo) {
  const div = document.createElement('div');
  div.classList.add('todo-details', 'hidden');
  createPStrong(div, "Details: ", todo.description || 'Keine Details verfügbar')
  createPStrong(div, "Fällig am: ", todo.dueDate || 'Kein Datum gesetzt')
  createPStrong(div, "Verantwortlich: ", todo.responsible || 'Niemand zugewiesen')
  createPStrong(div, "Erstellt von: ", todo.createdBy || 'Unbekannt')
  createPStrong(div, "Priorität: ", priorityMap[todo.priority] || 'Unbekannt')
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

/* Fügt Daten in das Formular ein und merkt sich das todo.id */
function startEditTodo(todo) {
  const { title, details, dueDate, responsible, priority } = elements.inputs;

  // Felder im Formular mit Werten füllen
  title.value = todo.title;
  details.value = todo.details || '';
  dueDate.value = todo.dueDate || '';
  responsible.value = todo.responsible || '';
  priority.value = priorityMap[todo.priority] || 'middle';


  currentlyEditingId = todo.id; // ID des bearbeiteten Todos speichern
  elements.form.style.display = 'block'; // Formular anzeigen
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

/* Holt ein einzelnes Todo vom Server per ID */
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

/* Zeichnet die Todo-Liste im DOM basierend auf den geladenen Daten */
function renderTodoList(todos) {
  elements.list.innerHTML = '';                                     // Leert vorherige Einträge aus der Todo-Liste im DOM
  todos.forEach(todo => {                                           // Iteriert durch jedes Todo-Objekt
    const todoDiv = document.createElement('div');                  // Erstellt ein neues div-Element für das einzelne Todo
    todoDiv.classList.add('todo');                                  // Fügt die CSS-Klasse "todo" hinzu
    if (todo.complete) todoDiv.classList.add('completed');          // Falls das Todo erledigt ist, fügt die Klasse "completed" hinzu

    const topLine = document.createElement('div');                  // Erstellt ein div für die obere Zeile des Todos
    topLine.classList.add('todo-topline');                          // Fügt Styling-Klasse für die Topline hinzu

    const left = document.createElement('div');                     // Erstellt linken Bereich (Checkbox + Titel)
    left.classList.add('left-section');                             // Fügt Styling-Klasse für die linke Sektion hinzu

    const checkbox = document.createElement('input');               // Erstellt die Checkbox
    checkbox.type = 'checkbox';                                     // Setzt den Typ auf "checkbox"
    checkbox.checked = todo.complete;                               // Setzt den Status entsprechend dem Todo
    checkbox.addEventListener('change', async (e) => {              // Fügt einen EventListener hinzu für Änderungen am Häkchen
      todo.complete = e.target.checked;                             // Aktualisiert den Status im Todo-Objekt
      todoDiv.classList.toggle('completed', todo.complete);         // Fügt/entfernt die Klasse "completed" je nach Zustand
      await updateTodoAPI(todo.id, { complete: todo.complete });    // Aktualisiert den Status auf dem Server
    });

    const title = document.createElement('span');                   // Erstellt ein span-Element für den Titel
    title.textContent = todo.title;                                 // Setzt den Titeltext

    left.append(checkbox, title);                                   // Fügt Checkbox und Titel in die linke Sektion ein
    topLine.appendChild(left);                                      // Fügt die linke Sektion zur oberen Zeile hinzu

    const right = document.createElement('div');                    // Erstellt den rechten Bereich (Icons)
    right.classList.add('right-section');                           // Fügt Styling-Klasse für rechte Sektion hinzu

    const infoIcon = document.createElement('span');                // Erstellt das Info-Icon (ℹ️)
    infoIcon.textContent = 'ℹ️';                                   // Setzt das Icon-Zeichen
    infoIcon.classList.add('icon-info');                            // Fügt Styling-Klasse für das Info-Icon hinzu

    let detailsDiv = renderDetails(todo);                           // Erstellt die Detailansicht für das Todo
    infoIcon.addEventListener('click', async (e) => {               // Fügt einen Klick-Handler für das Info-Icon hinzu
      e.stopPropagation();                                          // Verhindert, dass der Klick andere Events auslöst
      if (detailsDiv.classList.contains('hidden')) {                // Wenn Details aktuell ausgeblendet sind...
        const fullTodo = await fetchTodoById(todo.id);              // ...hole die vollständigen Daten vom Server
        console.log("info button: ", fullTodo);                     // Debug-Ausgabe in der Konsole
        if (fullTodo) {                                             // Wenn erfolgreich geladen
          const newDetails = renderDetails(fullTodo);               // Erzeuge neue Detailansicht
          todoDiv.replaceChild(newDetails, detailsDiv);             // Ersetze alte durch neue Details
          detailsDiv = newDetails;                                  // Aktualisiere Referenz
        }
      }
      detailsDiv.classList.toggle('hidden');                        // Zeigt oder versteckt den Detailbereich
    });

    const deleteIcon = document.createElement('span');              // Erstellt das Papierkorb-Icon
    deleteIcon.textContent = '🗑️';                                  // Setzt das Icon-Zeichen
    deleteIcon.classList.add('icon-delete');                        // Fügt Styling-Klasse hinzu
    deleteIcon.addEventListener('click', async (e) => {             // Klick-Handler für Löschen
      e.stopPropagation();                                          // Verhindert Klickvererbung
      await deleteTodoAPI(todo.id);                                 // Löscht das Todo vom Server
      await loadTodosFromAPI();                                     // Lädt die Liste neu
    });

    const editIcon = document.createElement('span');                 // Erstellt Bearbeiten-Icon (falls genutzt)
    editIcon.textContent = '✏️';                                    // Setzt Icon-Zeichen
    editIcon.classList.add('icon-edit');                            // Fügt Styling hinzu
    editIcon.addEventListener('click', () => {                      // Klick-Handler für Bearbeiten
      startEditTodo(todo);                                          // Öffnet das Bearbeitungsformular mit dem Todo
    });

    right.appendChild(editIcon);                                    // Fügt Bearbeiten-Icon zum rechten Bereich hinzu
    right.append(infoIcon, deleteIcon);                             // Fügt Info- und Papierkorb-Icon ebenfalls hinzu
    topLine.appendChild(right);                                     // Fügt die rechte Sektion zur oberen Zeile hinzu

    todoDiv.append(topLine, detailsDiv);                            // Fügt Topline und Details dem Todo-Container hinzu
    elements.list.appendChild(todoDiv);                             // Fügt das Todo in die Liste im DOM ein
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
  clearFormInputs();
  currentlyEditingId = null;
});

/* Speichert ein neues oder bearbeitetes Todo über die API */
elements.saveBtn.addEventListener('click', async () => {                      // Event-Listener für Klick auf den "Speichern"-Button
  const { title, details, dueDate, responsible, priority } = elements.inputs; // Destrukturiert die Eingabefelder aus dem Formular

  const todoData = {                                                          // Erstellt ein Objekt mit den eingegebenen Daten
    title: title.value,                                                       // Setzt den Titel aus dem Eingabefeld
    details: details.value,                                                   // Setzt die Details aus dem Eingabefeld
    dueDate: dueDate.value,                                                   // Setzt das Fälligkeitsdatum aus dem Eingabefeld
    responsible: responsible.value,                                           // Setzt den Verantwortlichen aus dem Eingabefeld
    priority: priorityNameToNumber[priority.value],                           // Wandelt die ausgewählte Priorität in eine Zahl um
    complete: currentlyEditingId                                              // Überprüft, ob ein bestehendes Todo bearbeitet wird
      ? allTodos.find(t => t.id === currentlyEditingId)?.complete || false    // Wenn ja, übernimmt den aktuellen Status (true/false)
      : false,                                                                // Wenn nicht, ist das neue Todo standardmäßig nicht abgeschlossen
    createdBy: "Alp"                                                          // Setzt einen festen Namen als Ersteller
  };
  if (currentlyEditingId) {                                                   // Wenn ein bestehendes Todo bearbeitet wird...
    await updateTodoAPI(currentlyEditingId, todoData);                        // ...aktualisiere es über die API
    currentlyEditingId = null;                                                // Setze die Bearbeitungs-ID zurück
  } else {
    await createTodoAPI(todoData);                                            // Wenn kein bestehendes bearbeitet wird, erstelle ein neues Todo
  }
  await loadTodosFromAPI();                                                   // Lade danach die komplette Todo-Liste neu vom Server
  elements.form.style.display = 'none';                                       // Verstecke das Formular
  clearFormInputs();                                                          // Leere die Eingabefelder
  showSuccess('Todo erfolgreich gespeichert ✅');                             // Zeige eine Erfolgsmeldung für den Nutzer
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

  
  
