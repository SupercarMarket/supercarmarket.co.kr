import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { Profile } from '@supercarmarket/types/account';
import { clientFetcher } from '@supercarmarket/lib';

export default function useAccount(id: string, token?: string, options = {}) {
  const header = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return useQuery<{ data: Profile }>(
    queries.account.id(id),
    () =>
      clientFetcher('/server/supercar/v1/userpage', {
        headers: header,
        method: 'GET',
        query: {
          id,
        },
      }),
    { ...options, useErrorBoundary: true }
  );
}
