import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { CommunityBestResponse, CommunityDto } from 'types/community';
import { WithBlurredImage } from 'types/market';
import { baseFetcher } from 'utils/api/fetcher';

export default function useCommunityBest(options = {}) {
  return useQuery<CommunityBestResponse<WithBlurredImage<CommunityDto>>>(
    queries.community.best(),
    () => baseFetcher('/api/community/best', { method: 'GET' }),
    options
  );
}
