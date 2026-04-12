# OptiFlow AI Testing Guide

## Overview

This guide covers testing procedures for OptiFlow AI, including manual testing, API testing, and frontend testing.

## Testing Environment Setup

### Local Development Testing

1. **Start Backend:**
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Verify Services:**
   - Backend: http://localhost:8000
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8000/docs

### Docker Testing

```bash
docker compose up --build
```

## Backend API Testing

### Manual API Testing with cURL

#### Health Check
```bash
curl -s http://localhost:8000/health | python -m json.tool
```

Expected response:
```json
{
    "status": "ok",
    "environment": "local"
}
```

#### Queue Endpoint
```bash
curl -s http://localhost:8000/api/v1/queue | python -m json.tool
```

Expected response:
```json
{
    "areas": {
        "ER": 18,
        "Lab": 6,
        "Radiology": 3
    }
}
```

#### Staff Endpoint
```bash
curl -s http://localhost:8000/api/v1/staff | python -m json.tool
```

Expected response:
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

#### Decision Endpoint
```bash
curl -s http://localhost:8000/api/v1/decisions | python -m json.tool
```

Expected response:
```json
{
    "actions": [
        "Open new ER counter",
        "Reassign idle staff"
    ]
}
```

### POST Request Testing

#### Update Queue Data
```bash
curl -X POST http://localhost:8000/api/v1/queue \
  -H "Content-Type: application/json" \
  -d '{"areas": {"ER": 25, "Lab": 12, "Radiology": 8}}' \
  | python -m json.tool
```

#### Update Staff Data
```bash
curl -X POST http://localhost:8000/api/v1/staff \
  -H "Content-Type: application/json" \
  -d '{"total": 15, "idle": 5, "busy": 10, "by_role": {"nurse": 8, "tech": 4, "doctor": 3}}' \
  | python -m json.tool
```

#### Custom Decision Request
```bash
curl -X POST http://localhost:8000/api/v1/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "queue": {"areas": {"ER": 30, "Lab": 15, "Radiology": 5}},
    "staff": {"total": 10, "idle": 1, "busy": 9, "by_role": {"nurse": 5, "tech": 3, "doctor": 2}}
  }' \
  | python -m json.tool
```

## Frontend Testing

### Login Flow Testing

1. **Navigate to Login Page:**
   - URL: http://localhost:3000/login
   - Verify page loads correctly
   - Check branding and layout

2. **Test Login Credentials:**
   - Email: admin@optiflow.local
   - Password: ChangeMe123!
   - Verify successful login redirects to dashboard

3. **Test Invalid Credentials:**
   - Try wrong email/password
   - Verify error handling

### Dashboard Testing

1. **Data Loading:**
   - Verify queue data displays correctly
   - Check staff panel shows proper counts
   - Confirm decision alerts appear

2. **UI Responsiveness:**
   - Test on different screen sizes
   - Verify charts and graphs render
   - Check button interactions

3. **Real-time Updates:**
   - Note: Currently static, will be enhanced with WebSockets

## Automated Testing Setup

### Backend Testing

Create `backend/tests/` directory and add test files:

#### requirements-dev.txt
```
pytest
httpx
pytest-asyncio
```

#### tests/test_api.py
```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "environment": "local"}

@pytest.mark.asyncio
async def test_queue_endpoint():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.get("/api/v1/queue")
        assert response.status_code == 200
        data = response.json()
        assert "areas" in data
        assert "ER" in data["areas"]
```

#### Run Tests
```bash
cd backend
pip install -r requirements-dev.txt
pytest tests/
```

### Frontend Testing

#### Install Testing Dependencies
```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

#### Create Test Files
```typescript
// __tests__/dashboard.test.tsx
import { render, screen } from '@testing-library/react'
import DashboardPage from '../app/dashboard/page'

test('renders dashboard with title', () => {
  render(<DashboardPage />)
  const titleElement = screen.getByText(/Welcome to OptiFlow AI Dashboard/i)
  expect(titleElement).toBeInTheDocument()
})
```

#### Run Tests
```bash
npm test
```

## Integration Testing

### End-to-End Testing

1. **Full User Flow:**
   - Start both backend and frontend
   - Login to dashboard
   - Verify data loads from API
   - Test decision engine integration

2. **Data Flow Testing:**
   - Update queue data via API
   - Verify frontend reflects changes
   - Test decision engine responses

### Load Testing

Use tools like Apache Bench or Locust for load testing:

```bash
# Simple load test
ab -n 1000 -c 10 http://localhost:8000/api/v1/queue
```

## Test Data Scenarios

### Normal Operation
- ER: 5-15 patients
- Lab: 2-8 patients
- Radiology: 1-5 patients
- Staff: 10-15 total, 1-3 idle

### High Load Scenarios
- ER: 20+ patients
- Lab: 10+ patients
- Should trigger "Open new ER counter" action

### Low Activity
- All queues < 5 patients
- Staff idle > 50%
- Should show "System stable" message

## Bug Reporting

When reporting bugs, include:

1. **Environment:** Local/Docker, OS version
2. **Steps to Reproduce:** Detailed steps
3. **Expected Behavior:** What should happen
4. **Actual Behavior:** What actually happens
5. **Screenshots/Logs:** If applicable
6. **API Responses:** Include relevant API calls and responses

## Performance Benchmarks

### API Response Times
- Health check: < 10ms
- Queue/Staff endpoints: < 50ms
- Decision engine: < 100ms

### Frontend Load Times
- Initial page load: < 2 seconds
- Dashboard data load: < 1 second
- Chart rendering: < 500ms

## Continuous Integration

### GitHub Actions Setup

Create `.github/workflows/test.yml`:

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    - name: Install dependencies
      run: |
        cd backend
        pip install -r requirements.txt
        pip install pytest
    - name: Run tests
      run: |
        cd backend
        pytest
```

## Testing Checklist

### Pre-Release Checklist
- [ ] All API endpoints respond correctly
- [ ] Frontend loads without errors
- [ ] Login flow works
- [ ] Dashboard displays data
- [ ] Decision engine provides recommendations
- [ ] No console errors in browser
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility checked
- [ ] Performance benchmarks met