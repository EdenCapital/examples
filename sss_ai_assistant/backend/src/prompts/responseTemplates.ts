import type { AssistantResponse, ContextBundle } from '../types/assistant.js';

export function buildTemplateResponse(context: ContextBundle): AssistantResponse {
  switch (context.intent) {
    case 'product':
      return {
        answer: 'SSS DeFi is a fully on-chain trading system on ICP designed to combine CEX-level usability with DEX trust.',
        explanation: context.knowledge?.sss,
        actions: [
          { label: 'Go to Trade', target: '/trade' },
          { label: 'Read Guide', target: '/assistant' }
        ],
        sources: ['Product Guide']
      };
    case 'guide':
      return {
        answer: 'A strong start is to learn market layout in Trade, then place a small limit order and monitor status in Orders.',
        explanation: context.onboardingSteps?.join(' '),
        actions: [
          { label: 'Go to Trade', target: '/trade' },
          { label: 'View Orders', target: '/orders' },
          { label: 'Go to Portfolio', target: '/portfolio' }
        ],
        sources: ['Onboarding Guide']
      };
    case 'concept': {
      const question = context.question.toLowerCase();
      if (question.includes('ack')) {
        return {
          answer: 'ACK means your request has been accepted quickly by the system.',
          explanation: context.knowledge?.ack,
          actions: [{ label: 'Read Guide', target: '/assistant' }],
          sources: ['FAQ']
        };
      }
      if (question.includes('market') && question.includes('limit')) {
        return {
          answer: 'Limit orders wait for your target price, while market orders execute immediately using available book liquidity.',
          explanation: `${context.knowledge?.limit_order} ${context.knowledge?.market_order}`,
          actions: [{ label: 'Go to Trade', target: '/trade' }],
          sources: ['Trading Concepts']
        };
      }
      return {
        answer: 'Unified balance gives you one clear view of available assets across your trading workflow.',
        explanation: context.knowledge?.unified_balance,
        actions: [{ label: 'Go to Portfolio', target: '/portfolio' }],
        sources: ['FAQ']
      };
    }
    case 'account': {
      const user = context.userSummary;
      return {
        answer: `Your account snapshot shows ${user?.openOrders ?? 0} open orders and ${user?.recentTrades ?? 0} recent trades.`,
        explanation: `Balances: ICP ${user?.balances.ICP ?? 0}, ckUSDC ${user?.balances.ckUSDC ?? 0}.`,
        actions: [
          { label: 'Go to Portfolio', target: '/portfolio' },
          { label: 'View Orders', target: '/orders' }
        ],
        sources: ['Mock Account Data']
      };
    }
    case 'order': {
      const unresolved = context.orders?.find((item) => item.status === 'open');
      return {
        answer: 'Your open order is likely not filled because market price has not crossed your limit level yet.',
        explanation: unresolved?.reason,
        actions: [
          { label: 'View Orders', target: '/orders' },
          { label: 'Go to Trade', target: '/trade' }
        ],
        sources: ['Mock Order Data']
      };
    }
    default:
      return {
        answer: 'I can help explain SSS product concepts and common status questions.',
        actions: [{ label: 'Read Guide', target: '/assistant' }],
        sources: ['Assistant Core']
      };
  }
}
