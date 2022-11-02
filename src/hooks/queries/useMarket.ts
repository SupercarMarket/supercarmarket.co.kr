import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';

const fetcher = async (query: string) =>
  await fetch(`/api/market?${query}`, { method: 'GET' }).then((res) =>
    res.json()
  );

export default function useMarket(query: string, options = {}) {
  return useQuery(
    queries.market.lists(query.split('&')),
    () => fetcher(query),
    options
  );
}
