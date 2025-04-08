

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
    let tag = document.getElementById("day").value;
    let monat = document.getElementById("month").value;
    let jahr = document.getElementById("year").value;

    let feedbackText = document.getElementById("textFeedback");
    let feedbackText02 = document.getElementById("textFeedback02");


    //Validate the input date
    let userDate = isValidInput(tag, monat, jahr)
    console.log ("userDate after function" + userDate)

    if(userDate){ // If the input is valid
        let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        console.log(weekDays);
        feedbackText.innerText = "Der Geburtstag war an einem " + weekDays[userDate.getDay()] + "!";
    
        // Call the function to calculate the next same weekday birthday
        const nextBirthday = checkNextBirthWeekday(tag, monat, jahr);
        
            if(nextBirthday){
                // Format the date as DD.MM.YYYY
                const formattedDate = nextBirthday.toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });
                feedbackText02.innerText = "Der nächste Geburtstag am gleichen Wochentag ist am " + formattedDate + " (" + weekDays[nextBirthday.getDay()] + ").";
        }
        } else {
            feedbackText.innerText = "Bitte geben Sie ein gültiges Datum ein.";
            feedbackText02.innerText = ""; // Clear the second feedback text if input is invalid
        }

    } 


// Function to determine the next year with a same-day-of-the-week-Birthday.

function checkNextBirthWeekday(day, month, year) {
    // Validate the input date
    const userDate = isValidInput(day, month, year);
    if (!userDate) { // If user Date entered is not valid (isValidInput = false)
        console.log("Invalid date input.");
        return null;
    }

    // Get the original day of the week
    const birthWeekDay = userDate.getDay();
    const birthMonth = userDate.getMonth(); // 0-based month
    const birthDay = userDate.getDate();
    let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    console.log("Original Birth(Week)day: " + weekDays[birthWeekDay]);

    // Start checking from the current date
    let currentDate = new Date; // Get today's date

    console.log("Starting search from current date: " + currentDate);
  
    // Adjust the year if the current date is after this year's birthday

    if(
        currentDate.getMonth() > birthMonth ||
        (currentDate.getMonth() === birthMonth && currentDate.getDate() > birthDay)
    ) {
        currentDate = new Date(currentDate.getFullYear() + 1, birthMonth, birthDay);
    } else {
        currentDate = new Date(currentDate.getFullYear(), birthMonth, birthDay);
    }

    // Loop until we find the next occurrence of the same weekday
    while (true) {
        // Check if the current date matches the birthday's weekday
        
         if (currentDate.getDay() === birthWeekDay) {
            // Format the date as DD.MM.YYYY
            const formattedDate = currentDate.toLocaleString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            console.log("Match found: " + formattedDate);
            return currentDate; // Return the matching date
        }
 
        // Increment the year and continue checking
        currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
}


