import { clientApi } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useLikeCommunityPost(
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
      clientApi(`/server/supercar/v1/community/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: token,
        },
        data: {
          category,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(
        queries.community.detail(subject, category, id)
      );
    },
    useErrorBoundary: true,
    ...options,
  });
}
