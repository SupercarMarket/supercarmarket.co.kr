import type { PaginationResponse, Query } from '@supercarmarket/types/base';
import type { SearchAll } from '@supercarmarket/types/search';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useSearch(
  query: Pick<Query, 'category' | 'keyword' | 'page' | 'filter' | 'orderBy'>,
  options = {}
) {
  const { category, keyword, page, filter, orderBy } = query;

  let currentQuery = {};
  currentQuery = {
    ...currentQuery,
    category: category === 'all' ? 'null' : category,
    page: page + 1,
    keyword,
  };

  if (filter !== 'created_date')
    currentQuery = { ...currentQuery, filter, orderBy };

  return useQuery<PaginationResponse<SearchAll>>(
    [...queries.search.all, ...queries.search.query(query)],
    () =>
      clientFetcher('/server/supercar/v1/search', {
        method: 'GET',
        query: currentQuery,
      }),
    { ...options, useErrorBoundary: true }
  );
}
