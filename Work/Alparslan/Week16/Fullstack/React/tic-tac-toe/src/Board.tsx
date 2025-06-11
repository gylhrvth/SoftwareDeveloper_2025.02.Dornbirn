type BoardProps = {
  squares: (string | null)[];
  xIsNext: boolean;
  onPlay: (nextSquares: (string | null)[]) => void;
  winningLine?: number[];
};

export function Board({ squares, xIsNext, onPlay, winningLine }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onSquareClick={() => handleClick(i)}
          highlight={Boolean(winningLine && winningLine.includes(i))}
        />
      ))}
    </div>
  );
}

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  highlight: boolean;
};

function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={
        `square${highlight ? ' highlight' : ''}` +
        (value === 'X' ? ' square-x' : value === 'O' ? ' square-o' : '') +
        (highlight && value === 'X' ? ' highlight-x' : '') +
        (highlight && value === 'O' ? ' highlight-o' : '')
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

