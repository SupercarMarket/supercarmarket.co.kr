import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';

export default function useCommunityPost(
  token: string | null,
  query: {
    subject: string;
    category: string;
    id: string;
  },
  options = {}
) {
  const { subject, category, id } = query;
  return useQuery(
    queries.community.detail(subject, category, id),
    () =>
      clientFetcher(`/server/supercar/v1/community/${category}/post-id/${id}`, {
        method: 'GET',
      }),
    options
  );
}
