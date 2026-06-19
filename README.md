# Task Management Frontend

React, Vite, Material UI and TanStack Query frontend for the task management assignment.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app expects the API at `VITE_API_BASE_URL`.

## Scripts

- `npm run dev` starts the local dev server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.

## Notes

Server state is handled with TanStack Query. Auth and theme state are kept in small React contexts.
The dashboard switches from a table on desktop to cards on smaller screens.
