import type { CommentQuery } from '@supercarmarket/types/comment';
import type { Query } from '@supercarmarket/types/base';
import type { AccountTab } from './account';

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
  /**
   * Partnership Query Keys
   */
  partnership: {
    all: ['partnership'] as const,
    lists: (query: string[]) =>
      [...queries.partnership.all, 'list', ...query] as const,
    id: (id: string) => [...queries.partnership.lists([]), id] as const,
  },
};

export default queries;
