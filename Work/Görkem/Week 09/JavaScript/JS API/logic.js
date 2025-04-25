
const objectList = document.getElementById('objectList');
const list = document.createElement('ul');
const detailsDiv = document.createElement('div');
let objectsArray = [];

function getNextId() {
    if (objectsArray.length === 0) {
        return 1; // Falls das Array leer ist, starte mit ID 1
    }
    const maxId = Math.max(...objectsArray.map(obj => obj.id));
    return maxId + 1; // Nächste ID ist die höchste ID + 1
}

// Bereich für die Details erstellen
detailsDiv.id = 'details';
detailsDiv.style.display = 'none';
document.body.appendChild(detailsDiv);

// Daten von der API abrufen
fetch('https://api.restful-api.dev/objects')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        objectsArray = data;
        displayObjects(objectsArray);
    })
    .catch(error => console.error('Fehler beim Laden der Objekte:', error));

// Funktion: Liste der Objekte anzeigen
function displayObjects(objects) {
    if (objects.length === 0) {
        objectList.innerHTML = '<p>Keine Objekte gefunden.</p>';
        return;
    }

    // Liste vollständig leeren
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    objects.forEach(obj => {
        const listItem = createListItem(obj, objects);
        list.appendChild(listItem);
    });

    objectList.innerHTML = '';
    objectList.appendChild(list);
    objectList.style.display = 'block';
    detailsDiv.style.display = 'none';
}

// Funktion: Listenelement erstellen
function createListItem(obj, objects) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${obj.name}</strong>`;
    listItem.style.cursor = 'pointer';

    listItem.addEventListener('click', () => {
        displayDetails(obj, objects);
    });

    return listItem;
}

// Funktion: Details anzeigen
function displayDetails(obj) {
    // Dynamische Prüfung der Eigenschaften
    const id = obj?.id ?? 'Nicht verfügbar';
    const name = obj?.name ?? 'Nicht verfügbar';
    const price = obj.data?.price ? `${obj.data.price} €` : 'Nicht verfügbar';
    const color = obj.data?.color ?? 'Nicht verfügbar';
    const gb = obj.data?.gb ? `${obj.data.gb} GB` : 'Nicht verfügbar';
    const year = obj.data?.year ?? 'Nicht verfügbar';

    // Details-Bereich aktualisieren
    detailsDiv.innerHTML = `
        <h2>Details</h2>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Artikel:</strong> ${name}</p>
        <p><strong>Preis:</strong> ${price}</p>
        <p><strong>Farbe:</strong> ${color}</p>
        <p><strong>Speicher:</strong> ${gb}</p>
        <p><strong>Baujahr:</strong> ${year}</p>
        <button id="backButton">Zurück zur Liste</button>
    `;
    detailsDiv.style.display = 'block';
    objectList.style.display = 'none';

    openFormButton.style.display = 'none';

    // Event-Listener für den "Zurück zur Liste"-Button
    const backButton = document.getElementById('backButton');
    backButton.onclick = () => {
        detailsDiv.style.display = 'none';
        objectList.style.display = 'block';

        openFormButton.style.display = 'inline-block';
    };
}

const openFormButton = document.getElementById('openFormButton');
const closeModalButton = document.getElementById('closeModalButton');
const createFormModal = document.getElementById('createFormModal');

// Öffne das Modal
openFormButton.addEventListener('click', () => {
    createFormModal.style.display = 'flex';
});

// Schließe das Modal
closeModalButton.addEventListener('click', () => {
    createFormModal.style.display = 'none';
});

// Schließe das Modal, wenn der Benutzer außerhalb des Inhalts klickt
window.addEventListener('click', (event) => {
    if (event.target === createFormModal) {
        createFormModal.style.display = 'none';
    }
});

// Funktion: Neues Objekt hinzufügen
const createForm = document.getElementById('createForm');
createForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // Werte aus den Eingabefeldern abrufen
    const name = createForm.elements[0].value;
    const price = createForm.elements[1].value;
    const color = createForm.elements[2].value;
    const gb = createForm.elements[3].value;
    const year = createForm.elements[4].value;

    // Neues Objekt erstellen
    const newObject = {
        id: getNextId(), // Einzigartige ID basierend auf der aktuellen Zeit
        name: name,
        data: {
            price: parseFloat(price),
            color: color,
            gb: parseInt(gb), 
            year: parseInt(year),
        },
    };

    objectsArray.push(newObject);
    // Neues Listenelement erstellen und zur Liste hinzufügen
    addObjectToList(newObject);

    // Modal schließen und Formular zurücksetzen
    createFormModal.style.display = 'none';
    createForm.reset();
});

// Funktion: Neues Listenelement erstellen und hinzufügen
function addObjectToList(obj) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${obj.name}</strong>`;
    listItem.style.cursor = 'pointer';
    listItem.dataset.id = obj.id; // ID als `data-id`-Attribut speichern

    listItem.addEventListener('click', () => {
        displayDetails(obj);
    });

    list.appendChild(listItem); // Neues Element hinzufügen
    sortListById();
}

function sortListById() {
    const items = Array.from(list.children); // Alle `<li>`-Elemente in ein Array umwandeln
    items.sort((a, b) => {
        const idA = parseInt(a.dataset.id, 10); // ID aus `data-id`-Attribut
        const idB = parseInt(b.dataset.id, 10);
        return idA - idB; // Aufsteigend sortieren
    });

    // Liste neu anordnen
    items.forEach(item => list.appendChild(item));
}