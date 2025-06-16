import './App.css'
import { Board } from './components/Board.tsx'
import { Button } from './components/Button.tsx'
import {useState, useEffect} from 'react'
import {History} from "./components/History.tsx";

const icons: string[] = ["👻", "💀", "👽", "👾", "🤖"];

export function App() {
    const [buttonIcons, setButtonIcons] = useState<string[]>([]) // Button-Gesamtliste
    const [clickedIcons, setClickedIcons] = useState<string[]>([])
    const [filter, setFilter] = useState<string>("")
    const [filteredButtons, setFilteredButtons] = useState<string[]>([]) // gefilterte Button-Liste

    const addButton = () => {
        // zufälliges Icon in Button-Gesamtliste hinzufügen
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        console.log('buttonIcons.length before set', buttonIcons.length);
        setButtonIcons([...buttonIcons, randomIcon]);
        console.log('buttonIcons.length after set', buttonIcons.length);
        // innerhalb der umschließenden Funktion (scope von addButton()) bleibt die useState-Variable buttonIcons unverändert
    }
    const clickedButton = (icon: string) => {
        // Historie clickedIcons erweitern
        setClickedIcons([...clickedIcons, icon]);
    }

    useEffect(() => {
        setFilteredButtons(
            filter
                ? buttonIcons.filter(icon => icon === filter)
                : buttonIcons
        )
    }, [buttonIcons, filter])
    // die Abhängigkeit des Side-Effects sind hier die Änderung der Button-Gesamtliste und des Filters
    // allgemein gilt:
    //  - Leeres Array `[]`: Effekt wird nur einmal nach dem ersten Rendern ausgeführt
    //  - Kein Array: Effekt wird nach jedem Rendern ausgeführt
    //  - Array mit Werten: Effekt wird ausgeführt, wenn sich diese Werte ändern

    return (
    <>
        <h1>Hello Space!</h1>

        {/* add + filter // kann auch in eine Component eingebunden werden */}
        <button className={`bigButton green`} onClick={addButton}>+</button>
        &nbsp; Filter:
        <select className={`bigButton red`} onChange={(e) => setFilter(e.target.value)}>
            <option value="">*</option>
            {icons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
        </select>

        {/* Board Component mit children */}
        <Board>
            <h2>Board</h2>
            {/* für die Ausgabe wird die gefilterte Button-Liste verwendet */}
            {filteredButtons.map((icon, index) => (
                <Button key={index} title={icon} eventHandler={clickedButton} />
            ))}
        </Board>

        {/* History Component mit props */}
        <History clickedIcons={clickedIcons} />
    </>
  )
}


