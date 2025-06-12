function f() {
    fetch('https://sv443.net/jokeapi/v2/joke/Programming')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        }
        )
        .then(data => { 
        console.log(data);
       }     
    )
        .catch(error => {
            console.error('Es gab ein Problem mit der Fetch-Operation:', error);
        });
}
 
 f();
 
//  async function fetchJoke(){
//     try{
//         const response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming')
//         const data = await response.json();

//         if (data.type === "single"){
//             console.log("Witz:", data.joke);
//         } else if (data.type === "twopart"){
//             console.log("Frage:", data.setup);
//             console.log("flags:", data.delivery)
//         } else {
//             console.log(data);
//         }
//     } catch (error){
//         console.error('Fehler beim Laden der Daten:', error);
//     }
// }
//     fetchJoke();

    // im Terminal: npm run dev
