# OptiFlow AI API Documentation

## Overview

OptiFlow AI provides a RESTful API for healthcare queue management and operational decision support. The API is built with FastAPI and follows REST principles.

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

Currently, the API does not require authentication for development purposes. In production, consider implementing:

- API Key authentication
- JWT tokens
- OAuth 2.0

## Endpoints

### Health Check

#### GET /health

Returns the health status of the API.

**Response:**
```json
{
  "status": "ok",
  "environment": "local"
}
```

### Queue Management

#### GET /api/v1/queue

Retrieves the current queue snapshot across all hospital areas.

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

**Status Codes:**
- `200` - Success

#### POST /api/v1/queue

Updates the queue snapshot with new data.

**Request Body:**
```json
{
  "areas": {
    "ER": 15,
    "Lab": 8,
    "Radiology": 5
  }
}
```

**Response:**
```json
{
  "areas": {
    "ER": 15,
    "Lab": 8,
    "Radiology": 5
  }
}
```

**Status Codes:**
- `200` - Success
- `422` - Validation error

### Staff Management

#### GET /api/v1/staff

Retrieves the current staff snapshot.

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

**Status Codes:**
- `200` - Success

#### POST /api/v1/staff

Updates the staff snapshot with new data.

**Request Body:**
```json
{
  "total": 14,
  "idle": 3,
  "busy": 11,
  "by_role": {
    "nurse": 7,
    "tech": 4,
    "doctor": 3
  }
}
```

**Response:**
```json
{
  "total": 14,
  "idle": 3,
  "busy": 11,
  "by_role": {
    "nurse": 7,
    "tech": 4,
    "doctor": 3
  }
}
```

**Status Codes:**
- `200` - Success
- `422` - Validation error

### Decision Engine

#### GET /api/v1/decisions

Retrieves AI-powered operational recommendations based on current queue and staff data.

**Response:**
```json
{
  "actions": [
    "Open new ER counter",
    "Reassign idle staff"
  ]
}
```

**Status Codes:**
- `200` - Success

#### POST /api/v1/decisions

Gets recommendations for specific queue and staff scenarios.

**Request Body:**
```json
{
  "queue": {
    "areas": {
      "ER": 20,
      "Lab": 10,
      "Radiology": 2
    }
  },
  "staff": {
    "total": 15,
    "idle": 5,
    "busy": 10,
    "by_role": {
      "nurse": 8,
      "tech": 5,
      "doctor": 2
    }
  }
}
```

**Response:**
```json
{
  "actions": [
    "Open new ER counter",
    "Add lab technician shift",
    "Reassign idle staff"
  ]
}
```

**Status Codes:**
- `200` - Success
- `422` - Validation error

## Data Models

### QueueSnapshot

```typescript
interface QueueSnapshot {
  areas: {
    ER: number;
    Lab: number;
    Radiology: number;
  };
}
```

### StaffSnapshot

```typescript
interface StaffSnapshot {
  total: number;
  idle: number;
  busy: number;
  by_role: {
    nurse: number;
    tech: number;
    doctor: number;
  };
}
```

### DecisionRequest

```typescript
interface DecisionRequest {
  queue: QueueSnapshot;
  staff: StaffSnapshot;
}
```

### DecisionResponse

```typescript
interface DecisionResponse {
  actions: string[];
}
```

## Error Handling

The API returns standard HTTP status codes and error messages:

- `200` - Success
- `422` - Validation error (invalid request data)
- `500` - Internal server error

Error responses include details:

```json
{
  "detail": [
    {
      "loc": ["body", "queue", "areas", "ER"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting for production use.

## Versioning

The API uses URL versioning (`/api/v1/`). Future versions will be available at `/api/v2/`, etc.

## Interactive Documentation

Visit `http://localhost:8000/docs` for interactive Swagger UI documentation.