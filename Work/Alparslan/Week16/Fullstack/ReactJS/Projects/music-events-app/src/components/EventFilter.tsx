import type { EventFilterProps } from '../types'

const EventFilter: React.FC<EventFilterProps> = ({
  maxPrice, setMaxPrice, minTicketsLeft, setMinTicketsLeft,
  selectedTag, setSelectedTag, allTags, show
}) => {
  if (!show) return null
  return (
    <div className="filterContainer">
      <div className="filterUtility">
        <div className="filterRow">
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="maxPriceInput"
          />
          <input
            type="number"
            placeholder="Min tickets left"
            value={minTicketsLeft}
            onChange={e => setMinTicketsLeft(e.target.value === '' ? '' : Number(e.target.value))}
            className="ticketsLeftInput"
            style={{ marginLeft: '1em' }}
          />
        </div>
        <div className="tagButtons">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tagButton${tag === selectedTag ? ' selected' : ''}`}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button className="clearTagButton" onClick={() => setSelectedTag(null)}>
              Clear Tag Filter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default EventFilter