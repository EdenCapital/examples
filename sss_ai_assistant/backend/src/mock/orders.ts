export const mockOrders = [
  {
    id: 'ord-1001',
    symbol: 'ICP/ckUSDC',
    status: 'open' as const,
    reason: 'Limit price is above current best bid, so it remains resting on the book.'
  },
  {
    id: 'ord-1002',
    symbol: 'ICP/ckUSDC',
    status: 'filled' as const,
    reason: 'The market reached your limit level and matched fully.'
  },
  {
    id: 'ord-1003',
    symbol: 'ICP/ckUSDC',
    status: 'cancelled' as const,
    reason: 'The order was cancelled by user request before a matching opportunity occurred.'
  }
];
