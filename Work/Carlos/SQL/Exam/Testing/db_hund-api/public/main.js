

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
    const containerE = document.getElementById('hundContainer');
    const hundDivE = document.createElement('div');
    hundDivE.classList.add('hund');

    const dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    // Add Hund details
    const h3E = document.createElement('h3');
    h3E.textContent = hundData.Hund_Name;
    dataDivE.appendChild(h3E);

    const divHund_RasseE = document.createElement('div');
    divHund_RasseE.textContent = hundData.Hund_Rasse || 'n.n';
    dataDivE.appendChild(divHund_RasseE);

    const divHund_GeschlechtE = document.createElement('div');
    divHund_GeschlechtE.textContent = hundData.Hund_Geschlecht || 'n.n';
    dataDivE.appendChild(divHund_GeschlechtE);

    const divHund_EinlieferungE = document.createElement('div');
    divHund_EinlieferungE.textContent = hundData.Hund_Einlieferung || 'n.n';
    dataDivE.appendChild(divHund_EinlieferungE);

    hundDivE.appendChild(dataDivE);

    // Create a container for the buttons
    const buttonContainerE = document.createElement('div');
    buttonContainerE.classList.add('button-container'); // Add a class for styling

    // Add Edit button
    const editButtonE = document.createElement('button');
    editButtonE.type = 'button';
    editButtonE.classList.add('edit-button');
    editButtonE.addEventListener('click', () => openEditModal(hundData)); // Open the modal with pre-filled data
    
    buttonContainerE.appendChild(editButtonE);

    const imgEditE = document.createElement('img');
    imgEditE.src = './assets/icons/edit.svg';
    imgEditE.alt = 'Edit';
    imgEditE.classList.add('edit-icon');
    editButtonE.appendChild(imgEditE); // Append the delete icon to the correct button

    // Add Delete button
    const deleteButtonE = document.createElement('button');
    deleteButtonE.type = 'button';
    deleteButtonE.classList.add('delete-button');
    deleteButtonE.addEventListener('click', event => deleteHund(event, hundData.Hund_Name));

    const imgDelE = document.createElement('img');
    imgDelE.src = './assets/icons/delete.svg';
    imgDelE.alt = 'Delete';
    imgDelE.classList.add('delete-icon');
    deleteButtonE.appendChild(imgDelE); // Append the delete icon to the correct button
    
    buttonContainerE.appendChild(deleteButtonE); // Add the delete button to the container

    // Append the button container to the Hund div
    hundDivE.appendChild(buttonContainerE);

    containerE.appendChild(hundDivE);
}

function openEditModal(hundData) {
    console.log('Editing Hund:', hundData);
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';

    // Pre-fill the form with the Hund's data
    document.getElementById('editId').value = hundData.Hund_ID; // KEY for the PUT request
    document.getElementById('editName').value = hundData.Hund_Name;
    document.getElementById('editRasse').value = hundData.Hund_Rasse || '';
    document.querySelector(`input[name="editGeschlecht"][value="${hundData.Hund_Geschlecht}"]`).checked = true;
    document.querySelector(`input[name="editEinlieferungsart"][value="${hundData.Hund_Einlieferung}"]`).checked = true;

    // Handle form submission
    const editHundForm = document.getElementById('editHundForm');
    editHundForm.onsubmit = (e) => updateHund(e);
}

// Close the edit modal
document.getElementById('closeEditModalButton').addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

