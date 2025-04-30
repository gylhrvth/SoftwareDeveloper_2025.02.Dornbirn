document.addEventListener("DOMContentLoaded", async function () {
    getData();
});
const ip = 'http://192.168.0.53:3000/api/todo/'; // IP-Adresse des Servers
const itemsElement = document.querySelector('.items');
let currentPage = 1; // Aktuelle Seite
const itemsPerPage = 6; // Anzahl der Elemente pro Seite

setInterval(() => {
    if (itemsElement.querySelector('.item')) {
        getData();
    }
}, 5000); // Alle 5 Sekunden die Daten neu laden

async function getData() {
    try {
        const result = await fetch(ip); // Überprüfe die URL
        if (result.ok) {
            const data = await result.json();
            createPagination(data); // Pagination erstellen
        } else {
            loadingError(result.status, result.statusText);
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Network Error: " + error.message);
    }
}

function createPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage); // Gesamtanzahl der Seiten
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end); // Daten für die aktuelle Seite

    createDOM(pageData); // DOM für die aktuelle Seite erstellen
    createPaginationControls(totalPages); // Pagination-Steuerelemente erstellen
}

function createPaginationControls(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Vorherige Buttons entfernen
    paginationContainer.classList.remove('hidden'); // Sichtbar machen

    // "Vorherige Seite"-Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Vorherige';
    prevButton.disabled = currentPage === 1; // Deaktivieren, wenn auf der ersten Seite
    prevButton.addEventListener('click', () => {
        currentPage--;
        getData(); // Daten neu laden
    });
    paginationContainer.appendChild(prevButton);

    // Seitenanzeige
    const pageInfo = document.createElement('span');
    pageInfo.textContent = "Seite ";
    paginationContainer.appendChild(pageInfo);
    const pageSpan = document.createElement('span');
    pageSpan.textContent = currentPage;
    pageInfo.appendChild(pageSpan);
    const totalPagesSpan = document.createElement('span');
    totalPagesSpan.textContent = " von ";
    paginationContainer.appendChild(totalPagesSpan);
    const totalPagesSpan2 = document.createElement('span');
    totalPagesSpan2.textContent = totalPages;
    totalPagesSpan.appendChild(totalPagesSpan2);

    // "Nächste Seite"-Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Nächste';
    nextButton.disabled = currentPage === totalPages; // Deaktivieren, wenn auf der letzten Seite
    nextButton.addEventListener('click', () => {
        currentPage++;
        getData(); // Daten neu laden
    });
    paginationContainer.appendChild(nextButton);
}

function createDOM(data) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    for (const item of data) {
        const divElement = document.createElement('div');
        divElement.classList.add('item');
        container.appendChild(divElement);
        divElement.addEventListener('click', async () => {
            const result = await fetch(`${ip}${item.id}`);
            if (result.ok) {
                const itemDetails = await result.json();
                createDOMDetails(itemDetails);
            } else {
                loadingError(result.status, result.statusText);
            }
        });
        const name = document.createElement('h2');
        name.textContent = item.title;
        divElement.appendChild(name);
    }
}

function createDOMDetails(item) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.classList.add('hidden');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    container.appendChild(detailsDiv);

    const name = document.createElement('h2');
    name.textContent = item.title;
    detailsDiv.appendChild(name);

    const description = document.createElement('p');
    description.textContent = item.description;
    description.classList.add('description');
    detailsDiv.appendChild(description);

    const complete = document.createElement('p');
    if (item.complete === true) {
        complete.textContent = `Abgeschlossen: Ja`;
    } else {
        complete.textContent = `Abgeschlossen: Nein`;
    }
    detailsDiv.appendChild(complete);

    const toBeDone = document.createElement('p');
    toBeDone.textContent = "Fällig am: ";
    const dueDate = document.createElement('span');
    dueDate.textContent = item.dueDate;
    toBeDone.appendChild(dueDate);
    detailsDiv.appendChild(toBeDone);

    const howResposible = document.createElement('p');
    howResposible.textContent = "Verantwortlich: ";

    const responsible = document.createElement('span');
    responsible.textContent = item.responsible;
    howResposible.appendChild(responsible);
    detailsDiv.appendChild(howResposible);

    const creator = document.createElement('p');
    creator.textContent = "Ersteller: ";
    const creatorName = document.createElement('span');
    creatorName.textContent = item.createdBy;
    creator.appendChild(creatorName);
    detailsDiv.appendChild(creator);

    const createdAt = document.createElement('p');
    createdAt.textContent = "Erstellt am: ";
    const createdAtDate = document.createElement('span');
    createdAtDate.textContent = item.createdAt;
    createdAt.appendChild(createdAtDate);
    detailsDiv.appendChild(createdAt);

    const updatedAt = document.createElement('p');
    updatedAt.textContent = "Zuletzt aktualisiert am: ";
    const updatedAtDate = document.createElement('span');
    updatedAtDate.textContent = item.updatedAt;
    updatedAt.appendChild(updatedAtDate);
    detailsDiv.appendChild(updatedAt);

    const backButton = document.createElement('button');
    backButton.textContent = 'Zurück';
    backButton.addEventListener('click', () => {
        getData(); // Daten neu laden
    });
    detailsDiv.appendChild(backButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.addEventListener('click', async () => {
        deleteObject(item.id);
    });
    detailsDiv.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Bearbeiten';
    editButton.addEventListener('click', () => {
        loadForm('edit', item.id, item);
    });
    detailsDiv.appendChild(editButton);
}

