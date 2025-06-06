import '../styles/FilterUtility.css'
import type { EventFilterProps } from '../types'

function EventFilter({
  filterDate,
  setFilterDate,
  filterMonth,
  setFilterMonth
}: EventFilterProps) {
  return (
    <form className="filterForm">
      <div className="filterUtility">
        <label>
          By day: 
          <span style={{ marginLeft: '8px' }}></span>
          <input
            type="date"
            className="dateInput"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </label>
      </div>
      <div className="filterUtility">
        <label>
          By month: 
          <span style={{ marginLeft: '8px' }}></span>
          <input
            type="month"
            className="dateInput"
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
          />
        </label>
      </div>
    </form>
  )
}

export default EventFilter