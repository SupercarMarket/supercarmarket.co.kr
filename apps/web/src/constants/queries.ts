import type { Query } from '@supercarmarket/types/base';

const queries = {
  /**
   * Market Query Keys
   */
  market: {
    all: ['market'] as const,
    lists: (marketKey: string[]) =>
      [...queries.market.all, 'list', ...marketKey] as const,
    detail: (id: string) => [...queries.market.all, 'detail', id] as const,
    best: () => [...queries.market.lists([]), 'best'] as const,
    new: () => [...queries.market.lists([]), 'new'] as const,
  },
  /**
   * Search Query Keys
   */
  search: {
    all: ['search'] as const,
    query: (
      query: Pick<Query, 'category' | 'page' | 'filter' | 'keyword' | 'orderBy'>
    ) => [
      String(query.filter),
      String(query.page),
      String(query.keyword),
      String(query.orderBy),
      query.category,
    ],
  },
};

export default queries;
