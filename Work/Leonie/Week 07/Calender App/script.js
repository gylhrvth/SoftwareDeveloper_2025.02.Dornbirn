let date = "";
let dateInput = "";
let day = "";
let month = "";
let year = "";
let inputDateValue = "";

//Event: Button-Klick
const button = document.getElementById("submit");
if (button) {
    button.addEventListener("mouseover", () => {
        // Event-Handler
    });
}
let timer; // Timer für die 3 Sekunden
let isMouseOver = false; // Status, ob die Maus auf dem Button ist

// Funktion, um den Button zufällig zu bewegen
function moveButtonRandomly() {
    // Berechne zufällige Positionen für X und Y
    const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

    // Stelle sicher, dass der Button vollständig im sichtbaren Bereich bleibt
    const clampedX = Math.max(0, Math.min(randomX, window.innerWidth - button.offsetWidth));
    const clampedY = Math.max(0, Math.min(randomY, window.innerHeight - button.offsetHeight));

    // Setze die neue Position des Buttons
    button.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
}

// Event: Maus über dem Button
button.addEventListener("mouseout", () => {
    if (!isMouseOver) {
        isMouseOver = true;

        // Starte den Timer für 3 Sekunden
        timer = setTimeout(() => {
            button.style.transform = "scale(1.5)"; // Button vergrößern
            button.style.transition = "transform 0.5s ease"; // Animation für Vergrößerung
            isMouseOver = false; // Timer abgeschlossen
        }, 3000);
    }   
});

// Event: Maus verlässt den Button
button.addEventListener("mouseover", () => {
    clearTimeout(timer); // Timer zurücksetzen
    isMouseOver = false; // Maus ist nicht mehr über dem Button
    moveButtonRandomly(); // Button bewegt sich zufällig
});



function calcDayofBirthdayNextYear() {
    // Berechnung des Wochentags
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const today = new Date();
    let birthdayLastYear = new Date(today.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    // Überprüfen, ob der Geburtstag in diesem Jahr noch nicht stattgefunden hat
    if (today > birthdayLastYear) {
        birthdayLastYear.setFullYear(today.getFullYear() + 1); // Setze den Geburtstag auf das nächste Jahr
        const dayOfWeek = daysOfWeek[birthdayLastYear.getDay()]; // Wochentag ermitteln
        // Ausgabe des Wochentags
        const dayOutput = document.getElementById("dayOfBirthdayNextYear");
        dayOutput.textContent = `Dein Geburtstag wird ein ${dayOfWeek} sein.`;
    } else {
        birthdayLastYear.setFullYear(today.getFullYear()); // Setze den Geburtstag auf das aktuelle Jahr
        const dayOfWeek = daysOfWeek[birthdayLastYear.getDay()]; // Wochentag ermitteln
        // Ausgabe des Wochentags
        const dayOutput = document.getElementById("dayOfBirthdayNextYear");
        dayOutput.textContent = `Dein Geburtstag wird ein ${dayOfWeek} sein.`;
    }
}

function calcDayofBirthdayLastYear() {
    // Berechnung des Wochentags
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const today = new Date();
    let birthdayLastYear = new Date(today.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    // Überprüfen, ob der Geburtstag in diesem Jahr noch nicht stattgefunden hat
    if (today > birthdayLastYear && today.getFullYear() == birthdayLastYear.getFullYear()) {
        birthdayLastYear.setFullYear(today.getFullYear()); // Setze den Geburtstag auf das vorherige Jahr
    } else {
        birthdayLastYear.setFullYear(today.getFullYear() - 1); // Setze den Geburtstag auf dieses Jahr
    }
    const dayOfWeek = daysOfWeek[birthdayLastYear.getDay()]; // Wochentag ermitteln
    // Ausgabe des Wochentags
    const dayOutput = document.getElementById("dayOfBirthdayLastYear");
    dayOutput.textContent = `Dein letzter Geburtstag war ein ${dayOfWeek}.`;
}


function calcDaysFromBirthday() {
    const today = new Date();
    let birthday = new Date(today.getFullYear(), dateInput.getMonth(), dateInput.getDate());

    // Überprüfen, ob der Geburtstag in diesem Jahr noch nicht stattgefunden hat
    if (today < birthday) {
        birthday.setFullYear(today.getFullYear() - 1); // Setze den Geburtstag auf das vorherige Jahr
    }

    const timeDiff = today - birthday; // Zeitdifferenz in Millisekunden
    const daysFromBirthday = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Umrechnung in Tage

    // Ausgabe der Tage seit dem letzten Geburtstag
    const daysOutput = document.getElementById("daysFromBirthday");
    daysOutput.textContent = `Es sind ${daysFromBirthday} Tage seit deinem letzten Geburtstag vergangen.`;
}

function calcDaysToBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }
    const timeDiff = birthday - today;
    const daysToBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    // Ausgabe der Tage bis zum Geburtstag
    const daysOutput = document.getElementById("daysToBirthday");
    daysOutput.textContent = `Es sind noch ${daysToBirthday} Tage bis zu deinem Geburtstag.`;

}

function calcAge() {
    // Berechnung des Alters
    const today = new Date();
    const ageInMilliseconds = today - dateInput;
    console.log("calcAge " + dateInput)
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

    // Ausgabe des Alters
    const ageOutput = document.getElementById("age");
    ageOutput.textContent = `Du bist ${ageInYears} Jahre alt.`;

}

