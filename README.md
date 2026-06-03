# Crayfish Management System

A full-stack web application for managing crayfish habitats, lifecycle tracking, sales inventory, and AI-generated PDF reports.

## Features

- **Habitats** — CRUD management with image upload (Supabase Storage)
- **Lifecycle Tracking** — Stage transitions (Berried → Crayling → Juvenile → Adult → Breeder) with automatic population count sync
- **Sales & Inventory** — Harvest entries, partial sales tracking, status badges (`available` / `partial` / `sold`)
- **Dashboard** — Dynamic toggle between Habitat and Sales views, stats grid, monthly sales chart (pure CSS bar chart), recent activity feed
- **AI Reports** — Generate professional PDF reports via Groq AI for habitats, sales-stock, lifecycle, and recent activity
- **Authentication** — Local signup/signin + Google OAuth via Passport.js and JWT cookies
- **Responsive Design** — Mobile-first with breakpoints at 1024px, 768px, 480px, and 320px

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8, React Router 7 |
| **Backend** | Node.js, Express 5, ES Modules |
| **Database** | PostgreSQL (via `pg`) |
| **Auth** | Passport.js (local + Google OAuth), JWT |
| **Storage** | Supabase Storage (PDF reports + habitat images) |
| **AI** | Groq SDK (free tier, no billing required) |
| **PDF** | PDFKit |
| **Testing** | Playwright (E2E) |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or [Supabase](https://supabase.com))
- [Groq API key](https://console.groq.com) (free)
- Google OAuth credentials (for Google sign-in)

### 1. Clone & Install

```bash
git clone https://github.com/yevdev016/Crayfish-Management-System.git
cd Crayfish-Management-System

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Configure Environment

Copy the example env files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in your `server/.env`:

```env
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=crayfish_db
PG_PASSWORD=your_password
PG_PORT=5432
SERVER_PORT=3000

JWT_SECRET=your_random_jwt_secret
JWT_EXPIRATION_IN=1h

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

CLIENT_URL=http://localhost:5173

GROQ_API_KEY=your_groq_api_key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_service_role_key
```

### 3. Run Locally

```bash
# Terminal 1 — start the server
cd server && npm start

# Terminal 2 — start the client
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Run E2E Tests (Playwright)

```bash
cd client
npx playwright install chromium
npm run test:e2e
```

## Project Structure

```
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components (dashboard, habitats, sales, lifecycle, reports)
│   │   ├── pages/           # Route pages
│   │   ├── hooks/           # Custom hooks (useHabitats, useLifecycle, useSalesStock)
│   │   ├── services/        # Axios API calls
│   │   ├── context/         # AuthContext
│   │   └── routes/          # ProtectedRoute, GuestRoute
│   └── e2e/                 # Playwright tests
├── server/                  # Express API
│   ├── controllers/         # Route handlers
│   ├── models/              # Database queries
│   ├── routes/              # Express routers
│   ├── services/            # Groq, PDF, Supabase
│   ├── validators/          # Zod schemas
│   ├── middleware/          # Auth, validation
│   └── configs/             # DB, Passport
└── .env.example
```

## Deployment

The app can be deployed on **Render** (recommended) or **Vercel** + **Render**:

- **Render** — Web service (Express) serves both API and static client from the same domain
- **Vercel** — Frontend SPA with optional serverless Express backend

Set the same environment variables in your hosting dashboard. For Google OAuth, add your production callback URL to the [Google Cloud Console](https://console.cloud.google.com).

## License

MIT
