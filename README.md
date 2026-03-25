# 🚀 Anvaya CRM

A modern **MERN Stack Customer Relationship Management (CRM)** system designed to manage leads, track sales pipelines, and analyze performance with a clean and responsive UI.

---

## 📌 Project Overview

Anvaya CRM helps sales teams efficiently:

* Manage leads lifecycle
* Assign sales agents
* Track lead status
* Add comments and tags
* Analyze performance using dashboards and reports

Built with a **scalable architecture and production-ready UI/UX patterns**.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap 5
* Chart.js (React ChartJS 2)
* Context API (State Management)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Deployment

* Frontend → Vercel
* Backend → Vercel

---

## ✨ Features

### 🧩 Lead Management

* Create, update, delete leads
* View lead details
* Track lead status
* Assign sales agents

### 🧑‍💼 Agent Management

* Add and manage sales agents
* Assign agents to leads

### 🏷️ Tag System

* Create custom tags
* Attach/remove tags from leads
* View all available tags

### 💬 Comments System

* Add comments to leads
* Agent-based comments
* Timestamp tracking

### 📊 Dashboard

* Lead statistics
* Quick filters
* Recent leads preview

### 📈 Sales Insights

* Leads grouped by status
* Leads grouped by agents
* Filtering support

### 📉 Reports

* Leads Closed vs Pipeline (Pie Chart)
* Closed Leads by Agent (Bar Chart)
* Lead Status Distribution (Pie Chart)

### 🔍 Search & Filters

* Search leads by name, agent, source
* Filter by:

  * Status
  * Agent
  * Source
* Sort by:

  * Priority
  * Time to close

### 🎨 UI/UX Features

* Responsive design (mobile + desktop)
* Sidebar navigation
* Confirmation modals
* Empty states
* Loading skeletons (dashboard)
* Progress loaders (other pages)
* Scrollable tables

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── dashboard-screen/
│   ├── sales-screen/
│   ├── ui/
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── LeadListPage.jsx
│   ├── LeadDetails.jsx
│   ├── SalesPage.jsx
│   ├── SalesAgentPage.jsx
│   ├── ReportsPage.jsx
│
├── layouts/
│   ├── ScreensLayout.jsx
│   ├── Sidebar.jsx
│
├── context/
│   ├── LeadContext.jsx
│   ├── AgentContext.jsx
│
├── services/
│   ├── leadService.js
│   ├── agentService.js
│   ├── tagService.js
│
├── utils/
│   ├── badges.js
│
└── App.jsx
```

---

## 🔌 API Endpoints

### Leads

* `GET /leads`
* `GET /leads/:id`
* `POST /leads`
* `PUT /leads/:id`
* `DELETE /leads/:id`

### Comments

* `GET /leads/:id/comments`
* `POST /leads/:id/comments`

### Agents

* `GET /agents`
* `POST /agents`

### Tags

* `GET /tags`
* `POST /tags`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/anvaya-crm.git
cd anvaya-crm
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend (Vercel)

Add `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

### Backend (Vercel)

* Deploy API routes
* Set environment variables in Vercel dashboard

---

## 📸 Screenshots

> Add screenshots here after deployment

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Leads Page

![Leads](./screenshots/leads.png)

### Lead Details

![Lead Details](./screenshots/lead-details.png)

### Reports

![Reports](./screenshots/reports.png)

---

## 🚀 Key Highlights

* Clean and scalable architecture
* Real-world CRM features
* Production-ready UI/UX
* Fully responsive design
* API-driven data handling
* Context-based state management

---

## 📈 Future Improvements

* Kanban board (drag & drop leads)
* Role-based authentication
* Real-time updates (Socket.io)
* Export reports (CSV/PDF)
* Dark mode

---

## 👨‍💻 Author

**Bhaskar Biswas**

* GitHub: https://github.com/your-username
* LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star this repo
* 🍴 Fork it
* 📢 Share it

---

## 📌 Final Note

This project demonstrates:

* Full-stack MERN development
* API design and integration
* State management
* UI/UX best practices
* Dashboard and analytics implementation

Perfect for showcasing **job-ready skills for MERN stack roles** 🚀
