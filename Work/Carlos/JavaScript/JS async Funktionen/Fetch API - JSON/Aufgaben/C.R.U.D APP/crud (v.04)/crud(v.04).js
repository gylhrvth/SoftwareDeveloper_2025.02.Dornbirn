// Base URL for the API
const API_URL = 'https://api.restful-api.dev/objects;' // Sandros Server
// Old API: https://api.restful-api.dev/objects
//'http://192.168.0.71:3000/objects';

// Fetch and log all objects to the console
async function consoleFetchObjects() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const objects = await response.json();
            console.log('Fetched Objects:', objects);
        } else {
            console.error(`Error fetching objects: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching objects:', error);
    }
}

// Fetch and display all objects
async function fetchObjects() {
    console.log('Fetching objects...');
    try {
        const response = await fetch(`${API_URL}?timestamp=${Date.now()}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched Objects:', data);
            displayObjects(data);
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Display the fetched objects in the HTML
function displayObjects(objects) {
    console.log('Objects to display:', objects);
    const allObjectsSection = document.getElementById('allObjects');
    const objectList = document.getElementById('objectList');
    const detailsContainer = document.getElementById('detailsContainer');

    // Ensure the list is visible and details are hidden
    allObjectsSection.style.display = 'block';
    detailsContainer.style.display = 'none';

    objectList.innerHTML = ''; // Clear previous content

    objects.forEach(object => {
        const listItem = createListItem(object);
        objectList.appendChild(listItem);
    });
}

// Create a list item for a single object
function createListItem(object) {
    const listItem = document.createElement('li');
    listItem.classList.add('object-item');

    // Add top-level properties
    for (const key in object) {
        if (object[key] && typeof object[key] !== 'object') {
            const propertyElement = createPropertyElement(key, object[key]);
            listItem.appendChild(propertyElement);
        }
    }

    // Add a "Show Details" button
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Show Details';
    detailsButton.classList.add('details-button');
    detailsButton.addEventListener('click', () => fetchDetails(object.id));
    listItem.appendChild(detailsButton);

    // Add a "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the object with ID ${object.id}?`)) {
            deleteObject(object.id);
        }
    });
    listItem.appendChild(deleteButton);

    return listItem;
}

// Create an HTML element for a key-value pair
function createPropertyElement(key, value) {
    const propertyElement = document.createElement('div');
    propertyElement.classList.add('object-attribute');

    const keyElement = document.createElement('span');
    keyElement.classList.add('object-key');
    keyElement.textContent = `${key}: `;

    const valueElement = document.createElement('span');
    valueElement.classList.add('object-value');
    valueElement.textContent = value;

    propertyElement.appendChild(keyElement);
    propertyElement.appendChild(valueElement);

    return propertyElement;
}

// Fetch and display details of a specific object
async function fetchDetails(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            const object = await response.json();
            showDetails(object);
        } else {
            console.error(`Error fetching details: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}

// Display the details of an object with editable fields
function showDetails(object) {
    const detailsContainer = document.getElementById('detailsContainer');
    const detailsContent = document.getElementById('detailsContent');
    const allObjectsSection = document.getElementById('allObjects');

    // Populate the details view with editable fields
    detailsContent.innerHTML = `
        <form id="editObjectForm">
            <label for="editObjectId"><strong>ID:</strong></label>
            <input type="text" id="editObjectId" value="${object.id}" readonly>
            
            <label for="editObjectName"><strong>Name:</strong></label>
            <input type="text" id="editObjectName" value="${object.name}">
            
            <div>
                <h3>Additional Data:</h3>
                <textarea id="editObjectData">${JSON.stringify(object.data || {}, null, 2)}</textarea>
            </div>
            
            <button type="button" id="saveButton">Speichern</button>
            <button type="button" id="cancelButton">Abbruch</button>
        </form>
    `;

    // Show the details section and hide the list
    detailsContainer.style.display = 'block';
    allObjectsSection.style.display = 'none';

    // Add event listeners for Save and Cancel buttons
    document.getElementById('saveButton').addEventListener('click', () => saveObject(object.id));
    document.getElementById('cancelButton').addEventListener('click', () => cancelEdit(object.id));
}

// Save the updated object to the API
async function saveObject(id) {
    const updatedName = document.getElementById('editObjectName').value;
    const updatedData = document.getElementById('editObjectData').value;

    // Create the updated object
    const updatedObject = {
        id: id,
        name: updatedName,
        data: JSON.parse(updatedData) // Parse the JSON string back into an object
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // Use the PUT HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedObject)
        });

        if (response.ok) {
            console.log(`Object with ID ${id} updated successfully.`);
            fetchObjects(); // Refresh the list after saving
        } else {
            console.error(`Error updating object: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error while updating object:', error);
    }
}

// Cancel the edit and reload the original details
async function cancelEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (response.ok) {
            const object = await response.json();
            showDetails(object); // Reload the details page with the original data
        } else {
            console.error(`Error fetching details: ${response.status}`);
        }
    } catch (error) {
        console.error('Fetch error while canceling edit:', error);
    }
}

// Add a new object
const addObjectForm = document.getElementById('addObjectForm');
addObjectForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('objectName').value;
    console.log('Form Values:', { name });

    // Create the new object
    const newObject = {
        name: name,
        data: {} // Placeholder for additional data
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response:', responseData);
            console.log('Object added successfully');
            setTimeout(() => fetchObjects(), 1000); // Wait 1 second before refreshing
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

// Delete an object
async function deleteObject(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Object with ID ${id} deleted successfully.`);
            fetchObjects(); // Refresh the list after deletion
        } else {
            console.error(`Error deleting object: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error while deleting object:', error);
    }
}

// Add a "Back to List" button functionality
document.getElementById('backToListButton').addEventListener('click', () => {
    const detailsContainer = document.getElementById('detailsContainer');
    const allObjectsSection = document.getElementById('allObjects');

    // Hide the details section and show the list
    detailsContainer.style.display = 'none';
    allObjectsSection.style.display = 'block';

    fetchObjects(); // Refresh the list
});