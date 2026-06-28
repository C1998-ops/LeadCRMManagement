# Confident Group CRM – Backend API

Node.js / Express + SQLite backend for the CRM dashboard.

## Quick Start

```bash
cd confident-group-backend
cp .env.example .env          # edit JWT_SECRET at minimum
npm install
npm run seed                  # creates DB + sample data
npm run dev                   # nodemon hot-reload
```

The server starts on **http://localhost:3001**

---

## Auth Credentials (after seed)

| Role  | Email                          | Password   |
|-------|--------------------------------|------------|
| Admin | admin@confidentgroup.com       | admin123   |
| Agent | agent@confidentgroup.com       | agent123   |

---

## API Reference

All protected routes require:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint                     | Auth | Description          |
|--------|------------------------------|------|----------------------|
| POST   | /api/auth/register           | ❌   | Register new user    |
| POST   | /api/auth/login              | ❌   | Login                |
| GET    | /api/auth/me                 | ✅   | Get current user     |
| POST   | /api/auth/change-password    | ✅   | Change password      |

**Login request:**
```json
{ "email": "admin@confidentgroup.com", "password": "admin123" }
```
**Login response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJ...",
    "user": { "id": "...", "name": "Admin User", "email": "...", "role": "admin" }
  }
}
```

---

### Leads

| Method | Endpoint                      | Roles             | Description           |
|--------|-------------------------------|-------------------|-----------------------|
| GET    | /api/leads                    | all               | List leads (paginated)|
| GET    | /api/leads/stats              | all               | Dashboard stats       |
| GET    | /api/leads/:id                | all               | Get lead + activities |
| POST   | /api/leads                    | all               | Create lead           |
| PUT    | /api/leads/:id                | all               | Update lead           |
| DELETE | /api/leads/:id                | admin, manager    | Delete lead           |
| POST   | /api/leads/:id/activities     | all               | Log activity          |

**Query params for GET /api/leads:**
- `page`, `limit` – pagination (default 1, 20)
- `status` – filter: new | contacted | qualified | proposal | negotiation | won | lost
- `priority` – filter: low | medium | high
- `assigned_to` – filter by user ID
- `search` – full-text search across name, email, company, title
- `sort` – field to sort by (default: created_at)
- `order` – asc | desc

**Create lead body:**
```json
{
  "title": "Enterprise Deal",
  "first_name": "Rahul",
  "last_name": "Sharma",
  "email": "rahul@company.com",
  "phone": "+91-9876543210",
  "company": "Acme Corp",
  "source": "referral",
  "status": "new",
  "priority": "high",
  "estimated_value": 500000,
  "notes": "Met at conference",
  "assigned_to": "<user-id>"
}
```

**Lead statuses:** new → contacted → qualified → proposal → negotiation → won / lost

---

### Customers

| Method | Endpoint              | Roles          | Description              |
|--------|-----------------------|----------------|--------------------------|
| GET    | /api/customers        | all            | List customers           |
| GET    | /api/customers/:id    | all            | Get customer + leads     |
| POST   | /api/customers        | all            | Create customer          |
| PUT    | /api/customers/:id    | all            | Update customer          |
| DELETE | /api/customers/:id    | admin, manager | Delete customer          |

---

## Project Structure

```
src/
├── index.js                  # Entry point, Express app
├── controllers/
│   ├── authController.js     # Register, login, me, change-password
│   ├── leadsController.js    # CRUD + activities + stats
│   └── customersController.js
├── routes/
│   ├── auth.js
│   ├── leads.js
│   └── customers.js
├── middleware/
│   ├── auth.js               # JWT authenticate + authorize
│   └── errorHandler.js       # Global error handler + validator
└── db/
    ├── database.js           # SQLite connection (better-sqlite3)
    ├── migrate.js            # Schema creation
    └── seed.js               # Sample data
```

## Environment Variables

| Variable        | Default              | Description                  |
|-----------------|----------------------|------------------------------|
| PORT            | 3001                 | Server port                  |
| JWT_SECRET      | —                    | **Required** — change this!  |
| JWT_EXPIRES_IN  | 7d                   | Token lifetime               |
| DB_PATH         | ./data/crm.db        | SQLite file path             |
| FRONTEND_URL    | http://localhost:5173| CORS allowed origin          |
| NODE_ENV        | development          | Environment                  |
