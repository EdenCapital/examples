import type { AssistantContextInput, AssistantResponse } from '../types/assistant';

const BACKEND_URL = import.meta.env.VITE_ASSISTANT_API_BASE ?? 'http://localhost:4173';

export async function askAssistant(payload: AssistantContextInput): Promise<AssistantResponse> {
  const response = await fetch(`${BACKEND_URL}/api/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Assistant service unavailable');
  }

  return response.json() as Promise<AssistantResponse>;
}
