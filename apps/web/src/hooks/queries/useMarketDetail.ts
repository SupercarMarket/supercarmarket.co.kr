import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  MarketDetailDto,
  MarketDetailResponse,
} from '@supercarmarket/types/market';
import { clientFetcher } from '@supercarmarket/lib';

export default function useMarketDetail(id: string, options = {}) {
  return useQuery<MarketDetailResponse<MarketDetailDto<string>>>(
    queries.market.detail(id),
    () =>
      clientFetcher(`/server/supercar/v1/shop`, { method: 'GET', params: id }),
    {
      ...options,
      useErrorBoundary: true,
    }
  );
}
