import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetch } from 'utils/api/fetcher';

export default function useRemoveComment(
  postId: string,
  commentId: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      baseFetch('/api/comment/remove', {
        method: 'DELETE',
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
