const cityList = document.getElementById('city-list');
const cityForm = document.getElementById('city-form');
const formMessage = document.getElementById('form-message');

async function fetchCities() {
  try {
    const res = await fetch('/api/city');
    if (!res.ok) throw new Error(`Fehler beim Laden der Städte: ${res.statusText}`);
    const cities = await res.json();

    cityList.innerHTML = cities.length
      ? cities.map(city => `<li>${city.name} – ${city.population.toLocaleString()} Einwohner</li>`).join('')
      : '<li>Keine Städte vorhanden</li>';
  } catch (error) {
    cityList.innerHTML = `<li class="error">${error.message}</li>`;
  }
}

cityForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formMessage.textContent = '';
  
  const formData = new FormData(cityForm);
  const name = formData.get('name')?.toString().trim();
  const populationStr = formData.get('population')?.toString().trim();
  const population = populationStr ? Number(populationStr) : null;

  if (!name) {
    formMessage.textContent = 'Bitte gib einen Stadtnamen ein.';
    return;
  }

  if (!population || population < 1) {
    formMessage.textContent = 'Bitte gib eine gültige Bevölkerungszahl ein.';
    return;
  }

  try {
    const res = await fetch('/api/city', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, population }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Fehler beim Hinzufügen der Stadt');
    }

    cityForm.reset();
    formMessage.textContent = 'Stadt erfolgreich hinzugefügt!';
    await fetchCities();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

// Load cities on page load
fetchCities();