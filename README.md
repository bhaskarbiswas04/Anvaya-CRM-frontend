# Anvaya CRM

A modern **MERN Stack Customer Relationship Management (CRM)** system to manage leads, track sales pipelines, and analyze performance with a clean, responsive UI.

---

## 🌐 Live Demo

🚀 Experience the application live:

* 🔗 **Live Demo:** [Anvaya CRM](https://anvaya-crm-frontend-swart.vercel.app/)

---

### 📌 Demo Highlights

* Explore dashboard analytics
* Create and manage leads
* Assign agents and update statuses
* Add tags and comments
* View reports and charts


## 📍 Project Overview

Anvaya CRM helps sales teams:

* Manage the complete lead lifecycle
* Assign and track sales agents
* Monitor pipeline performance
* Analyze data through dashboards and reports

Built with a **scalable architecture and production-ready UI/UX patterns**.

---

## 📍 Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap 5
* Chart.js (React ChartJS 2)
* Context API

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

## 📍 Environment Setup

### Backend `.env`

```env
MONGODB=mongodb+srv://04bhaskarbiswas_db_user:A2fyfwqm9nRdgN3W@anvaya-crm-backend.prnyci3.mongodb.net/?appName=anvaya-crm-backend
PORT=5000
```

---

### Frontend `.env`

```env
VITE_API_URL=https://anvaya-crm-backend-ten.vercel.app
```

---

## 📍 Features

### Lead Management

* Creates, updates, and deletes leads
* Displays detailed lead information
* Tracks lead status across pipeline stages
* Assigns sales agents to leads

---

### Agent Management

* Creates and manages sales agents
* Assigns agents to leads

---

### Tag Management

* Creates custom tags
* Attaches and removes tags from leads
* Displays all available tags

---

### Comments System

* Adds comments to leads
* Associates comments with agents
* Displays timestamped comment history

---

### Dashboard

* Displays lead statistics
* Filters leads using quick filters
* Shows recent leads preview

---

### Sales Insights

* Groups leads by status
* Groups leads by sales agents
* Filters insights dynamically

---

### Reports

* Visualizes closed vs pipeline leads
* Displays closed leads by agent
* Shows lead status distribution

---

### Search & Filters

* Searches leads by name, agent, or source
* Filters leads by status, agent, and source
* Sorts leads by priority and time to close

---

### UI/UX Enhancements

* Implements responsive design
* Displays sidebar navigation
* Shows confirmation modals
* Handles empty states
* Displays loading skeletons and loaders
* Enables scrollable tables

---

## 📍 API Documentation

###  Leads

#### GET /leads

Retrieves all leads or filtered leads based on query parameters.

**Sample Response:**

```json
[
  {
    "_id": "lead_id",
    "name": "Company ABC",
    "status": "Qualified",
    "priority": "High",
    "source": "Website"
  }
]
```

---

#### GET /leads/:id

Retrieves a single lead by ID.

**Sample Response:**

```json
{
  "_id": "lead_id",
  "name": "Company ABC",
  "status": "Qualified",
  "priority": "High"
}
```

---

#### POST /leads

Creates a new lead.

**Sample Request:**

```json
{
  "name": "Company ABC",
  "status": "New",
  "priority": "High"
}
```

---

#### PUT /leads/:id

Updates an existing lead.

---

#### DELETE /leads/:id

Deletes a lead.

---

### Comments

#### GET /leads/:id/comments

Retrieves all comments for a lead.

**Sample Response:**

```json
[
  {
    "commentText": "Follow up tomorrow",
    "author": "agent_id",
    "createdAt": "2025-01-01"
  }
]
```

---

#### POST /leads/:id/comments

Adds a new comment to a lead.

---

### Agents

#### GET /agents

Retrieves all sales agents.

**Sample Response:**

```json
[
  {
    "_id": "agent_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

#### POST /agents

Creates a new sales agent.

---

### Tags

#### GET /tags

Retrieves all available tags.

**Sample Response:**

```json
[
  {
    "_id": "tag_id",
    "name": "Hot Lead"
  }
]
```

---

#### POST /tags

Creates a new tag.

---

## Deployment

### Frontend (Vercel)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📍 Screenshots

*Add your screenshots here*

---

## 📍 Key Highlights

* Scalable architecture
* Real-world CRM features
* API-driven design
* Responsive UI
* Data visualization

---

## 📍 Author

**Bhaskar Biswas**
---
