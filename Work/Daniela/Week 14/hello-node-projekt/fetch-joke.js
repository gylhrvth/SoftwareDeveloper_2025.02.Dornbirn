const url = "https://sv443.net/jokeapi/v2/joke/Programming";

fetch(url)
.then(response => response.json()) //Antwort als JSON
.then(data =>{
    //Ausgabe console
    console.log("Joke fetched:")
    console.log(data);
})
.catch(error => {
    console.error("Fehler beim Laden des Jokes:" ,error)
});