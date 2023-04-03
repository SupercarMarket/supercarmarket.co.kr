import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { type Params, type ServerResponse } from '@supercarmarket/types/base';
import { getBanner, getHome } from './apis';

export const useHome = <T>(
  category:
    | 'market'
    | 'magazine'
    | 'best'
    | 'new'
    | 'community'
    | 'partnership',
  query?: Params,
  options = {}
) => {
  return useQuery<ServerResponse<T>>(
    QUERY_KEYS[category](),
    () => getHome(category, query),
    {
      useErrorBoundary: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      ...options,
    }
  );
};

export const useBanner = (type: 'M' | 'D' = 'D', options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.banner(),
    queryFn: () => getBanner(type),
    useErrorBoundary: true,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    ...options,
  });
};
