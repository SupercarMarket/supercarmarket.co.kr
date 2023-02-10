import { useQuery } from '@tanstack/react-query';
import type { AccountTab } from 'constants/account';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useAccountCategory(
  id: string,
  token: string | undefined,
  query: {
    category: AccountTab;
    page: number;
    size: number;
  },
  options = {}
) {
  return useQuery(
    [...queries.account.id(id), queries.account.category(query.category)],
    () =>
      clientFetcher(
        `/server/supercar/v1/userpage/category/${query.category}/id`,
        {
          method: 'GET',
          headers: {
            ACCESS_TOKEN: token || '',
          },
          params: id,
          query,
        }
      ),
    {
      ...options,
      enabled: !!token,
      useErrorBoundary: true,
    }
  );
}
