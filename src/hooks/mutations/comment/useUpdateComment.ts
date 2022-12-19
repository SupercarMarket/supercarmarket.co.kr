import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetcher } from 'utils/api/fetcher';

export default function useUpdateComment(
  postId: string,
  commentId: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contents: string) =>
      baseFetcher('/api/comment/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          postId,
          commentId,
        },
        body: JSON.stringify({ contents }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
