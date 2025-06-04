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
        // Convert Celsius to Fahrenheit
        // Formula: F = C * 9/5 + 32
        const celsiusInput = document.getElementById('celsius') as HTMLInputElement;
        const celsius = Number(celsiusInput.value);
        setCelsius(celsius);
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
                    onChange={handleCalc}
                />
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
                type="range"
                id={id}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}

function convertTemperature(celsius: number): number {
  return (celsius * 9/5) + 32;
}
