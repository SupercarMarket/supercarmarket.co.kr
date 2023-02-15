import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useCommunityDetail(
  query: {
    category: string;
    filter: string;
    orderBy: string;
    page: number;
  },
  options = {}
) {
  return useQuery(
    queries.market.lists([query.category]),
    () =>
      clientFetcher('/supercar/v1/community-temp', {
        method: 'GET',
      }),
    options
  );
}
