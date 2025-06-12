import { useState, useEffect } from 'react';
import "./App.css";

interface MemoryCardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function App() {
  //[zustand, funktion für zustands aktualisierung]
  const [cards, setCards] = useState<MemoryCardProps[]>([]);
  const [firstCard, setFirstCard] = useState<MemoryCardProps | null>(null);
  const [secondCard, setSecondCard] = useState<MemoryCardProps | null>(null);
  const [lockBoard, setLockBoard] = useState(false); //zu schnelles klicken wird verhindert 

  //States für Spieler
  const [players, setPlayers] = useState<string[]>(["Spieler1", "Spieler2"]);
  const [scores, setScores] = useState<number[]>([0, 0]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Neues Spiel starten: Karten neu mischen, Zustände zurücksetzen
  const handleStartGame = () => {
    setCards(createShuffledDeck());       // neues gemischtes Kartendeck
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setScores(players.map(() => 0));      // alle Spieler wieder bei 0 Punkten
    setCurrentPlayerIndex(0);             // Spieler 1 beginnt
  };

  // Neuen Spieler hinzufügen
  const handleAddPlayer = () => {
    const newPlayerName = `Spieler${players.length + 1}`;
    setPlayers([...players, newPlayerName]);          // neuen Spieler ins Array
    setScores([...scores, 0]);                        // 0 Punkte für neuen Spieler
  };


  //Deck beim start genierieren 
  useEffect(() => {     // bei spiel start neues CardDeck holen, mischen und anordnen 
    setCards(createShuffledDeck()); //setze die karten kreiere ein gemischtes deck 
  }, []);

  //Karten klicken um zu flippen 
  const handleCardClick = (clickedCard: MemoryCardProps) => { //wird auf karte geklickt handel click wird aufgerufen 
    if (lockBoard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const flippedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );

    setCards(flippedCards);

    if (!firstCard) {
      //  Wenn noch keine Karte offen ist, speichere die aktuelle als erste
      setFirstCard(clickedCard);
    } else if (!secondCard) {
      setSecondCard(clickedCard); // wenn secondCard warten bis vergleich 
      setLockBoard(true);     // bis vergleich, Spieler kann nicht klicken 
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      const match = firstCard.emoji === secondCard.emoji;

      setTimeout(() => {
        if (match) {
          //"prev" === vorher -> bedeutet: vorheriger Zustand
          setCards((prev) =>      // prev für sofortige und mehrfach hintereinander volgende änderungen 
            prev.map((card) =>    // durch jede Card iterieren 
              card.emoji === firstCard.emoji
                ? { ...card, isMatched: true } //...card -> alte card wenn match/true bleibt offen
                : card
            )
          );

          //Punktestand erhöhen für currentPlayer
          setScores((prevScores) => {
            const newScores = [...prevScores];
            newScores[currentPlayerIndex] += 1;
            return newScores;
          });
          //Spieler bleibt dran
        } else {
          setCards((prev) =>
            prev.map((card) =>    //durch iterieren, wenn id 1&2 flase flipp back 
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false } // ... behalte alte Werte bei änder aber aktuell betätigtes
                : card    // alle anderen cards bleiben wie gehabt 
            )
          );
          setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        }

        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);
      }, 1000);     //1 sek pause 
    }
  }, [firstCard, secondCard]);


  return (

    <div className="Container">
      <h1>🌻Memory🌼</h1>

      <div className="playersSettings">
        {players.map((player, i) => (
          <div key={i} className={`player ${currentPlayerIndex === i ? "active" : ""}`}>
            <input
              type="text"
              value={player}
              onChange={(e) => {
                const newPlayers = [...players];
                newPlayers[i] = e.target.value;
                setPlayers(newPlayers);
              }}
              placeholder={`Spieler ${i + 1}`}
            />
          </div>
        ))}
        <button onClick={handleStartGame} className="startBtn">Start Game</button>
        <button onClick={handleAddPlayer} className="addBtn">+ Add Player</button>
      </div>


      <div className="wrapper">
        
        <div className="playersBoxWrapper">
          {players.map((player, i) => ( //Box für Spieler stand 
            <div
              key={i}
              className={`playersBox ${currentPlayerIndex === i ? "activePlayer" : ""}`}
            >
              <h3>{player}</h3>
              <p>Punkte: {scores[i]}</p>
            </div>
          ))}
        </div>

        <div className="gameBoard">
          {cards.map((card) => (
            <div key={card.id}
              className={`card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              {card.isFlipped || card.isMatched ? card.emoji : "❓"}
            </div>
          ))}
        </div>


      </div>
    </div>
  );

}
export default App;

//Array with Pairs 
const emojiList = ['🐯', '🐘', '🐓', '🐳', '🐸', '🐈‍⬛', '🐧', '🐻', '🐮', '🐕', '🍒', '🥦', '🍇', '🍊', '🍌', '🍩', '🍕', '🥕', '🥨', '🍉', '🧁'];
//mischt das doppelte deck per Fischer-Yates-Log 
function fisherYatesShuffle<T>(array: T[]): T[] {   //T -> platzhalter für belibige Typen

  const shuffled = [...array];      //Kopie des orginal Array
  //Fisher-Yates-Algorithmus 
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));    //zufalsindex
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; //Tauschen 
  }
  return shuffled;
}

function createShuffledDeck(): MemoryCardProps[] {

  const pairedEmoji = [...emojiList, ...emojiList];   //verdoppelt das Array
  const shuffled = fisherYatesShuffle(pairedEmoji);

  return shuffled.map((emoji, index) => ({    //umwandlung des Emoji-Array(sting) in Array aus Memory-Card-Objekt
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  }));
}