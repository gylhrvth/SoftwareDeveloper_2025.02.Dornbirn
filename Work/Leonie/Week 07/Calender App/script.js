let date = "";
let dateInput = "";
let day = "";
let month = "";
let year = "";
let inputDateValue = "";


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
        console.log("TRUE")
    } else {
        birthdayLastYear.setFullYear(today.getFullYear()); // Setze den Geburtstag auf das aktuelle Jahr
        const dayOfWeek = daysOfWeek[birthdayLastYear.getDay()]; // Wochentag ermitteln
        // Ausgabe des Wochentags
        const dayOutput = document.getElementById("dayOfBirthdayNextYear");
        dayOutput.textContent = `Dein Geburtstag wird ein ${dayOfWeek} sein.`;
        console.log("FALSE")
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
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

    // Ausgabe des Alters
    const ageOutput = document.getElementById("age");
    ageOutput.textContent = `Du bist ${ageInYears} Jahre alt.`;

}

function startCalc() {
    // Input-Feld auslesen
    let inputDateValue = document.getElementById("date");

    // Datum aufteilen in Tag, Monat, Jahr
    [day, month, year] = inputDateValue.value.split(".");
    // Neues Date-Objekt erstellen
    dateInput = new Date(`${year}-${month}-${day}`);
    date = dateInput.toLocaleDateString("de-DE") // Formatierung des Datums

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