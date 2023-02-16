import { Query } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazinePostingResponse } from 'types/magazine';
import { clientFetcher } from 'utils/api/fetcher';

export default function useSearch(
  query: Pick<Query, 'category' | 'keyword' | 'page' | 'filter' | 'orderBy'>,
  options = {}
) {
  const { category, keyword, page, filter, orderBy } = query;

  let currentQuery = {};
  currentQuery = {
    ...currentQuery,
    category,
    keyword,
    page: page + 1,
  };

  if (filter !== 'null') currentQuery = { ...currentQuery, filter, orderBy };

  return useQuery<MagazinePostingResponse>(
    [...queries.search.all, ...queries.search.query(query)],
    () =>
      clientFetcher('/server/supercar/v1/search', {
        method: 'GET',
        query: currentQuery,
      }),
    { ...options, useErrorBoundary: true }
  );
}
