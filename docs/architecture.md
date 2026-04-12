# OptiFlow AI Architecture

## System Overview

OptiFlow AI is a healthcare operations optimization platform that provides real-time queue management, staffing recommendations, and operational decision support. The system combines a FastAPI backend with a Next.js frontend to deliver a comprehensive hospital operations dashboard.

## Architecture Principles

- **Microservices Design**: Separated backend and frontend services
- **API-First**: RESTful API with OpenAPI documentation
- **Scalable**: Containerized deployment with horizontal scaling capabilities
- **Secure**: Authentication, authorization, and data protection
- **Observable**: Comprehensive logging and monitoring

## Current Architecture

### MVP Flow

1. **Frontend Request**: Next.js dashboard requests data from FastAPI backend
2. **Data Retrieval**: Backend serves queue, staff, and decision data
3. **Decision Processing**: Rules engine evaluates current state and generates recommendations
4. **Data Visualization**: Frontend displays real-time insights and actionable alerts

### Component Diagram

```
┌─────────────────┐    HTTP     ┌─────────────────┐
│   Next.js       │────────────▶│    FastAPI      │
│   Frontend      │             │    Backend      │
│                 │◀────────────│                 │
└─────────────────┘             └─────────────────┘
         │                              │
         │                              │
    ┌────▼────┐                    ┌────▼────┐
    │  Login  │                    │  Rules  │
    │  Auth   │                    │ Engine  │
    └─────────┘                    └─────────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │  In-Memory  │
                                       │   Storage   │
                                       └─────────────┘
```

## Component Details

### Backend Services

#### API Layer (`/api/v1`)
- **Health Check** (`/health`): System status monitoring
- **Queue Management** (`/queue`): CRUD operations for queue data
- **Staff Management** (`/staff`): CRUD operations for staffing data
- **Decision Engine** (`/decisions`): AI-powered recommendations

#### Business Logic Layer
- **Queue Service**: Queue data management and validation
- **Staff Service**: Staff data management and validation
- **Decision Engine**: Orchestrates AI rules evaluation

#### AI Layer
- **Rules Engine**: Configurable decision logic based on thresholds
- **Predictor** (Planned): Forecasting and predictive analytics

#### Data Layer
- **In-Memory Storage**: Current MVP implementation
- **PostgreSQL** (Planned): Persistent data storage

### Frontend Architecture

#### Page Structure
- **Login Page** (`/login`): Admin authentication
- **Dashboard** (`/dashboard`): Main operations console
- **Reports** (`/reports`): Historical analytics (planned)
- **Settings** (`/settings`): Configuration management (planned)

#### Component Architecture
```
App
├── Shell
│   ├── AppHeader
│   └── LogoutButton
├── Auth
│   └── AdminLoginForm
├── Dashboard
│   ├── QueueCard
│   ├── StaffPanel
│   ├── AlertsPanel
│   ├── InsightPanel
│   └── EfficiencyPanel
└── UI
    ├── Button
    ├── Card
    └── ...
```

#### State Management
- **Server Components**: Next.js App Router for data fetching
- **Client Components**: React state for interactive elements
- **API Integration**: Service layer for backend communication

## Data Models

### Core Entities

#### QueueSnapshot
```typescript
{
  areas: {
    ER: number;
    Lab: number;
    Radiology: number;
  }
}
```

#### StaffSnapshot
```typescript
{
  total: number;
  idle: number;
  busy: number;
  by_role: {
    nurse: number;
    tech: number;
    doctor: number;
  }
}
```

#### DecisionResponse
```typescript
{
  actions: string[];
}
```

### Database Schema (Planned)

```sql
-- Queues table
CREATE TABLE queues (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    er_count INTEGER NOT NULL,
    lab_count INTEGER NOT NULL,
    radiology_count INTEGER NOT NULL
);

-- Staff table
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_count INTEGER NOT NULL,
    idle_count INTEGER NOT NULL,
    busy_count INTEGER NOT NULL,
    nurse_count INTEGER NOT NULL,
    tech_count INTEGER NOT NULL,
    doctor_count INTEGER NOT NULL
);

-- Decisions table
CREATE TABLE decisions (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queue_id INTEGER REFERENCES queues(id),
    staff_id INTEGER REFERENCES staff(id),
    actions TEXT[] NOT NULL
);
```

## Security Architecture

### Authentication
- **Session-based**: Cookie authentication for admin users
- **Password Security**: Secure credential storage
- **Route Protection**: Server-side authentication checks

### Authorization
- **Role-based**: Admin-only access currently
- **API Security**: Future API key authentication
- **CORS**: Configured for frontend-backend communication

