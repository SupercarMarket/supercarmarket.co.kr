/**
 * Fetcher 함수는 이후 다른 폴더로 뺼 예정
 */

import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { CommunityBestResponse, CommunityDto } from 'types/community';
import { WithBlurredImage } from 'types/market';

const fetcher = async () =>
  await fetch('/api/community/best', {
    method: 'GET',
  }).then((res) => res.json());

export default function useCommunityBest(options = {}) {
  return useQuery<CommunityBestResponse<WithBlurredImage<CommunityDto>>>(
    queries.community.best(),
    fetcher,
    options
  );
}
