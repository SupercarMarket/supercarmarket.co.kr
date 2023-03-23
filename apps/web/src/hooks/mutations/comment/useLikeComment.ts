import { clientFetcher } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useLikeComment(
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
      clientFetcher(
        `/server/supercar/v1/post/${postId}/comment/${commentId}/like`,
        {
          headers,
          query: {
            category,
          },
          method: 'POST',
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
