import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/storage";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }
    if (form.password.length < 5) {
      setMessage("❌ Password must contain at least 5 characters.");
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      setMessage("❌ This email is already registered.");
      return;
    }

    users.push({ id: `user_${Date.now()}`, name, email, password: form.password });
    saveUsers(users);
    localStorage.setItem(`budget_${email}`, "0");
    localStorage.setItem(`transactions_${email}`, JSON.stringify([]));
    localStorage.removeItem(`goal_${email}`);
    setMessage("✅ Account created! Redirecting to login...");
    setTimeout(() => navigate("/login"), 900);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">💜</div>
        <h1>Budget Buddy</h1>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Start managing your money today.</p>
        <form onSubmit={submit}>
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={update} placeholder="Enter your name" required />
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={update} placeholder="Enter your email" required />
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={update} placeholder="Create a password" required />
          <label>Confirm Password</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} placeholder="Confirm your password" required />
          <button type="submit" className="auth-button">Create Account</button>
          <p className="form-message">{message}</p>
        </form>
        <div className="auth-bottom">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}