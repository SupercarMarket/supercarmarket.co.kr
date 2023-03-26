export const QUERY_KEYS = {
  all: ['partnership'] as const,
  partnership: () => [...QUERY_KEYS.all, 'list'] as const,
  id: (id: string) => [...QUERY_KEYS.partnership(), id] as const,
};
