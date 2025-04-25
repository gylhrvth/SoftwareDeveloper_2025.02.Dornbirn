//========================================
// Global Variables
//========================================

let API_URL = "";
let fetchedData = []; // Define fetchedData globally

//========================================
// Teilaufgabe 1 & 2: GET
//========================================

function inputURL() {
    const targetUrlInput = document.getElementById('urlInput');
    const enteredUrl = targetUrlInput.value.trim(); // Trim whitespace from the input

    if (enteredUrl) {
        API_URL = enteredUrl; // Set the API_URL to the entered value
        console.log(`API URL set to: ${API_URL}`);
        listAll();
    } else {
        console.error('No URL entered. Please provide a valid URL.');
    }
}

function clearURL() {
    const targetUrlInput = document.getElementById('urlInput');
    targetUrlInput.value = "";
    const targetResponseBox = document.getElementById('responseBox');
    targetResponseBox.innerHTML = "";
}

async function listAll() {
    console.log('Fetching objects...');
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
        } else {
            fetchedData = await response.json(); // fetchedData will be an array that contains the objects stored in the database
            console.log('Fetched Objects:', fetchedData);
            displayAllObjects(fetchedData);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

//========================================
// Display Objects
//========================================

function displayAllObjects(fetchedData) {
    const targetResponseBox = document.getElementById('responseBox'); // Get the responseBox element
    targetResponseBox.innerHTML = ''; // Clear any existing content

    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
        fetchedData.forEach((object) => {
            const listedItem = createListedItem(object);
            const buttonContainer = createButtonContainer(object);
            const listedItemDetails = createListedItemDetails(object);

            // Append buttons and details to the listed item
            listedItem.appendChild(buttonContainer);
            targetResponseBox.appendChild(listedItem);
            targetResponseBox.appendChild(listedItemDetails);
        });
    } else {
        displayNoDataMessage(targetResponseBox);
    }
}

function createListedItem(object) {
    const listedItem = document.createElement('div');
    listedItem.classList.add('listedMain');
    listedItem.textContent = `${object.name}`; // Display the object's name
    return listedItem;
}

function createButtonContainer(object) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    const detailsButton = createDetailsButton(object);
    const deleteButton = createDeleteButton(object);
    const addAttributeButton = createAddAttributeButton(object);

    buttonContainer.appendChild(detailsButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(addAttributeButton);

    return buttonContainer;
}

function createDetailsButton(object) {
    const detailsButton = document.createElement('button');
    detailsButton.classList.add('detailsButton');
    detailsButton.textContent = 'Details';

    detailsButton.addEventListener('click', () => {
        const listedItemDetails = document.querySelector(`.details-${object.id}`);
        if (listedItemDetails) {
            listedItemDetails.classList.toggle('listedDetailsOff');
            listedItemDetails.classList.toggle('listedDetailsOn');
        }
    });

    return detailsButton;
}

function createDeleteButton(object) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        deleteElement(object.id); // Call the delete function with the object's ID
    });

    return deleteButton;
}

function createAddAttributeButton(object) {
    const addAttributeButton = document.createElement('button');
    addAttributeButton.classList.add('editButton'); // Reuse editButton styling
    addAttributeButton.textContent = 'Add Attribute';

    addAttributeButton.addEventListener('click', () => {
        addAttribute(object.id); // Call the addAttribute function with the object's ID
    });

    return addAttributeButton;
}

