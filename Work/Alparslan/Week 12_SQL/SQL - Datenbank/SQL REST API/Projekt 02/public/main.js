async function loadAPI_Data(){
    let result = await fetch('/API/mitarbeiter');
    if (result.ok){
        let data = await result.json();
        console.log(data);

        let result2 = await fetch('/API/possiblejobs');
        if (result2.ok){
            let listOfPossibleJobs = await result2.json()
            console.log('possiblejobs', listOfPossibleJobs)
            renderMitarbeiterList(data, listOfPossibleJobs);
        } else {
            console.error('Cannot load /API/possiblejobs');
        }        
    } else {
        console.error('Cannot load /API/mitarbeiter');
    }
}

function renderMitarbeiterList(data, listOfPossibleJobs){
    document.getElementById('mitarbeiterContainer').innerHTML = '';
    data.forEach(personData => {
        renderMitarbeiter(personData);
    });
    renderNewMitarbeiter(listOfPossibleJobs);
}

function renderMitarbeiter(personData){
    let containerE = document.getElementById('mitarbeiterContainer');
    let personDivE = document.createElement('div');
    personDivE.classList.add('person');

    let dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    let h3E = document.createElement('h3');
    h3E.textContent = `${personData.person_vorname} ${personData.person_nachname}`;
    dataDivE.appendChild(h3E);

    let divBerufE = document.createElement('div');
    divBerufE.textContent = personData.beruf_name || 'Beruf n.n';
    dataDivE.appendChild(divBerufE);

    if (personData.beruf_beschreibung) {
    let divBeschreibungE = document.createElement('div');
    divBeschreibungE.textContent = personData.beruf_beschreibung;
    divBeschreibungE.classList.add('beruf-beschreibung')
    dataDivE.appendChild(divBeschreibungE);
    }

    personDivE.appendChild(dataDivE);

    let formE = document.createElement('form');
    formE.classList.add('personDELETE');
    formE.action = '#';

    let buttonE = document.createElement('button');
    buttonE.textContent = '🗑️';
    buttonE.addEventListener('click', event => deleteMitarbeiter(event, personData.person_id));
    formE.appendChild(buttonE);

    personDivE.appendChild(formE);
    containerE.appendChild(personDivE);
}

function renderNewMitarbeiter(listOfPossibleJobs){
    let containerE = document.getElementById('mitarbeiterContainer');
    let personDivE = document.createElement('div');
    personDivE.classList.add('person');

    let dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    let h3E = document.createElement('h3');
    h3E.textContent = 'Add new Mitarbeiter';
    dataDivE.appendChild(h3E);

    let formE = document.createElement('form');
    formE.classList.add('personCREATE');
    formE.action = '#';

    let inputVorname = document.createElement('input');
    inputVorname.type = 'text';
    inputVorname.id = 'newVorname';
    inputVorname.placeholder = 'Vorname';
    formE.appendChild(inputVorname);

    let inputNachname = document.createElement('input');
    inputNachname.type = 'text';
    inputNachname.id = 'newNachname';
    inputNachname.placeholder = 'Nachname';
    formE.appendChild(inputNachname);

    let inputBeschreibung = document.createElement('textarea');
    inputBeschreibung.id = 'newBerufBeschreibung';
    inputBeschreibung.placeholder = 'Berufsbeschreibung (optional)';
    inputBeschreibung.rows = 3;
    formE.appendChild(inputBeschreibung);

    inputBeschreibung.addEventListener('focus', (e) => e.target.blur());

    addRadioButtons(formE, listOfPossibleJobs);

    let spanE = document.createElement('span');
    let buttonE = document.createElement('button');
    buttonE.id = 'addNewMitarbeiterButton';
    buttonE.textContent = '⊕';
    buttonE.addEventListener('click', event => createNewMitarbeiter(event));
    spanE.appendChild(buttonE);
    formE.appendChild(spanE);

    dataDivE.appendChild(formE);
    personDivE.appendChild(dataDivE);
    containerE.appendChild(personDivE);
}

function addRadioButtons(parentE, berufList){
    let divE = document.createElement('div')

    berufList.forEach((beruf, index) => {
        let inputE = document.createElement('input')
        inputE.type = 'radio'
        inputE.id = 'beruf-' + index
        inputE.name = 'beruf'
        inputE.value = beruf.beruf_id
        if (index == 0){
            inputE.checked = true
        }
        divE.appendChild(inputE)

        let labelE = document.createElement('label')
        labelE.for = 'beruf-' + index
        labelE.innerText = beruf.beruf_name
        divE.appendChild(labelE)

        divE.appendChild(document.createElement('br'))
    })
    
    parentE.appendChild(divE)
}

async function deleteMitarbeiter(e, personId){
    e.preventDefault();
    if (!confirm('Möchten Sie diesen Mitarbeiter wirklich löschen?')) {
        return;
    }
    let result = await fetch('/API/mitarbeiter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person_id: personId })
    });
    if (result.ok){
        loadAPI_Data();
    }
}

async function createNewMitarbeiter(e){
    e.preventDefault();
    const vorname = document.getElementById('newVorname').value;
    const nachname = document.getElementById('newNachname').value;
    const beruf_id = document.querySelector('input[name="beruf"]:checked').value;

    let result = await fetch('/API/mitarbeiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname, nachname, beruf_id })
    });
    if (result.ok){
        loadAPI_Data();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML fully loaded and parsed');
    loadAPI_Data();
});