// Get the input field element
const dateInput = document.getElementById('date-input');

//Beim Start des scriptes wird sofort diese Funktion aufgerufen, damit der Kalender gleich beim Starten des Scripts angezeigt wird.
createGrid();

// Call the function to enable notes on grid cells
enableCellNotes();


// Add an event listener for when the input field changes
// User interagiert mit dem Input-Feld, da es keinen Button gibt, fragen wir den Zustand ab und sobald sich was in dem Input-Feld ändert, wird die Funktion aufgerufen.
dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value; // Get the value of the input field
  handleDateInput(selectedDate); // Pass the value to the function
});






// Function to handle the date input
function handleDateInput(date) {
  console.log('Selected date:', date);
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth(); // 0-based index for months
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
  const currentDay = dateObj.getDate(); // Get the current day of the month
  let firstDayOfWeek = new Date(year, month, 1).getDay(); // Get the first day of the month (0-6, Sunday-Saturday)

  // Anpassung von firstDayOfWeek für das Grid
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  updateGrid(daysInMonth, firstDayOfWeek, currentDay); // Pass adjusted `firstDayOfWeek`
}
// Function to update the grid with the days of the month
function updateGrid(daysInMonth, firstDayOfWeek, currentDay) {
  const grid = document.querySelector('.grid');
  let dayCounter = 1;

  // Clear the grid before updating
  grid.querySelectorAll('.grid-cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('current-day'); // Entferne die Hervorhebung
  });

  // Loop through the grid cells and populate them with the days
  for (let i = 0; i < 42; i++) { // 6 Reihen * 7 Spalten = 42 Zellen
    const cell = grid.children[i]; // Greife auf die Zelle basierend auf der Reihenfolge zu

    // Platzierung der Tage basierend auf firstDayOfWeek
    if (i >= firstDayOfWeek && dayCounter <= daysInMonth) {
      cell.textContent = dayCounter; // Setze den Tag
      if (dayCounter === currentDay) {
        cell.classList.add('current-day'); // Markiere den aktuellen Tag
      }
      dayCounter++;
    } else {
      cell.textContent = ''; // Leere Zellen vor und nach den Tagen des Monats
    }
  }
}
// Function to create the grid structure in HTML
function createGrid() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = ''; // Lösche vorherige Inhalte, falls vorhanden
  for (let i = 0; i < 42; i++) { // 42 Zellen für 6 Reihen × 7 Spalten
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
    grid.appendChild(cell);
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

