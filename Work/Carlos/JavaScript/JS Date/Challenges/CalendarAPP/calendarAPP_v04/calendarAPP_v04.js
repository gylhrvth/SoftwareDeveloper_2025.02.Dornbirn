



function convertTextToNumber(text, feedbackFeld){
    if (text === ''){
        feedbackFeld.innerText = "Mindestens eines der Felder ist leer."
        return undefined
    } else {
        let result = Number(text)
        if (!Number.isInteger(result)){
            feedbackFeld.innerText = "Das Datum muss ausschließlich aus ganzen Zahlen (Integern) bestehen."
            return undefined
        } else {
            return result
        }
    }
}

// Function to validate all inputs (day, month, year)
function convertTextToDate(dayText, monthText, yearText) {
    const minYear = 1000, maxYear = 3000
    let feedbackText = document.getElementById("textFeedback");
    let day = convertTextToNumber(dayText, feedbackText)
    let month = convertTextToNumber(monthText, feedbackText)
    let year = convertTextToNumber(yearText, feedbackText)
    
    if (day !== undefined && month !== undefined && year !== undefined){ 
        if(day < 1 || day > 31) {
            feedbackText.innerText = "Der Tag muss ein Wert zwischen 1 - 31 sein"
        } else if(month < 1 || month > 12) {
            feedbackText.innerText = "Der Monat muss ein Wert zwischen 1 - 12 sein"
        } else if (year < minYear || year > maxYear) {
            feedbackText.innerText = `Das Jahr muss ein Wert zwischen ${minYear} - ${maxYear} sein`
            //feedbackText.innerText = "Das Jahr muss ein Wert zwischen " + minYear + " - " + maxYear + " sein"
        } else {
            const date = new Date(year, month-1, day); // months are 0 based
            if(date.getFullYear() !== year || date.getMonth() !== (month-1) || date.getDate() !== day){
                feedbackText.innerText = "Das ist kein valides Datum"
            } else {
                return date 
            }
        }
    }
    return undefined
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
    let userDate = convertTextToDate(tag, monat, jahr)
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
            feedbackText02.innerText = ""; // Clear the second feedback text if input is invalid
        }

    } 


// Function to determine the next year with a same-day-of-the-week-Birthday.

function checkNextBirthWeekday(day, month, year) {
    // Validate the input date
    const userDate = convertTextToDate(day, month, year);
    if (!userDate) { // If user Date entered is not valid (isValidInput = false)
        console.log("Invalid date input.");
        return null;
    }

    // Get the original day of the week
    const birthWeekDay = userDate.getDay();
    const birthMonth = userDate.getMonth(); // 0-based month
    const birthDay = userDate.getDate();
    let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    // console.log("Original Birth(Week)day: " + weekDays[birthWeekDay]);

    // Start checking from the current date
    let currentDate = new Date; // Get today's date

    //console.log("Starting search from current date: " + currentDate);
  
    // Adjust the year if the current date is after this year's birthday

    if (currentDate.getMonth() > birthMonth ||
        (currentDate.getMonth() === birthMonth && currentDate.getDate() > birthDay)) {
        currentDate = new Date(currentDate.getFullYear() + 1, birthMonth, birthDay);
    } else {
        currentDate = new Date(currentDate.getFullYear(), birthMonth, birthDay);
    }

    // Loop until we find the next occurrence of the same weekday
    while (currentDate.getDay() !== birthWeekDay) {
        // Increment the year and continue checking
        currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    // Format the date as DD.MM.YYYY
    const formattedDate = currentDate.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    //console.log("Match found: " + formattedDate);
    return currentDate; // Return the matching date 
}


