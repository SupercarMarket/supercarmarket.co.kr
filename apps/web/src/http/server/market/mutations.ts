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
    mutationFn: () => likeMarketPost({ id }),
    useErrorBoundary: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.id(id) });
    },
    ...options,
  });
};

export const useUpdateMarketSellStatus = (id: string, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: { brdSeq: number } }) =>
      updateMarketSellStatus({ data: { seq: data.brdSeq } }),
    useErrorBoundary: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.id(id) });
    },
    ...options,
  });
};

export const useDeleteMarketPost = (id: string, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: { id: string }[] }) =>
      deleteMarketPost({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.id(id) });
    },
    useErrorBoundary: true,
    ...options,
  });
};
