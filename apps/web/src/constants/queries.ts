import type { CommentQuery } from '@supercarmarket/types/comment';
import type { Query } from '@supercarmarket/types/base';
import type { AccountTab } from './account';

const queries = {
  /**
   * Home Query Keys
   */
  home: {
    all: ['home'] as const,
    magazine: () => [...queries.home.all, 'magazine'] as const,
    market: () => [...queries.home.all, 'market'] as const,
    community: () => [...queries.home.all, 'community'] as const,
    partnership: () => [...queries.home.all, 'partnership'] as const,
    new: () => [...queries.home.all, 'new'] as const,
    best: () => [...queries.home.all, 'best'] as const,
  },
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
   * Magazine Query Keys
   */
  magazine: {
    all: ['magazine'] as const,
    lists: () => [...queries.magazine.all, 'list'] as const,
    id: (id: string) => [...queries.magazine.lists(), id] as const,
    query: (query: { page: number }) => [query.page] as const,
  },
  /**
   * Community Query Keys
   */
  community: {
    all: ['community'] as const,
    lists: () => [...queries.community.all, 'list'] as const,
    best: () => [...queries.community.lists(), 'best'] as const,
    detail: (...query: string[]) => [...query, 'detail'] as const,
    query: (
      query: Pick<
        Query,
        'category' | 'page' | 'filter' | 'searchType' | 'keyword'
      >
    ) =>
      [
        String(query.filter),
        String(query.searchType),
        String(query.page),
        String(query.keyword),
        query.category,
      ] as const,
  },
  /**
   * Comment Query Keys
   */
  comment: {
    all: ['comment'] as const,
    lists: () => [...queries.comment.all, 'list'] as const,
    id: (id: string) => [...queries.comment.lists(), id] as const,
    query: (query: CommentQuery) =>
      [query.page, query.orderBy, query.category] as const,
  },
  /**
   * Account Query Keys
   */
  account: {
    all: ['account'] as const,
    info: () => [...queries.account.all, 'info'] as const,
    id: (id: string) => [...queries.account.all, id] as const,
    category: (category: AccountTab) => [category] as const,
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
