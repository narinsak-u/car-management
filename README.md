# Car Management

A full-stack car inventory management system with CRUD operations, server-side sorting, pagination, status filtering, duplicate detection, and a clean UI.

## Tech Stack

### Backend

- **NestJS** — Node.js framework with modular architecture
- **Drizzle ORM** — Type-safe SQL ORM
- **SQLite** (via @libsql/client) — Lightweight relational database
- **Swagger** — Auto-generated API docs at `/api`
- **class-validator** — Request validation & DTOs
- **Jest** — Unit & integration testing

### Frontend

- **React 19** — UI library with TypeScript
- **Vite 8** — Build tool & dev server
- **Tailwind CSS v4** — Utility-first styling
- **React Router v7** — Client-side routing
- **TanStack Query** — Server state management, caching, mutations
- **shadcn/ui** — Pre-built accessible components
- **Lucide React** — Icon library
- **Axios** — HTTP client (with error interceptor)

## Project Structure

```
car-management/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── database/
│   │   │   ├── schema.ts       # Drizzle table definitions
│   │   │   ├── db.ts           # SQLite client setup
│   │   │   └── drizzle.module.ts
│   │   ├── cars/
│   │   │   ├── dto/            # Request/response DTOs
│   │   │   ├── cars.controller.ts
│   │   │   ├── cars.service.ts
│   │   │   ├── cars.repository.ts
│   │   │   └── cars.module.ts
│   │   ├── common/filters/     # Exception filters
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── tests/                  # Unit tests (service, controller, repository)
│   ├── drizzle/                # SQL migrations
│   └── drizzle.config.ts
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── api/                # Axios client & car API functions
│   │   ├── components/
│   │   │   ├── cars/           # Car-related UI
│   │   │   ├── layout/         # Sidebar, header
│   │   │   └── ui/             # shadcn components
│   │   ├── pages/              # Route pages
│   │   ├── types/              # TypeScript types
│   │   ├── hooks/              # Custom hooks + TanStack Query hooks
│   │   └── providers/          # QueryClientProvider
│   └── public/
```

## Features

- **CRUD Operations** — Create, read, update, delete cars via REST API
- **Server-side Sorting** — Toggle asc/desc by `createdAt` with instant re-fetch
- **Search** — By registration number, manufacturer, or model (debounced)
- **Status Filter** — Dropdown to filter by Available / Maintenance / In Transit
- **Pagination** — Configurable page size with metadata
- **Duplicate Detection** — Registration number uniqueness enforced, returns 409 Conflict with clear message
- **Validation** — Server-side DTO validation with class-validator
- **Error Handling** — Axios interceptor extracts backend error messages to the UI
- **Swagger Docs** — Interactive API explorer at `/api`
- **Responsive UI** — Mobile-friendly sidebar layout

## Prerequisites

- Node.js 20+
- npm

## Setup

### Backend

```bash
cd backend
npm install
mkdir -p data                  # Create database directory (if not exists)
npx drizzle-kit generate       # Generate Drizzle schema
npx drizzle-kit migrate       # create SQLite DB and tables
npx drizzle-kit push           # Push schema to SQLite DB
npm run seed                   # Seed database with 15 sample cars (optional)
npm run start:dev              # Start on http://localhost:4000
```

API docs available at `http://localhost:4000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev                    # Start on http://localhost:5173
```

The frontend sends API requests to `http://localhost:4000` (configured in `.env`).

## Available Scripts

### Backend

| Script               | Description                    |
| -------------------- | ------------------------------ |
| `npm run start:dev`  | Start dev server with watch    |
| `npm run build`      | Build for production           |
| `npm run test`       | Run tests                      |
| `npm run test:cov`   | Run tests with coverage        |
| `npm run seed`       | Seed database with sample data |
| `npm run lint`       | Lint and auto-fix              |

### Frontend

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Lint                     |

## API Endpoints

| Method   | Endpoint    | Description                                 |
| -------- | ----------- | ------------------------------------------- |
| `GET`    | `/cars`     | List cars (paginated, filterable, sortable) |
| `GET`    | `/cars/:id` | Get car by ID                               |
| `POST`   | `/cars`     | Create new car                              |
| `PATCH`  | `/cars/:id` | Update car                                  |
| `DELETE` | `/cars/:id` | Delete car                                  |

### Query Parameters (GET /cars)

| Param          | Type   | Default | Description                                                 |
| -------------- | ------ | ------- | ----------------------------------------------------------- |
| `page`         | number | 1       | Page number                                                 |
| `limit`        | number | 10      | Items per page (max 100)                                    |
| `manufacturer` | string | —       | Filter by manufacturer (partial match)                      |
| `model`        | string | —       | Filter by model (partial match)                             |
| `status`       | string | —       | Filter by status (`available`, `maintenance`, `in_transit`) |
| `search`       | string | —       | Search across registrationNumber, manufacturer, model       |
| `sortOrder`    | string | `desc`  | Sort by `createdAt` (`asc` or `desc`)                       |

### Car Schema

| Field                | Type   | Notes                                    |
| -------------------- | ------ | ---------------------------------------- |
| `id`                 | number | Auto-increment                           |
| `manufacturer`       | string | Required                                 |
| `model`              | string | Required                                 |
| `year`               | number | 1886–2100                                |
| `color`              | string | Required                                 |
| `registrationNumber` | string | Required, unique                         |
| `status`             | enum   | `available`, `maintenance`, `in_transit` |
| `notes`              | string | Optional                                 |
| `createdAt`          | string | ISO 8601                                 |
| `updatedAt`          | string | ISO 8601                                 |

## Environment Variables

### Backend

| Variable       | Default                         | Description          |
| -------------- | ------------------------------- | -------------------- |
| `DATABASE_URL` | `file:./data/car-management.db` | SQLite database path |
| `PORT`         | `4000`                          | Server port          |

### Frontend

| Variable       | Default                 | Description          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:4000` | Backend API base URL |
