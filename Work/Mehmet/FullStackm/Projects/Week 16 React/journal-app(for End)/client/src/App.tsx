import { useState, useEffect } from 'react';
import './App.css'; // Ensure Tailwind is properly set up

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [entries, setEntries] = useState<{ id: number; text: string; date: string }[]>([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [page, setPage] = useState<'login' | 'register' | 'journal'>('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [darkMode, setDarkMode] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState<string>('');

  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const fetchEntries = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/entries', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      } else if (res.status === 401) {
        setUser(null);
        setPage('login');
        setEntries([]);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const handleLoginOrRegister = async (route: 'login' | 'register') => {
    try {
      const res = await fetch(`http://localhost:3001/api/${route}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setUser(form.username);
        setPage('journal');
        await fetchEntries();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Error in auth:', error);
    }
  };

  const handleAdd = async () => {
    if (text.trim() === '') return;
    try {
      const res = await fetch('http://localhost:3001/api/entries', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          date: date.trim() === '' ? undefined : date,
        }),
      });
      if (res.ok) {
        setText('');
        setDate(new Date().toISOString().split('T')[0]);
        if (filterActive) setFilterActive(false);
        await fetchEntries();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to add entry');
      }
    } catch (error) {
      console.error('Failed to add entry:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/entries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        await fetchEntries();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to delete entry');
      }
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        setPage('login');
        setEntries([]);
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleEdit = (entry: { id: number; text: string; date: string }) => {
    setEditingId(entry.id);
    setEditText(entry.text);
    setEditDate(entry.date);
  };

  const handleUpdate = async () => {
    if (editingId === null || editText.trim() === '') {
      setEditingId(null);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/api/entries/${editingId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: editText,
          date: editDate.trim() === '' ? undefined : editDate,
        }),
      });
      if (res.ok) {
        setEditingId(null);
        setEditText('');
        setEditDate('');
        if (filterActive) setFilterActive(false);
        await fetchEntries();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to update entry');
      }
    } catch (error) {
      console.error('Failed to update entry:', error);
    }
  };

  const handleFilterToggle = () => {
    setFilterActive((prev) => !prev);
  };

  const displayedEntries = filterActive
    ? entries.filter((e) => e.date === date)
    : entries;

  return (
    <div
      className="min-h-screen p-6 max-w-3xl mx-auto
                 bg-galacticBlue-light dark:bg-galacticBlue-midnight
                 text-gray-900 dark:text-gray-100
                 transition-colors duration-500"
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded
                     bg-galacticBlue-dark dark:bg-galacticBlue-light
                     text-white dark:text-gray-900 font-semibold
                     transition-colors duration-300"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

    // Display wel
      {user && (
        <div className="text-right mb-2 text-lg font-semibold">
          Welcome, {user}!
        </div>
      )}
      {page !== 'journal' ? (
        <div className="space-y-6 bg-white dark:bg-galacticBlue-dark rounded-lg p-6 shadow-lg transition-colors duration-500">
          <h1 className="text-3xl font-extrabold text-center">
            {page === 'login' ? 'Login' : 'Register'}
          </h1>
          <input
            className="border border-gray-300 dark:border-gray-600 rounded p-3 w-full
                       text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-galacticBlue-midnight"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="border border-gray-300 dark:border-gray-600 rounded p-3 w-full
                       text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-galacticBlue-midnight"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="bg-galacticBlue-light hover:bg-galacticBlue-dark
                       transition-colors duration-300 text-white font-semibold
                       w-full rounded py-3"
            onClick={() => handleLoginOrRegister(page)}
          >
            Submit
          </button>
          <p className="text-center">
            {page === 'login' ? 'No account? ' : 'Already have an account? '}
            <button
              onClick={() => {
                setPage(page === 'login' ? 'register' : 'login');
                setForm({ username: '', password: '' });
              }}
              className="text-galacticBlue-light hover:underline font-semibold"
            >
              {page === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-center mb-4">Journal</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-800 text-white font-semibold rounded px-4 py-2 mb-4 transition-colors duration-300"
          >
            Logout
          </button>

          <div className="flex items-center mb-6 space-x-2">
            <input
              type="date"
              className="p-2 rounded border border-gray-300 dark:border-gray-600
                         bg-gray-50 dark:bg-galacticBlue-midnight text-gray-900 dark:text-gray-100 w-max"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="flex-grow p-3 rounded border border-gray-300 dark:border-gray-600
                         bg-gray-50 dark:bg-galacticBlue-midnight text-gray-900 dark:text-gray-100"
              placeholder="Add a new entry"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-galacticBlue-light hover:bg-galacticBlue-dark text-white font-semibold rounded px-4"
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className={`px-4 py-2 rounded border ${
                filterActive
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={handleFilterToggle}
            >
              {filterActive ? 'Clear' : 'Filter'}
            </button>
          </div>

          <ul className="space-y-3">
            {displayedEntries.length === 0 && (
              <p className="text-center text-gray-500">No entries yet.</p>
            )}
            {displayedEntries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center bg-white dark:bg-galacticBlue-dark p-4 rounded shadow transition-colors duration-300"
              >
                {editingId === entry.id ? (
                  <>
                    <input
                      type="date"
                      className="p-2 mr-2 rounded border dark:border-gray-600
                                 bg-gray-50 dark:bg-galacticBlue-midnight text-gray-900 dark:text-gray-100 w-max"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                    <input
                      className="flex-grow p-2 mr-2 rounded border dark:border-gray-600
                                 bg-gray-50 dark:bg-galacticBlue-midnight text-gray-900 dark:text-gray-100"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 hover:bg-green-800 text-white rounded px-3 py-1 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditText('');
                        setEditDate('');
                      }}
                      className="bg-gray-400 hover:bg-gray-600 text-white rounded px-3 py-1"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-gray-500 dark:text-gray-400 mr-4 w-28">
                      {entry.date}
                    </span>
                    <span className="flex-grow ml-0 mr-4 break-words">{entry.text}</span>
                    <button
                      onClick={() => handleEdit(entry)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white rounded px-3 py-1 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 flex-shrink-0"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
