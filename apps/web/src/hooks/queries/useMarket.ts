import { clientFetcher } from '@supercarmarket/lib';
import type {
  MarketDto,
  MarketResponse,
  WithBlurredImage,
} from '@supercarmarket/types/market';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useMarket(
  query: {
    page: number;
    orderBy: string;
    filter: string;
    category: string;
    keyword?: string;
    minDate?: string;
    maxDate?: string;
    fuel?: string;
    minMileage?: string;
    maxMileage?: string;
    minPrice?: string;
    maxPrice?: string;
    accident?: string;
    transmission?: string;
    size?: string;
  },
  options = {}
) {
  const entries = Object.entries(query).filter(([, val]) => val !== undefined);
  const queryKeys = entries.map(([, val]) => val + '');
  const serverQuery = Object.fromEntries(entries);

  return useQuery<MarketResponse<WithBlurredImage<MarketDto>>>(
    queries.market.lists([...queryKeys]),
    () =>
      clientFetcher('/api/market', {
        method: 'GET',
        query: serverQuery,
      }),
    options
  );
}
