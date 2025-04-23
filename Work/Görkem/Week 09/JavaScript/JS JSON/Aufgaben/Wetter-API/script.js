
let cachedWeatherData = null;
async function fetchWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=47.4181880275474&longitude=9.73897217099881&daily=sunrise,sunset,weather_code,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timezone=Europe%2FBerlin";
    const weatherDiv = document.getElementById('weather');
    const daySelector = document.getElementById('daySelector');
    weatherDiv.innerHTML = "<p>Lade Wetterdaten...</p>";
    document.body.className = 'sunny';

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            cachedWeatherData = data;
            populateDaySelector(data.daily.time);
            displayWeather(data, 0);
        } else {
            weatherDiv.innerHTML = "<p>Fehler beim Abrufen der Wetterdaten.</p>";
        }
    } catch (error) {
        weatherDiv.innerHTML = `<p>Fehler: ${error.message}</p>`;
    }
}

function updateWeather(){
    const selectedDay = document.getElementById('daySelector').value;
    if (cachedWeatherData) {
        displayWeather(cachedWeatherData, selectedDay); // Verwende die zwischengespeicherten Daten
    }
}

function createWeatherItem(label, value, icon = "") {
    return `
        <div class="weather-item">
            <span class="label">${icon} ${label}:</span>
            <span class="value">${value}</span>
        </div>
    `;
}

function populateDaySelector(days) {
    const daySelector = document.getElementById('daySelector');
    daySelector.innerHTML = ""; // Entferne alte Optionen

    days.forEach((day, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = new Date(day).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
        daySelector.appendChild(option);
    });
    
    daySelector.value = 0; 
}

function displayWeather(data, dayIndex) {
    const weatherDiv = document.getElementById('weather');
    const daily = data.daily;

    if (!daily || !daily.time || daily.time.length === 0) {
        weatherDiv.innerHTML = "<p>Fehler: Ungültige Wetterdaten.</p>";
        return;
    }

    weatherDiv.innerHTML = `
        <h2>🌤️ Wettervorhersage für ${new Date(daily.time[dayIndex]).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}</h2>
        <div class="weather-item">
            <p><span>🌅 Sonnenaufgang:</span> ${formatTime(daily.sunrise[dayIndex])}</p>
            <p><span>🌇 Sonnenuntergang:</span> ${formatTime(daily.sunset[dayIndex])}</p>
            <p><span>🌡️ Temperatur:</span> ${daily.temperature_2m_max[dayIndex]}°C / ${daily.temperature_2m_min[dayIndex]}°C</p>
            <p><span>☀️ UV-Index:</span> ${daily.uv_index_max[dayIndex]}</p>
            <p><span>💨 Windgeschwindigkeit:</span> ${daily.wind_speed_10m_max[dayIndex]} km/h</p>
            <p><span>🌧️ Niederschlag:</span> ${daily.precipitation_sum[dayIndex]} mm</p>
        </div>
    `;
}

function formatTime(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}