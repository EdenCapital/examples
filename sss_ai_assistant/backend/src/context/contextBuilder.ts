import { mockKnowledgeBase, onboardingSteps } from '../mock/knowledge.js';
import { detectIntent } from './intentDetector.js';
import type { AssistantContextInput, ContextBundle } from '../types/assistant.js';
import type { DataSourceAdapter } from '../adapters/dataSourceAdapter.js';
import type { DocsSourceAdapter } from '../adapters/docsSourceAdapter.js';

export async function buildContext(
  input: AssistantContextInput,
  deps: {
    docsSource: DocsSourceAdapter;
    dataSource: DataSourceAdapter;
  }
): Promise<ContextBundle> {
  const intent = detectIntent(input);
  const base: ContextBundle = {
    intent,
    question: input.question,
    pageContext: input
  };

  if (intent === 'product') {
    return { ...base, knowledge: { sss: mockKnowledgeBase.sss } };
  }

  if (intent === 'guide') {
    return { ...base, onboardingSteps, knowledge: { how_to_start: mockKnowledgeBase.how_to_start } };
  }

  if (intent === 'concept') {
    const conceptTerms = ['ack', 'finalized', 'unified_balance', 'limit_order', 'market_order'];
    const selected = conceptTerms.reduce<Record<string, string>>((acc, key) => {
      acc[key] = mockKnowledgeBase[key];
      return acc;
    }, {});
    return { ...base, knowledge: selected };
  }

  if (intent === 'account') {
    const userSummary = await deps.dataSource.getUserSummary(input.userId ?? 'demo-user');
    return { ...base, userSummary, knowledge: { unified_balance: mockKnowledgeBase.unified_balance } };
  }

  const orders = await deps.dataSource.getOrders(input.userId ?? 'demo-user');
  return { ...base, orders, knowledge: { limit_order: mockKnowledgeBase.limit_order } };
}
