

async function loadCities() {
    try {
        const response = await fetch('/api/city');
        const cities = await response.json();
        const list = document.getElementById('city-list');
        cities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city.text;
            list.appendChild(li);
        });
    } catch (err) {
        document.body.innerHTML += '<p>Error loading cities.</p>';
    }
}
loadCities();