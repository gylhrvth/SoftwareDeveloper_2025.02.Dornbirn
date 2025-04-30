async function fetchEarthquakesList() {
    const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-04-22&endtime=2025-04-23';

    try {
        const response = await fetch(url);
        const data = await response.json();
        showEarthquakes(data.features);
    } catch (error) {
        console.error("Fehler beim Laden der Erdbeben-Daten (Liste):", error);
    }
}

function showEarthquakes(quakes) {
    const list = document.getElementById('quake-list');
    list.innerHTML = '';

    if (quakes.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Keine Erdbeben im angegebenen Zeitraum.";
        list.appendChild(li);
        return;
    }

    quakes.forEach(quake => {
        const li = document.createElement('li');
        const props = quake.properties;
        li.textContent = `Ort: ${props.place} | Stärke: ${props.mag} | Zeit: ${new Date(props.time).toLocaleString()}`;
        list.appendChild(li);
    });
}

// Karte initialisieren
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap-Mitwirkende'
}).addTo(map);

async function fetchEarthquakesMap() {
    const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-04-22&endtime=2025-04-23';

    try {
        const response = await fetch(url);
        const data = await response.json();
        showQuakeMarkers(data.features);
    } catch (error) {
        console.error("Fehler beim Abrufen der Erdbeben (Karte):", error);
    }
}

function showQuakeMarkers(quakes) {
    quakes.forEach(quake => {
        const coords = quake.geometry.coordinates;
        const props = quake.properties;
        const magnitude = props.mag ?? "?";
        const marker = L.marker([coords[1], coords[0]]).addTo(map);

        marker.bindPopup(`
            <strong>${props.place}</strong><br>
            Magnitude: ${magnitude}<br>
            Zeit: ${new Date(props.time).toLocaleString()}
        `);
    });
}

// Karte automatisch laden
fetchEarthquakesMap();
//--------------------------------
// Marker-Icon manuell setzen
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Jetzt Marker mit diesem Icon setzen
L.marker([coords[1], coords[0]], { icon: defaultIcon }).addTo(map)
  .bindPopup(`
    <strong>${props.place}</strong><br>
    Magnitude: ${magnitude}<br>
    Zeit: ${new Date(props.time).toLocaleString()}
  `);