import { useMutation } from '@tanstack/react-query';
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
    ...options,
  });
}