### Data Protection
- **Environment Variables**: Sensitive data in env files
- **No Data Persistence**: Current MVP (to be enhanced)
- **Input Validation**: Pydantic models for data validation

## Deployment Architecture

### Development Environment
```
┌─────────────┐    ┌─────────────┐
│  Frontend   │    │   Backend   │
│ localhost:  │    │ localhost:  │
│    3000     │    │    8000     │
└─────────────┘    └─────────────┘
```

### Production Environment
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │  Frontend   │    │   Backend   │
│             │────▶│             │    │             │
│   Reverse   │    │   Next.js    │    │   FastAPI   │
│   Proxy     │◀───│             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
                              │             │
                              └─────────────┘
                                   │
                            ┌──────▼──────┐
                            │ PostgreSQL  │
                            │   Database  │
                            └─────────────┘
```

### Container Architecture
- **Backend Container**: Python 3.11, FastAPI, Uvicorn
- **Frontend Container**: Node.js 18, Next.js, Nginx
- **Database Container**: PostgreSQL 15
- **Reverse Proxy**: Nginx for load balancing and SSL

## Performance Considerations

### Current Performance
- **API Response Time**: < 100ms for all endpoints
- **Frontend Load Time**: < 2 seconds initial load
- **Memory Usage**: ~200MB per service
- **Concurrent Users**: Supports 100+ simultaneous users

### Scalability Plans
- **Horizontal Scaling**: Multiple backend instances
- **Database Sharding**: For high-volume deployments
- **CDN Integration**: Static asset delivery
- **Caching Layer**: Redis for session and data caching

## Monitoring and Observability

### Application Metrics
- **Health Checks**: `/health` endpoint
- **API Metrics**: Request count, response times, error rates
- **Business Metrics**: Queue lengths, decision accuracy

### Infrastructure Monitoring
- **Container Metrics**: CPU, memory, network usage
- **Database Metrics**: Connection count, query performance
- **Log Aggregation**: Structured logging with correlation IDs

### Alerting
- **System Alerts**: Service downtime, high error rates
- **Business Alerts**: Queue congestion, staffing shortages
- **Performance Alerts**: Slow response times, high resource usage

## Future Architecture Evolution

### Phase 2: Data Persistence
```
Current: In-Memory → Future: PostgreSQL + Redis Cache
```

### Phase 3: Real-time Updates
```
Current: Polling → Future: WebSocket + Server-Sent Events
```

### Phase 4: Advanced AI
```
Current: Rules → Future: ML Models + Time Series Forecasting
```

### Phase 5: Multi-tenant
```
Current: Single tenant → Future: Multi-tenant with isolation
```

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (planned)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Documentation**: OpenAPI/Swagger

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State**: React Server Components

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
- **Database**: PostgreSQL

### Development Tools
- **Version Control**: Git
- **CI/CD**: GitHub Actions (planned)
- **Testing**: pytest, Jest (planned)
- **Monitoring**: Prometheus, Grafana (planned)

## API Design Principles

### RESTful Design
- **Resource-based URLs**: `/api/v1/queues`, `/api/v1/staff`
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Status Codes**: Standard HTTP status codes
- **Content Negotiation**: JSON responses

### API Versioning
- **URL Versioning**: `/api/v1/` prefix
- **Backward Compatibility**: Version maintenance
- **Deprecation Notices**: Clear communication of changes

### Error Handling
- **Consistent Format**: `{ "error": "message", "code": 400 }`
- **Validation Errors**: Detailed field-level error messages
- **Logging**: Comprehensive error logging with context

## Security Considerations

### Network Security
- **HTTPS Only**: SSL/TLS encryption
- **Firewall**: Restrict unnecessary ports
- **VPC**: Network isolation

### Application Security
- **Input Validation**: Comprehensive validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Token-based protection

### Data Security
- **Encryption**: Data at rest and in transit
- **Access Control**: Principle of least privilege
- **Audit Logging**: All data access logging
- **Backup Security**: Encrypted backups

## Disaster Recovery

### Backup Strategy
- **Database Backups**: Daily automated backups
- **Application Backups**: Configuration and code backups
- **Offsite Storage**: Cloud storage for backups

### Recovery Procedures
- **RTO**: 4 hours recovery time objective
- **RPO**: 1 hour recovery point objective
- **Failover**: Automatic failover to backup systems
- **Testing**: Regular disaster recovery testing

## Compliance Considerations

### Healthcare Compliance
- **HIPAA**: Health data protection (future)
- **Data Retention**: Configurable retention policies
- **Audit Trails**: Comprehensive audit logging
- **Access Controls**: Role-based access control

### General Compliance
- **GDPR**: Data protection and privacy
- **SOX**: Financial and operational controls
- **Industry Standards**: SOC 2 compliance framework
