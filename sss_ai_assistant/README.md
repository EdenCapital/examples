# SSS AI Assistant V1

A standalone, read-only assistant module for SSS DeFi focused on **Explain / Guide / Clarify**.

## Scope

- No blockchain write operations
- No wallet auth
- No live docs/data calls (mocked in V1)
- Structured responses with answer, explanation, and next actions

## Project structure

```text
sss_ai_assistant/
  frontend/
    src/
      components/
      pages/
      widgets/
      lib/
      types/
      mock/
  backend/
    src/
      routes/
      services/
      context/
      prompts/
      mock/
      adapters/
      types/
```

## Run locally

```bash
cd sss_ai_assistant
npm install --workspaces
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:5173/assistant
- Widget demo: http://localhost:5173/assistant-widget-demo
- Backend health: http://localhost:4173/health

## V1 capabilities

- Suggestion buttons (6 defaults)
- Intent routing: `product | guide | concept | account | order`
- Context Builder with intent-specific context enrichment
- Template answer engine (`generateAnswer(context)`)
- Adapter interfaces reserved for docs source / data source / llm source

## Future extension points

- Replace mock docs adapter with docs canister / portal / blog connectors
- Replace mock data adapter with user/orders/funding APIs
- Replace template engine with LLM adapter (e.g., GPT-4o mini)
