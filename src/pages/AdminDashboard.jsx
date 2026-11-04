import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { formatCurrency, getBudget, getTransactions, getUsers } from "../utils/storage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const users = getUsers();
  const totalBudget = users.reduce((sum, user) => sum + getBudget(user.email), 0);
  const totalTransactions = users.reduce((sum, user) => sum + getTransactions(user.email).length, 0);

  function logout() {
    ["loggedIn", "userRole", "currentUserEmail", "currentUserName"].forEach((key) => localStorage.removeItem(key));
    navigate("/login");
  }

  return (
    <div className="dashboard-body">
      <Sidebar admin />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <p className="dashboard-small">ADMIN PANEL</p>
          <h1>Welcome, Admin 👑</h1>
          <p>Manage and monitor Budget Buddy.</p>
        </div>

        <section id="admin" className="dashboard-cards">
          {[
            ["👥", "Registered Users", users.length],
            ["💰", "Total Budget", formatCurrency(totalBudget)],
            ["💳", "Total Transactions", totalTransactions],
            ["🎯", "System Status", "Active"],
          ].map(([icon, label, value]) => (
            <div className="dashboard-card" key={label}>
              <div className="card-icon">{icon}</div>
              <div><p>{label}</p><h2>{value}</h2></div>
            </div>
          ))}
        </section>

        <section id="users" className="dashboard-section">
          <div className="section-heading">
            <h2>👥 Registered Users</h2>
            <p>User information stored in Local Storage.</p>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Budget</th><th>Transactions</th></tr></thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4">No users registered yet.</td></tr>
                ) : users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td><td>{user.email}</td>
                    <td>{formatCurrency(getBudget(user.email))}</td>
                    <td>{getTransactions(user.email).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="system" className="dashboard-section">
          <div className="section-heading"><h2>⚙️ System Information</h2></div>
          <div className="system-info">
            <p><strong>Application:</strong> Budget Buddy</p>
            <p><strong>Technology:</strong> React, Vite, CSS, JavaScript</p>
            <p><strong>Storage:</strong> Browser Local Storage</p>
            <p><strong>Status:</strong> <span className="status-active">● Active</span></p>
          </div>
        </section>
      </main>
    </div>
  );
}