
import { useState } from 'react'

import type { EventCardProps } from '../types'

import BuyTicketButton from './BuyTicketButton'
import PurchaseForm from './PurchaseForm'

import '../styles/BuyTicketButton.css'
import '../styles/PurchaseForm.css'



const EventCard: React.FC<EventCardProps> = ({ event, onPurchase }) => {
    // This state remembers if the form should be shown
    const [showForm, setShowForm] = useState(false)

    // This function will be called when the button is clicked
    const handleBuyClick = () => {
        setShowForm(true)
    }

    return (

        <div className="eventCard">
            <h2>{event.name}</h2>
            <img src={event.image} alt={event.name} className="eventImage" /> 
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
                <div className="purchaseFormWrapper">
                    <PurchaseForm 
                        event={event} 
                        onClose={() => setShowForm(false)} 
                        onPurchase={onPurchase}/>
                </div>
            )}
        </div>
    )
}

export default EventCard


