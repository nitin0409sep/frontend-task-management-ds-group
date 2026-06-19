# Task Management Frontend

React + Vite frontend for the Task Management full-stack assignment. It uses Material UI for the interface, TanStack Query for server state, and small Context providers for auth/session and theme state.

## Live URLs

- Frontend: https://frontend-task-management-ds-group.vercel.app
- Backend API: https://backend-task-management-ds-group.onrender.com/api
- GitHub: https://github.com/nitin0409sep/frontend-task-management-ds-group

## Features

- JWT login/register screens
- Role-aware UI for user/admin flows
- Admin task creation and editing
- Task dashboard with search, status and priority filters
- Sorting by created date, priority, and due date
- Infinite scrolling task list
- Responsive desktop table and mobile card layout
- Mobile filter bottom sheet
- Dark/light theme toggle
- SPA fallback for Vercel deep links
- Docker static build served by Nginx

## Architecture

```text
src/
  app/                 App providers and router
  components/          Shared layout and UI primitives
  config/              Runtime config and route helpers
  features/auth/       Auth API, forms, context, validation
  features/tasks/      Task API, dashboard, forms, filters
  features/users/      User/assignee API and selectors
  lib/                 API client, token storage, helpers
  theme/               MUI theme and theme context
  types/               Shared frontend types
```

## Environment Variables

Create `.env` from `.env.example`.

| Variable | Required | Example | Description |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | `http://localhost:4000/api` | Backend API base URL. For production use `https://backend-task-management-ds-group.onrender.com/api`. |

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server runs on `http://localhost:5173`.

## Scripts

- `npm run dev` starts the Vite dev server.
- `npm run build` type-checks and creates a production build.
- `npm run preview` serves the production build locally.
- `npm test` runs Vitest tests.
- `npm run lint` runs ESLint.

## Docker

Build the image:

```bash
docker build   --build-arg VITE_API_BASE_URL=https://backend-task-management-ds-group.onrender.com/api   -t task-management-frontend .
```

Run it:

```bash
docker run --rm -p 8080:80 task-management-frontend
```

Open `http://localhost:8080`.

## Deployment

Vercel build settings:

```text
Build Command: npm install && npm run build
Output Directory: dist
```

Set this Vercel environment variable:

```text
VITE_API_BASE_URL=https://backend-task-management-ds-group.onrender.com/api
```

`vercel.json` rewrites all routes to `index.html` so direct reloads like `/login` work with React Router.

## Testing

Current frontend tests cover:

- Route constants
- Auth token storage
- Task payload typing
- Register form rendering with React Testing Library
