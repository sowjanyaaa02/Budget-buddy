import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_EMAIL, ADMIN_PASSWORD, getUsers } from "../utils/storage";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.removeItem("currentUserEmail");
      navigate("/admin-dashboard");
      return;
    }

    const user = getUsers().find(
      (item) => item.email === cleanEmail && item.password === password
    );

    if (!user) {
      setMessage("❌ Incorrect email or password.");
      return;
    }

    localStorage.setItem("currentUserEmail", user.email);
    localStorage.setItem("currentUserName", user.name);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", "user");

    if (localStorage.getItem(`budget_${user.email}`) === null) {
      localStorage.setItem(`budget_${user.email}`, "0");
    }
    if (localStorage.getItem(`transactions_${user.email}`) === null) {
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify([]));
    }
    navigate("/user-dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">💜</div>
        <h1>Budget Buddy</h1>
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">Login to manage your budget.</p>
        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
          <button type="submit" className="auth-button">Login</button>
          <p className="form-message">{message}</p>
        </form>
        <div className="admin-hint">
          <strong>👑 Admin Login</strong>
          <p>Email: admin@budgetbuddy.com</p>
          <p>Password: admin123</p>
        </div>
        <div className="auth-bottom">
          <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}