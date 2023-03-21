import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientFetcher } from 'utils/api/fetcher';
import type { ServerResponse } from '@supercarmarket/types/base';
import type { CommunityPostDto } from '@supercarmarket/types/community';

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

  let headers = {};

  if (token) headers = { ACCESS_TOKEN: token };

  return useQuery<ServerResponse<CommunityPostDto>>(
    [
      ...queries.community.all,
      {
        subject,
        category,
        id,
      },
    ],
    () =>
      clientFetcher(`/server/supercar/v1/community/${category}/post-id/${id}`, {
        method: 'GET',
        headers,
      }),
    { ...options, useErrorBoundary: true }
  );
}
