import { ChatMessage, Session } from '@sss/shared';

export class SessionRepository {
  private sessions = new Map<string, Session>();
  private messages = new Map<string, ChatMessage[]>();

  listSessions(): Session[] {
    return Array.from(this.sessions.values()).sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  }

  ensureSession(sessionId: string): Session {
    const existing = this.sessions.get(sessionId);
    if (existing) return existing;

    const session: Session = {
      id: sessionId,
      title: `Session ${this.sessions.size + 1}`,
      updatedAt: new Date().toISOString(),
    };

    this.sessions.set(sessionId, session);
    this.messages.set(sessionId, []);

    return session;
  }

  addMessage(sessionId: string, message: ChatMessage): void {
    const session = this.ensureSession(sessionId);
    session.updatedAt = new Date().toISOString();

    const existing = this.messages.get(sessionId) ?? [];
    this.messages.set(sessionId, [...existing, message]);
    this.sessions.set(sessionId, session);
  }

  getMessages(sessionId: string): ChatMessage[] {
    return this.messages.get(sessionId) ?? [];
  }
}
