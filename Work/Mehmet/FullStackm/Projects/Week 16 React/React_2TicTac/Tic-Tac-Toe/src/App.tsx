import { useState, useEffect } from 'react'
import './app.css'

type Player = 'X' | 'O' | null

const App = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const winner = calculateWinner(board)
  const currentPlayer = isXNext ? 'X' : 'O'

  function handleClick(index: number) {
    if (board[index] || winner) return
    const newBoard = board.slice()
    newBoard[index] = currentPlayer
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  function restartGame() {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      setDarkMode(saved === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    // Add class to <body>
    if (darkMode) {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="game">
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : board.every(Boolean)
          ? "It's a draw!"
          : `Next player: ${currentPlayer}`}
      </div>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row">
            {renderSquare(row * 3)}
            {renderSquare(row * 3 + 1)}
            {renderSquare(row * 3 + 2)}
          </div>
        ))}
      </div>
      <button className="restart" onClick={restartGame}>Restart</button>
    </div>
  )

  function renderSquare(index: number) {
    return (
      <button className="square" onClick={() => handleClick(index)} key={index}>
        {board[index]}
      </button>
    )
  }
}

// Winner logic
function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default App
