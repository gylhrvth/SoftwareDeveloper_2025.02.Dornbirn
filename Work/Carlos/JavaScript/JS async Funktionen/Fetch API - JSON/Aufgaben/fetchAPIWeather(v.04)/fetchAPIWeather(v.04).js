

//


async function fetchWeatherData() {
    // Get the selected location's latitude and longitude
    const locationDropdown = document.getElementById("location");
    const selectedLocation = locationDropdown.value; // Format: "latitude,longitude"
    const [latitude, longitude] = selectedLocation.split(",");

    // Construct the API URL with the selected location
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset,weather_code,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timezone=Europe%2FBerlin`;

    try {
        const result = await fetch(apiUrl);
        if (result.ok) {
            const content = await result.json();
            console.log(content);
            showWeatherData(content);
        } else {
            console.log("Server is not ready");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function showWeatherData(weatherData) {
    const weatherDataElement = document.getElementById("weatherData");
    
    weatherDataElement.innerHTML = ""; // Clear previous data

    let divMain = document.createElement("div");
    divMain.classList.add("result");
    divMain.style.gridTemplateColumns = `repeat(${1 + weatherData.daily.time.length}, 1fr)`;
    
    createHeadline(weatherData, divMain);
    createWeekDayName(weatherData, divMain)
    createWeatherIcons(weatherData, divMain); // Add weather icons
    createMinTemp(weatherData, divMain);
    createMaxTemp(weatherData, divMain);
    createPrecipitationProbability(weatherData, divMain)
 

    weatherDataElement.appendChild(divMain);
}

function createHeadline(weatherData, divMain) {
    let cell = document.createElement("div");
    cell.classList.add("cell", "headline");
    divMain.appendChild(cell);
    cell.textContent = "";

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", "headline");
        cell.textContent = weatherData.daily.time[i];
        divMain.appendChild(cell);
    }
}

function createWeatherIcons(weatherData, divMain) {
    
    const weatherCodeIcons = {
        0: "./icons/clearDay.svg", // Clear sky
        1: "./icons/partlyCloudy.svg", // Mainly clear
        2: "./icons/partlyCloudy.svg", // Partly cloudy
        3: "./icons/cloud.svg", // Overcast
        45: "./icons/foggy.svg", // Fog
        48: "./icons/foggy.svg", // Depositing rime fog
        51: "./icons/rainyLight.svg", // Drizzle: Light
        53: "./icons/rainyLight.svg", // Drizzle: Moderate
        55: "./icons/rainyLight.svg", // Drizzle: Dense
        61: "./icons/rainy.svg", // Rain: Slight
        63: "./icons/rainy.svg", // Rain: Moderate
        65: "./icons/rainyHeavy.svg", // Rain: Heavy
        71: "./icons/snowy.svg", // Snow fall: Slight
        73: "./icons/snow.svg", // Snow fall: Moderate
        75: "./icons/heavySnow.svg", // Snow fall: Heavy
        80: "./icons/sunRain.png", // Rain showers: Slight
        81: "./icons/sunRain.png", // Rain showers: Moderate
        82: "./icons/sunRain.png", // Rain showers: Violent
        95: "./icons/thunderstorm.svg", // Thunderstorm: Slight or moderate
        96: "./icons/thunderstorm.svg", // Thunderstorm with slight hail
        99: "./icons/hailStorm.png", // Thunderstorm with heavy hail
    };

    // The weatherCodeIcons object maps weather codes to their corresponding icons

    // Create a cell for the weather icons
    let cell = document.createElement("div");
    // Add a title for the weather icons
    cell.classList.add("cell", "title");
    cell.textContent = "Weather";
    divMain.appendChild(cell);

    // Loop through the weather codes and create cells for each day

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Get the weather code for the day
        const weatherCode = weatherData.daily.weather_code[i];

        // Get the corresponding image URL from the mapping // The retrieved weatherCode is not used as an index because it is not an array. It is used as a key that retrieves the value from the weatherCodeIcons object (icons).
        const imageUrl = weatherCodeIcons[weatherCode] || "icons/default.png"; // Default image if code is not found

       // Create an <img> element
        const img = document.createElement("img");
        img.src = imageUrl; // Set the image source
        img.alt = `Weather icon for code ${weatherCode}`; // Set an alt text for accessibility
        img.style.width = "50px"; // Optional: Set the image size
        img.style.height = "50px"; // Optional: Set the image size

        // Append the <img> element to the cell
        cell.appendChild(img);
            
        // Append the cell to the main container
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

}

function createWeekDayName(weatherData, divMain) {
    // Create a cell for the weekday names
    // The weekday names are created from the date
    let cell = document.createElement("div");
    cell.classList.add("cell", "title");
    cell.textContent = "Weekday";
    divMain.appendChild(cell);
    // Loop through the weather data and create cells for each day
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        // Create a new Date object from the date string
        // The date string is in the format "YYYY-MM-DD"
        const date = new Date(weatherData.daily.time[i]);
        // Get the weekday name using toLocaleDateString
        // The weekday name is in the format "short" (e.g., "Mon", "Tue", etc.)
        const weekdayName = date.toLocaleDateString("en-US", { weekday: "short" });
        cell.textContent = weekdayName;
        divMain.appendChild(cell);
    }
}


    function createPrecipitationProbability(weatherData, divMain) {
        let cell = document.createElement("div");
        cell.classList.add("cell", "title");
        cell.textContent = "Precipitation Probability";
        divMain.appendChild(cell);

        for (let i = 0; i < weatherData.daily.time.length; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = weatherData.daily.precipitation_probability_max[i] + " " + weatherData.daily_units.precipitation_probability_max;
            divMain.appendChild(cell);
        }
    }
