import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { UpdateInfo } from '@supercarmarket/types/account';
import type { ServerResponse } from '@supercarmarket/types/base';
import { clientFetcher } from '@supercarmarket/lib';

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
