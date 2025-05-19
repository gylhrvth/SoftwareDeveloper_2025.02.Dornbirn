

async function fetchJoke() {
    try {
        const response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    }
}

fetchJoke();

// Im Terminal: node fetchJokes.js