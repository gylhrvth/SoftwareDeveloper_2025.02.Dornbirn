import { Link } from 'react-router-dom';

type Props = {
  search: string;
  setSearch: (v: string) => void;
  sortMenuOpen: boolean;
  setSortMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void;
  setSortBy: (v: 'title' | 'difficulty' | 'ingredientsCount') => void;
};

export default function HeaderSearchBar({ search, setSearch, sortMenuOpen, setSortMenuOpen, setSortBy }: Props) {
  return (
    <div className="header-search-wrapper">
      <h1>Rezept App</h1>
      <div className="search-add-bar">
        <div className="search-input-wrapper">
          <span className="material-icons search-icon" aria-label="Suche">search</span>
          <input
            type="text"
            placeholder="Rezept suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <button
            type="button"
            className="sort-icon-btn"
            onClick={() => setSortMenuOpen(open => !open)}
            title="Sortieren"
            tabIndex={0}
          >
            <span className="material-icons">menu</span>
          </button>
          {sortMenuOpen && (
            <div className="sort-dropdown sort-dropdown-up">
              <button onClick={() => { setSortBy('title'); setSortMenuOpen(false); }}>
                <span className="material-icons">sort_by_alpha</span> Titel
              </button>
              <button onClick={() => { setSortBy('difficulty'); setSortMenuOpen(false); }}>
                <span className="material-icons">signal_cellular_alt</span> Schwierigkeit
              </button>
              <button onClick={() => { setSortBy('ingredientsCount'); setSortMenuOpen(false); }}>
                <span className="material-icons">format_list_numbered</span> Zutatenanzahl
              </button>
            </div>
          )}
        </div>
        <Link to="/add">
          <button className="add-btn" title="Neues Rezept hinzufügen">
            <span className="material-icons" aria-label="Rezept hinzufügen">restaurant_menu</span>
          </button>
        </Link>
      </div>
    </div>
  );
}