import { clientFetcher } from '@supercarmarket/lib';
import {
  type MarketDetailDto,
  type MarketDetailResponse,
  type MarketDto,
  type MarketResponse,
} from '@supercarmarket/types/market';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { QUERY_KEYS } from './keys';

export const useMarket = (
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
) => {
  const entries = Object.entries(query).filter(([, val]) => val !== undefined);
  const queryKeys = entries.map(([, val]) => val + '');
  const serverQuery = Object.fromEntries(entries);

  return useQuery<MarketResponse<MarketDto>>(
    [QUERY_KEYS.market(), query],
    () =>
      clientFetcher('/api/market', {
        method: 'GET',
        query: serverQuery,
      }),
    options
  );
};

export const useMarketDetail = (id: string, options = {}) => {
  return useQuery<MarketDetailResponse<MarketDetailDto<string>>>(
    queries.market.detail(id),
    () =>
      clientFetcher(`/server/supercar/v1/shop`, { method: 'GET', params: id }),
    {
      ...options,
      useErrorBoundary: true,
    }
  );
};
