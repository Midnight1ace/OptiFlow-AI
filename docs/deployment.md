# OptiFlow AI Deployment Guide

## Overview

This guide covers deploying OptiFlow AI to various environments including development, staging, and production.

## Vercel Services Deployment

For this repository, Vercel should be configured as a multi-service project with the **Services** framework preset and the root [`vercel.json`](/c:/Users/zamee/OneDrive/Desktop/github/OptiFlow%20AI/vercel.json:1) file committed.

This project uses:

- `frontend` at `/`
- `backend` at `/_backend`

### Required Vercel settings

1. Import the repository as a new project.
2. Keep the **Framework Preset** set to `Services`.
3. Make sure the following environment variables are set in Vercel:

```env
FRONTEND_ORIGIN=https://your-project-domain.vercel.app
```

`NEXT_PUBLIC_API_BASE_URL` is optional on Vercel. If you leave it unset, the frontend now automatically talks to the backend service at `/_backend/api/v1`.

## Environment Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Application
APP_NAME=OptiFlow AI
ENVIRONMENT=production
API_V1_STR=/api/v1
LOG_LEVEL=INFO

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/optiflow

# Security
API_KEY=your-secure-api-key-here
SECRET_KEY=your-secret-key-here

# CORS
FRONTEND_ORIGIN=https://yourdomain.com

# Admin Credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=ChangeThisSecurePassword!

# Next.js
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### Environment-Specific Configurations

#### Development
```env
ENVIRONMENT=local
LOG_LEVEL=DEBUG
DATABASE_URL=postgresql://user:password@localhost:5432/optiflow_dev
```

#### Staging
```env
ENVIRONMENT=staging
LOG_LEVEL=INFO
DATABASE_URL=postgresql://user:password@staging-db:5432/optiflow_staging
FRONTEND_ORIGIN=https://staging.yourdomain.com
```

#### Production
```env
ENVIRONMENT=production
LOG_LEVEL=WARNING
DATABASE_URL=postgresql://user:password@prod-db:5432/optiflow_prod
FRONTEND_ORIGIN=https://yourdomain.com
```

## Docker Deployment

### Single-Container Deployment

```bash
# Build and run
docker build -t optiflow-ai .
docker run -p 8000:8000 --env-file .env optiflow-ai
```

### Docker Compose Deployment

#### docker-compose.yml for Production
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    container_name: optiflow-backend
    env_file:
      - ./.env
    ports:
      - "8000:8000"
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    container_name: optiflow-frontend
    env_file:
      - ./.env
    ports:
      - "3000:3000"
    depends_on:
      - backend

  db:
    image: postgres:15
    container_name: optiflow-db
    environment:
      POSTGRES_DB: optiflow_prod
      POSTGRES_USER: optiflow_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  nginx:
    image: nginx:alpine
    container_name: optiflow-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
```

#### Production Dockerfile for Backend
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Production Dockerfile for Frontend
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
```

## Cloud Deployment

### AWS Deployment

#### ECS Fargate
1. **Create ECR Repositories:**
   ```bash
   aws ecr create-repository --repository-name optiflow-backend
   aws ecr create-repository --repository-name optiflow-frontend
   ```

2. **Build and Push Images:**
   ```bash
   # Backend
   docker build -t optiflow-backend ./backend
   docker tag optiflow-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/optiflow-backend:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/optiflow-backend:latest

   # Frontend
   docker build -t optiflow-frontend ./frontend
   docker tag optiflow-frontend:latest <account>.dkr.ecr.<region>.amazonaws.com/optiflow-frontend:latest
   docker push <account>.dkr.ecr.<region>.amazonaws.com/optiflow-frontend:latest
   ```

3. **Create ECS Cluster and Services**

#### RDS PostgreSQL
```bash
aws rds create-db-instance \
  --db-instance-identifier optiflow-prod \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username optiflow_user \
  --master-user-password secure_password \
  --allocated-storage 20
```

### Google Cloud Platform

#### Cloud Run
```bash
# Build and deploy backend
gcloud builds submit --tag gcr.io/<project>/optiflow-backend ./backend
gcloud run deploy optiflow-backend \
  --image gcr.io/<project>/optiflow-backend \
  --platform managed \
  --port 8000 \
  --allow-unauthenticated

# Build and deploy frontend
gcloud builds submit --tag gcr.io/<project>/optiflow-frontend ./frontend
gcloud run deploy optiflow-frontend \
  --image gcr.io/<project>/optiflow-frontend \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated
```

#### Cloud SQL
```bash
gcloud sql instances create optiflow-prod \
  --database-version POSTGRES_15 \
  --cpu 1 \
  --memory 4GB \
  --region us-central1
```

### Azure Deployment

