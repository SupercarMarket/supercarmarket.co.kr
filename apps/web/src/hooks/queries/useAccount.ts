import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazinePostingResponse } from 'types/magazine';
import { clientFetcher } from 'utils/api/fetcher';

export default function useAccount(id: string, options = {}) {
  return useQuery<MagazinePostingResponse>(
    queries.account.id(id),
    () => clientFetcher('/api/account', { method: 'GET', params: id }),
    { ...options, useErrorBoundary: true }
  );
}
