// Base URL for the API
const API_URL = 'https://reqres.in/api/users';

// Fetch and log all objects to the console
async function consoleFetchObjects() {
    try {
        const response = await fetch(API_URL); // Sends a GET request to the API
        if (response.ok) {
            const objects = await response.json(); // Converts the response data into a JavaScript object
            console.log('Fetched Objects:', objects.data); // Log the fetched objects (use `data` for reqres API)
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
        const response = await fetch(`${API_URL}?timestamp=${Date.now()}`); // Prevent caching
        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            console.log('Fetched Objects:', data.data); // Log the fetched objects (use `data` for reqres API)

            // Merge fetched users with new users
            const allUsers = [...data.data, ...newUsers];
            displayObjects(allUsers); // Pass the merged data to the display function
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

    const objectList = document.getElementById('objectList');
    const allObjectsSection = document.getElementById('allObjects');
    const detailsContainer = document.getElementById('detailsContainer');

    // Ensure the list is visible and details are hidden
    allObjectsSection.style.display = 'block';
    detailsContainer.style.display = 'none';

    objectList.innerHTML = ''; // Clear previous content

    objects.forEach(object => {
        console.log('Displaying object:', object);
        const listItem = createListItem(object); // Create a list item for each object
        objectList.appendChild(listItem); // Append the list item to the object list
    });
}

// Create a list item for a single object
function createListItem(object) {
    const listItem = document.createElement('li');
    listItem.classList.add('object-item'); // Add a class for styling

    // Add top-level properties
    const propertyElement = createPropertyElement('ID', object.id);
    listItem.appendChild(propertyElement);

    const nameElement = createPropertyElement('Name', `${object.first_name} ${object.last_name}`);
    listItem.appendChild(nameElement);

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
            showDetails(object.data); // Call the showDetails function to display the details
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

    // Populate the details view
    detailsContent.innerHTML = `
        <p><strong>ID:</strong> ${object.id}</p>
        <p><strong>Name:</strong> ${object.first_name} ${object.last_name}</p>
        <p><strong>Email:</strong> ${object.email}</p>
        <img src="${object.avatar}" alt="Avatar of ${object.first_name}" />
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

// Array to store newly added users
const newUsers = [];

addObjectForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        avatar: 'https://via.placeholder.com/150' // Placeholder avatar for new users
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('API Response:', responseData); // Debugging log
            console.log('Object added successfully');

            // Add the new user to the local array
            newUsers.push({ ...newUser, id: responseData.id });

            // Refresh the list
            fetchObjects();
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});