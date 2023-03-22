import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { MagazinePostingResponse } from '@supercarmarket/types/magazine';
import { clientFetcher } from '@supercarmarket/lib';

export default function useMagazinePost(
  id: string,
  token?: string,
  options = {}
) {
  const headers: HeadersInit = token
    ? {
        ACCESS_TOKEN: token,
      }
    : {};

  return useQuery<MagazinePostingResponse>(
    queries.magazine.id(id),
    () =>
      clientFetcher('/server/supercar/v1/magazine', {
        method: 'GET',
        headers,
        params: id,
      }),
    { ...options, useErrorBoundary: true }
  );
}
