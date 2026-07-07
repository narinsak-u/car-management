# 🚗 Car Management

A full-stack car inventory management system with CRUD operations, search, filtering, and pagination — built to keep your garage organized.

## 🛠️ Tech Stack

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
- **TanStack Query** — Server state management & caching
- **shadcn/ui** — Pre-built accessible components
- **Lucide React** — Icon library
- **Axios** — HTTP client

## 📁 Project Structure

```
car-management/
├── backend/                    # 🖥️ NestJS API
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
│   ├── tests/
│   ├── drizzle/                # SQL migrations
│   └── drizzle.config.ts
│
├── frontend/                   # ⚛️ React SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── cars/           # Car-related UI
│   │   │   ├── layout/         # Sidebar, header
│   │   │   └── ui/             # shadcn components
│   │   ├── pages/              # Route pages
│   │   ├── types/              # TypeScript types
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilities
│   │   └── data/               # Static data
│   └── public/
```

## ✨ Features

- 🔄 **CRUD Operations** — Create, read, update, delete cars
- 🔍 **Search & Filter** — By brand, model, license plate
- 📄 **Pagination** — Configurable page size with metadata
- ✅ **Validation** — Server-side DTO validation with class-validator
- 📖 **Swagger Docs** - Interactive API explorer at `/api`
- 📱 **Responsive UI** — Mobile-friendly sidebar layout

## 📋 Prerequisites

- Node.js 20+
- npm

## 🚀 Setup

### Backend

```bash
cd backend
npm install
npx drizzle-kit generate    # Generate Drizzle schema
npx drizzle-kit push        # Push schema to SQLite DB
npx drizzle-kit migrate     # Create SQLite DB and tables
npm run seed                # Seed database with sample data (optional)
npm run start:dev           # Start on http://localhost:3000
```

✨ API docs available at `http://localhost:3000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev                 # Start on http://localhost:5173
```

## 📦 Available Scripts

### Backend
| Script | Description |
|--------|-------------|
| `npm run start:dev` | 🏃 Start dev server with watch |
| `npm run build` | 🔨 Build for production |
| `npm run start:prod` | 🚀 Run production build |
| `npm run test` | 🧪 Run tests |
| `npm run test:cov` | 📊 Run tests with coverage |
| `npm run seed` | 🌱 Seed database with sample data |
| `npm run lint` | 🔍 Lint and auto-fix |

### Frontend
| Script | Description |
|--------|-------------|
| `npm run dev` | ⚡ Start Vite dev server |
| `npm run build` | 🔨 Build for production |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Lint |

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cars` | 📋 List cars (paginated, filterable) |
| `GET` | `/cars/:id` | 🔎 Get car by ID |
| `POST` | `/cars` | ➕ Create new car |
| `PATCH` | `/cars/:id` | ✏️ Update car |
| `DELETE` | `/cars/:id` | 🗑️ Delete car |

### Query Parameters (GET /cars)

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | 📄 Page number |
| `limit` | number | 10 | 📏 Items per page (max 100) |
| `brand` | string | — | 🏭 Filter by brand (partial match) |
| `model` | string | — | 🚘 Filter by model (partial match) |

## 🔧 Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL=file:./data/car-management.db
PORT=3000
```

### Frontend

The API base URL defaults to `http://localhost:3000`. Update the Axios config in `src/lib/api.ts` if needed.

