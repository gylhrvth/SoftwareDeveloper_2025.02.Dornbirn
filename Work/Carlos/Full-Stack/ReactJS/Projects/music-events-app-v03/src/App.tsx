import { useState } from 'react'
import './App.css'
import '../src/styles/EventList.css'
import '../src/styles/EventCard.css'
import '../src/styles/BuyTicketButton.css'
import '../src/styles/FilterUtility.css'
import type { Event } from '../src/types'
import EventList from './components/EventList'
import Modal from './components/Modal'
import EventFilter from './components/EventFilter'


function App() {

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Concert in the Park',
      date: '2025-09-14',
      location: 'Central Park',
      adress: '123 Park Ave, New York, NY',
      price: 85,
      ticketsAvailable: 100,
      description: 'Experience the NY Philharmonic with Gustavo Dudamel!',
      image: '/images/event01.jpg',
    },
    {
      id: 2,
      name: 'Jack Jazz Rabbit Night',
      date: '2025-09-23',
      location: 'Downtown Jazz Club',
      adress: '456 Jazz St, New Orleans, LA',
      price: 30,
      ticketsAvailable: 0,
      description: 'An evening of smooth jazz with renowned artists.',
      image: '/images/event02.jpg',
    }
    ,
    {
      id: 3,
      name: 'Rocket Rocker Festival',
      date: '2025-08-03',
      location: 'City Stadium',
      adress: '789 Rock Rd, Los Angeles, CA',
      price: 75,
      ticketsAvailable: 50,
      description: 'Join us for a weekend of rock music with top bands.',
      image: '/images/event03.jpg',
    },
    {
      id: 4,
      name: 'Electro-Pijamas Night',
      date: '2025-08-12',
      location: 'Warehouse District',
      adress: '321 Beat St, Miami, FL',
      price: 60,
      ticketsAvailable: 200,
      description: 'Dance the night away with the best DJs in town.',
      image: '/images/event04.jpg',
    }
  ]);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

// Filtering logic
function filterEvents(events: Event[], filterDate: string, filterMonth: string) {
  if (filterDate) return events.filter(ev => ev.date === filterDate)
  if (filterMonth) return events.filter(ev => ev.date.startsWith(filterMonth))
  return events
}

  const handlePurchase = (eventId: number, ticketsBought: number): void => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, ticketsAvailable: event.ticketsAvailable - ticketsBought }
          : event
      )
    );
  };

  const showFilter = () => {
    setFilterVisible(true)
  }

  return (
    <>
      <Modal open={filterVisible} onClose={() => setFilterVisible(false)}>
        <EventFilter
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
        />
      </Modal>
    
      <EventList
        events={filterEvents(events, filterDate, filterMonth)}
        onPurchase={handlePurchase}          // Add this line
        onShowFilter={showFilter}
      />
   
    </>
  );
}
export default App