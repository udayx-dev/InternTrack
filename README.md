<div align="center">

<img src="https://img.shields.io/badge/MERN-Stack-20232A?style=for-the-badge&logo=mongodb&logoColor=4EA94B" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

<br/><br/>

```
██╗███╗   ██╗████████╗███████╗██████╗ ███╗   ██╗████████╗██████╗  █████╗  ██████╗██╗  ██╗
██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
██║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔██╗ ██║   ██║   ██████╔╝███████║██║     █████╔╝ 
██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╗██║   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚████║   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```

### 🎯 Internship & Job Application CRM

**A production-quality, full-stack MERN application for tracking your entire job search lifecycle.**  
*Built for engineering students who apply to 50+ companies and need a smarter system than a spreadsheet.*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here-4F46E5?style=for-the-badge)](https://intern-track-phi.vercel.app/)
[![Backend API](https://img.shields.io/badge/🔌_Backend_API-Render-46E5A0?style=for-the-badge)](https://interntrack-qwtf.onrender.com)

<br/>

> **Project Report (TAE-II)** · Web Technology (25BTOECE01A) · SY B.Tech. SA1 · Term IV  
> G H Raisoni International Skill Tech University, Pune · SOET

</div>

---

## 👥 Team

| Name | Roll No. | Role |
|------|----------|------|
| **Uday Shinde** | SA147 | Backend Architecture · JWT Auth · REST API · MongoDB · Deployment |
| **Vaibhav Choure** | SA148 | Frontend Development · React UI · Kanban Board · Charts · Axios Integration |

> **Guide:** Prof. Jayvrat Dwivedi, Assistant Professor — School of Engineering and Technology, GHRISTU Pune

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🌐 Live Application | https://intern-track-phi.vercel.app/ |
| 🔌 Backend API | https://interntrack-qwtf.onrender.com |
| 📦 Frontend Repo | https://github.com/udayx-dev/InternTrack/tree/main/interntrack-client |
| 🛠️ Backend Repo | https://github.com/udayx-dev/InternTrack/tree/main/interntrack-server |

---

## 📌 Table of Contents

- [What is InternTrack?](#-what-is-interntrack)
- [Features](#-features)
- [Architecture & Design Patterns](#-architecture--design-patterns)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Key Engineering Decisions](#-key-engineering-decisions)

---

## 💡 What is InternTrack?

InternTrack solves a real problem every CS student faces during placements:

> *"I've applied to 60 companies. I can't remember which ones I have OAs for, which deadlines are tomorrow, or what the HR's name was."*

**InternTrack is a personal CRM (Customer Relationship Manager) for your job hunt.** The same way sales teams use Salesforce to track deals through a pipeline, InternTrack gives every student a private, secure dashboard to manage their applications from first click to final offer.

### The Problem vs. The Solution

```
WITHOUT InternTrack                    WITH InternTrack
─────────────────────                  ────────────────────
📊 Excel spreadsheet                   🎯 Kanban pipeline board
😰 Missed deadlines                    ⏰ Upcoming deadline alerts
🤷 No pipeline visibility              📊 Offer rate analytics
📧 Lost HR contacts                    👤 HR name + email per application
📉 Zero success metrics                📈 Weekly activity charts
```

---

## ✨ Features

### 🔐 Authentication System
- Signup / Login / Logout with full session management
- **Dual-token JWT** — access token (15 min) + refresh token (7 days)
- `httpOnly` cookie for refresh token — **JavaScript cannot read it** (XSS-safe)
- Silent token refresh via Axios interceptor — user never sees a logout
- Session persistence across page refreshes

### 📋 Application Management (Full CRUD)
- Add, edit, delete job applications
- **12 fields per application:** Company, Role, Status, Deadline, Location, Salary, HR Name, HR Email, Job Link, Tags, Notes
- Search and filter by company name or role
- Deadline urgency indicators (overdue, due today, due soon)

### 🎯 Kanban Pipeline Board
- **5 columns:** Applied → Online Assessment → Interview → Offer → Rejected
- **Drag-and-drop** across columns via `@hello-pangea/dnd`
- Optimistic UI updates — instant visual response, rollback on API failure
- Card context menu (Edit / Delete) per application

### 📊 Analytics Dashboard
- **4 stat cards:** Total applications, Active pipeline count, Offers received, Offer rate %
- **Bar chart** — applications added per day (last 7 days) via Chart.js
- **Doughnut chart** — pipeline status distribution
- **Upcoming deadlines** — next 5 deadlines with urgency coloring
- All data via single MongoDB `$facet` aggregation (one DB round trip)

### 🚀 Deployment
- Backend: **Render** (Node.js web service)
- Frontend: **Vercel** (SPA with client-side routing fix)
- Database: **MongoDB Atlas** (free tier, cloud-hosted)

---

## 🏗️ Architecture & Design Patterns

This is the section that separates InternTrack from a basic CRUD project.

### 1. Three-Tier Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                     │
│         React 18 + Vite + Tailwind CSS (Vercel)         │
│   AuthContext · Custom Hooks · Protected Routes · DnD   │
└───────────────────────┬─────────────────────────────────┘
                        │  HTTPS + httpOnly Cookie
                        │  Authorization: Bearer <token>
┌───────────────────────▼─────────────────────────────────┐
│                   APPLICATION TIER                       │
│           Node.js + Express.js REST API (Render)         │
│    MVC Pattern · JWT Middleware · Error Middleware       │
│    express-validator · asyncHandler · AppError Class    │
└───────────────────────┬─────────────────────────────────┘
                        │  Mongoose ODM
┌───────────────────────▼─────────────────────────────────┐
│                      DATA TIER                           │
│              MongoDB Atlas (Cloud Database)              │
│   User Collection · Application Collection · Indexes    │
│       $facet Aggregation · Compound Indexes             │
└─────────────────────────────────────────────────────────┘
```

### 2. MVC Pattern (Backend)
```
Request → Router → Controller → Model → MongoDB
                ↓                  ↑
           Middleware          Mongoose
        (Auth + Validator)    (Schema + Hooks)
                ↓
         Error Middleware
         (Global Handler)
```

The backend strictly follows **Model-View-Controller**:
- **Models** (`User.model.js`, `Application.model.js`) — Mongoose schemas, pre-save hooks, instance methods
- **Controllers** (`auth.controller.js`, `application.controller.js`, `stats.controller.js`) — Business logic only, no schema knowledge
- **Routes** (`auth.routes.js`, `application.routes.js`) — Wiring only, no logic
- **Middleware** (`auth.middleware.js`, `error.middleware.js`) — Cross-cutting concerns

### 3. Service Layer Pattern (Frontend)
```
Component
    │
    ▼
Custom Hook (useApplications, useAuth)   ← Business logic
    │
    ▼
API Layer (applicationApi.create())      ← HTTP abstraction
    │
    ▼
Axios Instance (axiosInstance.js)        ← Base config + interceptors
    │
    ▼
Express REST API
```

**No component ever calls Axios directly.** Every HTTP call goes through a named function in `src/api/`. This is the service layer pattern — it makes every API call testable and the HTTP implementation swappable without touching a single component.

### 4. JWT Dual-Token Authentication Pattern
```
                    LOGIN
                      │
          ┌───────────▼────────────┐
          │     Express Server      │
          │                        │
          │  Access Token (15 min) ─────► JSON Response Body
          │  Refresh Token (7 days) ────► httpOnly Cookie
          └────────────────────────┘
                      
          PROTECTED REQUEST
          Authorization: Bearer <accessToken>
                      │
          ┌───────────▼────────────┐
          │   auth.middleware.js    │
          │   jwt.verify(token)     │
          │   req.user = user       │
          └───────────┬────────────┘
                      ▼
                 Controller
                 
          TOKEN EXPIRY (401 received)
                      │
          ┌───────────▼────────────┐
          │  Axios Response        │
          │  Interceptor           │
          │  POST /auth/refresh    │
          │  (cookie sent auto)    │
          │  New access token  ────► Retry original request
          └────────────────────────┘
          
          LOGOUT
          Server clears cookie + sets refreshToken = null in DB
```

### 5. Optimistic Update Pattern (Kanban)
```
User drags card from Applied → Interview

Step 1: Save previous state (backup)
Step 2: Update local state IMMEDIATELY → card moves visually
Step 3: Call PATCH /api/applications/:id/status

        ┌── Success → do nothing (DB now matches UI)
        └── Failure  → rollback to saved state + show error toast
```

### 6. Repository Pattern (API Layer)
Each API module exposes only named functions:
```js
// Component calls this — never axios.patch() directly:
applicationApi.updateStatus(id, 'Interview')

// Which internally does:
axiosInstance.patch(`/applications/${id}/status`, { status })
```

### 7. asyncHandler Pattern
```js
// Without asyncHandler — 15+ try/catch blocks in controllers:
const getAll = async (req, res, next) => {
  try {
    const apps = await Application.find({ userId: req.user._id });
    res.json({ apps });
  } catch (err) {
    next(err);
  }
};

// With asyncHandler — zero try/catch in controllers:
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getAll = asyncHandler(async (req, res) => {
  const apps = await Application.find({ userId: req.user._id });
  res.json({ apps });
});
```

### 8. Global Error Middleware Pattern
```js
// Every thrown error flows here via next(err):
const errorHandler = (err, req, res, next) => {
  // Handles: CastError, Duplicate Key, Validation, JWT errors
  // Never exposes stack traces in production
  res.status(err.statusCode || 500).json({ message: err.message });
};
// app.use(errorHandler) — MUST be last middleware
```

---

## 🛠️ Tech Stack

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| `express` | 4.18.x | Web framework + REST API |
| `mongoose` | 8.x | MongoDB ODM + Schema validation |
| `bcryptjs` | 2.4.x | Password hashing (10 rounds) |
| `jsonwebtoken` | 9.x | JWT signing and verification |
| `cookie-parser` | 1.4.x | httpOnly cookie reading |
| `cors` | 2.8.x | Cross-origin resource sharing |
| `express-validator` | 7.x | Request body validation |
| `dotenv` | 16.x | Environment variable management |
| `nodemon` | 3.x | Dev auto-restart |

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18.x | UI library |
| `vite` | 5.x | Build tool + dev server |
| `react-router-dom` | 6.x | Client-side routing |
| `axios` | 1.x | HTTP client + interceptors |
| `@hello-pangea/dnd` | latest | Drag-and-drop (maintained fork of react-beautiful-dnd) |
| `chart.js` + `react-chartjs-2` | 4.x | Bar + Doughnut charts |
| `react-hot-toast` | 2.x | Toast notifications |
| `tailwindcss` | 3.x | Utility-first CSS |

### Infrastructure
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Cloud NoSQL database (free tier) |
| Render | Backend hosting (Node.js web service) |
| Vercel | Frontend hosting (SPA deployment) |

---

## 📁 Project Structure

```
interntrack/
├── interntrack-server/          ← Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            ← MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js        ← signup, login, logout, refresh
│   │   │   ├── application.controller.js ← CRUD + ownership
│   │   │   └── stats.controller.js       ← $facet aggregation
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js         ← JWT verify, attaches req.user
│   │   │   └── error.middleware.js        ← Global error handler
│   │   ├── models/
│   │   │   ├── User.model.js              ← Schema + bcrypt pre-save hook
│   │   │   └── Application.model.js       ← Schema + compound index
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── application.routes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js    ← Eliminates try/catch from controllers
│   │   │   ├── AppError.js        ← Custom error class with statusCode
│   │   │   └── generateTokens.js  ← signAccessToken, signRefreshToken
│   │   └── validators/
│   │       ├── auth.validator.js
│   │       └── application.validator.js
│   ├── seed.js                  ← Populate 20 realistic fake applications
│   ├── server.js                ← Entry point
│   └── .env.example
│
└── interntrack-client/          ← Frontend
    ├── src/
    │   ├── api/
    │   │   ├── axiosInstance.js   ← Base config + token interceptors
    │   │   ├── auth.api.js        ← login(), signup(), logout(), refresh()
    │   │   ├── application.api.js ← getAll(), create(), update(), etc.
    │   │   └── stats.api.js       ← getSummary()
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   ├── Spinner.jsx
    │   │   │   └── StatusBadge.jsx
    │   │   ├── kanban/
    │   │   │   ├── KanbanBoard.jsx    ← DragDropContext wrapper
    │   │   │   ├── KanbanColumn.jsx   ← Droppable column
    │   │   │   └── KanbanCard.jsx     ← Draggable card
    │   │   ├── dashboard/
    │   │   │   ├── WeeklyChart.jsx    ← Chart.js Bar
    │   │   │   └── PipelineChart.jsx  ← Chart.js Doughnut
    │   │   └── applications/
    │   │       └── ApplicationForm.jsx ← Create/Edit modal
    │   ├── context/
    │   │   └── AuthContext.jsx    ← Global auth state
    │   ├── hooks/
    │   │   ├── useAuth.js         ← Consumes AuthContext
    │   │   └── useApplications.js ← All app state + CRUD + optimistic updates
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── KanbanPage.jsx
    │   └── utils/
    │       ├── statusConfig.js    ← Single source of truth for status config
    │       └── formatters.js      ← Date formatting, initials, daysUntil
    └── vercel.json                ← SPA routing fix
```

---

## 🗄️ Database Schema

### User Collection
```js
{
  _id:          ObjectId,          // Primary key (auto)
  name:         String,            // required, max 60 chars
  email:        String,            // required, unique, lowercase, regex validated
  password:     String,            // bcrypt hash, select: false (NEVER returned in queries)
  refreshToken: String,            // select: false, set to null on logout
  createdAt:    Date,              // Mongoose timestamps
  updatedAt:    Date
}
```

### Application Collection
```js
{
  _id:      ObjectId,
  userId:   ObjectId (ref: 'User'),  // INDEXED — every query filters by this
  company:  String,                  // required
  role:     String,                  // required
  status:   String,                  // enum: ['Applied','OA','Interview','Offer','Rejected']
  deadline: Date,                    // optional
  notes:    String,                  // max 2000 chars
  hrName:   String,
  hrEmail:  String,
  jobLink:  String,
  tags:     [String],                // lowercase, trimmed
  salary:   String,
  location: String,
  createdAt: Date,
  updatedAt: Date
}
// Compound index: { userId: 1, createdAt: -1 }
```

> **Design decision:** Applications are a *separate collection* (normalized), not embedded in User documents. Embedding would create an unbounded array that grows with every application — a MongoDB anti-pattern that degrades query performance.

---

## 🔌 API Reference

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/signup` | Public | Register user, returns access token + sets refresh cookie |
| `POST` | `/api/auth/login` | Public | Authenticate, returns access token + sets refresh cookie |
| `POST` | `/api/auth/logout` | Public | Clears cookie + nullifies refresh token in DB |
| `POST` | `/api/auth/refresh` | Cookie | Validates refresh token cookie, returns new access token |
| `GET` | `/api/auth/me` | 🔒 Bearer | Returns currently authenticated user |

### Application Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/applications` | 🔒 Bearer | Get all user's applications (`?status`, `?search`, `?sortBy`) |
| `POST` | `/api/applications` | 🔒 Bearer | Create new application |
| `GET` | `/api/applications/:id` | 🔒 Bearer | Get single application (ownership validated) |
| `PUT` | `/api/applications/:id` | 🔒 Bearer | Full update of application |
| `PATCH` | `/api/applications/:id/status` | 🔒 Bearer | Status-only update (Kanban drag-drop) |
| `DELETE` | `/api/applications/:id` | 🔒 Bearer | Delete application (ownership validated) |
| `GET` | `/api/applications/stats/summary` | 🔒 Bearer | Dashboard analytics via `$facet` aggregation |

### Example Request / Response

```bash
# Create application
POST /api/applications
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "company": "Google",
  "role": "SDE Intern",
  "status": "Applied",
  "deadline": "2025-03-01",
  "tags": ["tech", "product"]
}

# Response 201
{
  "success": true,
  "application": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "userId": "65f1a2b3c4d5e6f7a8b9c0d0",
    "company": "Google",
    "role": "SDE Intern",
    "status": "Applied",
    "deadline": "2025-03-01T00:00:00.000Z",
    "tags": ["tech", "product"],
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account (free) or local MongoDB
- Git

### 1. Clone the repositories

```bash
# Backend
git clone <!-- ADD YOUR BACKEND REPO URL HERE -->
cd interntrack-server

# Frontend (new terminal)
git clone <!-- ADD YOUR FRONTEND REPO URL HERE -->
cd interntrack-client
```

### 2. Backend Setup

```bash
cd interntrack-server
npm install

# Copy environment file
cp .env.example .env
# Fill in your .env values (see Environment Variables section)

# Start development server
npm run dev
# Server running on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd interntrack-client
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
# App running on http://localhost:5173
```

### 4. Seed Demo Data (Optional)

```bash
cd interntrack-server
node seed.js
# Creates demo user + 20 realistic applications
# Login: demo@interntrack.dev / demo1234
```

---

## 🔧 Environment Variables

### Backend (`interntrack-server/.env`)

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/interntrack

# JWT Secrets — generate with: openssl rand -hex 32
JWT_ACCESS_SECRET=your_access_secret_here_min_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_here_min_32_characters

# Token expiry
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Frontend (`interntrack-client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files. Both repos include `.env.example` with placeholder values.

---

## ☁️ Deployment

### Backend → Render

1. Push `interntrack-server` to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect repo → set Build Command: `npm install` · Start Command: `npm start`
4. Add all environment variables from `.env.example`
5. Set `NODE_ENV=production` and `CLIENT_URL=https://your-app.vercel.app`

### Frontend → Vercel

1. Push `interntrack-client` to GitHub
2. Import project on [vercel.com](https://vercel.com) (auto-detects Vite)
3. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`
4. Deploy → copy Vercel URL back into Render's `CLIENT_URL`

### MongoDB Atlas

1. Create free M0 cluster on [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create database user with read/write access
3. Network Access → Add `0.0.0.0/0` (required for Render's dynamic IPs)
4. Copy connection string to `MONGO_URI`

---

## 🧠 Key Engineering Decisions

| Decision | Reasoning |
|----------|-----------|
| **`httpOnly` cookie for refresh token** | JavaScript (including XSS injected code) cannot access `httpOnly` cookies. The long-lived credential is completely unreachable from the browser's JS context. |
| **Access token in React memory** | Not `localStorage` (XSS-stealable) or cookies (CSRF-vulnerable). Stored as a JS variable in `axiosInstance.js`. Clears on page close — acceptable because the refresh cookie silently restores it. |
| **`PATCH /:id/status` vs `PUT /:id`** | Kanban drag-drop only changes one field. `PATCH` is REST-semantically correct for partial updates. Avoids accidentally overwriting all other fields with a stale client snapshot. |
| **Ownership at DB query level** | `findOneAndUpdate({ _id, userId })` — even if an attacker knows a document `_id`, the server returns `404` unless the `userId` also matches. Prevents IDOR vulnerabilities. |
| **`$facet` aggregation for dashboard** | All dashboard metrics computed in **one MongoDB round trip** instead of 3–4 separate queries. `$facet` runs multiple independent pipelines simultaneously on the same dataset. |
| **`asyncHandler` utility** | Eliminates `try/catch` from every controller. Any thrown error or rejected promise is automatically forwarded to Express's global error middleware via `next(err)`. |
| **Reference (not embedded) design** | Applications are a separate MongoDB collection linked by `userId`, not an embedded array in User documents. Prevents unbounded document growth and supports independent indexing. |
| **Optimistic UI with rollback** | Kanban drag updates the UI instantly (no spinner) then calls the API. If the API fails, the original state is restored. Gives sub-millisecond perceived response time on status changes. |
| **`SameSite: 'none'` in production** | Vercel (frontend) and Render (backend) are different origins — cross-site cookies require `SameSite: 'none'` + `Secure: true`. In development (`localhost`), `SameSite: 'lax'` works fine. |

---

## 📄 Academic Details

```
University  : G H Raisoni International Skill Tech University, Pune
Department  : School of Engineering and Technology (SOET)
Subject     : Web Technology
Subject Code: 25BTOECE01A
Class       : SY B.Tech. — SA1
Term        : IV
Project Type: TAE-II (Term Assessment Examination)
Guide       : Prof. Jayvrat Dwivedi (Assistant Professor, SOET)
```

---

<div align="center">

Made with 💙 by **Uday Shinde (SA147)** & **Vaibhav Choure (SA148)**  
GHRISTU, Pune · 2024–25

</div>
