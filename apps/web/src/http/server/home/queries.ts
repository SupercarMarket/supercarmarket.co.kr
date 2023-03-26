import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { type ServerResponse } from '@supercarmarket/types/base';
import { getHome } from './apis';

export const useHome = <T>(
  category:
    | 'market'
    | 'magazine'
    | 'best'
    | 'new'
    | 'community'
    | 'partnership',
  options = {}
) => {
  return useQuery<ServerResponse<T>>(
    QUERY_KEYS[category](),
    () => getHome(category),
    {
      ...options,
      useErrorBoundary: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
    }
  );
};
