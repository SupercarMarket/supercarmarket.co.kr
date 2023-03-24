export const QUERY_KEYS = {
  all: () => ['comments'],
  comment: (id: string) => [...QUERY_KEYS.all(), id],
};
