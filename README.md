# Budget Buddy — React + Vite

## Requirements
- Node.js (LTS)
- VS Code

## Run the project
1. Extract this ZIP file.
2. Open the extracted `budget-buddy-react` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Pages
- `/` — Home
- `/signup` — Signup
- `/login` — Login
- `/user-dashboard` — User dashboard (protected)
- `/admin-dashboard` — Admin dashboard (protected)

## Admin demo login
- Email: `admin@budgetbuddy.com`
- Password: `admin123`

## Important
This is a frontend academic/demo project. It stores user data in browser Local Storage.
Passwords in Local Storage are not secure for a real production application. For a real
finance app, use a backend API, database, password hashing, and proper authentication.

## GitHub
Create a new empty GitHub repository, then from this project folder run:

```bash
git init
git add .
git commit -m "Convert Budget Buddy to React and Vite"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own GitHub repository URL.