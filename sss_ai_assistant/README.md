# SSS DeFi AI Assistant (Monorepo)

A minimal, beginner-friendly full-stack monorepo for the **SSS AI Assistant**.

## Stack

- **Frontend:** Vite + React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Monorepo:** npm workspaces
- **Storage:** local JSON files (mock docs + mock data)
- **No blockchain/canister/auth logic yet**

## Project structure

```
sss_ai_assistant/
  package.json
  apps/
    web/
    api/
  packages/
    shared/
  README.md
```

## Quick start

From the repo root:

```bash
cd sss_ai_assistant
npm install
npm run dev
```

- API runs on: `http://localhost:4000`
- Web runs on: `http://localhost:5173`

## Build

```bash
npm run build
```

## Environment

Frontend API URL is configurable with Vite env:

```bash
cp apps/web/.env.example apps/web/.env
```

Then edit:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Backend API endpoints

- `GET /health`
- `POST /api/chat`
- `GET /api/context/docs`
- `GET /api/context/data`
- `GET /api/sessions`

### Example request

```bash
curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"demo-session","message":"What can you do?"}'
```

## Architecture notes

- Layered backend structure: routes → controllers → services → repositories.
- `packages/shared` contains common TypeScript types.
- Mock answer engine composes a response using mock docs + data retrievers.
- In-memory cache avoids repeated JSON loads.

## Later integrations (planned)

1. SSS docs canister
2. SSS data API
3. GPT fallback
4. user asset query features