function startCalc() {
    // Vorherige error-Nachricht entfernen
    const previousErrorMessage = document.getElementById("error-message");
    if (previousErrorMessage) {
        previousErrorMessage.remove();
    }
    // Input-Feld auslesen
    let inputDateValue = document.getElementById("date");

    // Datum aufteilen in Tag, Monat, Jahr
    [day, month, year] = inputDateValue.value.split(".");
    // Neues Date-Objekt erstellen
    dateInput = new Date(`${year}-${month}-${day}`);
    console.log("startCalc " + month)
    date = dateInput.toLocaleDateString("de-DE"); // Formatierung des Datums

    // Überprüfe, ob Month ein String ist
    if (typeof month === "string") {
        // Konvertiere Month in eine Zahl
        month = parseInt(month);
    }

    // Überprüfen, ob das Datum gültig ist
    if (!checkDate()) {
        return;
    }
    console.log(day + " " + month + " " + year);
    console.log(dateInput);

    // Berechnung des Alters
    calcAge();
    // Berechnung der Tage bis zum Geburtstag
    calcDaysToBirthday();
    // Berechnung der Tage seit dem Geburtstag
    calcDaysFromBirthday();
    // Berechnung des Wochentags
    calcDayofBirthdayLastYear();
    calcDayofBirthdayNextYear();
}

function checkDate() {
    // Überprüfen, ob das Datum gültig ist
    let inputDateValue = document.getElementById("date").value.trim();
    let dateParts;

    // Prüfen, ob das Datum im Format "TT.MM.JJJJ" oder "TT Monat JJJJ" vorliegt
    if (inputDateValue.includes(".")) {
        // Format "TT.MM.JJJJ"
        dateParts = inputDateValue.split(".");
    } else {
        // Format "TT Monat JJJJ"
        dateParts = inputDateValue.split(" ");
    }


    day = parseInt(dateParts[0]);
    month = dateParts[1];
    year = parseInt(dateParts[2]);

    // Überprüfen, ob im Monat eine 0 steht
    if (dateParts[1].length === 2 && dateParts[1].startsWith("0")) {
        month = parseInt(dateParts[1].substring(1));
    } else {
        month = dateParts[1];
    }
    console.log("checkDate month " + month)

    dateInput = new Date(`${year}-${month}-${day}`);
    console.log("checkDate "+dateInput)
    date = dateInput.toLocaleDateString("de-DE"); // Formatierung des Datums


    // Wenn der Monat ein String ist, konvertiere ihn in eine Zahl
    if (isNaN(parseInt(month))) {
        const months = [
            "januar", "februar", "märz", "april", "mai", "juni", "juli",
            "august", "september", "oktober", "november", "dezember",
        ];
        month = months.findIndex(m => m.toLowerCase() === month.toLowerCase()) + 1;
    } else {
        month = parseInt(month);
    }

    // Überprüfen, ob das Datum im richtigen Format ist
    if (dateParts.length !== 3 || isNaN(day) || isNaN(month) || isNaN(year)) {
        // Vorherige error-Nachricht entfernen
        const previousErrorMessage = document.getElementById("error-message");
        if (previousErrorMessage) {
            previousErrorMessage.remove();
        }
        // p löschen
        const ageOutput = document.getElementById("age");
        ageOutput.textContent = "";
        const daysOutput = document.getElementById("daysFromBirthday");
        daysOutput.textContent = "";
        const daysOutput2 = document.getElementById("daysToBirthday");
        daysOutput2.textContent = "";
        const dayOutput = document.getElementById("dayOfBirthdayLastYear");
        dayOutput.textContent = "";
        const dayOutput2 = document.getElementById("dayOfBirthdayNextYear");
        dayOutput2.textContent = "";

        const feedback = document.getElementById("feedback");
        const errorMessage = document.createElement("p");
        errorMessage.id = "error-message"; // Eindeutige ID hinzufügen
        errorMessage.textContent = "Bitte geben Sie ein Datum im Format TT.MM.JJJJ oder TT Monat JJJJ ein.";
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bold";
        errorMessage.style.fontSize = "1.2em";
        errorMessage.style.justifyContent = "center";
        feedback.insertBefore(errorMessage, feedback.firstChild);
        return false;
    }

    // Überprüfen, ob das Datum gültig ist
    if (day > 31 || month > 12 || year < 1900) {
        // Vorherige error-Nachricht entfernen
        const previousErrorMessage = document.getElementById("error-message");
        if (previousErrorMessage) {
            previousErrorMessage.remove();
        }
        // p löschen
        const ageOutput = document.getElementById("age");
        ageOutput.textContent = "";
        const daysOutput = document.getElementById("daysFromBirthday");
        daysOutput.textContent = "";
        const daysOutput2 = document.getElementById("daysToBirthday");
        daysOutput2.textContent = "";
        const dayOutput = document.getElementById("dayOfBirthdayLastYear");
        dayOutput.textContent = "";
        const dayOutput2 = document.getElementById("dayOfBirthdayNextYear");
        dayOutput2.textContent = "";
        // Neues Fehler-Element erstellen
        const feedback = document.getElementById("feedback");
        const errorMessage = document.createElement("p");
        errorMessage.id = "error-message"; // Eindeutige ID hinzufügen
        errorMessage.textContent = "Bitte geben Sie ein gültiges Datum ein. Tag: 1-31, Monat: 1-12, Jahr: >= 1900.";
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bold";
        errorMessage.style.fontSize = "1.2em";
        errorMessage.style.justifyContent = "center";
        feedback.insertBefore(errorMessage, feedback.firstChild);
        return false;
    }
    return true;
}