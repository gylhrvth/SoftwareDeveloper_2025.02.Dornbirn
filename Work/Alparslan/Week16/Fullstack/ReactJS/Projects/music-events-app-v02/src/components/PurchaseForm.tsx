
import { useState } from 'react'
import type { PurchaseFormProps } from '../types'

const PurchaseForm: React.FC<PurchaseFormProps> = ({ event, onClose, onPurchase}) => {
     // State for form fields
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [quantity, setQuantity] = useState(1);

    // Calculate total price
    const totalPrice = event.price * quantity

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onPurchase(event.id, quantity) // Updates the tickets left
        alert(`Thank you, ${name}! You bought ${quantity} ticket(s) for ${event.name}.`)
        onClose()
    }

    return (
        
        <form className="purchaseForm" onSubmit={handleSubmit}>
            <h3>Buy Tickets for {event.name}</h3>
            <label>
            Name:
            <input value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
            Surname:
            <input value={surname} onChange={e => setSurname(e.target.value)} required />
            </label>
            <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
            Quantity:
            <input
                type="number"
                min={1}
                max={event.ticketsAvailable}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                required
            />
            </label>
            <div>Total Price: <strong>{totalPrice} €</strong></div>
            <div className = "formButtonContainer">
            <button type="submit" className="buyButton">Confirm Purchase</button>
            <button type="button" onClick={onClose} className="buyButton" style={{marginLeft: '1em'}}>Cancel</button>
            </div>
        </form>
    )
}

export default PurchaseForm