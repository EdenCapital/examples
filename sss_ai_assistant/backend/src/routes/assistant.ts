import { Router } from 'express';
import { getAssistantResponse } from '../services/assistantService.js';
import type { AssistantContextInput } from '../types/assistant.js';

export const assistantRouter = Router();

assistantRouter.post('/chat', async (req, res) => {
  const payload = req.body as AssistantContextInput;

  if (!payload?.question?.trim()) {
    return res.status(400).json({ error: 'question is required' });
  }

  const response = await getAssistantResponse(payload);
  return res.json(response);
});
