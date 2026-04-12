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
│   ├── app/
│   │   ├── main.py                 # FastAPI app setup
│   │   ├── core/config.py          # Configuration management
│   │   ├── api/routes/             # API endpoints
│   │   │   ├── queue.py           # Queue management
│   │   │   ├── staff.py           # Staff management
│   │   │   ├── decisions.py       # Decision engine
│   │   │   └── health.py          # Health checks
│   │   ├── services/              # Business logic
│   │   │   ├── queue_service.py   # Queue operations
│   │   │   ├── staff_service.py   # Staff operations
│   │   │   └── decision_engine.py # Decision evaluation
│   │   ├── ai/                    # AI/ML components
│   │   │   ├── rules.py           # Rules-based decisions
│   │   │   └── predictor.py       # Forecasting (planned)
│   │   ├── models/                # Database models
│   │   ├── schemas/               # Pydantic schemas
│   │   └── utils/                 # Utilities
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/                       # Next.js app router
│   │   ├── dashboard/page.tsx     # Main dashboard
│   │   ├── login/page.tsx         # Admin login
│   │   └── api/                   # API routes
│   ├── components/                # React components
│   ├── services/                  # API client services
│   ├── types/                     # TypeScript types
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── architecture.md            # System architecture
│   ├── api.md                     # API documentation
│   ├── testing.md                 # Testing guide
│   ├── deployment.md              # Deployment guide
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
.venv\Scripts\activate  # On Windows
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

## Current Features

### Backend API
- **Queue Management**: GET/POST `/api/v1/queue` - Retrieve and update queue snapshots
- **Staff Management**: GET/POST `/api/v1/staff` - Retrieve and update staff snapshots
- **Decision Engine**: GET/POST `/api/v1/decisions` - Get operational recommendations
- **Health Checks**: GET `/health` - System health status
- **Interactive API Docs**: GET `/docs` - Swagger UI documentation

### Frontend Dashboard
- **Real-time Queue Visualization**: ER, Lab, and Radiology queue status
- **Staff Overview**: Total staff, idle/busy counts, role breakdown
- **Decision Alerts**: AI-powered operational recommendations
- **Efficiency Metrics**: Historical performance charts
- **Admin Authentication**: Secure login system

### AI Decision Engine
- **Rules-based Logic**: Automated decision making based on queue and staff data
- **Configurable Thresholds**: ER congestion (>15 patients), Lab overload (>8 patients)
- **Staff Reassignment**: Automatic suggestions for idle staff utilization
- **Capacity Planning**: Recommendations for opening additional counters/shifts

## API Endpoints

### Queue Operations
```http
GET  /api/v1/queue
POST /api/v1/queue
```

**Response:**
```json
{
  "areas": {
    "ER": 18,
    "Lab": 6,
    "Radiology": 3
  }
}
```

### Staff Operations
```http
GET  /api/v1/staff
POST /api/v1/staff
```

**Response:**
```json
{
  "total": 12,
  "idle": 2,
  "busy": 10,
  "by_role": {
    "nurse": 6,
    "tech": 4,
    "doctor": 2
  }
}
```

### Decision Engine
```http
GET  /api/v1/decisions
POST /api/v1/decisions
```

**Response:**
```json
{
  "actions": [
    "Open new ER counter",
    "Reassign idle staff"
  ]
}
```

## Testing

### Backend Testing
```bash
# Test all endpoints
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/queue
curl http://localhost:8000/api/v1/staff
curl http://localhost:8000/api/v1/decisions
```

### Frontend Testing
- Visit `http://localhost:3000/login`
- Login with admin credentials
- Navigate to dashboard
- Verify data loading and UI responsiveness

## Development Roadmap

### Phase 1: Core Stability ✅
- [x] Basic API endpoints
- [x] Frontend dashboard
- [x] Admin authentication
- [x] Docker deployment
- [x] Rules-based decision engine

### Phase 2: Data Persistence 🔄
- [ ] PostgreSQL database integration
- [ ] Data migration scripts
- [ ] Historical data storage
- [ ] Backup and recovery

### Phase 3: Real-time Features 📋
- [ ] WebSocket connections
- [ ] Live dashboard updates
- [ ] Real-time alerts
- [ ] Push notifications

### Phase 4: Advanced AI 📋
- [ ] Forecasting engine
- [ ] Predictive analytics
- [ ] Machine learning models
- [ ] Performance optimization

### Phase 5: Enterprise Features 📋
- [ ] Multi-tenant support
- [ ] Advanced user management
- [ ] Audit logging
- [ ] Compliance features
- [ ] API rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

See LICENSE file for details.
