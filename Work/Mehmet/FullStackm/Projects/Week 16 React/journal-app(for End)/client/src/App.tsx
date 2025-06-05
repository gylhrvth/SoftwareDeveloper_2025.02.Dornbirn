import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [entries, setEntries] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState<'login' | 'register' | 'journal'>('login');
  const [form, setForm] = useState({ username: '', password: '' });

  const fetchEntries = async () => {
    const res = await fetch('http://localhost:3001/api/entries', { credentials: 'include' });
    const data = await res.json();
    setEntries(data);
  };

  const handleLoginOrRegister = async (route: 'login' | 'register') => {
    const res = await fetch(`http://localhost:3001/api/${route}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setUser(form.username);
      setPage('journal');
      fetchEntries();
    }
  };

  const handleAdd = async () => {
    const res = await fetch('http://localhost:3001/api/entries', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      fetchEntries();
      setText('');
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/api/entries/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    fetchEntries();
  };

  const logout = async () => {
    await fetch('http://localhost:3001/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    setPage('login');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {page !== 'journal' ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{page === 'login' ? 'Login' : 'Register'}</h1>
          <input
            className="border p-2 w-full"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleLoginOrRegister(page)}
          >
            Submit
          </button>
          <p className="text-sm">
            {page === 'login' ? 'No account?' : 'Already registered?'}{' '}
            <button className="underline" onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
              {page === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Welcome, {user}</h2>
            <button className="text-sm text-red-500 underline" onClick={logout}>
              Logout
            </button>
          </div>
          <textarea
            className="border w-full p-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
          />
          <button className="mt-2 bg-green-500 text-white px-4 py-2" onClick={handleAdd}>
            Add Entry
          </button>
          <div className="mt-4 space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="border p-2 flex justify-between">
                <p>{entry.text}</p>
                <button className="text-sm text-red-500" onClick={() => handleDelete(entry.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;