

// --------- Global Variables -------------------------------








//------------ Functions ------------------------------------



// Function to validate all inputs (day, month, year)
function isValidInput(day, month, year) {
    let valid = true;

    // Convert to numbers
    console.log("function call " +valid)
    day = Number(day)
    month = Number(month)
    year = Number(year)

    // Check if all inputs are integers
    if(!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)){ 
        
        valid = false
        console.log("Hallo das war kein int !!! " +valid)
    } 

    // Check if values are within valid ranges
    console.log("data : " +day, month, year)
    if(day < 1 || day > 31) valid = false;
    console.log("Day valid : " +valid)
    if(month < 1 || month > 12) valid = false;
    console.log("Month valid : " +valid)
    if(year < 1000 || year > 5000) valid = false;
    console.log("Year valid : " +valid)


    // Check for real calendar dates (e.g., no Feb 30)
   
    const date = new Date(year, month-1, day); // months are 0 based
    console.log("Date show: " +date.toString())

    console.log("Jahr vor compare: "+typeof(year))
    console.log("Year from date: "+ typeof(date.getFullYear()))
    console.log("Ich glaube es nicht! ")

    if(date.getFullYear() !== year || date.getMonth() !== (month-1) || date.getDate() !== day){
        console.log("date compare year: " + (date.getFullYear() !== year))
        console.log("date compare month: " + (date.getMonth() !== (month-1)))
        console.log("date compare day: " + (date.getDate() !== day))
        valid = false;
        console.log("Compare Date: "+valid)
    }


    // No validation errors -> Return the input date as date object
    console.log("wert von valid am ende "+valid)
    if (valid === true){
        return date }

}

//---------------------------------------



// Function to determine the day of the week
function checkWeekDay(){
    console.log("function call: logic start")
    let tag = document.getElementById("day").value
    let monat = document.getElementById("month").value
    let jahr = document.getElementById("year").value

    let feedbackText = document.getElementById("textFeedback");

    let userDate = isValidInput(tag, monat, jahr)
    console.log ("userDate after function" + userDate)

    if(!isValidInput(tag, monat, jahr)){ // This is an if statment with a function call inside
    feedbackText.innerText = "Falsches Date - Versuche es nochmals."
    return;
    } 
    else {

         feedbackText.innerText = ("Tag ist: " + userDate.getDay())
    }

    // Calculate Weekday using the date object returned in isValidInput(day, month, year)

    //const weekDays = []




}

// Function calls -----------------------------------------------------








/*
}

// Main function to handle the button click
function buttonClick() {
    // Get input values


    // Get the feedback container


    // Validate inputs


    // Determine the day of the week
  

    // Display the result
    
}

*/