import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseApi } from 'utils/api/fetcher';

export default function useUpdateComment(
  postId: string,
  commentId?: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contents: string) =>
      baseApi('/api/comment/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          postId,
          commentId,
        },
        data: { contents },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
