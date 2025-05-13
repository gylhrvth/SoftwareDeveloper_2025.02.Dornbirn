async function loadAPI_Data() {
  try {
    const result = await fetch('/API/person');
    if (!result.ok) throw new Error('Fehler beim Laden von /API/person');
    const data = await result.json();
    console.log(data);
    renderPersonList(data);
  } catch (error) {
    console.error(error);
  }
}

function renderPersonList(data) {
  const container = document.getElementById('personContainer');
  container.innerHTML = '';
  data.forEach(p => renderPerson(p));
  renderNewPersonForm();
}

function renderPerson(p) {
  const container = document.getElementById('personContainer');
  const div = document.createElement('div');
  div.classList.add('person');

  const dataDiv = document.createElement('div');
  dataDiv.classList.add('data');

  const h3 = document.createElement('h3');
  h3.textContent = `${p.Person_Vorname} ${p.Person_Nachname}`;
  dataDiv.appendChild(h3);

  const berufDiv = document.createElement('div');
  berufDiv.textContent = p.Beruf_Name || 'Beruf unbekannt';
  dataDiv.appendChild(berufDiv);

    if (p.Beruf_Beschreibung) {
  const beschreibungDiv = document.createElement('div')
  beschreibungDiv.textContent = p.Beruf_Beschreibung
  beschreibungDiv.classList.add('beschreibung')
  dataDiv.appendChild(beschreibungDiv)
  }

  div.appendChild(dataDiv);

  const form = document.createElement('form');
  form.classList.add('personDELETE');

  const button = document.createElement('button');
  button.textContent = '🗑️';
  button.addEventListener('click', e => deletePerson(e, p.Person_ID));
  form.appendChild(button);

  div.appendChild(form);
  container.appendChild(div);
}

function renderNewPersonForm() {
  const container = document.getElementById('personContainer');
  const div = document.createElement('div');
  div.classList.add('person', 'new-entry'); // WICHTIG: zweite Klasse für sticky Styling

  const dataDiv = document.createElement('div');
  dataDiv.classList.add('data');

  const h3 = document.createElement('h3');
  h3.textContent = 'Neuer Mitarbeiter';
  dataDiv.appendChild(h3);

  const form = document.createElement('form');
  form.classList.add('personCREATE');

  const inputVorname = document.createElement('input');
  inputVorname.type = 'text';
  inputVorname.placeholder = 'Vorname';
  inputVorname.name = 'vorname';
  inputVorname.required = true;

  const inputNachname = document.createElement('input');
  inputNachname.type = 'text';
  inputNachname.placeholder = 'Nachname';
  inputNachname.name = 'nachname';
  inputNachname.required = true;

  const selectBeruf = document.createElement('select');
  selectBeruf.name = 'beruf_id';
  selectBeruf.id = 'berufDropdown';

  const button = document.createElement('button');
  button.textContent = '➕';
  button.type = 'submit';

  form.appendChild(inputVorname);
  form.appendChild(inputNachname);
  form.appendChild(selectBeruf);
  form.appendChild(button);

  form.addEventListener('submit', createNewPerson);

  dataDiv.appendChild(form);
  div.appendChild(dataDiv);
  container.appendChild(div);

  loadBerufeIntoDropdown();
}


async function loadBerufeIntoDropdown() {
  try {
    const result = await fetch('/API/beruf');
    if (!result.ok) throw new Error('Fehler beim Laden der Berufe');
    const berufe = await result.json();

    const select = document.getElementById('berufDropdown');
    berufe.forEach(b => {
      const option = document.createElement('option');
      option.value = b.Beruf_ID;
      option.textContent = b.Beruf_Name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}

async function deletePerson(e, personID) {
  e.preventDefault();
  try {
    const result = await fetch('/API/person', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: personID })
    });
    if (!result.ok) throw new Error('Fehler beim Löschen');
    loadAPI_Data();
  } catch (error) {
    console.error(error);
  }
}

async function createNewPerson(e) {
  e.preventDefault();
  const form = e.target;
  const vorname = form.vorname.value;
  const nachname = form.nachname.value;
  const beruf_id = form.beruf_id.value;

  try {
    const result = await fetch('/API/person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vorname, nachname, beruf_id })
    });
    if (!result.ok) throw new Error('Fehler beim Erstellen');
    loadAPI_Data();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('HTML geladen');
  loadAPI_Data();
});
