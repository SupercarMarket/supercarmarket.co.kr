import { Query } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { CommunityBestResponse, CommunityDto } from 'types/community';
import { WithBlurredImage } from 'types/market';
import { baseFetcher } from 'utils/api/fetcher';

export default function useCommunityBest(
  query: Pick<Query, 'category'>,
  options = {}
) {
  const { category } = query;
  return useQuery<CommunityBestResponse<WithBlurredImage<CommunityDto>>>(
    [...queries.community.best(), query.category],
    () =>
      baseFetcher('/server/supercar/v1/community-best', {
        method: 'GET',
        query: { category, filter: 'popular', page: 1 },
      }),
    options
  );
}