async function updateHund(e) {
    e.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const hundId = document.getElementById('editId').value; // Optional
    const hundName = document.getElementById('editName').value;
    const hundRasse = document.getElementById('editRasse').value || null; // Optional
    const geschlecht = document.querySelector('input[name="editGeschlecht"]:checked')?.value;
    const einlieferungsart = document.querySelector('input[name="editEinlieferungsart"]:checked')?.value;

    // Validate required fields
    if (!hundName || !geschlecht || !einlieferungsart) {
        alert('Please fill out all required fields.');
        return;
    }

    // Send data to the backend
    try {
        const response = await fetch('/API/hund', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Hund_ID: hundId, // Key for the PUT request
                Hund_Name: hundName,
                Hund_Rasse: hundRasse,
                Hund_Geschlecht: geschlecht,
                Hund_Einlieferung: einlieferungsart,
            }),
        });

        if (response.ok) {
            alert('Hund updated successfully!');
            document.getElementById('editModal').style.display = 'none'; // Close the modal
            loadAPI_Data(); // Reload the data
        } else {
            console.error('Failed to update Hund:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderNewHund() {
    let containerE = document.getElementById('hundContainer');
    let hundDivE = document.createElement('div');
    hundDivE.classList.add('hund');

    let dataDivE = document.createElement('div');
    dataDivE.classList.add('data');

    let h3E = document.createElement('h3');
    h3E.textContent = 'Neues Tier';
    dataDivE.appendChild(h3E);

        // Create the open modal button
    let openModalButton = document.createElement('button');
    openModalButton.id = 'openModalButton';
    openModalButton.textContent = '+';
    openModalButton.classList.add('open-modal-button'); // Optional: Add a class for styling
    openModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        modal.style.display = 'block'; // Show the modal when the button is clicked
    });
    dataDivE.appendChild(openModalButton);
    
    hundDivE.appendChild(dataDivE);
    containerE.appendChild(hundDivE);
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
    e.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const hundName = document.getElementById('name').value;
    const hundRasse = document.getElementById('rasse').value || null; // Optional
    const geschlecht = document.querySelector('input[name="geschlecht"]:checked')?.value;
    const einlieferungsart = document.querySelector('input[name="einlieferungsart"]:checked')?.value;

    // Validate required fields
    if (!hundName || !geschlecht || !einlieferungsart) {
        alert('Please fill out all required fields.');
        return;
    }

    // Send data to the backend
    try {
        const response = await fetch('/API/hund', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Hund_Name: hundName,
                Hund_Rasse: hundRasse,
                Hund_Geschlecht: geschlecht,
                Hund_Einlieferung: einlieferungsart,
            }),
        });

        if (response.ok) {
            alert('New Hund added successfully!');
            document.getElementById('modal').style.display = 'none'; // Close the modal
            loadAPI_Data(); // Reload the data
        } else {
            console.error('Failed to add Hund:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
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
        // Create a container for each radio button and label
        let radioContainer = document.createElement('div');
        radioContainer.classList.add('radio-option'); // Add a class for styling if needed

        // Create the radio input
        let inputE = document.createElement('input');
        inputE.type = 'radio';
        inputE.id = `${name}${index + 1}`; // Generate id using name and index
        inputE.name = name; // Use the provided name attribute
        inputE.value = value;
        radioContainer.appendChild(inputE);

        // Create the label for the radio input
        let labelE = document.createElement('label');
        labelE.htmlFor = `${name}${index + 1}`;

        // Map the value to the corresponding label text
        if (value === 'Männlich') {
            labelE.textContent = 'M';
        } else if (value === 'Weiblich') {
            labelE.textContent = 'F';
        } else if (value === 'Unbestimmt') {
            labelE.textContent = '?';
        } else {
            labelE.textContent = value; // Default case
        }

        radioContainer.appendChild(labelE);

        // Append the radio container to the wrapper
        wrapperDiv.appendChild(radioContainer);
    });

    // Append the wrapper div to the container
    containerE.appendChild(wrapperDiv);
}

function renderEinlieferungRadioButtons(containerE, name, values) {
    // Create a wrapper div for the radio buttons
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('radio-group-wrapper'); // Add a class for styling if needed

    // Add a label for the group (optional)
    let groupLabel = document.createElement('label');
    groupLabel.textContent = 'Einlieferungsart:';
    wrapperDiv.appendChild(groupLabel);

    // Generate the radio buttons
    values.forEach((value, index) => {
        // Create a container for each radio button and label
        let radioContainer = document.createElement('div');
        radioContainer.classList.add('radio-option'); // Add a class for styling if needed

        // Create the radio input
        let inputE = document.createElement('input');
        inputE.type = 'radio';
        inputE.id = `${name}${index + 1}`; // Generate id using name and index
        inputE.name = name; // Use the provided name attribute
        inputE.value = value;
        radioContainer.appendChild(inputE);

        // Create the label for the radio input
        let labelE = document.createElement('label');
        labelE.htmlFor = `${name}${index + 1}`;
        
            // Map the value to the corresponding label text
        if (value === 'Abgabe') {
            labelE.textContent = 'Abgabe';
        } else if (value === 'Beschlagnahmt') {
            labelE.textContent = 'Beschlagn.';
        } else if (value === 'Fundtier') {
            labelE.textContent = 'Fundtier';
        } else {
            labelE.textContent = value; // Default case
        }

        radioContainer.appendChild(labelE);

        // Append the radio container to the wrapper
        wrapperDiv.appendChild(radioContainer);
    });

    // Append the wrapper div to the container
    containerE.appendChild(wrapperDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const modal = document.getElementById('modal');



    // Close the modal
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    const addHundForm = document.getElementById('addHundForm');
    addHundForm.addEventListener('submit', createNewHund);

    // Load and render Hund data on page load
    loadAPI_Data();
});

