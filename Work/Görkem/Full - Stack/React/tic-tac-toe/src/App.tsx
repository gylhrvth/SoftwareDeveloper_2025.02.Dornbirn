import { useEffect, useState } from 'react';
import './App.css'
import { Board } from './Board';

export default function Game() {
  const [history, setHistory] = useState<((string | null)[])[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const squares = history[currentMove];

  const [score, setScore] = useState({ X: 0, O: 0 });
  const [scoreUpdated, setScoreUpdated] = useState(false);

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line;
  
  useEffect(() => {
    if (winner && !scoreUpdated) {
      setScore(prev => ({
      ...prev,
      [winner]: prev[winner as 'X' | 'O'] + 1
    }));
      setScoreUpdated(true);
    } else if (!winner && scoreUpdated) {
      setScoreUpdated(false);
    }
  }, [winner, scoreUpdated]);


  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="scoreboard">
        <span className="score-x">X: {score.X}</span>
        <span className="score-divider">|</span>
        <span className="score-o">O: {score.O}</span>
      </div>
      <div className="game-wrapper">
        <div>
          <div className="status">{status}</div>
          <Board
            squares={squares}
            xIsNext={xIsNext}
            onPlay={handlePlay}
            winningLine={winningLine}
          />
          <button className="reset-btn" onClick={() => {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
            setScore({ X: 0, O: 0 });
            setScoreUpdated(false);
          }}>
            Reset Game
          </button>
        </div>
      </div>
    </>
  );
}

// Winning logic
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}



