# OptiFlow AI Architecture

## MVP Flow

1. The frontend dashboard requests queue, staff, and decision snapshots from FastAPI.
2. FastAPI serves mock operational data through `/api/v1/queue` and `/api/v1/staff`.
3. The decision engine evaluates the current state through `backend/app/ai/rules.py`.
4. The API returns recommended operational actions for the dashboard to display.

## Next Steps

1. Replace in-memory services with PostgreSQL persistence.
2. Add WebSocket updates for live dashboard refreshes.
3. Introduce forecasting logic in `backend/app/ai/predictor.py`.
