import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useMarket(
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
  },
  options = {}
) {
  const entries = Object.entries(query).filter(([, val]) => val !== undefined);
  const queryKeys = entries.map(([, val]) => val + '');
  const serverQuery = Object.fromEntries(entries);

  return useQuery(
    queries.market.lists([...queryKeys]),
    () =>
      clientFetcher('/api/market', {
        method: 'GET',
        query: serverQuery,
      }),
    options
  );
}
