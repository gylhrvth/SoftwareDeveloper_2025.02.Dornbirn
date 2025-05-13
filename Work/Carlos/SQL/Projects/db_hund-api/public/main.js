async function loadAPI_Data() {
    let result = await fetch('/API/hund');
    if (result.ok) {
        let data = await result.json();
        console.log(data);
        renderHundList(data);
    } else {
        console.error('Cannot load /API/hund');
    }
}

function renderHundList(data) {
    document.getElementById('hundContainer').innerHTML = '';
    data.forEach(hundData => {
        renderHund(hundData);
    });
    renderNewHund();
}

function renderHund(hundData) {
    let containerE = document.getElementById('hundContainer');
    let hundDivE = document.createElement('div');
    hundDivE.classList.add('hund');

    let dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    let h3E = document.createElement('h3');
    h3E.textContent = hundData.Hund_Name; // Updated to use Hund_Name
    dataDivE.appendChild(h3E);

    let divHund_RasseE = document.createElement('div');
    divHund_RasseE.textContent = hundData.Hund_Rasse == null ? 'n.n' : hundData.Hund_Rasse.toLocaleString('de-AT'); // Updated to use Hund_Rasse
    dataDivE.appendChild(divHund_RasseE);
    hundDivE.append(dataDivE);

    let divHund_GeschlechtE = document.createElement('div');
    divHund_GeschlechtE.textContent = hundData.Hund_Geschlecht == null ? 'n.n' : hundData.Hund_Geschlecht.toLocaleString('de-AT'); // Updated to use Hund_Geschlecht
    dataDivE.appendChild(divHund_GeschlechtE);
    hundDivE.append(dataDivE);

    let divHund_EinlieferungE = document.createElement('div');
    divHund_EinlieferungE.textContent = hundData.Hund_Einlieferung == null ? 'n.n' : hundData.Hund_Einlieferung.toLocaleString('de-AT'); // Updated to use Hund_Einlieferung
    dataDivE.appendChild(divHund_EinlieferungE);
    hundDivE.append(dataDivE);

    let formE = document.createElement('form');
    formE.classList.add('hundDELETE');
    formE.attributes.action = '#';

    let buttonE = document.createElement('button');
    buttonE.textContent = '🗑️';
    buttonE.addEventListener('click', event => deleteHund(event, hundData.Hund_Name)); // Updated to use Hund_Name
    formE.appendChild(buttonE);

    hundDivE.appendChild(formE);
    containerE.appendChild(hundDivE);
}

function renderNewHund() {
    let containerE = document.getElementById('hundContainer');
    let hundDivE = document.createElement('div');
    hundDivE.classList.add('hund');

    let dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    let h3E = document.createElement('h3');
    h3E.textContent = 'Add new Hund';
    dataDivE.appendChild(h3E);

    let formE = document.createElement('form');
    formE.classList.add('hundCREATE');
    formE.attributes.action = '#';

    // Input for Hund_Name
    let inputNameE = document.createElement('input');
    inputNameE.attributes.type = 'text';
    inputNameE.id = 'newHundName';
    inputNameE.placeholder = 'Hund Name';
    inputNameE.attributes.value = '';
    inputNameE.required = true; // Mark as required
    inputNameE.addEventListener('keyup', event => checkNewHundName(event));
    formE.appendChild(inputNameE);

    // Input for Hund_Rasse
    let inputRasseE = document.createElement('input');
    inputRasseE.type = 'text';
    inputRasseE.id = 'newHundRasse';
    inputRasseE.placeholder = 'Hund Rasse (optional)';
    formE.appendChild(inputRasseE);

    //Code below replaced with renderSexRadioButtons

    /* Input for Hund_Geschlecht 
    let inputGeschlechtE = document.createElement('input');
    inputGeschlechtE.type = 'ratio';
    inputGeschlechtE.id = 'newHundGeschlecht';
    inputGeschlechtE.placeholder = 'Hund Geschlecht';
    inputGeschlechtE.required = true; // Mark as required
    formE.appendChild(inputGeschlechtE);*/

    // Input for Hund_Einlieferung
    let inputEinlieferungE = document.createElement('input');
    inputEinlieferungE.type = 'text';
    inputEinlieferungE.id = 'newHundEinlieferung';
    inputEinlieferungE.placeholder = 'Hund Einlieferung';
    inputEinlieferungE.required = true; // Mark as required
    formE.appendChild(inputEinlieferungE);


    renderSexRadioButtons(formE, 'sex', ['M', 'F', '?']) 

    // Submit Button
    let buttonE = document.createElement('button');
    buttonE.type = 'submit';
    buttonE.textContent = 'Add Hund';
    buttonE.id = 'addNewHundButton';
    buttonE.disabled = true; // Initially disabled
    buttonE.addEventListener('click', event => createNewHund(event));
    formE.appendChild(buttonE);

    dataDivE.appendChild(formE);
    hundDivE.appendChild(dataDivE);
    containerE.appendChild(hundDivE);

    /*let spanE = document.createElement('span');
    let buttonE = document.createElement('button');
    buttonE.id = 'addNewHundButton';
    buttonE.disabled = true;
    buttonE.textContent = '⊕';
    buttonE.addEventListener('click', event => createNewHund(event));
    spanE.appendChild(buttonE);
    formE.appendChild(spanE);

    dataDivE.appendChild(formE);
    hundDivE.appendChild(dataDivE);
    containerE.appendChild(hundDivE);*/
}

