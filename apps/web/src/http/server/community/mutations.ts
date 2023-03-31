import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommunityPost, likeCommunityPost } from './apis';
import { QUERY_KEYS } from './keys';

export const useLikeCommunityPost = (
  query: {
    subject: string;
    category: string;
    id: string;
  },
  options = {}
) => {
  const { subject, category, id } = query;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeCommunityPost({ id, category }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_KEYS.id(id),
          {
            subject,
            category,
          },
        ],
      });
    },
    useErrorBoundary: true,
    ...options,
  });
};

export const useRemoveCommunityPost = (options = {}) => {
  return useMutation({
    mutationFn: ({
      data,
    }: {
      data: {
        id: string;
        category?: string;
      }[];
    }) => deleteCommunityPost({ data }),
    useErrorBoundary: true,
    ...options,
  });
};
