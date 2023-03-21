import { useMutation } from '@tanstack/react-query';
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
    ...options,
  });
}
