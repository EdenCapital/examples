import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';
import { ContextService } from '../services/contextService';
import { SessionRepository } from '../repositories/sessionRepository';

export class ApiController {
  constructor(
    private chatService: ChatService,
    private contextService: ContextService,
    private sessionRepository: SessionRepository,
  ) {}

  health(_req: Request, res: Response): void {
    res.json({ status: 'ok' });
  }

  chat(req: Request, res: Response): void {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      res.status(400).json({ error: 'sessionId and message are required' });
      return;
    }

    const result = this.chatService.chat({ sessionId, message });
    res.json(result);
  }

  docs(_req: Request, res: Response): void {
    res.json(this.contextService.getDocs());
  }

  data(_req: Request, res: Response): void {
    res.json(this.contextService.getData());
  }

  sessions(_req: Request, res: Response): void {
    res.json(this.sessionRepository.listSessions());
  }
}
