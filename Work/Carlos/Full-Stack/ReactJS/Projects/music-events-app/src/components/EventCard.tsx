
import { useState } from 'react'
import type { Event } from '../types'

import BuyTicketButton from './BuyTicketButton'
import PurchaseForm from './PurchaseForm'

import '../styles/BuyTicketButton.css'
import '../styles/PurchaseForm.css'

interface EventCardProps {
    event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    // This state remembers if the form should be shown
    const [showForm, setShowForm] = useState(false)

    // This function will be called when the button is clicked
    const handleBuyClick = () => {
        setShowForm(true)
    }

    return (


        <div className="eventCard">
            <h2>{event.name}</h2>
            <p>{event.date} - {event.location}</p>
            <p>{event.adress}</p>
            <p>{event.description}</p>
            <p>{event.price} €</p>
            <p>
                {event.ticketsAvailable > 0
                ? <span>Tickets left: <span className="ticketsLeft">{event.ticketsAvailable}</span></span>
                : <span className="soldOut">Sold Out</span>
                }
            </p>
            <div className="buyButtonContainer">
                {!showForm && (
                    <BuyTicketButton 
                        disabled={event.ticketsAvailable === 0} 
                        onClick={handleBuyClick}
                    />
                )}
            </div>
            {/* Show the form if showForm is true */}
            {showForm && (
                <PurchaseForm event={event} onClose={() => setShowForm(false)} />
            )}
        </div>
    )
}

export default EventCard


/*============== Summary: ===============/

import type { Event } from '../types'

- `import type { Event } from '../types'`: This imports the `Event` type you made, so TypeScript knows what an event looks like.

---

**Defining Props for the Component**

```tsx
interface EventCardProps {
  event: Event
}
```
- This says: “My component will get one thing called `event`, and it must look like the `Event` type.”
- This helps you catch mistakes if you forget a property or spell something wrong.

---

## **Summary**

- You made a reusable card for any event.
- You used **props** to pass data in.
- You used **destructuring** to grab the event.
- You used **conditional rendering** to show “Sold Out” or tickets left.
- You styled everything with class names.

---

**Now, whenever you want to show an event, just use `<EventCard event={event} />`!**

*/