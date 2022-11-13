import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import {
  MarketDetailDto,
  MarketDetailResponse,
  WithBlurredImage,
} from 'types/market';

const fetcher = async (id: string) =>
  await fetch(`/api/market/${id}`, { method: 'GET' }).then((res) => res.json());

export default function useMarketDetail(id: string, options = {}) {
  return useQuery<
    MarketDetailResponse<MarketDetailDto<WithBlurredImage<{ imgSrc: string }>>>
  >(queries.market.detail(id), () => fetcher(id), options);
}
