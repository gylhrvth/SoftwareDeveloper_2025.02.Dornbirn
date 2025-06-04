import { useState, useEffect } from "react";

type Person = {
  id: number;
  name: string;
  email: string | null;
};

const API_URL = "http://localhost:3002/api/people";

export default function PeopleList({ onPersonDeleted }: { onPersonDeleted?: () => void }) {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPeople(data);
      setLoading(false);
    };
    fetchPeople();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPeople(people.filter(p => p.id !== id));
      setError(null);
      onPersonDeleted && onPersonDeleted();
    } else {
      setError("Failed to delete person.");
    }
  };

  const startEdit = (person: Person) => {
  setEditingId(person.id);
  setEditName(person.name);
  setEditEmail(person.email || "");
};

const handleEdit = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: editName, email: editEmail }),
  });
  if (res.ok) {
    setPeople(people.map(p => p.id === id ? { ...p, name: editName, email: editEmail } : p));
    setEditingId(null);
    setError(null);
  } else {
    setError("Failed to update person.");
  }
};

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>People</h2>
      {error && <div className="error">{error}</div>}
        <ul className="people-list">
        {people.map((person) =>
            editingId === person.id ? (
        <li key={person.id}>
        <input
            name="editName"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            placeholder="Name"
        />
        <input
            name="editEmail"
            value={editEmail}
            onChange={e => setEditEmail(e.target.value)}
            placeholder="Email"
        />
        <button onClick={() => handleEdit(person.id)}>Save</button>
        <button onClick={() => setEditingId(null)}>Cancel</button>
        </li>
            ) : (
            <li key={person.id}>
                {person.name} {person.email && <span>({person.email})</span>}
                <button style={{ marginLeft: "1em" }} onClick={() => startEdit(person)}>
                Edit
                </button>
                <button
                style={{ marginLeft: "1em", background: "#e53935" }}
                onClick={() => handleDelete(person.id)}
                >
                Delete
                </button>
            </li>
            )
        )}
        </ul>
    </div>
  );
}