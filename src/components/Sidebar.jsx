import { useNavigate } from "react-router-dom";
import { logoutStorage } from "../utils/storage";

export default function Sidebar({ admin = false }) {
  const navigate = useNavigate();

  function logout() {
    logoutStorage();
    navigate("/login");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">{admin ? "👑" : "💜"} Budget Buddy</div>
      <nav>
        {admin ? (
          <>
            <a href="#admin">🏠 Dashboard</a>
            <a href="#users">👥 Users</a>
            <a href="#system">⚙️ System</a>
          </>
        ) : (
          <>
            <a href="#dashboard" className="active">🏠 Dashboard</a>
            <a href="#budget">💰 My Budget</a>
            <a href="#transactions">💳 Transactions</a>
            <a href="#goals">🎯 My Goals</a>
          </>
        )}
      </nav>
      <button className="logout-button" onClick={logout}>🚪 Logout</button>
    </aside>
  );
}