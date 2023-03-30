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
    mutationFn: ({ data }: { data: { contents: string }; token: string }) =>
      addComment({ data, query }),
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

  return useMutation({
    mutationFn: () => likeComment({ query }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comment(query.postId),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment({ query }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comment(query.postId),
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
    mutationFn: ({ data }: { data: { contents: string } }) =>
      updateComment({ data, query }),
    ...options,
  });
};
