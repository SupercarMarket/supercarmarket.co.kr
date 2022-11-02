import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';

const fetcher = async () =>
  await fetch('/api/market', {
    method: 'GET',
  }).then((res) => res.json());

export default function useMarket(marketKey?: string[], options = {}) {
  return useQuery(queries.market.lists(), fetcher, options);
}
