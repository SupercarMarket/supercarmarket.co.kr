import { clientApi, clientFetcher } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, likeComment, updateComment } from './apis';
import { QUERY_KEYS } from './keys';

export const useAddComment = (
  query: {
    category: string;
    postId: string;
    parentId?: string;
  },
  options = {}
) => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: { contents: string };
      token: string;
    }) => addComment({ data, query, token }),
    ...options,
  });
};

export const useLikeComment = (
  query: {
    category: string;
    postId: string;
    commentId: string;
  },
  options = {}
) => {
  const queryClient = useQueryClient();
  const { category, postId, commentId } = query;

  return useMutation({
    mutationFn: (token: string) => likeComment({ query, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comment(postId),
      });
    },
    ...options,
  });
};

export const useDeleteComment = (
  query: {
    category: string;
    postId: string;
    commentId: string;
  },
  options = {}
) => {
  const { category, postId, commentId } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => deleteComment({ query, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comment(postId),
      });
    },
    ...options,
  });
};

export const useUpdateComment = (
  query: {
    category: string;
    postId: string;
    commentId?: string;
  },
  options = {}
) => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: { contents: string };
      token: string;
    }) => updateComment({ data, token, query }),
    ...options,
  });
};
