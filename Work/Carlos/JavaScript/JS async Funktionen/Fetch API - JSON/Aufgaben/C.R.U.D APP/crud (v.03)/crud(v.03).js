// Base URL for the API
const API_URL = 'http://192.168.0.71:3000/objects'; // Sandros Server (Works ibly in Safari, not in Chrome)
// Old API: https://api.restful-api.dev/objects

// Fetch and log all objects to the console
async function consoleFetchObjects() {
    try {
        const response = await fetch(API_URL); //sends a GET request to the API to retrieve all objects
        if (response.ok) { // Checks if the response status is OK (200-299)
            const objects = await response.json(); // Converts the response data (in JSON format) into a JavaScript object.
            console.log('Fetched Objects:', objects); // Log the fetched objects
        } else { //The else block handles API-specific errors (e.g., 404 or 500).
            console.error(`Error fetching objects: ${response.status}`); //This block is executed if the HTTP response status is not in the range of 200–299 (i.e., the request was not successful).
        }
    } catch (error) { // The catch block handles JavaScript or network-related errors (e.g., no internet).
        console.error('Error fetching objects:', error); //This block catches any errors that occur during the execution of the try block.
    }
}

// Teilaufgabe 1: Fetch and display all objects
async function fetchObjects() {
    console.log('Fetching objects...');
    try {
        const response = await fetch(`${API_URL}?timestamp=${Date.now()}`); // Sends a GET request to the API with a timestamp query parameter to prevent caching.
        if (response.ok) {
            const data = await response.json(); // Converts the response data into a JavaScript object.
            console.log('Fetched Objects:', data); // Log the fetched objects
            displayObjects(data); // Passes the data to a function to render it in the UI
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
    const allObjectsSection = document.getElementById('allObjects');
    const objectList = document.getElementById('objectList');
    const detailsContainer = document.getElementById('detailsContainer');

    // Ensure the list is visible and details are hidden
    allObjectsSection.style.display = 'block';
    detailsContainer.style.display = 'block';

    objectList.innerHTML = ''; // Clear previous content

    objects.forEach(object => {
        //console.log('Displaying object:', object); // Log each object being displayed
        const listItem = createListItem(object); // Create a list item for each object createListItem(object) is a custom function.
        objectList.appendChild(listItem); // Append the list item to the object list
    });

    /* Add hardcoded data for testing
    const hardcodedObject = { id: '999', name: 'Test Object', data: {} };
    console.log('Adding hardcoded object:', hardcodedObject);
    const hardcodedListItem = createListItem(hardcodedObject);
    objectList.appendChild(hardcodedListItem);*/
}

// Create a list item for a single object
function createListItem(object) {
    const listItem = document.createElement('li');
    listItem.classList.add('object-item'); // Add a class for styling

    // Add top-level properties (just shows id and name, it also creates a button to fetch details, which is a nested object)
    for (const key in object) { // Iterate over each key in the object (id, name, data)
        if (object[key] && typeof object[key] !== 'object') { // object[key] must be truthy (not null, undefined, etc.) // Its type must not be "object" – this skips nested objects (like data) so they’re not displayed directly in the list (they’re shown elsewhere in detail view).
            const propertyElement = createPropertyElement(key, object[key]); // Create a property element for each key-value pair (like id: '123', name: 'Nokia')
            listItem.appendChild(propertyElement); // Append the property element to the list item, like <li>id: 123</li>
        }
    }

    // Add a "Show Details" button
    const detailsButton = document.createElement('button'); // Adds a button that fetches and displays the object's details when clicked.
    detailsButton.textContent = 'Show Details';
    detailsButton.classList.add('details-button'); // Add a class for styling
    detailsButton.addEventListener('click', () => fetchDetails(object.id)); // Adds an event listener to the button Show Details that calls the fetchDetails function with the object's ID when clicked. // The object's ID comes from the API. // This function fetches the details of the object and displays them in a separate section.
    listItem.appendChild(detailsButton);

    // Add a "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); // Add a class for styling
    deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the object with ID ${object.id}?`)) {
            deleteObject(object.id); // Call the deleteObject function
        }
    });
    listItem.appendChild(deleteButton);

    return listItem;
}

// Create an HTML element for a key-value pair
function createPropertyElement(key, value) {
    const propertyElement = document.createElement('div'); // Creates a new div element to hold the key-value pair.
    propertyElement.classList.add('object-attribute'); // Add a class for styling

    const keyElement = document.createElement('span'); // Creates a new span element for the key. 
    keyElement.classList.add('object-key'); // Add a class for styling
    keyElement.textContent = `${key}: `;

    const valueElement = document.createElement('span'); // Creates a new span element for the value.
    valueElement.classList.add('object-value'); // Add a class for styling
    valueElement.textContent = value;

    propertyElement.appendChild(keyElement);
    propertyElement.appendChild(valueElement);

    // The resulting structure is like this:
    // <div class="object-attribute">
    //     <span class="object-key">id:</span>
    //     <span class="object-value">123</span>
    // </div>
    // This structure allows for easy styling and manipulation of the key-value pairs in the UI.

    return propertyElement;
}

// Fetch and display details of a specific object (details is a nested object with additional data which is displayed when detailsButton is clicked)
// The function fetchDetails takes an ID as an argument and sends a GET request to the API to retrieve the details of the object with that ID.
// It then calls the showDetails function to display the details in the UI.
async function fetchDetails(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); // Sends a GET request to fetch details of the object with the specified ID. Allows to get full information, including nested data.
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
    const detailsContainer = document.getElementById('detailsContainer'); // Get the details container element, where the details will be displayed.
    const detailsContent = document.getElementById('detailsContent'); // Targets the content area within the details container, where the details will be displayed.
    const allObjectsSection = document.getElementById('allObjects'); // Targets the section that displays all objects, which will be hidden when showing details.

    // Format the data object as key-value pairs
    console.log("Key value pairs inside data: " + 'Object.entries(object.data):', Object.entries(object.data || {}));
    const formattedData = Object.entries(object.data || {}) // object.data || {} -> This checks whether the object has a .data property // Object.entries() converts the data object into an array of key-value pairs. // The || {} ensures that if object.data is undefined, an empty object is used instead.
    
    // This way we can use destructuring to get the key and value from each entry. // The map() method creates a new array with the formatted key-value pairs.    
    // We use Object.entries(object) to convert an object into an array of key-value pairs so that we can loop over it with .map(). Reason: Objects are not iterable in JavaScript, but arrays are.
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`) // For each entry in the array (each key-value pair), it creates an HTML string:
        .join(''); // Joins the array of strings into a single string, which will be used to populate the details view.

    // We have chained Object.entries() with .map() and .join() to create a formatted string of key-value pairs from the data object. // This allows us to display the additional data in a readable format.
    console.log('Formatted Data:', formattedData); // Log the formatted data for debugging


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

    // Add a "Back to List" button functionality. So we can hide Details and show the All Objects list again.
    document.getElementById('backToListButton').addEventListener('click', () => { 
        const detailsContainer = document.getElementById('detailsContainer');
        const allObjectsSection = document.getElementById('allObjects');

        // Hide the details section and show the list
        detailsContainer.style.display = 'none';
        allObjectsSection.style.display = 'block';

        fetchObjects(); // Refresh the list so that all the Objects intead the details of one single object are shown.
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

// Teilaufgabe 4: Delete an object

async function deleteObject(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE', // Use the DELETE HTTP method
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

// Teilaufgabe 5: Update an object