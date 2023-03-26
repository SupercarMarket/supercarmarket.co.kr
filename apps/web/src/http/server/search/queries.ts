import { type Query } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';
import { getSearch } from './apis';
import { QUERY_KEYS } from './keys';

export const useSearch = (
  query: Pick<Query, 'category' | 'keyword' | 'page' | 'filter'>,
  options = {}
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.all, query],
    queryFn: () => getSearch({ query }),
    useErrorBoundary: true,
    ...options,
  });
};
