import { useEffect, useState } from "react";
import "../styles/ExpensesList.css";

type Expense = {
  id: number;
  description: string;
  amount: number;
  paid_by: number;
  date: string;
};

type Person = {
  id: number;
  name: string;
  email: string | null;
};

type Participant = {
  person_id: number;
};

const EXPENSES_API = "http://localhost:3002/api/expenses";
const PEOPLE_API = "http://localhost:3002/api/people";
const PARTICIPANTS_API = "http://localhost:3002/api/expense-participants";

export default function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [participants, setParticipants] = useState<{ [expenseId: number]: number[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [expensesRes, peopleRes] = await Promise.all([
        fetch(EXPENSES_API),
        fetch(PEOPLE_API),
      ]);
      const expensesData = await expensesRes.json();
      const peopleData = await peopleRes.json();
      setExpenses(expensesData);
      setPeople(peopleData);

      // Fetch participants for each expense
      const participantsObj: { [expenseId: number]: number[] } = {};
      await Promise.all(
        expensesData.map(async (expense: Expense) => {
          const res = await fetch(`${PARTICIPANTS_API}/${expense.id}`);
          const data: Participant[] = await res.json();
          participantsObj[expense.id] = data.map((p) => p.person_id);
        })
      );
      setParticipants(participantsObj);

      setLoading(false);
    };
    fetchData();
  }, []);

  const getPayerName = (id: number) => {
    const person = people.find((p) => p.id === id);
    return person ? person.name : `Unknown (#${id})`;
  };

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleRemoveParticipant = async (expenseId: number, personId: number) => {
    if (!window.confirm("Remove this participant from the expense?")) return;
    await fetch(PARTICIPANTS_API, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expense_id: expenseId, person_id: personId }),
    });
    setParticipants((prev) => ({
      ...prev,
      [expenseId]: prev[expenseId].filter((id) => id !== personId),
    }));
  };

const handleDeleteExpense = async (expenseId: number) => {
  if (!window.confirm("Are you sure you want to delete this expense?")) return;
  const res = await fetch(`${EXPENSES_API}/${expenseId}`, { method: "DELETE" });
  if (res.ok) {
    // Refetch expenses from backend to ensure sync
    const updatedExpensesRes = await fetch(EXPENSES_API);
    const updatedExpenses = await updatedExpensesRes.json();
    setExpenses(updatedExpenses);

    // Optionally, refetch participants as well
    const participantsObj: { [expenseId: number]: number[] } = {};
    await Promise.all(
      updatedExpenses.map(async (expense: Expense) => {
        const res = await fetch(`${PARTICIPANTS_API}/${expense.id}`);
        const data: Participant[] = await res.json();
        participantsObj[expense.id] = data.map((p) => p.person_id);
      })
    );
    setParticipants(participantsObj);
  } else {
    alert("Failed to delete expense.");
  }
};

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div>
      <h2>Expenses</h2>
      <ul className="expenses-list">
        {expenses.map((expense) => (
<li key={expense.id} className="expense-item">
  <div>
    <span className="expense-description">{expense.description}</span>
    {" - "}
    <span className="expense-amount">€{expense.amount}</span>
    {" (Paid by "}
    <span className="expense-payer">{getPayerName(expense.paid_by)}</span>
    {")"}
    {expense.date && <span className="expense-date"> - {formatDate(expense.date)}</span>}
    <button
      className="delete-expense-btn"
      title="Delete expense"
      onClick={() => handleDeleteExpense(expense.id)}
    >
      🗑️
    </button>
  </div>
            <div className="expense-participants">
              <small>
                Participants:{" "}
                {participants[expense.id] && participants[expense.id].length > 0
                  ? participants[expense.id].map((pid) => {
                      const person = people.find((p) => p.id === pid);
                      return (
                        <span key={pid} className="participant">
                          {person ? person.name : `Unknown (#${pid})`}
                          <button
                            className="remove-participant-btn"
                            title="Remove participant"
                            onClick={() => handleRemoveParticipant(expense.id, pid)}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })
                  : "None"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}