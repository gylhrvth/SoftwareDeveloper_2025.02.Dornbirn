/**
 * TicTacToe Spiel implementiert in React mit TypeScript
 * @file App.tsx
 */

import { useState } from 'react'
import './App.css'

/**
 * Hauptkomponente des TicTacToe Spiels
 * @component
 * @returns {JSX.Element} Die gerenderte App-Komponente
 */
export default function App() {
    // State für den aktuellen Spieler (X oder O)
    const [xTurn, setXTurn] = useState(true);
    // State für das Spielfeld - Array mit 9 Feldern, initial null
    const [squares, setSquares] = useState(Array(9).fill(null));

    /**
     * Behandelt Klicks auf ein Spielfeld
     * @param {number} i - Index des geklickten Feldes (0-8)
     * @returns {void}
     */
    function handleClick(i: number) {
        // Prüft ob das Feld schon besetzt ist
        if (squares[i]) {
            console.log(`Square ${i} is already filled with ${squares[i]}`);
            return;
        }
        // Erstellt Kopie des aktuellen Spielfelds
        const newSquares = squares.slice();

        // Setzt X oder O je nach aktuellem Spieler
        if (xTurn) {
            newSquares[i] = 'X';
            setSquares(newSquares);
            setXTurn(false); // Wechsel zu Spieler O
        } else {
            newSquares[i] = 'O';
            setSquares(newSquares);
            setXTurn(true); // Wechsel zu Spieler X
        }
    }

    return (
        <>
            <div className="App">
                <h1>Tic Tac Toe</h1>
            </div>
            {/* Rendert 9 Spielfeld-Buttons mit jeweiligem Wert und Click-Handler */}
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        </>
    )
}

/**
 * Einzelnes Spielfeld-Button
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Wert des Feldes (X, O oder null)
 * @param {() => void} props.onSquareClick - Click-Handler Funktion
 * @returns {JSX.Element} Ein Button-Element
 */
function Square({ value ,onSquareClick }: { value: string ,onSquareClick: () => void }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}</button>
    );
}