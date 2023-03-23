import { clientApi } from '@supercarmarket/lib';
import { useMutation } from '@tanstack/react-query';

export default function useAddComment(
  query: {
    category: string;
    postId: string;
    parentId?: string;
  },
  options = {}
) {
  const { category, postId, parentId } = query;

  const currentQuery = parentId
    ? {
        category,
        parentId,
      }
    : {
        category,
      };

  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: { contents: string };
      token: string;
    }) =>
      clientApi(`/server/supercar/v1/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: token,
          'Content-Type': 'application/json',
        },
        query: currentQuery,
        data,
      }),
    ...options,
  });
}
