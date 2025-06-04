
import './App.css'
import '../src/styles/EventList.css'
import '../src/styles/EventCard.css'
import '../src/styles/BuyTicketButton.css'
import type { Event } from '../src/types'
import EventCard from './components/EventCard'

function App() {

  const events: Event[] = [
    {
      id: 1,
      name: 'Concert in the Park',
      date: '2023-09-15',
      location: 'Central Park',
      adress: '123 Park Ave, New York, NY',
      price: 20,
      ticketsAvailable: 100,
      description: 'Enjoy a night of music under the stars with local bands.'
    },
    {
      id: 2,
      name: 'Jazz Night',
      date: '2023-10-01',
      location: 'Downtown Jazz Club',
      adress: '456 Jazz St, New Orleans, LA',
      price: 30,
      ticketsAvailable: 0,
      description: 'An evening of smooth jazz with renowned artists.'
    }
  ];

  return (
    <div className="eventList">
      <h1>Upcoming Events</h1>
    {events.map(event => (
      <EventCard key={event.id} event={event} />
    ))}
      
    </div>
  )

}

export default App
