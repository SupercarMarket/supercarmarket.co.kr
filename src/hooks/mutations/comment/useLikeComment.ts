import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetch } from 'utils/api/fetcher';

export default function useLikeComment(
  postId: string,
  commentId: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      baseFetch('/api/comment/like', {
        method: 'PATCH',
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
