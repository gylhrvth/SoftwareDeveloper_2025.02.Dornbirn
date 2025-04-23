/**
 * Fetch weather data from the Open-Meteo API and display it.
 */
async function fetchWeatherData() {
    
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=47.4181880275474&longitude=9.73897217099881&timezone=Europe%2FBerlin&daily=sunrise,sunset,weather_code,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max';

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (response.ok) {
            const weatherData = await response.json(); // Parse the JSON response
            displayWeatherData(weatherData); // Display the weather data
        } else {
            console.error('Failed to fetch weather data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const weatherElement = document.getElementById('weather'); // Select the container for weather data

    // Clear any existing content
    weatherElement.innerHTML = '';

    // Display basic weather information
    const title = document.createElement('h2');
    title.textContent = 'Weather Forecast';
    weatherElement.appendChild(title);

    // Display sunrise and sunset times
    const sunrise = document.createElement('p');
    sunrise.textContent = `Sunrise: ${data.daily.sunrise[0]}`;
    weatherElement.appendChild(sunrise);

    const sunset = document.createElement('p');
    sunset.textContent = `Sunset: ${data.daily.sunset[0]}`;
    weatherElement.appendChild(sunset);

    // Display temperature information
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: Max ${data.daily.temperature_2m_max[0]}°C, Min ${data.daily.temperature_2m_min[0]}°C`;
    weatherElement.appendChild(temperature);

    // Display wind information
    const wind = document.createElement('p');
    wind.textContent = `Wind: Max Speed ${data.daily.wind_speed_10m_max[0]} km/h, Dominant Direction ${data.daily.wind_direction_10m_dominant[0]}°`;
    weatherElement.appendChild(wind);

    // Display UV index
    const uvIndex = document.createElement('p');
    uvIndex.textContent = `UV Index: Max ${data.daily.uv_index_max[0]}`;
    weatherElement.appendChild(uvIndex);

    // Display precipitation probability
    const precipitation = document.createElement('p');
    precipitation.textContent = `Precipitation Probability: Max ${data.daily.precipitation_probability_max[0]}%`;
    weatherElement.appendChild(precipitation);
}