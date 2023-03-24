export const QUERY_KEYS = {
  all: ['community'] as const,
  community: () => [...QUERY_KEYS.all, 'list'] as const,
  detail: (id: string) => [...QUERY_KEYS.all, id] as const,
};
