import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { ServerResponse } from 'types/base';
import type { MagazinePostDto } from 'types/magazine';
import { baseFetcher } from 'utils/api/fetcher';

export default function useMagazinePost(id: string, options = {}) {
  return useQuery<ServerResponse<MagazinePostDto>>(
    queries.magazine.id(id),
    () => baseFetcher('/api/magazine', { method: 'GET', params: id }),
    options
  );
}
