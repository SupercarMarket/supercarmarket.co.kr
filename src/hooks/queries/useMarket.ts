import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';

const fetcher = async () =>
  await fetch('/api/market', {
    method: 'GET',
  }).then((res) => res.json());

export default function useMagazine(marketKey: string[], options = {}) {
  return useQuery(queries.market.lists(marketKey), fetcher, options);
}
