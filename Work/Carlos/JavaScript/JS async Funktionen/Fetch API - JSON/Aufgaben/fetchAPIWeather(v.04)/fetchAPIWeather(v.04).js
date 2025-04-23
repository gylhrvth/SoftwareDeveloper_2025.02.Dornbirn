

async function fetchWeatherData() {

    let result = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.4181880275474&longitude=9.73897217099881&daily=sunrise,sunset,weather_code,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timezone=Europe%2FBerlin&forecast_days=14');
    if (result.ok) {
        let content = await result.json();
        console.log(content);
        showWeatherData(content);
    } else {
        console.log("Server is not ready");;
    }
}

function showWeatherData(weatherData) {
    const weatherDataElement = document.getElementById("weatherData");
    
    weatherDataElement.innerHTML = ""; // Clear previous data

    let divMain = document.createElement("div");
    divMain.classList.add("result");
    divMain.style.gridTemplateColumns = `repeat(${1 + weatherData.daily.time.length}, 1fr)`;
    
    createHeadline(weatherData, divMain);
    createMinTemp(weatherData, divMain);
    createMaxTemp(weatherData, divMain);
    //createPrecipitationProbability(weatherData, divMain);
    // todo

    weatherDataElement.appendChild(divMain);
}

function createHeadline(weatherData, divMain) {
    let cell = document.createElement("div");
    cell.classList.add("cell", "headline");
    divMain.appendChild(cell);
    cell.textContent = "Dornbirn";

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "headline");
        cell.textContent = weatherData.daily.time[i];
        divMain.appendChild(cell);
    }
}

function createMinTemp(weatherData, divMain) {
    let cell = document.createElement("div");
    cell.classList.add("cell", "title");
    cell.textContent = "Min. Temp.";
    divMain.appendChild(cell);

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = weatherData.daily.temperature_2m_min[i] + " " + weatherData.daily_units.temperature_2m_min;
        divMain.appendChild(cell);
    }
}

function createMaxTemp(weatherData, divMain) {
    let cell = document.createElement("div");
    cell.classList.add("cell", "title");
    cell.textContent = "Max. Temp.";
    divMain.appendChild(cell);

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = weatherData.daily.temperature_2m_max[i] + " " + weatherData.daily_units.temperature_2m_max;
        divMain.appendChild(cell);
    }

//function createPrecipitationProbability(weatherData, divMain);

}