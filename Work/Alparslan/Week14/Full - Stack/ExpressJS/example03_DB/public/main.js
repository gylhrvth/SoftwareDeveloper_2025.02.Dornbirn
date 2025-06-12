

async function loadCities() {
    try {
        const response = await fetch('/api/Cities');
        const cities = await response.json();
        const list = document.getElementById('city-list');
        cities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city.cities_name;
            list.appendChild(li);
        });
    } catch (err) {
        document.body.innerHTML += '<p>Error loading cities.</p>';
    }
}
loadCities();