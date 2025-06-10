

import './App.css'; // Import CSS styles
import { useEffect, useState } from 'react';

function App() {
  // useState: State-Variablen definieren
  const [category, setCategory] = useState('any'); // gewählte Kategorie für Witz
  const [joke, setJoke] = useState('');            // geladener Witz-Text
  const [color, setColor] = useState('black');     // Farbe für Überschrift

  const colors = ['black', 'red', 'green', 'blue', 'yellow']; // Farb-Palette

  // Event-Handler: Wird aufgerufen, wenn Kategorie im Dropdown geändert wird
  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value); // Aktualisiere Kategorie-State
  }

  // useEffect 1: Lädt einen Witz, wenn sich die Kategorie ändert
  useEffect(() => {
    // Asynchrone Funktion, um Daten von API zu holen
    const fetchData = async () => {
      try {
        // API-Aufruf mit gewählter Kategorie
        const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`);
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Fehlerbehandlung
        }
        const data = await response.json(); // JSON aus Antwort parsen
        setJoke(data.joke);                  // Witz im State speichern
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData(); // Funktion ausführen

  }, [category]); // useEffect läuft nur, wenn sich category ändert

  // useEffect 2: Wechselt jede Sekunde die Farbe der Überschrift
  useEffect(() => {
    // Timer starten, der jede Sekunde die Farbe ändert
    const intervalId = setInterval(() => {
      setColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor); // aktuelle Farbe finden
        const nextIndex = (currentIndex + 1) % colors.length; // nächste Farbe zyklisch auswählen
        return colors[nextIndex]; // neue Farbe zurückgeben
      })
    }, 1000);

    // Cleanup: Timer beim Verlassen der Komponente stoppen
    return () => clearInterval(intervalId);
  }, []); // leerer Abhängigkeits-Array → läuft nur einmal beim Mounten

  return (
    <>
      {/* Überschrift mit dynamischer Farbe */}
      <h1 style={{ color }}>Hello World!</h1>

      {/* Dropdown zur Kategorie-Auswahl */}
      <div>
        <select onChange={onCategoryChange} value={category}>
          <option value="any">Any</option>
          <option value="programming">Programming</option>
          <option value="pun">Pun</option>
          <option value="dark">Dark</option>
          <option value="misc">Misc</option>
        </select>
      </div>

      {/* Anzeige der gewählten Kategorie */}
      <div>
        <p>The selected category is: {category}</p>
      </div>

      {/* Anzeige des geladenen Witzes */}
      <div>
        <p>Joke: {joke}</p>
      </div>
    </>
  )
}

export default App
