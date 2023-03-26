export const QUERY_KEYS = {
  all: ['market'] as const,
  market: () => [...QUERY_KEYS.all, 'list'] as const,
  best: () => [...QUERY_KEYS.market(), 'best'] as const,
  new: () => [...QUERY_KEYS.market(), 'new'] as const,
  id: (id: string) => [...QUERY_KEYS.all, id] as const,
};
