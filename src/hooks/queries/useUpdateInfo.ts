import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { UpdateInfo } from 'types/account';
import type { ServerResponse } from 'types/base';
import { clientFetcher } from 'utils/api/fetcher';

export default function useUpdateInfo(token: string, options = {}) {
  return useQuery<ServerResponse<UpdateInfo>>(
    queries.account.info(),
    () =>
      clientFetcher(`/server/supercar/v1/user/info`, {
        method: 'GET',
        headers: {
          ACCESS_TOKEN: token,
        },
      }),
    { ...options, useErrorBoundary: true, enabled: !!token }
  );
}
