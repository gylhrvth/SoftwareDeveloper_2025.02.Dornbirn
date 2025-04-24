// Base URL for the API
const API_URL = 'https://api.restful-api.dev/objects';

// Teilaufgabe 1: Fetch and display all objects
async function fetchObjects() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const objects = await response.json();
            displayObjects(objects);
        } else {
            console.error(`Error fetching objects: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching objects:', error);
    }
}

// Teilaufgabe 2: Display objects and show details when clicked
function displayObjects(objects) {
    const objectList = document.getElementById('objectList');
    objectList.innerHTML = ''; // Clear the list

    objects.forEach(object => {
        const listItem = document.createElement('li');
        listItem.textContent = `${object.id}: ${object.name}`;
        listItem.addEventListener('click', () => showDetails(object));

        // Add a delete button (Teilaufgabe 4)
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the details view
            deleteObject(object.id);
        });

        listItem.appendChild(deleteButton);
        objectList.appendChild(listItem);
    });
}

// Teilaufgabe 2: Show details of an object
function showDetails(object) {
    const detailsContainer = document.getElementById('detailsContainer');
    const detailsContent = document.getElementById('detailsContent');
    const allObjectsSection = document.getElementById('allObjects');

    // Populate the details view
    detailsContent.innerHTML = `
        <p><strong>ID:</strong> ${object.id}</p>
        <p><strong>Name:</strong> ${object.name}</p>
        <p><strong>Data:</strong> ${JSON.stringify(object.data)}</p>
        <button id="editButton">Edit</button>
    `;

    // Add an edit button (Teilaufgabe 5)
    document.getElementById('editButton').addEventListener('click', () => editObject(object));

    // Show details and hide the list
    detailsContainer.style.display = 'block';
    allObjectsSection.style.display = 'none';
}

// Teilaufgabe 2: Navigate back to the list
document.getElementById('backToListButton').addEventListener('click', () => {
    const detailsContainer = document.getElementById('detailsContainer');
    const allObjectsSection = document.getElementById('allObjects');

    detailsContainer.style.display = 'none';
    allObjectsSection.style.display = 'block';

    fetchObjects(); // Refresh the list
});

// Teilaufgabe 3: Add a new object
async function addObject(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('objectId').value;
    const name = document.getElementById('objectName').value;

    const newObject = { id, name, data: {} };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newObject),
        });

        if (response.ok) {
            console.log('Object added successfully');
            fetchObjects(); // Refresh the list
        } else {
            console.error(`Error adding object: ${response.status}`);
        }
    } catch (error) {
        console.error('Error adding object:', error);
    }
}

// Teilaufgabe 4: Delete an object
async function deleteObject(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (response.ok) {
            console.log('Object deleted successfully');
            fetchObjects(); // Refresh the list
        } else {
            console.error(`Error deleting object: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting object:', error);
    }
}

// Teilaufgabe 5: Edit an object
function editObject(object) {
    const detailsContent = document.getElementById('detailsContent');

    // Replace details with an editable form
    detailsContent.innerHTML = `
        <label for="editName">Edit Name:</label>
        <input type="text" id="editName" value="${object.name}">
        <button id="saveButton">Save</button>
        <button id="cancelButton">Cancel</button>
    `;

    // Save changes
    document.getElementById('saveButton').addEventListener('click', async () => {
        const updatedName = document.getElementById('editName').value;
        const updatedObject = { ...object, name: updatedName };

        try {
            const response = await fetch(`${API_URL}/${object.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedObject),
            });

            if (response.ok) {
                console.log('Object updated successfully');
                fetchObjects(); // Refresh the list
            } else {
                console.error(`Error updating object: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating object:', error);
        }
    });

    // Cancel editing
    document.getElementById('cancelButton').addEventListener('click', () => {
        showDetails(object); // Reload the details view
    });
}

// Attach event listener to the form
document.getElementById('addObjectForm').addEventListener('submit', addObject);

// Fetch and display objects on page load
fetchObjects();