export const QUERY_KEYS = {
  all: ['live'] as const,
  live: () => [...QUERY_KEYS.all, 'list'] as const,
  id: (id: string) => [...QUERY_KEYS.all, id] as const,
};
