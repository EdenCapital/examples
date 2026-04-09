import { buildTemplateResponse } from '../prompts/responseTemplates.js';
import type { AssistantResponse, ContextBundle } from '../types/assistant.js';

export interface AnswerEngine {
  generateAnswer(context: ContextBundle): Promise<AssistantResponse>;
}

export class TemplateAnswerEngine implements AnswerEngine {
  async generateAnswer(context: ContextBundle): Promise<AssistantResponse> {
    return buildTemplateResponse(context);
  }
}
