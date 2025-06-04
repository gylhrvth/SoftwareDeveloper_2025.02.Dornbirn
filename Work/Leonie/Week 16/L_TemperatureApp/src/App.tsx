import { useState } from 'react'
import './App.css'

interface InputDivsProps {
    label: string;
    id: string;
    value: number;
    onValueChange: (value: number) => void;
}

export default function App() {
    const [celsius, setCelsius] = useState<number>(0);
    const [result, setResult] = useState<string>('');

    function handleCalc(value: number) {
        // Convert Celsius to Fahrenheit
        // Formel: F = C * 9/5 + 32

        setCelsius(value);
        const convertedTemp = convertTemperature(value);
        setResult(`${value}°C = ${convertedTemp}°F`);
    }

    return (
        <>
            <h1>Temperature Converter</h1>
            <div className="container">
                <InputDivs
                    label="Celsius"
                    id="celsius"
                    value={celsius}
                    onValueChange={handleCalc}
                />
                <div className="result">
                    <p id="result-text">{result || 'Result will be displayed here'}</p>
                </div>
            </div>
        </>
    );
}

function InputDivs({ label, id, value, onValueChange }: InputDivsProps) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                type="range"
                id={id}
                onChange={(event) => onValueChange(Number(event.target.value))}
            />
        </div>
    );
}

function convertTemperature(celsius: number): number {
  return (celsius * 9/5) + 32;
}
