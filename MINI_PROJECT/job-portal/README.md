# TalentBridge - Job Portal

A full-stack job portal built with React.js (frontend) and Node.js/Express (backend).

## 🚀 Features

- **Authentication** - Register & Login with JWT tokens
- **User Profile** - Complete your professional profile with skills, experience, preferences
- **Job Search** - Filter jobs by title, location, category, type, experience, remote
- **Job Details** - Full job descriptions with apply functionality
- **Dummy Data** - 8 pre-loaded job listings across various categories
- **Dark Theme** - Beautiful dark UI with purple accent design

## 📁 Project Structure

```
job-portal/
├── backend/          # Node.js + Express API
│   ├── routes/
│   │   ├── auth.js   # Register, Login, Get User
│   │   └── jobs.js   # Job search, listing, detail
│   ├── server.js
│   └── package.json
└── frontend/         # React.js App
    ├── src/
    │   ├── pages/
    │   │   ├── AuthPage.js      # Login/Register
    │   │   ├── ProfilePage.js   # User dashboard
    │   │   ├── JobSearchPage.js # Search & filter jobs
    │   │   └── JobDetailPage.js # Job details & apply
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── JobCard.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   └── App.js
    └── package.json
```

## ⚙️ Setup & Installation

### Backend

```bash
cd backend
npm install
npm run dev   # or: npm start
```
Server runs on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm start
```
App runs on http://localhost:3000

> **Note:** The frontend proxies API calls to localhost:5000 (configured in package.json). Start the backend first!

## 🔐 Authentication Flow

1. Open http://localhost:3000 → redirected to /auth
2. Register with any name/email/password
3. Auto-redirected to Profile page (/profile)
4. Fill profile and click "Find Jobs" → Job search page

## 🛣️ Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| /auth | Login / Register | Public |
| /profile | User Dashboard & Profile | Protected |
| /jobs | Job Search | Protected |
| /jobs/:id | Job Detail & Apply | Protected |

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET | /api/jobs | Get all jobs |
| GET | /api/jobs/search | Search/filter jobs |
| GET | /api/jobs/:id | Get job by ID |

## 💡 Notes

- User data is stored in-memory (replace with MongoDB/PostgreSQL for production)
- 8 dummy jobs are pre-loaded covering Technology, Data Science, Design, Management, Marketing, Finance
- JWT tokens expire in 7 days
- The frontend works standalone even without the backend (uses built-in dummy data as fallback)
