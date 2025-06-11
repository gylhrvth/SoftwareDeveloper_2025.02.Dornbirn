
import { useState } from 'react'

function NameInput() {
    const [name, setName] = useState<string>('')

    return(
        <div>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Type your name"
            />
            <p>Hello, {name || 'stranger'}!</p>
        </div>
    )
}

export default NameInput