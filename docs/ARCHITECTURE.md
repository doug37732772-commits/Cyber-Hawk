# Architecture Overview

## System Design

CyberHawk is a cloud-native threat detection and security monitoring platform with the following components:

### Backend (FastAPI)

- **API Layer**: RESTful endpoints for threat, alert, and log management
- **Data Processing**: Real-time threat analysis using pattern matching
- **Anomaly Detection**: Statistical analysis for detecting deviations
- **Database**: PostgreSQL for persistent data storage
- **Message Queue**: Redis for task queuing and caching

### Frontend (React + TypeScript)

- **Dashboard**: Real-time threat metrics and KPIs
- **Threat Management**: Browse and manage detected threats
- **Alert Center**: Unified alert dashboard with status tracking
- **Log Search**: Full-text search across ingested logs
- **Settings**: API key management

### Data Flow

```
Log Ingestion
    ↓
Log Parsing (Grok Templates)
    ↓
Threat Analysis (Pattern Matching)
    ↓
Anomaly Detection (Statistical)
    ↓
Alert Generation
    ↓
Dashboard Display
```

## Threat Detection

### Pattern-Based Detection

Threats are detected using Grok templates and regex patterns:

- **SQL Injection**: Detects SQL keywords and special characters
- **XSS Attacks**: Identifies JavaScript and HTML injection attempts
- **Command Injection**: Detects shell metacharacters and command sequences
- **Brute Force**: Monitors failed login attempts
- **Port Scans**: Identifies connection refused patterns

### Anomaly Detection

Statistical anomalies are detected using:

- **Baseline Calculation**: Establishes normal behavior from historical data
- **Z-Score Analysis**: Identifies deviations beyond configured thresholds
- **Metric Tracking**: Monitors request rates, login failures, etc.

## Security Features

1. **API Key Authentication**: Token-based access control
2. **Role-Based Access**: (Future) Different permission levels
3. **Audit Logging**: All actions logged for compliance
4. **Data Encryption**: In-transit and at-rest encryption (GCP)
5. **Rate Limiting**: Prevents abuse and DDoS attacks

## Scalability

- **Horizontal Scaling**: Stateless backend services scale independently
- **Database Replication**: PostgreSQL read replicas for high availability
- **Redis Clustering**: In-memory data store for distributed caching
- **Cloud-Native**: Designed for GCP Cloud Run deployment

## Performance

- **Real-Time Processing**: Sub-second threat detection
- **Batch Processing**: High-throughput log ingestion
- **Caching**: Redis-backed result caching
- **Indexing**: Database indexes on frequently queried fields

## Monitoring

- **Health Checks**: Readiness and liveness probes
- **Metrics**: Prometheus-compatible metrics (future)
- **Logging**: Structured logging for debugging
- **Tracing**: Distributed tracing (future)
