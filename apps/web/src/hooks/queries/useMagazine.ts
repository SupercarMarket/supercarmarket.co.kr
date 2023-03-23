import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { MagazineDto } from '@supercarmarket/types/magazine';
import { clientFetcher } from '@supercarmarket/lib';
import { PaginationResponse } from '@supercarmarket/types/base';

export default function useMagazine(page = 0, options = {}) {
  return useQuery<PaginationResponse<MagazineDto[]>>(
    [...queries.magazine.lists(), ...queries.magazine.query({ page })],
    () =>
      clientFetcher('/server/supercar/v1/magazine', {
        method: 'GET',
        query: {
          page: page + 1,
        },
      }),
    { ...options, useErrorBoundary: true, refetchOnMount: true }
  );
}
