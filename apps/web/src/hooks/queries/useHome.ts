import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  MagazineResponse,
  WithBlurredImage,
} from '@supercarmarket/types/magazine';
import { clientFetcher } from '@supercarmarket/lib';

export const getServerCategoryQuery = (query: keyof typeof queries.home) => {
  if (query === 'best') return 'interestProduct';
  if (query === 'new') return 'latestProduct';
  return query;
};

export default function useHome<T>(
  query: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership',
  options = {}
) {
  return useQuery<MagazineResponse<WithBlurredImage<T>>>(
    queries.home[query](),
    () =>
      clientFetcher('/server/supercar/v1/main', {
        method: 'GET',
        query: {
          category: getServerCategoryQuery(query),
        },
      }),
    {
      ...options,
      useErrorBoundary: true,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
    }
  );
}
