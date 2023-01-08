import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseApi } from 'utils/api/fetcher';

export default function useAddComment(
  postId: string,
  parentId?: string,
  options = {}
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      baseApi('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          postId,
          parentId,
        },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
