export const QUERY_KEYS = {
  all: ['magazine'] as const,
  magazine: () => [...QUERY_KEYS.all, 'list'] as const,
  id: (id: string) => [...QUERY_KEYS.all, id] as const,
};
