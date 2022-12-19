import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetcher } from 'utils/api/fetcher';

export default function useRemoveComment(
  postId: string,
  commentId: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      baseFetcher('/api/comment/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          postId,
          commentId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
