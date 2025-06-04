import { useState } from 'react'
import './App.css'
import { InputDivs } from './components/InputDivs'
import { convertTemperature } from './utils/temperature'

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
