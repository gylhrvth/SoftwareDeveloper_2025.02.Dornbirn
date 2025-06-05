import { useState, useEffect } from 'react';
import './App.css';  // Ensure Tailwind is properly set up

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [entries, setEntries] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState<'login' | 'register' | 'journal'>('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const fetchEntries = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/entries', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      } else if (res.status === 401) {
        // Not logged in, reset state
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
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        setText('');
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

  return (
    <div
      className="min-h-screen p-6 max-w-xl mx-auto
                 bg-galacticBlue-light dark:bg-galacticBlue-midnight
                 text-gray-900 dark:text-gray-100
                 transition-colors duration-500"
    >
      {/* Dark mode toggle */}
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

      {/* Login/Register form */}
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
        // Journal entries page
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-center mb-4">Journal</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-800 text-white font-semibold rounded px-4 py-2 mb-4 transition-colors duration-300"
          >
            Logout
          </button>

          <div className="flex space-x-2 mb-6">
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
          </div>

          <ul className="space-y-3">
            {entries.length === 0 && <p className="text-center text-gray-500">No entries yet.</p>}
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex justify-between items-center bg-white dark:bg-galacticBlue-dark p-4 rounded shadow transition-colors duration-300"
              >
                <span>{entry.text}</span>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;