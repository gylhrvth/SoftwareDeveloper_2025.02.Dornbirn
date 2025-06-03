//TicTacToe Spiel implementiert in React mit TypeScript

import { useState } from 'react'
import './App.css'

// Typdefinition für die Spielfeldinhalte
type SquareValue = 'X' | 'O' | null;

 //Hauptkomponente des TicTacToe Spiels

export default function App() {
    // State für den aktuellen Spieler (X oder O)
    const [xTurn, setXTurn] = useState(true);
    // State für das Spielfeld - Array mit 9 Feldern, initial null
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));

    
     //Behandelt Klicks auf ein Spielfeld

    function handleClick(i: number) {
        // Prüft, ob das Feld schon besetzt ist
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
            setXTurn(false);
        } else {
            newSquares[i] = 'O';
            setSquares(newSquares);
            setXTurn(true);
        }

        const winner = WinningCondition(newSquares);
        if (winner) {
            window.alert(`Game over! ${winner} has won.`);
            return;
        }
    }

    return (
        <>
            <div className="App">
                <h1>Tic Tac Toe</h1>
            </div>
            {/* Rendert 9 Spielfeld-Buttons mit jeweiligem Wert und Click-Handler */}
            <div className="status">
                {xTurn ? 'X\'s turn' : 'O\'s turn'}
            </div>

            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}

// Einzelner Spielfeld-Button
function Square({ value ,onSquareClick }: { value: SquareValue ,onSquareClick: () => void }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}</button>
    );
}

function WinningCondition(squares: SquareValue[]): SquareValue {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Gibt den Gewinner zurück
        }
    }
    return null; // Kein Gewinner
}
