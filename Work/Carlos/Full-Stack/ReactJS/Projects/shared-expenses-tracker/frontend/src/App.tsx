import { useState } from "react";
import PeopleList from "./components/PeopleList";
import AddPersonForm from "./components/AddPersonForm";
import ExpensesList from "./components/ExpensesList";
import AddExpenseForm from "./components/AddExpenseForm";
import AddParticipantForm from "./components/AddParticipantForm";
import SummaryView from "./components/SummaryView";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container">
      <h1>Shared Expenses Tracker</h1>
      <AddPersonForm onPersonAdded={() => setRefresh(r => !r)} />
      <PeopleList key={`people-${refresh ? "a" : "b"}`} />
      <AddExpenseForm onExpenseAdded={() => setRefresh(r => !r)} />
      <ExpensesList key={`expenses-${refresh ? "a" : "b"}`} />
      <AddParticipantForm onParticipantAdded={() => setRefresh(r => !r)} />
      <SummaryView />
    </div>
  );
}

export default App;