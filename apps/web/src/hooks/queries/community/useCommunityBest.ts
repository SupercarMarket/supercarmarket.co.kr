import { Query } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  CommunityBestResponse,
  CommunityDto,
} from '@supercarmarket/types/community';
import type { WithBlurredImage } from '@supercarmarket/types/market';
import { clientFetcher } from '@supercarmarket/lib';

export default function useCommunityBest(
  query: Pick<Query, 'category'>,
  options = {}
) {
  const { category } = query;
  return useQuery<CommunityBestResponse<WithBlurredImage<CommunityDto>>>(
    [...queries.community.best(), query.category],
    () =>
      clientFetcher('/server/supercar/v1/community-best', {
        method: 'GET',
        query: { category, filter: 'popular', page: 1 },
      }),
    options
  );
}
