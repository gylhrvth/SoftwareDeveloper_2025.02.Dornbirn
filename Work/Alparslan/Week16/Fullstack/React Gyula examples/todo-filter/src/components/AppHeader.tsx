import { type JSX } from 'react'

export interface AppHeaderProps {
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function AppHeader(props: AppHeaderProps): JSX.Element {
  return (
    <>
      <h1>ToDo App with filter</h1>
      <label>
        Filter by priority:
        <select onChange={props.handleFilterChange}>
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>
    </>
  )
}