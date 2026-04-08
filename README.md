# OptiFlow AI

OptiFlow AI is a starter platform for queue-aware operational decisions in healthcare settings. The current scaffold gives you a FastAPI backend with a rules-based decision engine and a Next.js dashboard that visualizes queues, staffing, and recommended actions.

The frontend now includes an admin login flow and a dashboard layout modeled after a classic hospital operations console.

## Stack

- Frontend: Next.js App Router with TypeScript
- Backend: FastAPI with a simple in-memory service layer
- Database: PostgreSQL-ready structure with SQLAlchemy models
- Deployment: Docker Compose for local full-stack startup

## Project Structure

```text
optiflow-ai/
├── backend/
├── frontend/
├── docs/
├── .env
├── .env.example
├── docker-compose.yml
└── README.md
```

## Quick Start

### Option 1: Run with Docker

```bash
docker compose up --build
```

Frontend:
`http://localhost:3000`

Login:
`http://localhost:3000/login`

Backend:
`http://localhost:8000`

API docs:
`http://localhost:8000/docs`

### Option 2: Run locally

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Admin Login

The root route now redirects to the admin login page. Dashboard routes are protected by a simple server-side cookie check.

Starter credentials come from `.env`:

```env
ADMIN_EMAIL=admin@optiflow.local
ADMIN_PASSWORD=ChangeMe123!
```

Change those values before sharing or deploying the app.

The Next.js frontend is configured to read the repository-root `.env`, so you only need to update credentials in one place.

## Current MVP Features

- Queue snapshot endpoint at `/api/v1/queue`
- Staff snapshot endpoint at `/api/v1/staff`
- Decision endpoint at `/api/v1/decisions`
- Rules engine in `backend/app/ai/rules.py`
- Dashboard page at `/dashboard`
- Admin login page at `/login`
- Protected frontend routes for dashboard, reports, and settings

## Key Files

- `backend/app/main.py`: FastAPI app setup and routing
- `backend/app/ai/rules.py`: starter decision logic
- `backend/app/services/decision_engine.py`: bridge between API payloads and rules
- `frontend/app/dashboard/page.tsx`: dashboard entry page
- `frontend/services/`: API calls and data normalization

## Next Steps

1. Replace in-memory queue and staff services with PostgreSQL persistence.
2. Add WebSockets for real-time dashboard updates.
3. Expand `predictor.py` with forecasting logic for demand spikes.