function createListedItemDetails(object) {
    const listedItemDetails = document.createElement('div');
    listedItemDetails.classList.add('listedDetailsOff', `details-${object.id}`);

    if (object.data && typeof object.data === 'object') {
        const dataList = document.createElement('ul');
        Object.entries(object.data).forEach(([key, value]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>&nbsp;${value}`;
            dataList.appendChild(listItem);
        });
        listedItemDetails.appendChild(dataList);
    } else {
        listedItemDetails.textContent = 'No additional data available.';
    }

    return listedItemDetails;
}

function displayNoDataMessage(targetResponseBox) {
    const noDataItem = document.createElement('div');
    noDataItem.textContent = 'No objects found.';
    noDataItem.classList.add('no-data-item');
    targetResponseBox.appendChild(noDataItem);
}

//========================================
// Teilaufgabe 3: POST
//========================================

async function createNewElement() {
    const name = document.getElementById('name').value.trim();
    const color = document.getElementById('color').value.trim();
    const capacity = document.getElementById('capacity').value.trim();
    const cpu = document.getElementById('cpu').value.trim();
    const price = document.getElementById('price').value.trim();

    if (!name) {
        alert('The "Name" field is required.');
        return;
    }

    const nextId = fetchedData.length > 0
        ? Math.max(...fetchedData.map(item => item.id)) + 1
        : 1;

    const newElement = {
        id: nextId,
        name: name,
        data: {}
    };

    if (color) newElement.data.color = color;
    if (capacity) newElement.data.capacity = capacity;
    if (cpu) newElement.data.cpu = cpu;
    if (price) newElement.data.price = price;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newElement)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const createdElement = await response.json();
        fetchedData.push(createdElement);
        displayAllObjects(fetchedData);
        alert('New element created successfully!');
    } catch (error) {
        console.error('Error creating new element:', error);
        alert('Failed to create new element. Please try again.');
    }
}

function clearSubmitForm() {
    const form = document.getElementById('formular');
    form.reset();
    console.log('Form cleared.');
}

//========================================
// Teilaufgabe 4: PUT
//========================================

async function editAttribute(id, key, currentValue) {
    const newValue = prompt(`Enter new value for ${key}:`, currentValue) || currentValue;

    const objectToUpdate = fetchedData.find(item => item.id === id);
    if (!objectToUpdate) {
        alert('Object not found.');
        return;
    }

    objectToUpdate.data[key] = newValue;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectToUpdate)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const updatedData = await response.json();
        const index = fetchedData.findIndex(item => item.id === id);
        if (index !== -1) {
            fetchedData[index] = updatedData;
        }

        displayAllObjects(fetchedData);
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully!`);
    } catch (error) {
        console.error('Error updating attribute:', error);
        alert('Failed to update attribute. Please try again.');
    }
}

//========================================
// Teilaufgabe 5: PATCH
//========================================

async function addAttribute(id) {
    const objectToUpdate = fetchedData.find(item => item.id === id);
    if (!objectToUpdate) {
        alert('Object not found.');
        return;
    }

    const attributeKey = prompt('Enter the attribute name (e.g., "Color", "Price", "Capacity"):', '');
    if (!attributeKey) {
        alert('Attribute name is required.');
        return;
    }

    const attributeValue = prompt(`Enter the value for "${attributeKey}":`, '');
    if (attributeValue === null) {
        alert('Operation canceled.');
        return;
    }

    const updatedData = {
        ...objectToUpdate.data,
        [attributeKey]: attributeValue
    };

    const patchData = {
        data: updatedData
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const updatedObject = await response.json();
        const index = fetchedData.findIndex(item => item.id === id);
        if (index !== -1) {
            fetchedData[index] = updatedObject;
        }

        displayAllObjects(fetchedData);
        alert(`Attribute "${attributeKey}" added successfully!`);
    } catch (error) {
        console.error('Error adding attribute:', error);
        alert('Failed to add attribute. Please try again.');
    }
}

//========================================
// Teilaufgabe 6: DELETE
//========================================

async function deleteElement(id) {
    if (!confirm('Are you sure you want to delete this element?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        fetchedData = fetchedData.filter(item => item.id !== id);
        displayAllObjects(fetchedData);
        alert('Element deleted successfully!');
    } catch (error) {
        console.error('Error deleting element:', error);
        alert('Failed to delete element. Please try again.');
    }
}











