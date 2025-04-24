// Base URL for the API
const API_URL = 'https://api.restful-api.dev/objects';

// Fetch and log all objects to the console
async function consoleFetchObjects() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const objects = await response.json();
            console.log('Fetched Objects:', objects); // Log the fetched objects
        } else {
            console.error(`Error fetching objects: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching objects:', error);
    }
}

// Teilaufgabe 1: Fetch and display all objects
async function fetchObjects() {
    console.log('Fetching objects...');
    try {
        const response = await fetch(`${API_URL}?timestamp=${Date.now()}`); // Prevent caching
        if (response.ok) {
            const data = await response.json();
            console.log('Fetched Objects:', data); // Log the fetched objects
            displayObjects(data); // Pass the data to a separate function for rendering
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Display the fetched objects in the HTML
function displayObjects(objects) {
    console.log('Objects to display:', objects); // Log the objects to display

    const objectList = document.getElementById('objectList');
    const allObjectsSection = document.getElementById('allObjects');
    const detailsContainer = document.getElementById('detailsContainer');

    // Ensure the list is visible and details are hidden
    allObjectsSection.style.display = 'block';
    detailsContainer.style.display = 'none';

    objectList.innerHTML = ''; // Clear previous content

    objects.forEach(object => {
        console.log('Displaying object:', object); // Log each object being displayed
        const listItem = createListItem(object); // Create a list item for each object
        objectList.appendChild(listItem); // Append the list item to the object list
    });

    // Add hardcoded data for testing
    const hardcodedObject = { id: '999', name: 'Test Object', data: {} };
    console.log('Adding hardcoded object:', hardcodedObject);
    const hardcodedListItem = createListItem(hardcodedObject);
    objectList.appendChild(hardcodedListItem);
}

// Create a list item for a single object
function createListItem(object) {
    const listItem = document.createElement('li');
    listItem.classList.add('object-item'); // Add a class for styling

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
    detailsButton.classList.add('details-button'); // Add a class for styling
    detailsButton.addEventListener('click', () => fetchDetails(object.id)); // Fetch details on click
    listItem.appendChild(detailsButton);

    return listItem;
}

// Create an HTML element for a key-value pair
function createPropertyElement(key, value) {
    const propertyElement = document.createElement('div');
    propertyElement.classList.add('object-attribute'); // Add a class for styling

    const keyElement = document.createElement('span');
    keyElement.classList.add('object-key'); // Add a class for styling
    keyElement.textContent = `${key}: `;

    const valueElement = document.createElement('span');
    valueElement.classList.add('object-value'); // Add a class for styling
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
            showDetails(object); // Call the showDetails function to display the details
        } else {
            console.error(`Error fetching details: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}

// Display the details of an object
function showDetails(object) {
    const detailsContainer = document.getElementById('detailsContainer');
    const detailsContent = document.getElementById('detailsContent');
    const allObjectsSection = document.getElementById('allObjects');

    // Format the data object as key-value pairs
    const formattedData = Object.entries(object.data || {})
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');

    // Populate the details view
    detailsContent.innerHTML = `
        <p><strong>ID:</strong> ${object.id}</p>
        <p><strong>Name:</strong> ${object.name}</p>
        <div>
            <h3>Additional Data:</h3>
            ${formattedData || '<p>No additional data available.</p>'}
        </div>
    `;

    // Show the details section and hide the list
    detailsContainer.style.display = 'block';
    allObjectsSection.style.display = 'none';
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

// Teilaufgabe 3: Add a new object
const addObjectForm = document.getElementById('addObjectForm');
addObjectForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const id = document.getElementById('objectId').value;
    const name = document.getElementById('objectName').value;
    console.log('Form Values:', { id, name }); // Debugging log

    // Create the new object
    const newObject = {
        id: id,
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
            console.log('API Response:', responseData); // Debugging log
            console.log('Object added successfully');
            setTimeout(() => fetchObjects(), 1000); // Wait 1 second before refreshing
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});