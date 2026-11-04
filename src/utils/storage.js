export const ADMIN_EMAIL = "admin@budgetbuddy.com";
export const ADMIN_PASSWORD = "admin123";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("budgetBuddyUsers") || "[]");
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem("budgetBuddyUsers", JSON.stringify(users));
}

export function getCurrentUser() {
  const email = localStorage.getItem("currentUserEmail");
  return getUsers().find((user) => user.email === email) || null;
}

export function getBudget(email) {
  return Number(localStorage.getItem(`budget_${email}`) || 0);
}

export function saveBudget(email, amount) {
  localStorage.setItem(`budget_${email}`, String(amount));
}

export function getTransactions(email) {
  try {
    return JSON.parse(localStorage.getItem(`transactions_${email}`) || "[]");
  } catch {
    return [];
  }
}

export function saveTransactions(email, transactions) {
  localStorage.setItem(`transactions_${email}`, JSON.stringify(transactions));
}

export function getGoal(email) {
  try {
    return JSON.parse(localStorage.getItem(`goal_${email}`) || "null");
  } catch {
    return null;
  }
}

export function saveGoal(email, goal) {
  localStorage.setItem(`goal_${email}`, JSON.stringify(goal));
}

export function formatCurrency(amount) {
  return Number(amount || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function logoutStorage() {
  [
    "loggedIn",
    "userRole",
    "currentUserEmail",
    "currentUserName",
  ].forEach((key) => localStorage.removeItem(key));
}