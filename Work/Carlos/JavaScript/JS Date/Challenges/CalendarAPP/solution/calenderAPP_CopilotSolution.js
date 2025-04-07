//------------ Functions ------------------------------------

// Function to get the value of an input field by its ID
function getInputValue(id) {
    return document.getElementById(id).value;
}

// Function to validate a single input
function validateInput(value, min, max) {
    return value >= min && value <= max;
}

// Function to validate all inputs (day, month, year)
function validateInputs(day, month, year) {
    if (!validateInput(day, 1, 31)) {
        return "Day must be between 1 and 31.";
    }
    if (!validateInput(month, 1, 12)) {
        return "Month must be between 1 and 12.";
    }
    if (!validateInput(year, 1900, 2100)) {
        return "Year must be between 1900 and 2100.";
    }

    // Check if the date is valid (e.g., February 30 is invalid)
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return "The date you entered is invalid.";
    }

    return null; // No validation errors
}

// Function to determine the day of the week
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day); // Create a Date object
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()]; // Get the day of the week
}

// Main function to handle the button click
function handleButtonClick() {
    // Get input values
    const day = parseInt(getInputValue("day"));
    const month = parseInt(getInputValue("month"));
    const year = parseInt(getInputValue("year"));

    // Get the feedback container
    const feedback = document.getElementById("textFeedback");

    // Validate inputs
    const validationError = validateInputs(day, month, year);
    if (validationError) {
        feedback.innerHTML = validationError;
        return;
    }

    // Determine the day of the week
    const dayOfWeek = getDayOfWeek(day, month, year);

    // Display the result
    feedback.innerHTML = `You were born on a ${dayOfWeek}.`;
}