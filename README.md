# 🚀 Anvaya CRM

A modern **MERN Stack Customer Relationship Management (CRM)** system designed to manage leads, track sales pipelines, and analyze performance with a clean and responsive UI.

---

## Project Overview

Anvaya CRM helps sales teams efficiently:

* Manage leads lifecycle
* Assign sales agents
* Track lead status
* Add comments and tags
* Analyze performance using dashboards and reports

Built with a **scalable architecture and production-ready UI/UX patterns**.

---

## Tech Stack

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

## Features

### Lead Management

* Create, update, delete leads
* View lead details
* Track lead status
* Assign sales agents

### Agent Management

* Add and manage sales agents
* Assign agents to leads

### Tag System

* Create custom tags
* Attach/remove tags from leads
* View all available tags

### Comments System

* Add comments to leads
* Agent-based comments
* Timestamp tracking

### Dashboard

* Lead statistics
* Quick filters
* Recent leads preview

### Sales Insights

* Leads grouped by status
* Leads grouped by agents
* Filtering support

### Reports

* Leads Closed vs Pipeline (Pie Chart)
* Closed Leads by Agent (Bar Chart)
* Lead Status Distribution (Pie Chart)

### Search & Filters

* Search leads by name, agent, source
* Filter by:

  * Status
  * Agent
  * Source
* Sort by:

  * Priority
  * Time to close

### UI/UX Features

* Responsive design (mobile + desktop)
* Sidebar navigation
* Confirmation modals
* Empty states
* Loading skeletons (dashboard)
* Progress loaders (other pages)
* Scrollable tables

---

## API Endpoints

### Leads

* `GET /leads`
* `GET /leads/:id`
* `POST /leads`
* `POST /leads/:id`
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

### Clone the repository

```bash
git clone https://github.com/bhaskarbiswas04/Anvaya-CRM-frontend.git
cd anvaya-crm
npm install
```

---

### Setup Frontend

```bash
cd frontend
npm install
```
---

### Dashboard

## Key Highlights

* Clean and scalable architecture
* Real-world CRM features
* Production-ready UI/UX
* Fully responsive design
* API-driven data handling
* Context-based state management

---

## Author

**Bhaskar Biswas**

* GitHub: https://github.com/bhaskarbiswas04
* LinkedIn: https://www.linkedin.com/in/bhaskarb04/
