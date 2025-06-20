import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="headline">
        <h1>🧮Multiplication-App🤓</h1>
      </div>

      <div className="number">
        <MultiplicationRow factor={1} />
         <MultiplicationRow factor={2} />
         <MultiplicationRow factor={3}/>
         <MultiplicationRow factor={4}/>
         <MultiplicationRow factor={5}/>
         <MultiplicationRow factor={6}/>
         <MultiplicationRow factor={7}/>
         <MultiplicationRow factor={8}/>
         <MultiplicationRow factor={9}/>
         <MultiplicationRow factor={10}/>
         


      </div>
    </div>
  )
}

export default App;

interface MultiplicationRowProps {
  factor: number;
}

function MultiplicationRow({ factor }: MultiplicationRowProps) {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState<number[]>([]);


  const handleClick = () => {
    const result = factor * count;
    setResults([...results, result]);
    setCount(count + 1);
  };

  return (
    <div className="row">
      <span className="label">{factor}x</span>

      <button onClick={handleClick} className="count-btn">
        {count}
      </button>

      <div className="result-array">
        [{results.join(', ')}]
      </div>

    </div>
  );
}



