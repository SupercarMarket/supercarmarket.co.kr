import { CommentQuery } from 'types/comment';

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
  },
  /**
   * Comment Query Keys
   */
  comment: {
    all: ['comment'] as const,
    lists: () => [...queries.comment.all, 'list'] as const,
    id: (id: string) => [...queries.comment.lists(), id] as const,
    query: (query: CommentQuery) =>
      [query.page, query.orderby, query.category] as const,
  },
};

export default queries;
