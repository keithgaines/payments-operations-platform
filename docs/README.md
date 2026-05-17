# Payments Operations Intelligence Platform

Fintech operations tooling platform focused on transaction investigation workflows, merchant operations visibility, and operational intelligence.

Designed to simulate internal tooling patterns commonly used by:

* Payments operations teams
* Merchant support analysts
* Risk operations analysts
* Business operations organizations

## Live Demo

Frontend:
[Payments Operations Platform](https://payments-operations-platform.vercel.app)

Backend API Health:
[API Health Endpoint](https://payments-ops-api-a9chf3hcfshbdehc.eastus-01.azurewebsites.net/health)

Project Documentation:
[Notion Workspace](https://www.notion.so/Payments-Operations-Intelligence-Platform-362a52107914805ebd3bc2e290c0fe4c)

---

## Overview

The Payments Operations Intelligence Platform is a production-style fintech operations platform built to model how internal operations teams investigate transactions, monitor merchant activity, surface operational anomalies, and review risk indicators.

The project emphasizes operational workflows and internal tooling UX rather than generic dashboard visualization.

---

## Architecture

```text
Next.js Frontend
        ↓
ASP.NET Core Minimal API
        ↓
Entity Framework Core
        ↓
PostgreSQL (Supabase)
```

---

## Tech Stack

### Frontend

* Next.js 16 App Router
* React
* TypeScript
* Tailwind CSS v4

### Backend

* ASP.NET Core Minimal API (.NET 8)
* Entity Framework Core
* PostgreSQL
* Supabase
* Npgsql

### Infrastructure

* Azure Linux App Service
* Vercel
* GitHub Actions CI/CD
* Environment-based configuration
* Cross-origin frontend/backend architecture

---

## Current Features

### Operational Dashboard

* KPI analytics cards
* Approval-rate visibility
* Operational alerts
* Merchant operational visibility
* Transaction activity monitoring

### Transaction Operations

* Transaction listing
* Filtering and search
* Transaction investigation drawer
* Merchant operational context
* Risk-level indicators
* Chargeback visibility

### Investigation Workflow

* Clickable transaction rows
* Transaction investigation drawer
* Keyboard-accessible modal interactions
* Escape-key support
* Body scroll locking
* Portal-rendered overlay architecture

### Backend APIs

* Merchant endpoints
* Transaction endpoints
* Analytics summary endpoint
* PostgreSQL persistence
* EF Core code-first migrations

### Deployment & Infrastructure

* Azure-hosted ASP.NET Core API
* Vercel-hosted frontend
* Supabase PostgreSQL integration
* GitHub Actions deployment pipeline
* Production environment configuration

---

## Engineering Challenges Solved

* Resolved Next.js App Router hydration issues
* Migrated frontend architecture to Tailwind CSS v4
* Implemented React portal-based overlay rendering
* Preserved semantic HTML table structure during interactive refactors
* Separated server/client rendering responsibilities
* Resolved Azure Linux App Service deployment/runtime issues
* Fixed ASP.NET Core environment configuration binding
* Stabilized Supabase PostgreSQL authentication and connection pooling
* Implemented production frontend/backend deployment integration

---

## Project Structure

```text
/frontend
    Next.js frontend application

/backend/PaymentsOps.Api
    ASP.NET Core Minimal API
```

---

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend/PaymentsOps.Api
dotnet restore
dotnet run
```

---

## Production Deployment

### Frontend

* Hosted on [Vercel](https://vercel.com)

### Backend

* Hosted on [Azure App Service](https://azure.microsoft.com/en-us/products/app-service)

### Database

* PostgreSQL hosted via [Supabase](https://supabase.com)

---

## Current Development Focus

* Operational workflow refinement
* Backend analytics optimization
* Investigation tooling enhancements
* Expanded merchant operational visibility

---

## Planned Enhancements

* Authentication
* Role-based access control (RBAC)
* Audit logging
* Case management workflows
* Real-time operational updates
* SLA monitoring
* Reporting/export workflows
* Structured logging and observability

---

## Documentation

Additional architecture, workflow, and product documentation is available in the project Notion workspace:

[Payments Operations Intelligence Platform Documentation](https://www.notion.so/Payments-Operations-Intelligence-Platform-362a52107914805ebd3bc2e290c0fe4c)
