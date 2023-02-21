import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetch } from 'utils/api/fetcher';

export default function useLikeComment(
  query: {
    category: string;
    postId: string;
    commentId: string;
  },
  options = {}
) {
  const { category, postId, commentId } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      baseFetch('/api/comment/like', {
        method: 'PATCH',
        query: {
          category,
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
