import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">💜 Budget Buddy</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-button">Sign Up</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="small-heading">SMART MONEY MANAGEMENT</p>
          <h1>Take Control of Your <span>Money 💜</span></h1>
          <p>
            Budget Buddy helps you track your income, expenses, savings and
            financial goals in one simple place.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="primary-button">Get Started</Link>
            <Link to="/login" className="secondary-button">Login</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="floating-card">
            <span>Monthly Budget</span>
            <h2>₹15,000</h2>
            <div className="progress-bar"><div className="progress" /></div>
            <small>Manage your money wisely 💰</small>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2>Everything You Need 💜</h2>
        <p className="section-subtitle">Simple tools to help you manage your finances.</p>
        <div className="features">
          {[
            ["💰", "Budget Tracking", "Set your monthly budget and keep track of how much you have left."],
            ["📊", "Expense Tracking", "Record your income and expenses and understand your spending."],
            ["🎯", "Financial Goals", "Create savings goals and stay focused on your financial plans."],
            ["🔐", "Secure Login", "Signup and login details are stored using browser Local Storage."],
          ].map(([icon, title, description]) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer><p>© 2026 Budget Buddy | Made with 💜</p></footer>
    </>
  );
}