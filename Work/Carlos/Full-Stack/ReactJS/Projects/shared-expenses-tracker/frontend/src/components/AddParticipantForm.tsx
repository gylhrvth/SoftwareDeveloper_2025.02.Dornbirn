import { useState, useEffect } from "react";

type Person = {
  id: number;
  name: string;
};

type Expense = {
  id: number;
  description: string;
};

const PEOPLE_API = "http://localhost:3002/api/people";
const EXPENSES_API = "http://localhost:3002/api/expenses";
const PARTICIPANTS_API = "http://localhost:3002/api/expense-participants";

export default function AddParticipantForm({ onParticipantAdded }: { onParticipantAdded: () => void }) {
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [personId, setPersonId] = useState("");
  const [expenseId, setExpenseId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const peopleRes = await fetch(PEOPLE_API);
      const peopleData = await peopleRes.json();
      setPeople(peopleData);

      const expensesRes = await fetch(EXPENSES_API);
      const expensesData = await expensesRes.json();
      setExpenses(expensesData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personId || !expenseId) return;
    await fetch(PARTICIPANTS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ person_id: Number(personId), expense_id: Number(expenseId) }),
    });
    setPersonId("");
    setExpenseId("");
    onParticipantAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="expenseId" value={expenseId} required onChange={e => setExpenseId(e.target.value)}>
        <option value="">Select expense...</option>
        {expenses.map(exp => (
          <option key={exp.id} value={exp.id}>{exp.description}</option>
        ))}
      </select>
      <select name="personId" value={personId} required onChange={e => setPersonId(e.target.value)}>
        <option value="">Select person...</option>
        {people.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button type="submit">Add Participant</button>
    </form>
  );
}