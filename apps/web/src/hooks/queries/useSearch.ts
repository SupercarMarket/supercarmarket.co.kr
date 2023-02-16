import type { PaginationResponse, Query } from '@supercarmarket/types/base';
import type { CommunityDto } from '@supercarmarket/types/community';
import type { MagazineDto } from '@supercarmarket/types/magazine';
import type { MarketDto } from '@supercarmarket/types/market';
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
    category,
    keyword,
    page: page + 1,
  };

  if (filter !== 'null') currentQuery = { ...currentQuery, filter, orderBy };

  return useQuery<
    PaginationResponse<SearchAll | MarketDto[] | CommunityDto[] | MagazineDto[]>
  >(
    [...queries.search.all, ...queries.search.query(query)],
    () =>
      clientFetcher('/server/supercar/v1/search', {
        method: 'GET',
        query: currentQuery,
      }),
    { ...options, useErrorBoundary: true }
  );
}
