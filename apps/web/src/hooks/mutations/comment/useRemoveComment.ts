import { clientFetcher } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useRemoveComment(
  query: {
    category: string;
    postId: string;
    commentId: string;
  },
  token?: string,
  options = {}
) {
  const { category, postId, commentId } = query;
  const queryClient = useQueryClient();

  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return useMutation({
    mutationFn: () =>
      clientFetcher(`/server/supercar/v1/post/${postId}/comment/${commentId}`, {
        method: 'DELETE',
        headers,
        query: {
          category,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
