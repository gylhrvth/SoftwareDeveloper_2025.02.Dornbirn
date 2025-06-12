import { useState } from 'react';
import './App.css';



function App() {
  return (
    <div className="container">
      <div className="headline">
        <h1>Multiplication-App</h1>
      </div>

      <div className="number">
        <MultiplicationRow01 factor={1} />
        <br />
        <MultiplicationRow02 factor={2} />

      </div>
    </div>
  )
}

export default App;



interface MultiplicationRowProps {
  factor: number;
}

function MultiplicationRow01({ factor }: MultiplicationRowProps) {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<number[]>([]);


  const handleClick01 = () => {
    const result = factor * count;
    setCount(count + 1);
    setResults([...results, result]);
    
  };

  return (
    <div className="row">
      <span className="label">{factor}x</span>

      <button onClick={handleClick01} className="count-btn">
        {count}
      </button>

      <div className="result-array">
        [{results.join(', ')}]
      </div>

    </div>
  );
}

function MultiplicationRow02({ factor }: MultiplicationRowProps) {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<number[]>([]);


  const handleClick01 = () => {
    const result = factor * count;
    setCount(count + 1);
    setResults([result]);
    
  };

  return (
    <div className="row">
      <span className="label">{factor}x</span>

      <button onClick={handleClick01} className="count-btn">
        {count}
      </button>

      <div className="result-array">
        [{results}]
      </div>

    </div>
  );
}



