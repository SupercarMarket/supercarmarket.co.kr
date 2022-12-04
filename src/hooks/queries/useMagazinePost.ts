import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { MagazinePostingResponse } from 'types/magazine';
import { baseFetcher } from 'utils/api/fetcher';

export default function useMagazinePost(id: string, options = {}) {
  return useQuery<MagazinePostingResponse>(
    queries.magazine.id(id),
    () => baseFetcher('/api/magazine', { method: 'GET', params: id }),
    options
  );
}
