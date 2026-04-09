import { ChatMessage } from '@sss/shared';

export interface SessionMessages {
  sessionId: string;
  messages: ChatMessage[];
}
