import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import {
  deleteMarketPost,
  likeMarketPost,
  updateMarketSellStatus,
} from './apis';

export const useLikeMarketPost = (id: string, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token }: { token: string }) => likeMarketPost({ id, token }),
    useErrorBoundary: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.id(id) });
    },
    ...options,
  });
};

export const useUpdateMarketSellStatus = (options = {}) => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: { brdSeq: number };
      token: string;
    }) => updateMarketSellStatus({ data, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useDeleteMarketPost = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, token }: { data: { id: string }[]; token: string }) =>
      deleteMarketPost({ data, token }),
    useErrorBoundary: true,
    ...options,
  });
};
