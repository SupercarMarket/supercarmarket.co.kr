import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazineResponse, WithBlurredImage } from 'types/magazine';
import { homeApiFetcher } from 'utils/api/home';

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
      homeApiFetcher('/api/home', {
        query: {
          category: getServerCategoryQuery(query),
        },
      }),
    options
  );
}
