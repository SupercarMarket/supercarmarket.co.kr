import type { PaginationResponse } from '@supercarmarket/types/base';
import type { CommunityDto } from '@supercarmarket/types/community';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useCommunity(
  query: {
    category: string;
    page: number;
    filter?: string;
    searchType?: string;
    keyword?: string;
  },
  options = {}
) {
  const { category = 'report', page = 0, filter, searchType, keyword } = query;

  const currentQuery = keyword && {
    searchType,
    keyword,
  };

  return useQuery<PaginationResponse<CommunityDto[]>>(
    [
      ...queries.community.lists(),
      {
        category,
        filter,
        page,
        searchType,
        keyword,
      },
    ],
    () =>
      clientFetcher('/server/supercar/v1/community', {
        method: 'GET',
        query: {
          filter,
          page: page + 1,
          category: category === 'all' ? 'report' : category,
          ...currentQuery,
        },
      }),
    { ...options, useErrorBoundary: true }
  );
}
