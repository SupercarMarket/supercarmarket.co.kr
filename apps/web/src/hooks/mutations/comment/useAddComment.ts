import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { clientApi } from 'utils/api/fetcher';

export default function useAddComment(
  query: {
    category: string;
    postId: string;
    parentId?: string;
  },
  options = {}
) {
  const { category, postId, parentId } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      clientApi('/api/comment/create', {
        method: 'POST',
        query: {
          category,
          postId,
          parentId: parentId ? parentId : null,
        },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.comment.id(postId));
    },
    ...options,
  });
}
