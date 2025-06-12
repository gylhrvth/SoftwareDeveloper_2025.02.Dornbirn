import EventCard from './EventCard'
import type { EventListProps } from '../types'

const EventList: React.FC<EventListProps> = ({ events, onPurchase, onToggleFilter }) => (
  <div className="eventList">
    <div className="headerRow">
      <h1>Upcoming Events</h1>
      <button
        className="filterToggleButton"
        onClick={onToggleFilter}
      >
        Filter
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
)

export default EventList