function checkNewHundName(e) {
    document.getElementById('addNewHundButton').disabled = (e.target.value.length < 1);
}


async function deleteHund(e, hundName) {
    e.preventDefault(); // prevent FORM submit
    let result = await fetch('/API/hund', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Hund_Name: hundName }) // Updated to use Hund_Name
    });
    if (result.ok) {
        loadAPI_Data();
    }
}


async function createNewHund(e) {
    e.preventDefault(); // prevent FORM submit

    const hundName = document.getElementById('newHundName').value;
    const hundRasse = document.getElementById('newHundRasse')?.value || null; // Retrieve or set to null
    const hundEinlieferung = document.getElementById('newHundEinlieferung')?.value || null;// Default value for Hund_Einlieferung

    const selectedRadio = document.querySelector(`input[name="sex"]:checked`);
    const hundGeschlecht = selectedRadio ? selectedRadio.value : null;
    console.log('Selected SEX', hundGeschlecht)


    if (!hundName) {
        alert('Hund Name is required!');
        return;

    } else if (!hundGeschlecht) {
        alert('Hund Geschlecht is required!');
        return;
    } else if (!hundEinlieferung) {
        alert('Hund Einlieferung is required!');
        return;
    }

    let result = await fetch('/API/hund', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            Hund_Name: hundName, 
            Hund_Rasse: hundRasse, 
            Hund_Geschlecht: hundGeschlecht, 
            Hund_Einlieferung: hundEinlieferung
        }) // Updated to use Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung
    });

    if (result.ok) {
        loadAPI_Data();
    } else {
        console.error('Failed to create new Hund');
    }
}

function renderSexRadioButtons(containerE, name, values) {
    // Create a wrapper div for the radio buttons
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('radio-group-wrapper'); // Add a class for styling if needed

    // Add a label for the group (optional)
    let groupLabel = document.createElement('label');
    groupLabel.textContent = 'Geschlecht:';
    wrapperDiv.appendChild(groupLabel);

    // Generate the radio buttons
    values.forEach((value, index) => {
        // Create the radio input
        let inputE = document.createElement('input');
        inputE.type = 'radio';
        inputE.id = `${name}${index + 1}`; // Generate id using name and index
        inputE.name = name; // Use the provided name attribute
        inputE.value = value;
        wrapperDiv.appendChild(inputE);

        // Create the label for the radio input
        let labelE = document.createElement('label');
        labelE.htmlFor = `${name}${index + 1}`;
        
        labelE.textContent = value === '?' ? 'unbestimmt' : value; // Handle special case for '?'
        wrapperDiv.appendChild(labelE);
    });

    // Append the wrapper div to the container
    containerE.appendChild(wrapperDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML fully loaded and parsed');
    loadAPI_Data();
});

