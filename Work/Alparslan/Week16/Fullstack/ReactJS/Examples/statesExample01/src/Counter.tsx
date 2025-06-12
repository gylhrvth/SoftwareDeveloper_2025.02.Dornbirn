
import { useState } from 'react'

function Counter() {

    const [count, setCount] = useState<number>(0)
 
    return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click Me!
        </button>

    </div>
    )
}

export default Counter