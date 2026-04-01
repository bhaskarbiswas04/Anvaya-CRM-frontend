# Anvaya CRM

A modern **MERN Stack Customer Relationship Management (CRM)** system to manage leads, track sales pipelines, and analyze performance with a clean, responsive UI.

---

## 🌐 Experience the application live: [Anvaya CRM](https://anvaya-crm-frontend-swart.vercel.app/)

---

## 📍 Project Overview

Anvaya CRM helps sales teams:

* Manage the complete lead lifecycle
* Assign and track sales agents
* Monitor pipeline performance
* Analyze data through dashboards and reports
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
    "source": "Referral",
    "salesAgent": "Mike",
    "status": "Qualified",
    "tags": "Hot, Follow Up",
    "timeToClose": "15",
    "priority": "High",
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
    "source": "Referral",
    "salesAgent": "Mike",
    "status": "Qualified",
    "tags": "Hot, Follow Up",
    "timeToClose": "15",
    "priority": "High",
  }
```

---

#### POST /leads

Creates a new lead.

**Sample Request:**

```json
  {
    "_id": "lead_id",
    "name": "Company ABC",
    "source": "Referral",
    "salesAgent": "John",
    "status": "New",
    "tags": "Hot, Follow Up",
    "timeToClose": "15",
    "priority": "High",
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

**Sample Response:**

```json
  {
    "commentText": "Follow up tomorrow",
    "author": "agent_id",
    "createdAt": "2025-04-01"
  }
```

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

**Sample Request:**

```json
  {
    "name": "Mike Tyson",
    "email": "mike@example.com"
  }
```

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

## 📍 Screenshots

<img width="1897" height="863" alt="Anvaya_CRM_HomePage" src="https://github.com/user-attachments/assets/a03be0de-defe-4a4f-927f-f099493ea314" />
<img width="1892" height="870" alt="Anvaya_CRM_LeadsPage" src="https://github.com/user-attachments/assets/a900aa0c-61f3-4821-8ae4-3e6a75c54897" />
<img width="1893" height="866" alt="Anvaya_CRM_SalesPage" src="https://github.com/user-attachments/assets/92ccbb46-9bed-498e-be78-daf1d317ff58" />
<img width="1901" height="862" alt="Anvaya_CRM_AgentsPage" src="https://github.com/user-attachments/assets/b712c8a8-11b4-45dc-915b-ff3ea7521a7f" />
<img width="1901" height="860" alt="Anvaya_CRM_ReportsPage" src="https://github.com/user-attachments/assets/6a85244c-f8b2-4b16-921d-b2fa7a9ecd3d" />

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
For bugs or feature requests, please reach out to 04bhaskarbiswas@gmail.com
---
