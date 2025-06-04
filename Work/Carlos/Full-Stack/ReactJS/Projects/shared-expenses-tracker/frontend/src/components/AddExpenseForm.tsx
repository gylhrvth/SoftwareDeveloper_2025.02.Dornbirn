import { useState, useEffect } from "react";

type Person = {
  id: number;
  name: string;
  email: string | null;
};

const PEOPLE_API = "http://localhost:3002/api/people";
const EXPENSES_API = "http://localhost:3002/api/expenses";

export default function AddExpenseForm({ onExpenseAdded }: { onExpenseAdded: () => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const res = await fetch(PEOPLE_API);
      const data = await res.json();
      setPeople(data);
    };
    fetchPeople();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !paidBy) return;
    await fetch(EXPENSES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: parseFloat(amount),
        paid_by: paidBy,
        date: date || null,
      }),
    });
    setDescription("");
    setAmount("");
    setPaidBy("");
    setDate("");
    onExpenseAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        type="text"
        placeholder="Description"
        value={description}
        required
        onChange={e => setDescription(e.target.value)}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={amount}
        required
        min="0.01"
        step="0.01"
        onChange={e => setAmount(e.target.value)}
      />
      <select
        name="paidBy"
        value={paidBy}
        required
        onChange={e => setPaidBy(Number(e.target.value))}
      >
        <option value="">Paid by...</option>
        {people.map(person => (
          <option key={person.id} value={person.id}>
            {person.name}
        </option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}