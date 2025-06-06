// ==============================
// Global Variables and Setup
// ==============================
const content = document.getElementById('content');
let server = "http://192.168.0.71:3000/objects";

// ==============================
// Fetch Functions
// ==============================

/**
 * Fetch data from the server and render the list.
 */
async function fetchData() {
  console.log('Fetching data from server:', server);
  try {
    const response = await fetch(server);
    const data = await response.json();
    renderList(data);
    document.getElementById('addButton').style.display = 'block'; // Make the add button visible
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

/**
 * Add a new item to the server.
 */
async function addNewItem() {
  // Create the popup container
  const popup = document.createElement('div');
  popup.classList.add('popup');

  // Create the form elements
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Name';

  const colorInput = document.createElement('input');
  colorInput.type = 'text';
  colorInput.placeholder = 'Color';

  const capacityInput = document.createElement('input');
  capacityInput.type = 'number';
  capacityInput.placeholder = 'Capacity';

  const cpuInput = document.createElement('input');
  cpuInput.type = 'text';
  cpuInput.placeholder = 'CPU';

  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.placeholder = 'Price';

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Speichern';
  saveButton.classList.add('button');

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Abbrechen';
  cancelButton.classList.add('button');

  // Append elements to the popup
  popup.appendChild(nameInput);
  popup.appendChild(colorInput);
  popup.appendChild(capacityInput);
  popup.appendChild(cpuInput);
  popup.appendChild(priceInput);
  popup.appendChild(saveButton);
  popup.appendChild(cancelButton);

  // Append the popup to the body
  document.body.appendChild(popup);

  // Handle save button click
  saveButton.addEventListener('click', async () => {
    const newItem = {
      name: nameInput.value,
      data: {
        color: colorInput.value,
        capacity: parseInt(capacityInput.value, 10),
        cpu: cpuInput.value,
        price: parseFloat(priceInput.value),
      },
    };

    try {
      const response = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Item added successfully:', data);

      // Close the popup and refresh the list
      document.body.removeChild(popup);
      fetchData();
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  });

  // Handle cancel button click
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
}

/**
 * Delete an item from the server.
 */
async function DeleteObjcet(id) {
  try {
    const response = await fetch(`${server}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    console.log(`Item with ID ${id} deleted successfully.`);
    fetchData(); // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// ==============================
// Rendering Functions
// ==============================

/**
 * Render the list of items.
 */
function renderList(data) {
  content.innerHTML = ''; // Clear content
  const list = document.createElement('ul');

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    listItem.addEventListener('click', () => renderDetails(item));
    list.appendChild(listItem);
  });

  content.appendChild(list);
}

/**
 * Render the details of a single item.
 */
function renderDetails(item) {
  content.innerHTML = ''; // Clear content

  const details = document.createElement('div');

  // Erstelle die anklickbare Überschrift
  const title = document.createElement('h2');
  title.textContent = item.name;
  title.style.cursor = 'pointer'; // Zeige an, dass es anklickbar ist
  title.addEventListener('click', () => ChangeObject('name', item.name, item)); // Event-Listener hinzufügen
  details.appendChild(title);

  // Überprüfen, ob `item.data` existiert und ein Objekt ist
  if (item.data && typeof item.data === 'object') {
    // Iteriere über die `data`-Eigenschaft und erstelle anklickbare Elemente
    for (const [key, value] of Object.entries(item.data)) {
      const detailDiv = document.createElement('div');
      detailDiv.innerHTML = `<strong>${key}:</strong> ${value}`;
      detailDiv.style.cursor = 'pointer'; // Zeige an, dass es anklickbar ist
      detailDiv.addEventListener('click', () => ChangeObject(key, value, item)); // Event-Listener hinzufügen
      details.appendChild(detailDiv);
    }
  } else {
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = 'No additional data available.';
    details.appendChild(noDataMessage);
  }

  const backButton = document.createElement('button');
  backButton.textContent = 'Back to List';
  backButton.classList.add('button');
  backButton.addEventListener('click', fetchData);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('button');
  deleteButton.addEventListener('click', () => DeleteObjcet(item.id));

  const newAttributeButton = document.createElement('button');
  newAttributeButton.textContent = 'New Attribute';
  newAttributeButton.classList.add('button');
  newAttributeButton.addEventListener('click', () => NewAttribute(item));

  details.appendChild(newAttributeButton);
  details.appendChild(deleteButton);
  content.appendChild(details);
  content.appendChild(backButton);
}

// ==============================
// Popup Functions
// ==============================

/**
 * Add a new attribute to an item.
 */
function NewAttribute(item) {
  // Create the popup container
  const popup = document.createElement('div');
  popup.classList.add('popup');

  // Create the form elements
  const keyInput = document.createElement('input');
  keyInput.type = 'text';
  keyInput.placeholder = 'Attribute Name';

  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.placeholder = 'Attribute Value';

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Speichern';
  saveButton.classList.add('button');

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Abbrechen';
  cancelButton.classList.add('button');

  // Append elements to the popup
  popup.appendChild(keyInput);
  popup.appendChild(valueInput);
  popup.appendChild(saveButton);
  popup.appendChild(cancelButton);

  // Append the popup to the body
  document.body.appendChild(popup);

  // Handle save button click
  saveButton.addEventListener('click', async () => {
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();

    if (!key || !value) {
      alert('Both fields are required.');
      return;
    }

    try {
      // Update the item's data
      const updatedItem = {
        ...item,
        data: {
          ...item.data,
          [key]: value,
        },
      };

      const response = await fetch(`${server}/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updatedItem.data }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log(`Attribute ${key} added successfully.`);
      document.body.removeChild(popup);
      fetchData(); // Refresh the list after update
    } catch (error) {
      console.error('Error adding attribute:', error);
    }
  });

  // Handle cancel button click
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
}

/**
 * Change an existing attribute of an item.
 */
function ChangeObject(key, value, item) {
  console.log(`Change ${key}: ${value}`);

  // Überprüfen, ob `item` existiert
  if (!item) {
    console.error('Invalid item:', item);
    return;
  }

  // Create the popup container
  const popup = document.createElement('div');
  popup.classList.add('popup');

  // Create the form elements
  const label = document.createElement('label');
  label.textContent = `Change ${key}:`;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Speichern';
  saveButton.classList.add('button');

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Abbrechen';
  cancelButton.classList.add('button');

  // Append elements to the popup
  popup.appendChild(label);
  popup.appendChild(input);
  popup.appendChild(saveButton);
  popup.appendChild(cancelButton);

  // Append the popup to the body
  document.body.appendChild(popup);

  // Handle save button click
  saveButton.addEventListener('click', async () => {
    const updatedValue = input.value.trim();
    console.log(`Updated ${key}: ${updatedValue}`);

    try {
      // Aktualisiere das Objekt
      const updatedItem = { ...item };

      if (key === 'name') {
        // Aktualisiere das Attribut `name` direkt
        updatedItem.name = updatedValue;
      } else {
        // Aktualisiere die `data`-Eigenschaft
        updatedItem.data = {
          ...item.data,
          [key]: updatedValue,
        };
      }

      const response = await fetch(`${server}/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log(`${key} updated successfully.`);
      document.body.removeChild(popup);
      fetchData(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating item:', error);
    }
  });

  // Handle cancel button click
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
}

// ==============================
// Event Listeners
// ==============================
document.getElementById('addButton').addEventListener('click', addNewItem);
document.getElementById('fetchButton').addEventListener('click', fetchData);