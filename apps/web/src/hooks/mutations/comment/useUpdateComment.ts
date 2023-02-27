import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientApi } from 'utils/api/fetcher';

export default function useUpdateComment(
  query: {
    category: string;
    postId: string;
    commentId?: string;
  },
  options = {}
) {
  const { category, postId, commentId } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contents: string) =>
      clientApi('/api/comment/update', {
        method: 'PATCH',
        query: {
          category,
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
