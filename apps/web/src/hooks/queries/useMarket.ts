import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useMarket(
  query: {
    category: string;
    filter: string;
    orderBy: string;
    page: number;
  },
  options = {}
) {
  return useQuery(
    queries.market.lists([query.category]),
    () =>
      clientFetcher('/api/market', {
        method: 'GET',
        query,
      }),
    options
  );
}
