import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  formatCurrency, getBudget, getCurrentUser, getGoal, getTransactions,
  saveBudget, saveGoal, saveTransactions
} from "../utils/storage";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const email = user?.email || "";
  const [budget, setBudget] = useState(() => getBudget(email));
  const [budgetInput, setBudgetInput] = useState("");
  const [transactions, setTransactions] = useState(() => getTransactions(email));
  const [goal, setGoal] = useState(() => getGoal(email));
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );
  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  function updateTransactions(next) {
    setTransactions(next);
    saveTransactions(email, next);
  }

  function submitBudget(event) {
    event.preventDefault();
    const value = Number(budgetInput);
    if (!Number.isFinite(value) || value <= 0) {
      setMessage("Please enter a valid budget.");
      return;
    }
    setBudget(value);
    saveBudget(email, value);
    setBudgetInput("");
    setMessage("✅ Monthly budget saved!");
  }

  function addTransaction(event) {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0 || !description.trim() || !date) {
      setMessage("Please enter a valid amount, description and date.");
      return;
    }
    const next = [...transactions, {
      id: Date.now(), type, amount: value, category,
      description: description.trim(), date
    }];
    updateTransactions(next);
    setAmount("");
    setDescription("");
    setMessage("✅ Transaction added successfully!");
  }

  function deleteTransaction(id) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      updateTransactions(transactions.filter((item) => item.id !== id));
    }
  }

  function submitGoal(event) {
    event.preventDefault();
    const value = Number(goalAmount);
    if (!goalName.trim() || !Number.isFinite(value) || value <= 0) {
      setMessage("Please enter a goal name and valid target amount.");
      return;
    }
    const next = { name: goalName.trim(), amount: value };
    setGoal(next);
    saveGoal(email, next);
    setGoalName("");
    setGoalAmount("");
    setMessage("🎯 Financial goal saved!");
  }

  function logout() {
    ["loggedIn", "userRole", "currentUserEmail", "currentUserName"].forEach((key) => localStorage.removeItem(key));
    navigate("/login");
  }

  return (
    <div className="dashboard-body">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <p className="dashboard-small">USER DASHBOARD</p>
          <h1>Welcome, <span>{user?.name || "User"}</span> 💜</h1>
          <p>Here's your financial overview.</p>
        </div>

        <section id="dashboard" className="dashboard-cards">
          {[
            ["💰", "Monthly Budget", budget],
            ["📈", "Total Income", totalIncome],
            ["📉", "Total Expenses", totalExpenses],
            ["💜", "Remaining Balance", budget - totalExpenses],
          ].map(([icon, label, value]) => (
            <div className="dashboard-card" key={label}>
              <div className="card-icon">{icon}</div>
              <div><p>{label}</p><h2>{formatCurrency(value)}</h2></div>
            </div>
          ))}
        </section>

        {message && <p className="form-message">{message}</p>}

        <section id="budget" className="dashboard-section">
          <div className="section-heading">
            <h2>💰 Set Monthly Budget</h2>
            <p>Decide how much you want to spend this month.</p>
          </div>
          <form className="budget-form" onSubmit={submitBudget}>
            <input type="number" min="1" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} placeholder="Enter monthly budget" />
            <button type="submit">Save Budget</button>
          </form>
        </section>

        <section id="transactions" className="dashboard-section">
          <div className="section-heading">
            <h2>💳 Add Transaction</h2>
            <p>Record your income and expenses.</p>
          </div>
          <form className="transaction-form" onSubmit={addTransaction}>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Expense</option><option>Income</option>
            </select>
            <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {["Salary", "Food", "Travel", "Shopping", "Education", "Bills", "Entertainment", "Other"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit">Add Transaction</button>
          </form>
        </section>

        <section className="dashboard-section">
          <div className="section-heading"><h2>📊 Recent Transactions</h2></div>
          <div className="table-container">
            <table>
              <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th>Amount</th><th>Action</th></tr></thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr><td colSpan="6">No transactions yet.</td></tr>
                ) : [...transactions].reverse().map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td><td>{item.type}</td><td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.type === "Income" ? "+" : "-"}{formatCurrency(item.amount)}</td>
                    <td><button type="button" onClick={() => deleteTransaction(item.id)}>🗑️ Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="goals" className="dashboard-section">
          <div className="section-heading">
            <h2>🎯 Financial Goal</h2>
            <p>Set something you want to save for.</p>
          </div>
          <form className="goal-form" onSubmit={submitGoal}>
            <input value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="Goal name" />
            <input type="number" min="1" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} placeholder="Target amount" />
            <button type="submit">Save Goal</button>
          </form>
          <div className="goal-display">
            {goal ? <><strong>🎯 {goal.name}</strong><br /><br />Target Amount: <strong>{formatCurrency(goal.amount)}</strong></> : "No financial goal added yet."}
          </div>
        </section>
      </main>
    </div>
  );
}