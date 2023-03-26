import {
  type MarketDetailDto,
  type MarketDetailResponse,
  type MarketDto,
  type MarketResponse,
} from '@supercarmarket/types/market';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { getMarket, getMarketPost } from './';

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
  return useQuery<MarketResponse<MarketDto>>({
    queryKey: [...QUERY_KEYS.market(), query],
    queryFn: () => getMarket({ query }),
    ...options,
  });
};

export const useMarketPost = (id: string, options = {}) => {
  return useQuery<MarketDetailResponse<MarketDetailDto<string>>>({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () => getMarketPost({ id }),
    useErrorBoundary: true,
    ...options,
  });
};
