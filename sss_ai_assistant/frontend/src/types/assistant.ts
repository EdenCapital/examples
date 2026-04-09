export type AssistantAction = {
  label: string;
  target: string;
};

export type AssistantResponse = {
  answer: string;
  explanation?: string;
  actions?: AssistantAction[];
  sources?: string[];
};

export type AssistantContextInput = {
  question: string;
  currentPage?: 'trade' | 'portfolio' | 'orders' | 'assistant';
  objectType?: 'order' | 'funding_record';
  objectId?: string;
  userId?: string;
};

export type ChatMessage =
  | { role: 'user'; text: string }
  | { role: 'assistant'; text: string; response?: AssistantResponse };
