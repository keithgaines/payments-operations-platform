# Payments Operations Intelligence Platform

A portfolio-grade fintech operations platform designed to simulate real-world workflows used by payments operations, merchant support, risk analysis, and business operations teams.

Built to demonstrate production-oriented engineering practices, operational tooling UX, and modern full-stack architecture patterns.

---

## Tech Stack

### Frontend

- Next.js App Router
- React
- Tailwind CSS v4
- TypeScript

### Backend

- ASP.NET Core Minimal API (.NET 10)
- Entity Framework Core
- PostgreSQL
- Supabase

### Architecture

- Monorepo structure
- Server/Client Component separation
- REST API integration
- Code-first EF migrations
- Feature branch Git workflow

---

## Features

### Operational Dashboard

- KPI analytics cards
- Approval rate monitoring
- Chargeback ratio monitoring
- Merchant operational alerts
- Transaction volume visibility

### Transaction Operations

- Live transaction API integration
- Transaction filtering and search
- Status visibility
- Merchant context rendering
- Risk-level indicators

### Investigation Workflow

- Clickable transaction rows
- Transaction investigation drawer
- Merchant operational context
- Chargeback visibility
- Operational review guidance
- Keyboard-accessible modal interactions
- Background scroll locking
- Portal-rendered overlay architecture

### Engineering Quality

- Error boundaries
- Loading states
- Responsive layout
- Accessible dialog semantics
- Valid HTML table structure
- App Router compatibility
- Tailwind CSS v4 integration

---

# Transaction Investigation Workflow

Operators can investigate transactions directly from the dashboard table.

Clicking a transaction row opens a dedicated investigation drawer containing:

- Merchant operational details
- Risk indicators
- Chargeback visibility
- Transaction metadata
- Operational review guidance

This workflow simulates common tooling patterns used by:

- Fintech operations teams
- Merchant support analysts
- Risk operations analysts
- Payments investigation teams
- Business operations organizations

---

## Frontend Architecture

The frontend uses a hybrid Server/Client Component architecture.

### Server Components

Responsible for:

- Data fetching
- API orchestration
- Initial dashboard rendering
- KPI aggregation

### Client Components

Responsible for:

- Interactive workflows
- Drawer state management
- Keyboard interactions
- Transaction investigation UX

### Drawer Implementation

The transaction investigation drawer:

- Uses React portals
- Renders outside the table DOM hierarchy
- Avoids hydration mismatches
- Preserves semantic HTML table structure
- Supports accessibility-focused interactions

---

## Screenshots

### Dashboard Overview

_Add screenshot here_

### Transaction Investigation Drawer

_Add screenshot here_

---

## Git Workflow

```txt
main      -> production/stable
develop   -> integration branch
feature/* -> active feature development
release/* -> release preparation
```

---

## Future Enhancements

- Case management workflows
- Transaction dispute timelines
- Role-based authentication
- Audit logging
- Merchant health scoring
- Export/reporting functionality
- Real-time websocket updates
- Operational SLA monitoring

---

## Purpose

This project is intentionally designed to demonstrate:

- Operational product thinking
- Production-focused frontend architecture
- Backend API design
- Data investigation workflows
- Fintech operations tooling patterns
- Engineering communication and maintainability
