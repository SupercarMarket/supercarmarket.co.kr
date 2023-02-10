import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientApi } from 'utils/api/fetcher';

export default function useUpdateComment(
  postId: string,
  commentId?: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contents: string) =>
      clientApi('/api/comment/update', {
        method: 'PATCH',
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
