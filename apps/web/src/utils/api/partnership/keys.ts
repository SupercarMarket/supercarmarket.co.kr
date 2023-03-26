export const PARTNERSHIP_QUERY_KEY = {
  partnership: {
    all: ['partnership'] as const,
    lists: (query: string[]) =>
      [...PARTNERSHIP_QUERY_KEY.partnership.all, 'list', ...query] as const,
    id: (id: string) =>
      [...PARTNERSHIP_QUERY_KEY.partnership.lists([]), id] as const,
  },
};
