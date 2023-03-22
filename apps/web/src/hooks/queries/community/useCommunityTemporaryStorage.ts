import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useCommunityTemporaryStorage(
  query: {
    category: string;
    filter: string;
    orderBy: string;
    page: number;
  },
  options = {}
) {
  return useQuery(
    [
      ...queries.community.all,
      {
        ...query,
      },
    ],
    () =>
      clientFetcher('/supercar/v1/community-temp', {
        method: 'GET',
      }),
    options
  );
}
