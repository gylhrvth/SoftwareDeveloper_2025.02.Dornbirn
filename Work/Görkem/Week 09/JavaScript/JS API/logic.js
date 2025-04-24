
const objectList = document.getElementById('objectList');
const list = document.createElement('ul');
const detailsDiv = document.createElement('div');

// Bereich für die Details erstellen
detailsDiv.id = 'details';
detailsDiv.style.display = 'none';
document.body.appendChild(detailsDiv);

// Daten von der API abrufen
fetch('https://api.restful-api.dev/objects')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayObjects(data);
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
function displayDetails(obj, objects) {
    const id = obj?.id ? obj.id : 'Nicht verfügbar';
    const name = obj?.name ? obj.name : 'Nicht verfügbar';
    const price = obj.data?.price ? `${obj.data.price} €` : 'Nicht verfügbar';
    const color = obj.data?.color ? obj.data.color : 'Nicht verfügbar';
    const gb = obj.data?.gb ? `${obj.data.gb} GB` : 'Nicht verfügbar';
    const year = obj.data?.year ? obj.data.year : 'Nicht verfügbar';


    // Details-Bereich aktualisieren
    detailsDiv.innerHTML = `
        <h2>Details</h2>
        <p><strong>ID:</strong> ${obj.id}</p>
        <p><strong>Artikel:</strong> ${obj.name}</p>
        <p><strong>Preis:</strong> ${price}</p>
        <p><strong>Farbe:</strong> ${color}</p>
        <p><strong>Speicher:</strong> ${gb}</p>
        <p><strong>Baujahr:</strong> ${year}</p>
        <button id="backButton">Zurück zur Liste</button>
    `;
    detailsDiv.style.display = 'block';
    objectList.style.display = 'none';

    const backButton = document.getElementById('backButton');
    backButton.onclick = () => {
        detailsDiv.style.display = 'none';
        objectList.style.display = 'block';
    };
}