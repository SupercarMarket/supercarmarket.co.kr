import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  MagazineResponse,
  WithBlurredImage,
} from '@supercarmarket/types/magazine';
import { baseFetch } from 'utils/api/fetcher';

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
      baseFetch('/api/home', {
        query: {
          category: getServerCategoryQuery(query),
        },
      }),
    { ...options, useErrorBoundary: true }
  );
}
