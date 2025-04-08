

//------------ Functions ------------------------------------


// Function to validate all inputs (day, month, year)
function isValidInput(day, month, year) {
    let feedbackText = document.getElementById("textFeedback");
    let valid = true;

    // Check if all inputs are integers
    if(day === "" && month === "" && year === ""){
        feedbackText.innerHTML = "Du musst etwas reinschreiben";
        valid = false;

    }   else {
        // Convert to numbers
        console.log("function call " +valid)
        day = Number(day)
        month = Number(month)
        year = Number(year)

            if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)){ 
                
                valid = false
                feedbackText.innerHTML = "Das Datum muss ausschließlich aus ganzen Zahlen (Integern) bestehen.";
                console.log("Hallo das war kein int !!! " +valid)
            
                // Check if values are within valid ranges
                console.log("data : " +day, month, year)
            
            } else if(day < 1 || day > 31) {
                
            valid = false;
                feedbackText.innerHTML = "Der Tag muss ein Wert zwischen 1 - 31 sein"
                
                console.log("Day valid : " +valid)
            
            } else if(month < 1 || month > 12) {
                valid = false;

                console.log("Month valid : " +valid)

                feedbackText.innerHTML = "Der Monat muss ein Wert zwischen 1 - 12 sein"

                console.log("Year valid : " +valid)

            } else if (year < 1000 || year > 3000) {
                valid = false;
                feedbackText.innerHTML = "Das Jahr muss ein Wert zwischen 1900 - 2500 sein"

            } else {

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

                        feedbackText.innerHTML = "Das ist kein valides Datum"
                    } else {

                        // No validation errors -> Return the input date as date object
                        console.log("wert von valid am ende "+valid)
                        if (valid === true){
                        return date }
                    }

            }

    }
    
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

    if(isValidInput(tag, monat, jahr)){ // This is an if statment with a function call inside
        let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        console.log(weekDays);
        feedbackText.innerText = "Der Geburtstag war an einem " + weekDays[userDate.getDay()] + "!";
    return;
    } 

    checkNextBirthWeekday()

}

// Function to determine the next year with a same-day-of-the-week-Birthday.

function checkNextBirthWeekday(){
    if (isValidInput.getMonth !== userDate.getMonth && isValidInput.getDay !== userDate.getDay()){

        isValidInput.getYear ++

    } else {
        return console.log(isValidInput);
    }
}

/* Solution

function getNextSameWeekdayBirthday(day, month, year) {
    // Validate the input date
    const userDate = isValidInput(day, month, year);
    if (!userDate) {
        console.log("Invalid date input.");
        return null;
    }

    // Get the original day of the week
    const originalWeekday = userDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    console.log("Original Weekday: " + originalWeekday);

    // Start checking from the next year
    let nextYear = userDate.getFullYear() + 1;

    while (true) {
        // Create a new date for the same day and month in the next year
        const nextDate = new Date(nextYear, userDate.getMonth(), userDate.getDate());

        // Check if the day of the week matches the original
        if (nextDate.getDay() === originalWeekday) {
            console.log("Next same weekday birthday: " + nextDate.toDateString());
            return nextDate; // Return the matching date
        }

        // Increment the year and continue checking
        nextYear++;
    }
} */