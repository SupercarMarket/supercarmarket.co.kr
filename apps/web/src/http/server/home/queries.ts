import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { type Params, type ServerResponse } from '@supercarmarket/types/base';
import { getAdvertisement, getBanner, getHome } from './apis';

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
      ...options,
    }
  );
};

export const useBanner = (type: 'M' | 'D' = 'D', options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.banner(),
    queryFn: () => getBanner(type),
    keepPreviousData: true,
    useErrorBoundary: true,
    ...options,
  });
};

export const useAdvertisement = (
  query: {
    type: 'D' | 'M';
    code: string;
  },
  options = {}
) => {
  const { code } = query;

  return useQuery<ServerResponse<ADs.AdDto>>({
    queryKey: [...QUERY_KEYS.advertisement(), code],
    queryFn: () => getAdvertisement(query),
    keepPreviousData: true,
    useErrorBoundary: true,
    ...options,
  });
};
