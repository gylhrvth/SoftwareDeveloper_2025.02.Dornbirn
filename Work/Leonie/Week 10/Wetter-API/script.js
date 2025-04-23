async function startSearch() {
    const city = document.getElementById("city").value;

    let response = await fetch(`https://api.open-meteo.com/v1/forecast?${city}&daily=sunrise,sunset,weather_code,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timezone=Europe%2FBerlin`);
    if (response.ok) {
        let data = await response.json();
        let weatherData = data.daily;
        createWeatherInfo(weatherData);
    } else {
        weatherContainer = document.getElementById("weatherResult");
        weatherContainer.innerHTML = ""

        let error = document.createElement("p");
        error.textContent = "Error: " + response.status + " " + response.statusText;
        error.className = "error";
        weatherContainer.appendChild(error);
    }

}

function calculateWeatherCode(weatherCode) {
    const weatherCodeMapping = {
        0: { text: "Clear sky", img: "img/sunny_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        1: { text: "Mainly clear", img: "img/cloud_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        2: { text: "Mainly clear", img: "img/cloud_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        3: { text: "Mainly clear", img: "img/cloud_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        45: { text: "Fog", img: "img/foggy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        46: { text: "Fog", img: "img/foggy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        47: { text: "Fog", img: "img/foggy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        48: { text: "Fog", img: "img/foggy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        51: { text: "Drizzle", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        52: { text: "Drizzle", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        53: { text: "Drizzle", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        54: { text: "Drizzle", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        55: { text: "Drizzle", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        61: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        62: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        63: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        64: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        65: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        66: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        67: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        71: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        72: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        73: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        74: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        75: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        76: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        77: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        80: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        81: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        82: { text: "Rain showers", img: "img/rainy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        85: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        86: { text: "Snow showers", img: "img/weather_snowy_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" },
        95: { text: "Thunderstorm", img: "img/thunderstorm_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg" }
    };

    let arr = weatherCode.map(code => {
        let weather = weatherCodeMapping[code];
        if (weather) {
            return {
                text: weather.text,
                img: weather.img
            };
        } else {
            return {
                text: "Unknown",
                img: "img/unknown_64dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg"
            };
        }
    });

    return arr;
}

function createWeatherInfo(weatherData) {
    let weatherCode = calculateWeatherCode(weatherData.weather_code);
    let weatherContainer = document.getElementById("weatherResult");
    weatherContainer.innerHTML = "";
    for (let i = 0; i < weatherData.time.length; i++) {
        let dayDiv = document.createElement("div");
        dayDiv.className = "day";
        weatherContainer.appendChild(dayDiv);

        let date = weatherData.time[i];
        let sunrise = weatherData.sunrise[i];
        let sunset = weatherData.sunset[i];
        let weather = weatherCode[i].text;
        let precipitationSum = weatherData.precipitation_sum[i];
        let precipitationProbabilityMax = weatherData.precipitation_probability_max[i];
        let uvIndexMax = weatherData.uv_index_max[i];
        let sunshineDuration = weatherData.sunshine_duration[i];
        let temperature2mMax = weatherData.temperature_2m_max[i];
        let temperature2mMin = weatherData.temperature_2m_min[i];
        let windDirection10mDominant = weatherData.wind_direction_10m_dominant[i];
        let windSpeed10mMax = weatherData.wind_speed_10m_max[i];

        const dateElement = document.createElement("h3");
        dateElement.textContent = date;
        const weatherCodeElement = document.createElement("p");
        weatherCodeElement.textContent = "Weather: " + weatherCode[i].text;
        const temperature2mMaxElement = document.createElement("p");
        temperature2mMaxElement.textContent = "Temperature Max: " + temperature2mMax;
        const temperature2mMinElement = document.createElement("p");
        temperature2mMinElement.textContent = "Temperature Min: " + temperature2mMin;
        const windDirection10mDominantElement = document.createElement("p");
        windDirection10mDominantElement.textContent = "Wind Direction Dominant: " + windDirection10mDominant;
        const windSpeed10mMaxElement = document.createElement("p");
        windSpeed10mMaxElement.textContent = "Wind Speed Max: " + windSpeed10mMax;

        const weatherImg = document.createElement("img");
        weatherImg.src = weatherCode[i].img;
        weatherImg.alt = weatherCode[i].text;
        weatherImg.className = "weatherImg";
        dayDiv.appendChild(weatherImg);

        dayDiv.appendChild(dateElement);
        dayDiv.appendChild(weatherCodeElement);
        dayDiv.appendChild(temperature2mMaxElement);
        dayDiv.appendChild(temperature2mMinElement);
        dayDiv.appendChild(windDirection10mDominantElement);
        dayDiv.appendChild(windSpeed10mMaxElement);
    }
}