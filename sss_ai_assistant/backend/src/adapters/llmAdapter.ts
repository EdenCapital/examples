import type { AssistantResponse, ContextBundle } from '../types/assistant.js';

export interface LlmAdapter {
  generate(context: ContextBundle): Promise<AssistantResponse>;
}

export class PlaceholderLlmAdapter implements LlmAdapter {
  async generate(): Promise<AssistantResponse> {
    return {
      answer: 'LLM adapter is not connected in V1.',
      explanation: 'This interface is intentionally reserved for GPT-4o mini or other model routing in a future release.',
      actions: [{ label: 'Read Guide', target: '/assistant' }],
      sources: ['LLM Adapter Placeholder']
    };
  }
}
