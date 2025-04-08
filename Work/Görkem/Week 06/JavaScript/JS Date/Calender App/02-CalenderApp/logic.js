

function isValidInput(dayInput, monthInput, yearInput) {
    let feedbackText = document.getElementById("textFeedback");
    let valid = true;

    // Überprüfen, ob alle Eingabewerte vorhanden sind
    if(dayInput === "" || monthInput === "" || yearInput === "") {
        feedbackText.innerHTML = "Du musst alle Felder ausfüllen.";
        valid = false;
    } else {
        // Umwandlung der Eingabewerte in Zahlen
        dayInput = Number(dayInput);
        monthInput = Number(monthInput);
        yearInput = Number(yearInput);

        // Überprüfen, ob alle Eingabewerte ganze Zahlen sind
        if (!Number.isInteger(dayInput) || !Number.isInteger(monthInput) || !Number.isInteger(yearInput)) { 
            valid = false;
            feedbackText.innerHTML = "Das Datum muss ausschließlich aus ganzen Zahlen bestehen.";
        } else if(dayInput < 1 || dayInput > 31) {
            valid = false;
            feedbackText.innerHTML = "Der Tag muss ein Wert zwischen 1 und 31 sein.";
        } else if(monthInput < 1 || monthInput > 12) {
            valid = false;
            feedbackText.innerHTML = "Der Monat muss ein Wert zwischen 1 und 12 sein.";
        } else if (yearInput < 1000 || yearInput > 3000) {
            valid = false;
            feedbackText.innerHTML = "Das Jahr muss ein Wert zwischen 1000 und 3000 sein.";
        }
    }

    // Überprüfen, ob das Datum wirklich existiert (z. B. kein 30. Februar)
    const date = new Date(yearInput, monthInput - 1, dayInput); // Monate sind nullbasiert
    if(date.getFullYear() !== yearInput || date.getMonth() !== (monthInput - 1) || date.getDate() !== dayInput){
        valid = false;
        feedbackText.innerHTML = "Das angegebene Datum existiert nicht.";
    }

    // Rückgabe des gültigen Datums
    if (valid === true){
        return date;
    }
}

function getSeason(month){
    if (month >= 3 && month <= 5) return "Frühling";
    if (month >= 6 && month <= 8) return "Sommer";
    if (month >= 9 && month <= 11) return "Herbst";
    return "Winter";
}

// Funktion zur Bestimmung des Wochentages
function checkWeekDay(){
    let dayInput = document.getElementById("day").value;
    let monthInput = document.getElementById("month").value;
    let yearInput = document.getElementById("year").value;

    let feedbackText = document.getElementById("textFeedback");

    let userDate = isValidInput(dayInput, monthInput, yearInput);

    if(userDate instanceof Date && !isNaN(userDate.getTime())) {
        let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        let season = getSeason(monthInput);
        let weekOfYear = getWeekOfYear(userDate);

        feedbackText.innerText = `Der Wochentag war: ${weekDays[userDate.getDay()]}, es ist ${season}. Aktuelle Woche des Jahres: ${weekOfYear}.`;
        feedbackText.classList.remove("error");
        feedbackText.classList.add("success");
    } else {
        feedbackText.innerText = "Bitte überprüfe deine Eingaben.";
        feedbackText.classList.remove("success");
        feedbackText.classList.add("error");
    }
}

function getWeekOfYear(date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil((days + 1) / 7);
    return weekNumber;
}