#### Container Instances
```bash
# Create resource group
az group create --name optiflow-rg --location eastus

# Create container group
az container create \
  --resource-group optiflow-rg \
  --name optiflow-backend \
  --image <registry>/optiflow-backend:latest \
  --ports 8000 \
  --environment-variables API_V1_STR='/api/v1' \
  --cpu 1 \
  --memory 1.5
```

## Database Setup

### PostgreSQL Initialization

#### init.sql
```sql
-- Create database and user
CREATE DATABASE optiflow_prod;
CREATE USER optiflow_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE optiflow_prod TO optiflow_user;

-- Connect to the database
\c optiflow_prod;

-- Create tables
CREATE TABLE queues (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    er_count INTEGER NOT NULL,
    lab_count INTEGER NOT NULL,
    radiology_count INTEGER NOT NULL
);

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

CREATE TABLE decisions (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    queue_id INTEGER REFERENCES queues(id),
    staff_id INTEGER REFERENCES staff(id),
    actions TEXT[] NOT NULL
);

-- Create indexes
CREATE INDEX idx_queues_timestamp ON queues(timestamp);
CREATE INDEX idx_staff_timestamp ON staff(timestamp);
CREATE INDEX idx_decisions_timestamp ON decisions(timestamp);
```

### Database Migrations

Use Alembic for schema migrations:

```bash
cd backend
alembic init alembic
# Edit alembic.ini and env.py
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Reverse Proxy Configuration

### Nginx Configuration

#### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:8000;
    }

    upstream frontend {
        server frontend:3000;
    }

    server {
        listen 80;
        server_name yourdomain.com;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://backend;
            access_log off;
        }
    }
}
```

### SSL/TLS Setup

#### Let's Encrypt
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### Application Monitoring

#### Health Checks
- Endpoint: `/health`
- Returns: `{"status": "ok", "environment": "production"}`

#### Prometheus Metrics
Add to `requirements.txt`:
```
prometheus-client
```

#### Structured Logging
```python
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
handler.setFormatter(formatter)
logger.addHandler(handler)
```

### Infrastructure Monitoring

#### AWS CloudWatch
```bash
# Create log group
aws logs create-log-group --log-group-name optiflow-backend

# Set up alarms
aws cloudwatch put-metric-alarm \
  --alarm-name "OptiFlow-HighCPU" \
  --alarm-description "CPU usage above 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

#### Datadog Integration
```python
from datadog import initialize, statsd

initialize(api_key='your-api-key', app_key='your-app-key')

# Custom metrics
statsd.increment('optiflow.api.requests', tags=['endpoint:queue'])
statsd.histogram('optiflow.api.response_time', response_time)
```

## Backup and Recovery

### Database Backup

#### Automated Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U optiflow_user optiflow_prod > backup_$DATE.sql

# Upload to S3
aws s3 cp backup_$DATE.sql s3://optiflow-backups/
```

#### Point-in-Time Recovery
```bash
# Restore from backup
psql -h localhost -U optiflow_user optiflow_prod < backup_20231201_120000.sql
```

### Application Backup

#### Configuration Backup
```bash
# Backup environment files
tar -czf config_backup.tar.gz .env* docker-compose.yml nginx/
aws s3 cp config_backup.tar.gz s3://optiflow-backups/config/
```

## Security Considerations

### Network Security
- Use VPC/security groups
- Restrict database access
- Enable encryption in transit

### Application Security
- Keep dependencies updated
- Use environment variables for secrets
- Implement rate limiting
- Enable CORS properly

### Data Security
- Encrypt sensitive data
- Implement audit logging
- Regular security scans
- Backup encryption

## Scaling

### Horizontal Scaling
```yaml
# docker-compose scale
services:
  backend:
    deploy:
      replicas: 3
    # Add load balancer
```

### Database Scaling
- Read replicas for read-heavy workloads
- Connection pooling
- Query optimization

### CDN Integration
```nginx
# Static assets via CDN
location /_next/static/ {
    proxy_pass https://cdn.yourdomain.com;
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check connection
psql -h localhost -U optiflow_user -d optiflow_prod

# Check logs
docker logs optiflow-db
```

#### Application Startup Issues
```bash
# Check environment variables
docker exec optiflow-backend env

# Check application logs
docker logs optiflow-backend
```

#### Performance Issues
```bash
# Check resource usage
docker stats

# Profile application
python -m cProfile -s time app/main.py
```

## Maintenance

### Update Procedure
1. Backup database
2. Update application code
3. Run migrations
4. Restart services
5. Verify functionality
6. Monitor for issues

### Regular Tasks
- Security updates
- Log rotation
- Database maintenance
- Certificate renewal
- Performance monitoring
