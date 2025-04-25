 //Erste schritt, wir erstellen eine Funktion die uns die Daten von der API holt und prüft ob die Daten auch wirklich da sind.
 const API_URL = 'http://192.168.0.71:3000';

 async function fetchAndLogData (){
    try{
        const response = await fetch(API_URL+ "/objects");
        if (!response.ok){
            throw new Error (`HTTP-Fehler! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
            console.log('API-Daten erfolgreich geladen:', data);
          } else {
            console.log('Keine Daten in der API gefunden.');
          }
        } catch (error) {
          console.error('Fehler beim Abrufen der API-Daten:', error);
        }
      }

        const consoleLogButton = document.getElementById('consoleLogButton');
        consoleLogButton.addEventListener('click', fetchAndLogData);