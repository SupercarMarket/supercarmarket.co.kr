export const QUERY_KEYS = {
  all: ['account'] as const,
  id: (id: string) => [...QUERY_KEYS.all, id] as const,
  info: (id: string) => [...QUERY_KEYS.id(id), 'info'] as const,
};
