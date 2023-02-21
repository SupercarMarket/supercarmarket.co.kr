import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  MarketDetailDto,
  MarketDetailResponse,
  WithBlurredImage,
} from '@supercarmarket/types/market';
import { clientFetcher } from 'utils/api/fetcher';

export default function useMarketDetail(id: string, options = {}) {
  return useQuery<
    MarketDetailResponse<MarketDetailDto<WithBlurredImage<{ imgSrc: string }>>>
  >(
    queries.market.detail(id),
    () => clientFetcher(`/api/market/${id}`, { method: 'GET' }),
    {
      ...options,
      useErrorBoundary: true,
    }
  );
}
