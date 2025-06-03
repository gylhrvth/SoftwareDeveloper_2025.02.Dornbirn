import { useState } from 'react'
import './App.css'

interface InputDivsProps {
    label: string;
    id: string;
    value: number;
    onChange: (value: number) => void;
}

export default function App() {
    const [celsius, setCelsius] = useState<number>(0);
    const [result, setResult] = useState<string>('');

    function handleCalc() {
        const convertedTemp = convertTemperature(celsius);
        setResult(`${celsius}°C = ${convertedTemp}°F`);
    }

    return (
        <>
            <h1>Temperature Converter</h1>
            <div className="container">
                <InputDivs
                    label="Celsius"
                    id="celsius"
                    value={celsius}
                    onChange={setCelsius}
                />

                <button onClick={handleCalc}>Convert</button>
                <div className="result">
                    <p id="result-text">{result || 'Result will be displayed here'}</p>
                </div>
            </div>
        </>
    );
}

function InputDivs({ label, id, value, onChange }: InputDivsProps) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                type="number"
                id={id}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}


function convertTemperature(celsius: number): number {
  return (celsius * 9/5) + 32;
}
