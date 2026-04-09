import type { AssistantContextInput, Intent } from '../types/assistant.js';

export function detectIntent(input: AssistantContextInput): Intent {
  const q = input.question.toLowerCase();

  if (q.includes('order') || q.includes('filled') || q.includes('cancel')) return 'order';
  if (q.includes('balance') || q.includes('portfolio') || q.includes('account')) return 'account';
  if (q.includes('start') || q.includes('go first') || q.includes('onboarding')) return 'guide';
  if (q.includes('ack') || q.includes('finalized') || q.includes('limit') || q.includes('market') || q.includes('unified')) return 'concept';
  return 'product';
}
