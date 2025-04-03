// Get the input field element
const dateInput = document.getElementById('date-input');

// Add an event listener for when the input field changes
// User interagiert mit dem Input-Feld, da es keinen Button gibt, fragen wir den Zustand ab und sobald sich was in dem Input-Feld ändert, wird die Funktion aufgerufen.
dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value; // Get the value of the input field
  handleDateInput(selectedDate); // Pass the value to the function
});


//Beim Start des scriptes wird sofort diese Funktion aufgerufen, damit der Kalender gleich beim Starten des Scripts angezeigt wird.
createGrid();

// Function to handle the date input
function handleDateInput(date) {
  console.log('Selected date:', date);
  // Add your logic here to process the date
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth(); // 0-based index for months
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
  const currentDay = dateObj.getDate(); // Get the current day of the month
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // Get the first day of the month (0-6, Sunday-Saturday)
  updateGrid(daysInMonth, firstDayOfWeek - 1, currentDay); // Call the function to update the grid
}
// Function to update the grid with the days of the month
function updateGrid(daysInMonth, firstDayOfWeek, currentDay) {
  const grid = document.querySelector('.grid');
  let dayCounter = 1;

  // Clear the grid before updating
  grid.querySelectorAll('.grid-cell').forEach(cell => {
    cell.textContent = '';
  });
  // Loop through the grid cells and populate them with the days
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      if (row === 0 && col < firstDayOfWeek) {
        // Leave cells empty before the first day of the month
        continue;
      }
      if (dayCounter <= daysInMonth) {
        cell.textContent = dayCounter; // Set the day number
        dayCounter++;
      }
    }
  }
  // Highlight the current day
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      if (parseInt(cell.textContent) === currentDay) {
        cell.classList.add('current-day'); // Add the CSS class to highlight the current day
      } else {
        cell.classList.remove('current-day'); // Remove the class if it's not the current day
      }
    }
  }
}
// Function to create the grid structure in HTML
function createGrid() {
  const grid = document.querySelector('.grid');
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.id = `cell-${row}-${col}`;
      grid.appendChild(cell);
    }
  }

}

// Add event listener to each grid cell for adding a note
function enableCellNotes() {
  const gridCells = document.querySelectorAll('.grid-cell');
  gridCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const note = prompt('Enter a note for this day:');
      if (note) {
        const noteElement = document.createElement('span');
        noteElement.classList.add('note');
        noteElement.textContent = note;
        cell.innerHTML = ''; // Clear the cell content
        cell.appendChild(noteElement); // Add the note to the cell
      }
    });
  });
}

// Call the function to enable notes on grid cells
enableCellNotes();
