import { useState } from "react";
import '../styles/AddPersonForm.css';

const API_URL = "http://localhost:3002/api/people";

export default function AddPersonForm({ onPersonAdded }: { onPersonAdded: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    onPersonAdded();
  };

  return (
    <form className="add-person-form" onSubmit={handleSubmit}>
      <input
        name="personName"
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />
      <input
        name="personEmail"
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Add Person</button>
    </form>
  );
}