export type Intent = 'product' | 'guide' | 'concept' | 'account' | 'order';

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

export type ContextBundle = {
  intent: Intent;
  question: string;
  pageContext?: AssistantContextInput;
  knowledge?: Record<string, string>;
  onboardingSteps?: string[];
  userSummary?: {
    userId: string;
    balances: Record<string, number>;
    recentTrades: number;
    openOrders: number;
  };
  orders?: Array<{
    id: string;
    symbol: string;
    status: 'open' | 'filled' | 'cancelled';
    reason?: string;
  }>;
};
