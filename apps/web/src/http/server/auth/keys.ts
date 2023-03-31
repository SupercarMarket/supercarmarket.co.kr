export const QUERY_KEYS = {
  all: ['auth'] as const,
  duplicate: (field: string) => [...QUERY_KEYS.all, 'duplicate', field],
  phone: () => [...QUERY_KEYS.all, 'phone'],
  code: () => [...QUERY_KEYS.all, 'code'],
};
