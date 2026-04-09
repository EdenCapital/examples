export type Role = 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
  timestamp: string;
}

export interface Session {
  id: string;
  title: string;
  updatedAt: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
}

export interface ChatResponse {
  sessionId: string;
  reply: string;
  sources: string[];
}

export interface ContextDocument {
  id: string;
  title: string;
  summary: string;
}

export interface ContextData {
  key: string;
  value: string;
}
