import { clientApi } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useRemoveCommunityPost(
  query: {
    subject: string;
    category: string;
    id: string;
  },
  options = {}
) {
  const { subject, category, id } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) =>
      clientApi(`/server/supercar/v1/community`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: token,
        },
        params: id,
        data: {
          category,
        },
      }),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries(
          queries.community.detail(subject, category, id)
        ),
      ]),
    useErrorBoundary: true,
    ...options,
  });
}
