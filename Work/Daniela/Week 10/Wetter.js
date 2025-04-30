
/*const serverIP = "http://192.168.0.71:3000"; // Server-Adresse


const server = "http://192.168.0.71:3000";
fetch(server + "/objects/")
    .then(res => res.json()) // Antwort umwandeln
    .then(data => console.log("Ein Objekt mit ID ", data))
    .catch(err => console.error("Fehler beim Abrufen eines Objekts:", err));



async function listAll() {
    let result = await fetch(server + "/objects")
    if (!result.ok) {
        console.error('listAll(): Fetch ist schiefgegangen ...')
        return
    }
    let data = await result.json()
    data.forEach((element, index) => {
        console.log(` Element ${index + 1}:`, element);
    });
}
const id = 10; // Die ID des Objekts, das du holen willst
async function getOne(id) {
    let result = await fetch(server + "/objects/" + id)
    if (!result.ok) {
        console.error('getOne(): Fetch ist schiefgegangen ...')
        return
    }
    let data = await result.json()
    console.log(data)
    return data
};*/

//-----------------------------------------------------------------------------------------------------------------------------------

//Aktuelleswetter
const CitySelect = document.getElementById("citySelect");
const button = document.getElementById("getWeather");
const output = document.getElementById("output");

const cityCoordinates = {
    "Bregenz": { latitude: 47.5031, longitude: 9.7471 },
    "Dornbirn": { latitude: 47.4125, longitude: 9.7417 },
    "Feldkirch": { latitude: 47.2333, longitude: 9.6 },
    "Bludenz": { latitude: 47.15, longitude: 9.8167 }
}

button.addEventListener("click", () => {
    const city = citySelect.value;
    const { latitude, longitude } = cityCoordinates[city];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;


    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Fehler beim Aufrufen der Daten");
            return response.json();
        })
        .then(data => {
            const weather = data.current_weather;

            if (!weather) {
                output.textContent = "Keine Wetterdaten gefunden.";
                return;
            }

            const weatherDescriptions = {
                0: "Klarer Himmel ☀️",
                1: "Überwiegend klar 🌤️",
                2: "Teilweise bewölkt ⛅",
                3: "Bewölkt ☁️",
                45: "Nebel 🌫️",
                48: "Reifnebel 🌫️❄️",
                51: "Leichter Nieselregen 🌦️",
                61: "Leichter Regen 🌧️",
                71: "Leichter Schneefall 🌨️",
                80: "Regenschauer 🌧️",
                95: "Gewitter ⛈️"
                // usw. – du kannst weitere Codes hinzufügen
            };

            const code = weather.weathercode;
            const description = weatherDescriptions[code] || "Unbekanntes Wetter";

            output.innerHTML = `
                <h2> Aktuelles Wetter in ${city}:</h2>        
                <p> Temperatur: ${weather.temperature}°C </p>
                <p> Wetter: ${description}</p>
                <p> Wind: ${weather.windspeed}km/h </p>`;

            output.style.display = "block";
        })

        .catch(error => {
            output.textContent = "Fehler:" + error.message;
        });

    threeDayDisplay(latitude, longitude);


    //---------------------------------------------------------------------

    //Board für Wetter anzeige 

    async function threeDayDisplay(latitude, longitude) {
        const container = document.querySelector("#container");
        container.innerHTML = "";

        //Überschrift

        const section = document.querySelector("#weatherDailyTrend");

        const heading = document.createElement("h2");
        heading.textContent = `3 Tage Wetter-Trend für ${city}`;
        section.insertBefore(heading, container);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weather_code,temperature_2m_min,rain_sum&forecast_days=3&timezone=auto`;

        try {
            const response = await fetch(url);
            const weatherData = await response.json();
            const daily = weatherData.daily;

            for (let i = 0; i < daily.time.length; i++) {
                const col = document.createElement("div");
                col.classList.add("col");



                const date = document.createElement("div");
                date.textContent = new Date(daily.time[i]).toLocaleDateString();
                date.style.padding = "0.5em";
                date.style.fontWeight = "900";
                date.style.fontSize = "1.2em";
                col.appendChild(date);

                const maxTemp = document.createElement("div");
                maxTemp.textContent = `Maximum Temperature: ${daily.temperature_2m_max[i]}°C`;
                maxTemp.style.padding = "0.5em";
                col.appendChild(maxTemp);

                const minTemp = document.createElement("div");
                minTemp.textContent = `Minimum Temperature: ${daily.temperature_2m_min[i]}°C`;
                minTemp.style.padding = "0.5em";
                col.appendChild(minTemp);


                const weatherEmojis = {
                    0: "☀️ Klar",
                    1: "🌤️ Überwiegend klar",
                    2: "⛅ Teilweise bewölkt",
                    3: "☁️ Bewölkt",
                    45: "🌫️ Nebel",
                    48: "🌫️❄️ Reifnebel",
                    51: "🌦️ Leichter Nieselregen",
                    61: "🌧️ Leichter Regen",
                    71: "🌨️ Leichter Schneefall",
                    80: "🌧️ Regenschauer",
                    81: "🌦️ Regenschauer (moderat)",
                    95: "⛈️ Gewitter"
                };
                const weatherCode = document.createElement("div");
                const code = daily.weather_code[i];
                const emoji = weatherEmojis[code];
                weatherCode.textContent = `Wetter:${emoji}`;
                weatherCode.style.padding = "0.5em";
                col.appendChild(weatherCode);

                const rain = document.createElement("div");
                rain.textContent = `Regenmenge: ${daily.rain_sum[i]}mm`;
                rain.style.padding = "0.5em";
                col.appendChild(rain);

                container.appendChild(col);
            }

        } catch (error) {
            console.error("Fehler beim Laden", error);
        }

        //-----Button for sunset and sunrise/ in every col---------------------------------------------

            





    };

});



