import { useMutation } from '@tanstack/react-query';
import { clientApi } from 'utils/api/fetcher';

export default function useUpdateComment(
  query: {
    category: string;
    postId: string;
    commentId?: string;
  },
  token?: string,
  options = {}
) {
  const { category, postId, commentId } = query;

  const headers = token
    ? {
        ACCESS_TOKEN: token,
      }
    : undefined;

  return useMutation({
    mutationFn: (contents: string) =>
      clientApi(`/server/supercar/v1/post/${postId}/comment/${commentId}`, {
        method: 'PATCH',
        headers,
        query: {
          category,
        },
        data: { contents },
      }),
    ...options,
  });
}
