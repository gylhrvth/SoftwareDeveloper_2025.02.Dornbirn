async function loadCities() {
  try {
    const res = await fetch('/api/city');
    const cities = await res.json();
    const list = document.getElementById('city-list');
    if (list) {
      list.innerHTML = '';
      cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = `${city.name} (ID: ${city.id})`;

        // Mülleimer-Button
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.title = 'Stadt löschen';
        delBtn.className = 'delete-btn';
        delBtn.onclick = async () => {
          await fetch(`/api/city/${city.id}`, { method: 'DELETE' });
          loadCities();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Fehler beim Laden der Städte:', err);
  }
}

async function loadCountries() {
  try {
    const res = await fetch('/api/country');
    const countries = await res.json();
    const list = document.getElementById('country-list');
    if (list) {
      list.innerHTML = '';
      countries.forEach(country => {
        const li = document.createElement('li');
        li.textContent = `${country.name} (ID: ${country.id})`;

        // Mülleimer-Button
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑️';
        delBtn.title = 'Land löschen';
        delBtn.className = 'delete-btn';
        delBtn.onclick = async () => {
          await fetch(`/api/country/${country.id}`, { method: 'DELETE' });
          loadCountries();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error('Fehler beim Laden der Länder:', err);
  }
}

loadCities();
loadCountries();

// Stadt hinzufügen
document.getElementById('city-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('city-name').value.trim();
  const errorSpan = document.getElementById('city-error');
  errorSpan.textContent = '';
  const cities = await fetch('/api/city').then(res => res.json());
  const exists = cities.some(city => city.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    errorSpan.textContent = 'Diese Stadt existiert bereits!';
    return;
  }
  if (name) {
    await fetch('/api/city', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    document.getElementById('city-name').value = '';
    loadCities();
  }
});

// Land hinzufügen
document.getElementById('country-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('country-name').value.trim();
  const errorSpan = document.getElementById('country-error');
  errorSpan.textContent = '';
  const countries = await fetch('/api/country').then(res => res.json());
  const exists = countries.some(country => country.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    errorSpan.textContent = 'Dieses Land existiert bereits!';
    return;
  }
  if (name) {
    await fetch('/api/country', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    document.getElementById('country-name').value = '';
    loadCountries();
  }
});