function createObject() {
    const form = document.querySelector('.form');
    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector('textarea[name="description"]').value;
    const complete = form.querySelector('input[name="complete"]').checked;
    const responsible = form.querySelector('input[name="responsible"]').value;
    const dueDate = form.querySelector('input[name="dueDate"]').value;

    const newObject = {
        title: title,
        description: description,
        dueDate: dueDate, // Bearbeitetes Datum verwenden
        complete: complete,
        responsible: responsible,
        createdBy: "Leonie"
    };
    postData(newObject);
}

async function postData(data) {
    const result = await fetch(ip, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        const response = await result.json();
        getData();
    } else {
        loadingError(result.status, result.statusText);
    }
}

function loadForm(direction, id, item = null) {
    const container = document.querySelector('.items');
    container.innerHTML = '';
    const formDiv = document.createElement('div');
    formDiv.classList.add('form');
    container.appendChild(formDiv);

    const form = document.createElement('form');
    formDiv.appendChild(form);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.required = true; // Pflichtfeld
    if (direction === 'edit' && item) {
        titleInput.value = item.title; // Vorhandenen Wert setzen
    }
    form.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.name = 'description';
    if (direction === 'edit' && item) {
        descriptionInput.value = item.description; // Vorhandenen Wert setzen
    }
    form.appendChild(descriptionInput);

    const completeLabel = document.createElement('label');
    completeLabel.textContent = 'Complete:';
    form.appendChild(completeLabel);

    const completeInput = document.createElement('input');
    completeInput.type = 'checkbox';
    completeInput.name = 'complete';
    if (direction === 'edit' && item) {
        completeInput.checked = item.complete; // Vorhandenen Wert setzen
    }
    form.appendChild(completeInput);

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Due Date:';
    form.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.name = 'dueDate';
    dueDateInput.required = true; // Pflichtfeld
    if (direction === 'edit' && item) {
        dueDateInput.value = item.dueDate; // Vorhandenen Wert setzen
    }
    dueDateInput.addEventListener('change', (event) => {
        const selectedDate = event.target.value;
        const currentDate = new Date();
        const inputDate = new Date(selectedDate);

        // Setze die Zeit von currentDate auf 00:00:00
        currentDate.setHours(0, 0, 0, 0);

        if (inputDate < currentDate) {
            dueDateInput.setCustomValidity("Das Datum darf nicht in der Vergangenheit liegen.");
            dueDateInput.reportValidity(); // Zeigt die Fehlermeldung an
        } else {
            dueDateInput.setCustomValidity(""); // Setzt die Fehlermeldung zurück
            dueDateInput.reportValidity(); // Entfernt die Fehlermeldung
        }
    });
    form.appendChild(dueDateInput);

    const responsibleLabel = document.createElement('label');
    responsibleLabel.textContent = 'Responsible:';
    form.appendChild(responsibleLabel);

    const responsibleInput = document.createElement('input');
    responsibleInput.type = 'text';
    responsibleInput.name = 'responsible';
    if (direction === 'edit' && item) {
        responsibleInput.value = item.responsible; // Vorhandenen Wert setzen
    }
    form.appendChild(responsibleInput);

    if (direction === 'edit') {
        createEditButton(form, id);
    } else {
        createCreateButton(form);
    }

    const backButtonForm = document.createElement('button');
    backButtonForm.textContent = 'Zurück';
    //backButtonForm.classList.add('backButton');
    backButtonForm.type = 'button'; // Verhindert, dass der Button das Formular absendet
    backButtonForm.addEventListener('click', (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten
        getData(); // Lädt die Daten neu
    });
    form.appendChild(backButtonForm);
}

function createEditButton(form, id) {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Senden';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        editObject(id);
    });
}

function createCreateButton(form) {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Senden';
    submitButton.type = 'submit';
    form.appendChild(submitButton);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createObject();
    });
}

async function deleteObject(id) {
    const result = await fetch(`${ip}${id}`, {
        method: 'DELETE'
    });
    if (result.ok) {
        const response = await result.json();
        getData();
    } else {
        loadingError(result.status, result.statusText);
    }
}

async function editObject(id) {
    const form = document.querySelector('.form');
    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector('textarea[name="description"]').value;
    const complete = form.querySelector('input[name="complete"]').checked;
    const dueDate = form.querySelector('input[name="dueDate"]').value;
    const responsible = form.querySelector('input[name="responsible"]').value;
    const updatedObject = {
        title: title,
        description: description,
        dueDate: dueDate,
        complete: complete,
        responsible: responsible,
        createdBy: "Leonie"
    };

    putData(id, updatedObject);
}
async function putData(id, data) {
    const result = await fetch(`${ip}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (result.ok) {
        getData();
    } else {
        loadingError(result.status, result.statusText);
    }
}

function loadingError(status, statusText) {
    const body = document.querySelector('body');
    const shadowDiv = document.createElement('div');
    shadowDiv.classList.add('shadow');
    body.appendChild(shadowDiv);
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    shadowDiv.appendChild(errorDiv);

    const errorMessage = document.createElement('p');
    errorMessage.textContent = "Error: Verbindung verloren. Neue Verbindung wird hergestellt.";
    errorDiv.appendChild(errorMessage);
    const errorStatus = document.createElement('p');
    errorStatus.textContent = "Status: ";
    errorDiv.appendChild(errorStatus);
    const statusSpan = document.createElement('span');
    statusSpan.textContent = status;
    errorStatus.appendChild(statusSpan);
    const statusTextSpan = document.createElement('span');
    statusTextSpan.textContent = statusText;
    errorStatus.appendChild(statusTextSpan);
    setTimeout(() => {
        shadowDiv.remove();
        getData(); // Versuche erneut, die Daten zu laden
    }, 3000); // Warte 3 Sekunden, bevor du es erneut versuchst
}
