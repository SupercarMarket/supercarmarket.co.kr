import type { PaginationResponse } from '@supercarmarket/types/base';
import type { CommunityDto } from '@supercarmarket/types/community';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useCommunity(
  query: {
    category: string;
    filter: string | null;
    page: number;
    searchType: string;
    keyword: string | null;
  },
  options = {}
) {
  const {
    category = 'report',
    filter = null,
    page = 0,
    searchType,
    keyword,
  } = query;

  const currentQuery = keyword && {
    searchType,
    keyword,
  };

  return useQuery<PaginationResponse<CommunityDto>>(
    queries.market.lists([
      ...queries.community.lists(),
      ...queries.community.query(query),
    ]),
    () =>
      clientFetcher('/server/supercar/v1/community', {
        method: 'GET',
        query: {
          category,
          filter,
          page: page + 1,
          ...currentQuery,
        },
      }),
    { ...options, useErrorBoundary: true }
  );
}
