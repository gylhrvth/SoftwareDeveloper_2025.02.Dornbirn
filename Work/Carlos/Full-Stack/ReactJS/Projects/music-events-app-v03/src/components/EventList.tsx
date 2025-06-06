import EventCard from './EventCard'
import type { EventListProps } from '../types'

export default function EventList({ events, onPurchase, onShowFilter }: EventListProps ) {
  return (
  <div className="eventList">
    <div className="headerRow">
      <h1>Upcoming Events</h1>
      <button className="filterToggleButton" onClick={onShowFilter}>
        Show Filter
      </button>
    </div>
    {events.map(event => (
      <EventCard
        key={event.id}
        event={event}
        onPurchase={onPurchase}
      />
    ))}
  </div>
)}

