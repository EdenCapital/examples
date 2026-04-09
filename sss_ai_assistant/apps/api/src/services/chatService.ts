import { ChatRequest, ChatResponse } from '@sss/shared';
import { ContextService } from './contextService';
import { SessionRepository } from '../repositories/sessionRepository';

export class ChatService {
  constructor(
    private contextService: ContextService,
    private sessionRepository: SessionRepository,
  ) {}

  chat(input: ChatRequest): ChatResponse {
    const now = new Date().toISOString();

    this.sessionRepository.addMessage(input.sessionId, {
      role: 'user',
      content: input.message,
      timestamp: now,
    });

    const docs = this.contextService.getDocs();
    const data = this.contextService.getData();

    const reply = [
      'Mock assistant response:',
      `You asked: "${input.message}"`,
      `Top doc: ${docs[0]?.title ?? 'n/a'}`,
      `Data point: ${data[0]?.key ?? 'n/a'}=${data[0]?.value ?? 'n/a'}`,
      'This is where GPT fallback and SSS integrations will plug in later.',
    ].join(' ');

    this.sessionRepository.addMessage(input.sessionId, {
      role: 'assistant',
      content: reply,
      timestamp: new Date().toISOString(),
    });

    return {
      sessionId: input.sessionId,
      reply,
      sources: docs.map((doc) => doc.title),
    };
  }
}
