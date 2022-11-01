/**
 * Fetcher 함수는 이후 다른 폴더로 뺼 예정
 */

import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MarketDto, MarketResponse, WithBlurredImage } from 'types/market';

const fetcher = async () =>
  await fetch('/api/market', {
    method: 'GET',
  }).then((res) => res.json());

export default function useMarket(options = {}) {
  return useQuery<MarketResponse<WithBlurredImage<MarketDto>>>(
    queries.market.lists(),
    fetcher,
    options
  );
}
