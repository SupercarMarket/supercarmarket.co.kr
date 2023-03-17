import { clientApi } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UseRemoveCommunityPostData = {
  id: string;
  category?: string;
};

export default function useRemoveCommunityPost(
  query: {
    id: string;
  },
  options = {}
) {
  const { id } = query;

  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: UseRemoveCommunityPostData[];
      token: string;
    }) =>
      clientApi(`/server/supercar/v1/community`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: token,
        },
        params: id,
        data,
      }),
    useErrorBoundary: true,
    ...options,
  });
}
