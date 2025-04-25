

//const API_URL = 'https://api.restful-api.dev/objects';
//alt url = 'https://api.restful-api.dev'
//alt url = 'http://192.168.0.71:3000'
//alt url = 'http://85.215.164.164:300/items'
let API_URL = "";
let fetchedData = []; // Define fetchedData globally

function inputURL(){
    const targetUrlInput = document.getElementById('urlInput');
    const enteredUrl = targetUrlInput.value.trim(); // Trim whitespace from the input
    
    if(enteredUrl) {
        API_URL = enteredUrl; // Set the API_URL to the entered value
        console.log(`API URL set to: ${API_URL}`);
        listAll();
    } else {
        console.error('No URL entered. Please provide a valid URL.');
    }
    
}

function clearURL(){
    const targetUrlInput = document.getElementById('urlInput');
    targetUrlInput.value = "";
    const targetResponseBox = document.getElementById('responseBox');
    targetResponseBox.innerHTML = "";
}

async function listAll() {
    console.log('Fetching objects...');
    try{ 
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


// Function to add an attribute to an object using PATCH
async function addAttribute(id) {
    // Prompt the user for the new attribute key and value
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

    // Prepare the PATCH request body
    const patchData = {
        data: {
            [attributeKey]: attributeValue
        }
    };

    try {
        // Send PATCH request to the API
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
        console.log('Updated Object:', updatedObject);

        // Update the local fetchedData array
        const index = fetchedData.findIndex(item => item.id === id);
        if (index !== -1) {
            fetchedData[index] = updatedObject;
        }

        // Re-render the list
        displayAllObjects(fetchedData);
        alert(`Attribute "${attributeKey}" added successfully!`);
    } catch (error) {
        console.error('Error adding attribute:', error);
        alert('Failed to add attribute. Please try again.');
    }
}

// Add a button to trigger the addAttribute function
function displayAllObjects(fetchedData) {
    const targetResponseBox = document.getElementById('responseBox'); // Get the responseBox element
    targetResponseBox.innerHTML = ''; // Clear any existing content

    if (Array.isArray(fetchedData) && fetchedData.length > 0) {
        // Iterate over the fetched data and create list items
        fetchedData.forEach((object) => {
            const listedItem = document.createElement('div');
            const buttonContainer = document.createElement('div'); // Container for buttons
            const detailsButton = document.createElement('button');
            const deleteButton = document.createElement('button');
            const addAttributeButton = document.createElement('button'); // Add Attribute button
            const listedItemDetails = document.createElement('div');

            // Add classes and content
            listedItem.classList.add('listedMain'); // Add a class for styling main content
            listedItem.textContent = `${object.name}`; // `ID: ${object.id} / ${object.name}`;
            buttonContainer.classList.add('buttonContainer'); // Add class for button container
            detailsButton.classList.add('detailsButton');
            detailsButton.textContent = 'Details';
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = 'Delete';
            addAttributeButton.classList.add('editButton'); // Reuse editButton styling
            addAttributeButton.textContent = 'Add Attribute';

            listedItemDetails.classList.add('listedDetailsOff');

            // Add event listener to toggle visibility of listedItemDetails
            detailsButton.addEventListener('click', () => {
                listedItemDetails.classList.toggle('listedDetailsOff');
                listedItemDetails.classList.toggle('listedDetailsOn');
            });

            // Add event listener to delete the element
            deleteButton.addEventListener('click', () => {
                deleteElement(object.id); // Call the delete function with the object's ID
            });

            // Add event listener to add an attribute
            addAttributeButton.addEventListener('click', () => {
                addAttribute(object.id); // Call the addAttribute function with the object's ID
            });

            // Append buttons to the button container
            buttonContainer.appendChild(detailsButton);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(addAttributeButton);

            // Append elements to the DOM
            listedItem.appendChild(buttonContainer); // Add button container to the listed item
            targetResponseBox.appendChild(listedItem);
            targetResponseBox.appendChild(listedItemDetails);

            // Format the retrieved data object as a list of key-value pairs
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
        });
    } else {
        // If no data is available, display a message
        const noDataItem = document.createElement('div');
        noDataItem.textContent = 'No objects found.';
        noDataItem.classList.add('no-data-item');
        targetResponseBox.appendChild(noDataItem);
    }
}


    // Create the new object with optional fields
    async function createNewElement() {
        // Get user input values
        const name = document.getElementById('name').value.trim();
        const color = document.getElementById('color').value.trim();
        const capacity = document.getElementById('capacity').value.trim();
        const cpu = document.getElementById('cpu').value.trim();
        const price = document.getElementById('price').value.trim();
    
        // Validate the name field (required)
        if (!name) {
            alert('The "Name" field is required.');
            return;
        }
    
        // Calculate the next ID based on the highest existing ID
        const nextId = fetchedData.length > 0
            ? Math.max(...fetchedData.map(item => item.id)) + 1
            : 1;
    
        // Create the new object with optional fields
        const newElement = {
            id: nextId, // Assign the calculated ID
            name: name,
            data: {}
        };
    
        if (color) newElement.data.color = color;
        if (capacity) newElement.data.capacity = capacity;
        if (cpu) newElement.data.cpu = cpu;
        if (price) newElement.data.price = price;
    
        try {
            // Send POST request to the API
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
            console.log('Created Element:', createdElement);
    
            // Add the new element to the existing list (append it)
            fetchedData.push(createdElement); // Add the new element to the fetchedData array
            displayAllObjects(fetchedData); // Re-render the list
            alert('New element created successfully!');
        } catch (error) {
            console.error('Error creating new element:', error);
            alert('Failed to create new element. Please try again.');
        }
    }

    function clearSubmitForm() {
        const form = document.getElementById('formular');
        form.reset(); // Resets all input fields in the form to their default values
        console.log('Form cleared.');
    }


// Function to handle PUT request for updating a specific attribute
async function editAttribute(id, key, currentValue) {
    // Prompt the user for a new value
    const newValue = prompt(`Enter new value for ${key}:`, currentValue) || currentValue;

    // Find the object to update
    const objectToUpdate = fetchedData.find(item => item.id === id);
    if (!objectToUpdate) {
        alert('Object not found.');
        return;
    }

    // Update the specific attribute
    objectToUpdate.data[key] = newValue;

    try {
        // Send PUT request to the API
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
        console.log('Updated Element:', updatedData);

        // Update the local fetchedData array
        const index = fetchedData.findIndex(item => item.id === id);
        if (index !== -1) {
            fetchedData[index] = updatedData;
        }

        // Re-render the list
        displayAllObjects(fetchedData);
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully!`);
    } catch (error) {
        console.error('Error updating attribute:', error);
        alert('Failed to update attribute. Please try again.');
    }
}


// Function to handle DELETE request for removing an element
async function deleteElement(id) {
    if (!confirm('Are you sure you want to delete this element?')) {
        return; // Exit if the user cancels the confirmation
    }

    try {
        // Send DELETE request to the API
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        console.log(`Element with ID ${id} deleted successfully.`);

        // Remove the element from the local fetchedData array
        fetchedData = fetchedData.filter(item => item.id !== id);

        // Re-render the list
        displayAllObjects(fetchedData);
        alert('Element deleted successfully!');
    } catch (error) {
        console.error('Error deleting element:', error);
        alert('Failed to delete element. Please try again.');
    }
}


// Function to add an attribute to an object using PATCH
async function addAttribute(id) {
    // Find the object to update
    const objectToUpdate = fetchedData.find(item => item.id === id);
    if (!objectToUpdate) {
        alert('Object not found.');
        return;
    }

    // Prompt the user for the new attribute key and value
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

    // Merge the new attribute with the existing data
    const updatedData = {
        ...objectToUpdate.data, // Keep existing attributes
        [attributeKey]: attributeValue // Add the new attribute
    };

    // Prepare the PATCH request body
    const patchData = {
        data: updatedData
    };

    try {
        // Send PATCH request to the API
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
        console.log('Updated Object:', updatedObject);

        // Update the local fetchedData array
        const index = fetchedData.findIndex(item => item.id === id);
        if (index !== -1) {
            fetchedData[index] = updatedObject;
        }

        // Re-render the list
        displayAllObjects(fetchedData);
        alert(`Attribute "${attributeKey}" added successfully!`);
    } catch (error) {
        console.error('Error adding attribute:', error);
        alert('Failed to add attribute. Please try again.');
    }
}











