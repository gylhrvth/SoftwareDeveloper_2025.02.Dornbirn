




// Funktion zur Validierung des Datums (Tag, Monat, Jahr)
function isValidInput(dayInput, monthInput, yearInput) {
    let feedbackText = document.getElementById("textFeedback");
    let valid = true;

    // Überprüfen, ob alle Eingabewerte vorhanden sind
    if(dayInput === "" && monthInput === "" && yearInput === ""){
        feedbackText.innerHTML = "Du musst etwas reinschreiben";
        valid = false;
    } else {
        // Umwandlung der Eingabewerte in Zahlen
        console.log("Funktionsaufruf " + valid);
        dayInput = Number(dayInput);
        monthInput = Number(monthInput);
        yearInput = Number(yearInput);

        // Überprüfen, ob alle Eingabewerte ganze Zahlen sind
        if (!Number.isInteger(dayInput) || !Number.isInteger(monthInput) || !Number.isInteger(yearInput)) { 
            valid = false;
            feedbackText.innerHTML = "Das Datum muss ausschließlich aus ganzen Zahlen (Integern) bestehen.";
            console.log("Fehler: Das war keine ganze Zahl! " + valid);
        } else if(dayInput < 1 || dayInput > 31) {
            valid = false;
            feedbackText.innerHTML = "Der Tag muss ein Wert zwischen 1 - 31 sein";
            console.log("Tag gültig: " + valid);
        } else if(monthInput < 1 || monthInput > 12) {
            valid = false;
            feedbackText.innerHTML = "Der Monat muss ein Wert zwischen 1 - 12 sein";
            console.log("Monat gültig: " + valid);
        } else if (yearInput < 1000 || yearInput > 3000) {
            valid = false;
            feedbackText.innerHTML = "Das Jahr muss ein Wert zwischen 1900 - 2500 sein";
        }
    }

    // Überprüfen, ob das Datum wirklich existiert (z. B. kein 30. Februar)
    const date = new Date(yearInput, monthInput - 1, dayInput); // Monate sind nullbasiert
    console.log("Datum: " + date.toString());

    // Überprüfen, ob das Jahr, der Monat und der Tag übereinstimmen
    console.log("Jahr vor Vergleich: " + typeof(yearInput));
    console.log("Jahr aus Date-Objekt: " + typeof(date.getFullYear()));
    console.log("Überprüfung des Datums...");

    if(date.getFullYear() !== yearInput || date.getMonth() !== (monthInput - 1) || date.getDate() !== dayInput){
        valid = false;
        console.log("Vergleich Jahr: " + (date.getFullYear() !== yearInput));
        console.log("Vergleich Monat: " + (date.getMonth() !== (monthInput - 1)));
        console.log("Vergleich Tag: " + (date.getDate() !== dayInput));
    }

    // Keine Validierungsfehler -> Gebe das Datum als Date-Objekt zurück
    console.log("Wert von valid am Ende: " + valid);
    if (valid === true){
        return date;
    }
}

// Funktion zur Bestimmung des Wochentages
function checkWeekDay(){
    console.log("Funktionsaufruf: Start der Logik");
    let dayInput = document.getElementById("day").value;
    let monthInput = document.getElementById("month").value;
    let yearInput = document.getElementById("year").value;

    let feedbackText = document.getElementById("textFeedback");

    let userDate = isValidInput(dayInput, monthInput, yearInput);
    console.log("Benutzerdatum nach der Validierung: " + userDate);

    if(isValidInput(dayInput, monthInput, yearInput)){ // Dies ist eine If-Bedingung mit einem Funktionsaufruf
        let weekDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        console.log(weekDays);
        feedbackText.innerText = "Der Wochentag war: " + weekDays[userDate.getDay()];
        return;
    } 
}


