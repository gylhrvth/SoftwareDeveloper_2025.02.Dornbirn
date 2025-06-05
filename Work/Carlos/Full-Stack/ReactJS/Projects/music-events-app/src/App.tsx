import { useState } from 'react'
import './App.css'
import '../src/styles/EventList.css'
import '../src/styles/EventCard.css'
import '../src/styles/BuyTicketButton.css'
import '../src/styles/FilterUtility.css'
import type { Event } from '../src/types'
import EventList from './components/EventList'
import EventFilter from './components/EventFilter'

function App() {

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Concert in the Park',
      date: '2023-09-15',
      location: 'Central Park',
      adress: '123 Park Ave, New York, NY',
      price: 85,
      ticketsAvailable: 100,
      description: 'Experience the NY Philharmonic with Gustavo Dudamel!',
      image: '/images/event01.jpg',
      tags: ['classical', 'outdoor', 'family']
    },
    {
      id: 2,
      name: 'Jack Jazz Rabbit Night',
      date: '2023-10-01',
      location: 'Downtown Jazz Club',
      adress: '456 Jazz St, New Orleans, LA',
      price: 30,
      ticketsAvailable: 0,
      description: 'An evening of smooth jazz with renowned artists.',
      image: '/images/event02.jpg',
      tags: ['jazz', 'indoor', 'night']
    }
    ,
    {
      id: 3,
      name: 'Rocket Rocker Festival',
      date: '2023-11-20',
      location: 'City Stadium',
      adress: '789 Rock Rd, Los Angeles, CA',
      price: 75,
      ticketsAvailable: 50,
      description: 'Join us for a weekend of rock music with top bands.',
      image: '/images/event03.jpg',
      tags: ['rock', 'festival', 'outdoor']
    },
    {
      id: 4,
      name: 'Electro-Pijamas Night',
      date: '2023-12-05',
      location: 'Warehouse District',
      adress: '321 Beat St, Miami, FL',
      price: 60,
      ticketsAvailable: 200,
      description: 'Dance the night away with the best DJs in town.',
      image: '/images/event04.jpg',
      tags: ['electronic', 'dance', 'night']
    }
  ]);

  const [maxPrice, setMaxPrice] = useState<number | ''>(''); // '' means no filter
  const [minTicketsLeft, setMinTicketsLeft] = useState<number | ''>(''); // '' means no filter
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false); // NEW: controls filter visibility
  

  const allTags = Array.from(new Set(events.flatMap(e => e.tags)));

  const filteredEvents = events
    .filter(event => maxPrice === '' || event.price <= maxPrice)
    .filter(event => minTicketsLeft === '' || event.ticketsAvailable >= minTicketsLeft)
    .filter(event => !selectedTag || event.tags.includes(selectedTag));
    
  
    const handlePurchase = (eventId: number, ticketsBought: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, ticketsAvailable: event.ticketsAvailable - ticketsBought }
          : event
      )
    );
  };

  return (
    <div>
<EventFilter
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minTicketsLeft={minTicketsLeft}
        setMinTicketsLeft={setMinTicketsLeft}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
        show={showFilters}
      />
      <EventList
        events={filteredEvents}
        onPurchase={handlePurchase}
        onToggleFilter={() => setShowFilters(f => !f)}
      />
    </div>
  );
}
export default App